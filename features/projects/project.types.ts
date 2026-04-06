import z from "zod";
import { projectSchema } from "./schemas";
import { ITechnology } from "../technology/technology.type";
import { ICompanies } from "../companies/companies.type";

export type PrismaProject = {
    id: number;
    title: string;
    description: string;
    companyId: number;
    repoUrl: string | null;
    liveUrl: string | null;
    featured: boolean;
    createdAt: Date;
    updatedAt: Date;
    company?: {
        id: number;
        title: string;
        description: string;
        imgUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
    };
    technologies?: {
        technologyId: number;
        technology: {
            id: number;
            name: string;
            nomenclature?: string | null;
            logoUrl?: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
    }[];
};
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