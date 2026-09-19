import { z } from "zod";

export const NOTES_STORAGE_KEY = "dravyaguna-world-notes-v1";

export const plantNoteSchema = z.object({
  id: z.string().min(1),
  plantId: z.string().min(1),
  text: z.string(),
  updatedAt: z.string().datetime(),
}).strict();

export type PlantNote = z.infer<typeof plantNoteSchema>;

export function readNotes(): PlantNote[] {
  if (typeof window === "undefined") return [];
  try {
    const value = JSON.parse(window.localStorage.getItem(NOTES_STORAGE_KEY) || "[]");
    const parsed = z.array(plantNoteSchema).safeParse(value);
    return parsed.success ? parsed.data : [];
  } catch { return []; }
}

export function saveNote(notes: PlantNote[], plantId: string, text: string): PlantNote[] {
  const clean = text.trim();
  const now = new Date().toISOString();
  const existing = notes.find((note) => note.plantId === plantId);
  if (!clean) return notes.filter((note) => note.plantId !== plantId);
  const note = { id: existing?.id || `note-${plantId}`, plantId, text: clean, updatedAt: now };
  return [...notes.filter((item) => item.plantId !== plantId), note];
}
