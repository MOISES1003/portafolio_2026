import z from "zod";
import { IProject } from "../projects/project.types";
import { companySchema } from "./schemas";

export type ICompanies = {
    id: number;
    title: string;
    description: string;
    imgUrl: string | null | undefined;
    createdAt: string;
    updatedAt: string;
    projects?: IProject[]
};

export type CompanyFormData = z.infer<typeof companySchema>;

export type UpdateCompanyPayload = {
    id: number;
    data: CompanyFormData;
};