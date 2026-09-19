import { NextResponse } from "next/server";

const allowedTypes = new Set(["academic", "identity", "taxonomy", "image", "reference", "ui"]);
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const requestBuckets = new Map<string, { count: number; resetAt: number }>();

function clientKey(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || request.headers.get("x-real-ip") || "anonymous";
}

function rateLimited(key: string) {
  const now = Date.now();
  const bucket = requestBuckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    requestBuckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  bucket.count += 1;
  return bucket.count > MAX_REQUESTS;
}

export async function POST(request: Request) {
  const token = process.env.GITHUB_FEEDBACK_TOKEN;
  const targetRepo = process.env.GITHUB_FEEDBACK_REPO;

  if (!token || !targetRepo) {
    return NextResponse.json({ error: "Feedback service is not configured." }, { status: 503 });
  }

  const contentLength = Number(request.headers.get("content-length") || "0");
  if (contentLength > 16_000) {
    return NextResponse.json({ error: "Request is too large." }, { status: 413 });
  }

  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (origin && host) {
    try {
      if (new URL(origin).host !== host) {
        return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
      }
    } catch {
      return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
    }
  }

  if (rateLimited(clientKey(request))) {
    return NextResponse.json({ error: "Too many feedback submissions. Please try again later." }, {
      status: 429,
      headers: { "Retry-After": "600" },
    });
  }

  let body: { type?: string; details?: string; email?: string; website?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (body.website) return NextResponse.json({ ok: true });
  const type = typeof body.type === "string" ? body.type.trim() : "";
  const details = typeof body.details === "string" ? body.details.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";

  if (!allowedTypes.has(type) || details.length < 10 || details.length > 2000) {
    return NextResponse.json({ error: "Please provide a valid issue type and 10–2000 characters of detail." }, { status: 400 });
  }
  if (email.length > 254 || (email && !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email))) {
    return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
  }

  const issueBody = [
    "## Feedback report",
    "",
    `**Type:** ${type}`,
    `**Email:** ${email || "Not provided"}`,
    "",
    details,
    "",
    "_Submitted through the Dravyaguna World feedback form._",
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

  if (!response.ok) {
    return NextResponse.json({ error: "Feedback could not be saved right now." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
