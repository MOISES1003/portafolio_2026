import prisma from "@/lib/prisma";
import { normalizeError } from "@/utils/erros";

export class ProjectTechnologyRepository {

    // Crear una relación individual
    private createProjectTechnologyData(projectId: number, technologyId: number) {
        return {
            projectId,
            technologyId,
        };
    }

    // Crear o reemplazar tecnologías de un proyecto dentro de una transacción
    async replaceProjectTechnologies(projectId: number, technologyIds: number[]) {
        try {
            return await prisma.$transaction(async (tx) => {
                //  Eliminar todas las relaciones existentes
                await tx.projectTechnology.deleteMany({
                    where: { projectId },
                });

                //  Insertar nuevas relaciones
                const data = technologyIds.map((techId) =>
                    this.createProjectTechnologyData(projectId, techId)
                );

                if (data.length === 0) return []; // nada que insertar

                return await tx.projectTechnology.createMany({
                    data,
                    skipDuplicates: true, 
                });
            });
        } catch (error) {
            throw normalizeError(error, "Error al actualizar tecnologías del proyecto");
        }
    }

}