import prisma from "@/lib/prisma";
import { CompanyFormData } from "../companies.type";

export class CompaniesRepository {
    async findCompanies() {
        try {
            const companies = await prisma.company.findMany({
                orderBy: { createdAt: "desc" },
                include: {projects: true},
            });
            return companies;
        } catch (error) {
            console.error(error);
            throw new Error("Error al obtener las empresas");
        }

    }

    async createCompany(data: CompanyFormData) {
        try {
            return prisma.company.create({
                data,
            });
        } catch (error) {
            console.error(error);
            throw new Error("Error al crear la empresa");
        }
    }

    async updateCompany(id: number, data: CompanyFormData) {
        try {
            return await prisma.company.update({
                where: { id },
                data,
            });
        } catch (error) {
            console.error(error);
            throw new Error("Empresa no encontrada o error al actualizar");
        }
    }
}

