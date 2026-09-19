import { z } from "zod";

export const plantPartSchema = z.enum([
  "whole-plant","root","stem","bark","leaf","flower","fruit","seed",
  "rhizome","bulb","tuber","latex","resin","other"
]);

export const plantSourceSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  type: z.enum(["classical","modern","taxonomic","image","other"]),
  author: z.string().optional(),
  year: z.number().int().optional(),
  locator: z.string().optional(),
  url: z.string().url().optional(),
  verification: z.enum(["unverified","reviewed","verified"]).optional()
}).strict();

export const plantImageSchema = z.object({
  id: z.string().min(1),
  part: plantPartSchema,
  url: z.string().url().optional(),
  alt: z.string().min(5),
  sourceId: z.string().optional(),
  license: z.string().optional(),
  verification: z.enum(["unverified","reviewed","verified","rejected"])
}).strict();

export const plantSchema = z.object({
  id: z.string().regex(/^plant-[a-z0-9-]+$/),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  identity: z.object({
    botanicalName: z.string().min(2),
    authority: z.string().optional(),
    acceptedNameStatus: z.enum(["accepted","synonym","review","unverified"]).optional()
  }).strict(),
  names: z.object({
    sanskrit: z.array(z.string()).default([]),
    common: z.array(z.string()).default([]),
    regional: z.array(z.string()).default([]),
    synonyms: z.array(z.string()).default([])
  }).strict(),
  taxonomy: z.object({
    kingdom: z.string().optional(),
    family: z.string().optional(),
    genus: z.string().optional(),
    species: z.string().optional()
  }).strict(),
  status: z.enum(["draft","review","verified","deprecated"]),
  parts: z.array(plantPartSchema).default([]),
  study: z.object({
    habit: z.string().optional(),
    morphology: z.string().optional(),
    habitat: z.string().optional(),
    distribution: z.string().optional(),
    identificationFeatures: z.array(z.string()).optional(),
    usefulParts: z.array(z.string()).optional(),
    rasa: z.array(z.string()).optional(),
    guna: z.array(z.string()).optional(),
    virya: z.string().optional(),
    vipaka: z.string().optional(),
    karma: z.array(z.string()).optional(),
    dosha: z.array(z.string()).optional(),
    therapeuticUses: z.array(z.string()).optional(),
    formulations: z.array(z.string()).optional(),
    contraindications: z.array(z.string()).optional()
  }).strict().optional(),
  sources: z.array(plantSourceSchema).default([]),
  images: z.array(plantImageSchema).default([])
}).strict();

export type ValidatedPlant = z.infer<typeof plantSchema>;
