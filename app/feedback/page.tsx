"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

export default function Feedback() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: form.get("type"),
        details: form.get("details"),
        email: form.get("email"),
        website: form.get("website"),
      }),
    });

    if (!response.ok) {
      const payload = await response.json().catch(() => ({}));
      setError(payload.error || "The report could not be submitted.");
      return;
    }

    setSent(true);
    event.currentTarget.reset();
  }

  return (
    <main className="shell page">
      <Link href="/">← Home</Link>
      <header className="page-heading">
        <span className="eyebrow">QUALITY FEEDBACK</span>
        <h1>Report an issue</h1>
        <p>Flag plant identity, taxonomy, academic, image, reference, or interface problems.</p>
      </header>

      {sent ? (
        <div className="success">
          <h2>Report submitted</h2>
          <p>Your feedback has been sent to the project review queue.</p>
          <button onClick={() => setSent(false)}>Submit another</button>
        </div>
      ) : (
        <form onSubmit={submit}>
          <label>
            Issue type
            <select name="type" defaultValue="academic">
              <option value="academic">Academic/content</option>
              <option value="identity">Plant identity</option>
              <option value="taxonomy">Taxonomy</option>
              <option value="image">Image</option>
              <option value="reference">Reference</option>
              <option value="ui">Interface</option>
            </select>
          </label>
          <label>
            Details
            <textarea name="details" required minLength={10} maxLength={2000} rows={7} placeholder="Describe the issue and source if known." />
          </label>
          <label>
            Email (optional)
            <input name="email" type="email" maxLength={254} placeholder="For follow-up only" />
          </label>
          <label className="sr-only" aria-hidden="true">
            Website
            <input name="website" tabIndex={-1} autoComplete="off" />
          </label>
          {error ? <p className="notice" role="alert">{error}</p> : null}
          <button type="submit">Submit report</button>
        </form>
      )}
    </main>
  );
}
