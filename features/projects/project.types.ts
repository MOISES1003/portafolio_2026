import z from "zod";
import { projectSchema } from "./schemas";
import { ITechnology } from "../technology/technology.type";
import { ICompanies } from "../companies/companies.type";

export type IProject = {
    id: number;
    title: string;
    description: string;
    companyId: number;
    company?: ICompanies;
    repoUrl: string;
    liveUrl: string;
    featured: boolean;
    createdAt: Date;
    updatedAt: Date;
    technologiesIds?: number[];
    technologies?: ITechnology[]
};

export type ProjectFormData = z.infer<typeof projectSchema>;

export type UpdateProjectPayload = {
    id: number;
    data: ProjectFormData;
};