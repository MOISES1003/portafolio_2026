import prisma from "@/lib/prisma";
import { normalizeError } from "@/utils/erros";
import { TechnologyFormData } from "../technology.type";

export class TechnologyRepository {

    findTechnologies() {
        try {
            return prisma.technology.findMany({
                orderBy: { createdAt: "desc" },
            });
        } catch (error) {
            throw normalizeError(error, "Error al obtener las tecnologías");
        }
    }

    createTechnology(data: TechnologyFormData) {
        try {
            return prisma.technology.create({
                data,
            });
        } catch (error) {
            throw normalizeError(error, "Error al crear la tecnología");
        }
    }

    updateTechnology(id: number, data: TechnologyFormData) {
        try {
            return prisma.technology.update({
                where: { id },
                data,
            });
        } catch (error) {
            throw normalizeError(error, "Tecnología no encontrada o error al actualizar");
        }
    }

}