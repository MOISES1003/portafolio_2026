import z from "zod";
import { technologySchema } from "./schemas";

export type ITechnology = {
    id: number;
    name: string;
    nomenclature?: string;
    logoUrl?: string;
    createdAt: string;
    updatedAt: string;
}

export type TechnologyFormData = z.infer<typeof technologySchema>;

export type UpdateTechnologyPayload = {
    id: number;
    data: TechnologyFormData;
};