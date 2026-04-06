import { IProject, ProjectFormData } from "@/features/projects/project.types";
import { ProjectRepository } from "../repositories";
import { GetsParams } from "@/globalTypes";

const repository = new ProjectRepository();

export async function getProjects(params: GetsParams): Promise<IProject[]> {

    const projects = await repository.findProjects(params);

    const projectsWithTech: IProject[] = projects.map(project => ({
        ...project,
        // Convertimos fechas a string
        createdAt: project.createdAt.toISOString(),
        updatedAt: project.updatedAt.toISOString(),
        repoUrl: project.repoUrl ?? "",
        liveUrl: project.liveUrl ?? "",
        // Company: convertir fechas también
        company: {
            ...project.company,
            createdAt: project.company.createdAt.toISOString(),
            updatedAt: project.company.updatedAt.toISOString(),
            imgUrl: project.company.imgUrl ?? undefined
        },
        // Tecnologías
        technologiesIds: project.technologies.map(pt => pt.technologyId),
        technologies: project.technologies.map(pt => {
            const tech = pt.technology;
            return {
                id: tech.id,
                name: tech.name,
                nomenclature: tech.nomenclature ?? undefined,
                logoUrl: tech.logoUrl ?? undefined,
                createdAt: tech.createdAt.toISOString(),
                updatedAt: tech.updatedAt.toISOString(),
            };
        }),
    }));

    return projectsWithTech;
}
export async function createProject(data: ProjectFormData) {
    // Lógica adicional: valor por defecto para featured
    const projectData = { ...data, featured: data.featured ?? false };
    return repository.createProject(projectData);
}

export async function updatedProject(id: number, data: ProjectFormData) {
    // Lógica adicional: valor por defecto para featured
    const projectData = { ...data, featured: data.featured ?? false };
    return repository.updateProject(id, projectData);
}


export async function deleteProject(id: number) {
    // Lógica adicional: valor por defecto para featured
    return repository.deleteProject(id);
}