import type { z } from "zod";
import { plantSchema, plantSourceSchema, plantImageSchema, plantPartSchema } from "./schema";

export type PlantStatus = z.infer<typeof plantSchema>["status"];
export type PlantPart = z.infer<typeof plantPartSchema>;
export type PlantSource = z.infer<typeof plantSourceSchema>;
export type PlantImage = z.infer<typeof plantImageSchema>;
export type Plant = z.infer<typeof plantSchema>;
