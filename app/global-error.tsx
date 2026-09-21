"use client";

import Link from "next/link";

export default function GlobalError() {
  return (
    <html lang="en">
      <body>
        <main className="shell page">
          <span className="eyebrow">Dravyaguna World</span>
          <h1>Something went wrong</h1>
          <p>The application could not load this page. Please retry or return to the plant catalog.</p>
          <Link className="button" href="/plants">Plant catalog</Link>
        </main>
      </body>
    </html>
  );
}
