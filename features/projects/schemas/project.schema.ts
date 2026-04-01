import z from "zod";

export const projectSchema = z.object({
  title: z.string().min(1, "El título es obligatorio"),
  description: z.string().min(1, "La descripción es obligatoria"),
  companyId: z.coerce.number().min(1, "La empresa es obligatoria"),
  repoUrl: z.string().url("URL inválida").optional().or(z.literal("")),
  liveUrl: z.string().url("URL inválida").optional().or(z.literal("")),
  featured: z.boolean().optional(),
}); 

