import { GetsParams } from "@/globalTypes";
import { ProjectFormData } from "../project.types";
import prisma from "@/lib/prisma";
import { normalizeError } from "@/utils/erros";

export class ProjectRepository {

    async findProjects(params: GetsParams) {
        const { search } = params;

        const where = search
            ? {
                OR: [
                    { title: { contains: search, mode: "insensitive" as const } },
                    { description: { contains: search, mode: "insensitive" as const } },
                ],
            }
            : {};

        try {
            // Solo buscamos todos los proyectos que coincidan con la búsqueda
            const projects = await prisma.project.findMany({
                where,
                orderBy: { createdAt: "desc" },
                include:{
                    company:true,
                }
            });

            // Retornamos los proyectos
            return projects;
        } catch (error) {
            throw normalizeError(error, "Error al obtener los proyectos");
        }

    }

    async createProject(data: ProjectFormData) {
        try {
            return prisma.project.create({
                data,
            });
        } catch (error) {
            throw normalizeError(error, "Error al crear el proyecto");
        }

    }

    async updateProject(id: number, data: ProjectFormData) {
        try {
            return await prisma.project.update({
                where: { id },
                data,
            });
        } catch (error) {
            throw normalizeError(error, "Proyecto no encontrado o error al actualizar");
        }
    }

    async deleteProject(id: number) {
        try {
            return await prisma.project.delete({
                where: { id },
            });
        } catch (error) {
            throw normalizeError(error, "Proyecto no encontrado o error al eliminar");
        }
    }
}

