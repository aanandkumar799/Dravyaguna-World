export const BOOKMARKS_STORAGE_KEY = "dravyaguna-world-bookmarks-v1";

export function readBookmarks(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const value = JSON.parse(window.localStorage.getItem(BOOKMARKS_STORAGE_KEY) || "[]");
    return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
  } catch {
    return [];
  }
}

export function isBookmarked(bookmarks: string[], plantId: string) {
  return bookmarks.includes(plantId);
}

export function toggleBookmark(bookmarks: string[], plantId: string): string[] {
  return isBookmarked(bookmarks, plantId)
    ? bookmarks.filter((id) => id !== plantId)
    : [...bookmarks, plantId];
}
