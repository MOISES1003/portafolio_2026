import z from "zod";

export const technologySchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  nomenclature: z.string().min(1, "La nomenclatura es obligatoria"),
  logoUrl: z.string().optional(),
});

