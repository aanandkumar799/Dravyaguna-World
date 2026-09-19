import type { Metadata } from "next";
import SearchContent from "./SearchContent";

export const metadata: Metadata = {
  title: "Search",
  description: "Search the Dravyaguna World plant and learning database.",
  robots: { index: false, follow: true },
};

export default function SearchPage() {
  return <SearchContent />;
}
