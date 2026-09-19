export const NOTES_STORAGE_KEY = "dravyaguna-world-notes-v1";

export type PlantNote = {
  id: string;
  plantId: string;
  text: string;
  updatedAt: string;
};

export function readNotes(): PlantNote[] {
  if (typeof window === "undefined") return [];
  try {
    const value = JSON.parse(window.localStorage.getItem(NOTES_STORAGE_KEY) || "[]");
    return Array.isArray(value) ? value.filter((n): n is PlantNote =>
      n && typeof n.id === "string" && typeof n.plantId === "string" && typeof n.text === "string" && typeof n.updatedAt === "string"
    ) : [];
  } catch { return []; }
}

export function saveNote(notes: PlantNote[], plantId: string, text: string): PlantNote[] {
  const clean = text.trim();
  const now = new Date().toISOString();
  const existing = notes.find((n) => n.plantId === plantId);
  if (!clean) return notes.filter((n) => n.plantId !== plantId);
  const note = { id: existing?.id || `note-${plantId}`, plantId, text: clean, updatedAt: now };
  return [...notes.filter((n) => n.plantId !== plantId), note];
}
