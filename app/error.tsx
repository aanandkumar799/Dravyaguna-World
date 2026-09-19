"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="shell page">
      <span className="eyebrow">Something went wrong</span>
      <h1>We couldn&apos;t load this page</h1>
      <p>
        The application encountered an unexpected error. You can retry the page
        or return to the plant catalog.
      </p>
      <div className="button-row">
        <button className="button" type="button" onClick={() => reset()}>
          Try again
        </button>
        <a className="button button-secondary" href="/plants">
          Plant catalog
        </a>
      </div>
    </main>
  );
}
