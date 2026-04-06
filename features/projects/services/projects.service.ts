import { IProject, ProjectFormData } from "@/features/projects/project.types";
import { ProjectRepository } from "../repositories";
import { GetsParams } from "@/globalTypes";

const repository = new ProjectRepository();

export async function getProjects(params: GetsParams): Promise<IProject[]> {
    const projects = await repository.findProjects(params);

    return projects.map(project => ({
        id: project.id,
        title: project.title,
        description: project.description,
        companyId: project.companyId,
        repoUrl: project.repoUrl ?? "", // normalizamos null a string vacío
        liveUrl: project.liveUrl ?? "",
        featured: project.featured,
        createdAt: project.createdAt,
        updatedAt: project.updatedAt,
        company: project.company
            ? {
                id: project.company.id,
                title: project.company.title,
                description: project.company.description,
                imgUrl: project.company.imgUrl ?? undefined, // null → undefined
                createdAt: project.company.createdAt,
                updatedAt: project.company.updatedAt,
            }
            : undefined,
        technologiesIds: project.technologies?.map(pt => pt.technologyId) ?? [],
        technologies: project.technologies?.map(pt => ({
            id: pt.technology.id,
            name: pt.technology.name,
            nomenclature: pt.technology.nomenclature ?? undefined,
            logoUrl: pt.technology.logoUrl ?? undefined,
            createdAt: pt.technology.createdAt,
            updatedAt: pt.technology.updatedAt,
        })) ?? [],
    }));
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