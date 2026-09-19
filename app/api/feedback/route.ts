import { z } from "zod";
import { NextResponse } from "next/server";

const feedbackSchema = z.object({
  type: z.enum(["academic", "identity", "taxonomy", "image", "reference", "ui"]),
  details: z.string().trim().min(10).max(2000),
  email: z.string().trim().max(254).refine((value) => !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), "Invalid email"),
  website: z.string().optional(),
}).strict();

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const requestBuckets = new Map<string, { count: number; resetAt: number }>();

function clientKey(request: Request) {
  return request.headers.get("x-real-ip") || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anonymous";
}

function rateLimited(key: string) {
  const now = Date.now();
  const bucket = requestBuckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    requestBuckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    if (requestBuckets.size > 10000) {
      for (const [candidate, value] of requestBuckets) if (value.resetAt <= now) requestBuckets.delete(candidate);
    }
    return false;
  }
  bucket.count += 1;
  return bucket.count > MAX_REQUESTS;
}

export async function POST(request: Request) {
  const token = process.env.GITHUB_FEEDBACK_TOKEN;
  const targetRepo = process.env.GITHUB_FEEDBACK_REPO;
  if (!token || !targetRepo || !/^[^/]+\/[^/]+$/.test(targetRepo)) {
    return NextResponse.json({ error: "Feedback service is not configured." }, { status: 503 });
  }

  const contentLength = Number(request.headers.get("content-length") || "0");
  if (!Number.isFinite(contentLength) || contentLength > 16_000) {
    return NextResponse.json({ error: "Request is too large." }, { status: 413 });
  }

  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (origin && host) {
    try {
      if (new URL(origin).host !== host) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
    } catch {
      return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
    }
  }

  if (rateLimited(clientKey(request))) {
    return NextResponse.json({ error: "Too many feedback submissions. Please try again later." }, {
      status: 429,
      headers: { "Retry-After": "600", "Cache-Control": "no-store" },
    });
  }

  let raw: unknown;
  try { raw = await request.json(); } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (typeof raw === "object" && raw !== null && "website" in raw && typeof raw.website === "string" && raw.website.trim()) {
    return NextResponse.json({ ok: true });
  }

  const parsed = feedbackSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json({ error: "Please provide a valid issue type, details, and optional email." }, { status: 400 });
  }

  const { type, details, email } = parsed.data;
  const issueBody = [
    "## Feedback report", "", `**Type:** ${type}`, `**Email:** ${email || "Not provided"}`, "", details,
    "", "_Submitted through the Dravyaguna World feedback form._",
  ].join("\n");

  const response = await fetch(`https://api.github.com/repos/${targetRepo}/issues`, {
    method: "POST",
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
      "Content-Type": "application/json",
      "User-Agent": "Dravyaguna-World-Feedback",
    },
    body: JSON.stringify({ title: `Feedback: ${type}`, body: issueBody }),
    cache: "no-store",
  });

  if (!response.ok) return NextResponse.json({ error: "Feedback could not be saved right now." }, { status: 502 });
  return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
}
