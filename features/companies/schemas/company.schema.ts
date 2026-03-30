import z from "zod";

export const companySchema = z.object({
    title: z.string().min(1, "El título es obligatorio."),
    description: z.string().min(1, "La descripción es obligatoria."),
});

