import { z } from "zod";

export const BOOKMARKS_STORAGE_KEY = "dravyaguna-world-bookmarks-v1";
const bookmarksSchema = z.array(z.string().min(1)).max(5000);

export function readBookmarks(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const value = JSON.parse(window.localStorage.getItem(BOOKMARKS_STORAGE_KEY) || "[]");
    const parsed = bookmarksSchema.safeParse(value);
    return parsed.success ? [...new Set(parsed.data)] : [];
  } catch {
    return [];
  }
}

export function isBookmarked(bookmarks: string[], plantId: string) { return bookmarks.includes(plantId); }

export function toggleBookmark(bookmarks: string[], plantId: string): string[] {
  return isBookmarked(bookmarks, plantId)
    ? bookmarks.filter((id) => id !== plantId)
    : [...bookmarks, plantId].slice(-5000);
}
