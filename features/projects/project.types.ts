import z from "zod";
import { projectSchema } from "./schemas";

export type IProject = {
    id: number;
    title: string;
    description: string;
    companyId: number;
    repoUrl: string;
    liveUrl: string;
    featured: boolean;
    createdAt: string;
    updatedAt: string;
};

export type ProjectFormData = z.infer<typeof projectSchema>;

export type UpdateProjectPayload = {
    id: number;
    data: ProjectFormData;
};