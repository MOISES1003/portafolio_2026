import { ProjectFormData } from "@/features/projects/project.types";
import { ProjectRepository } from "../repositories";
import { GetsParams } from "@/globalTypes";

const repository = new ProjectRepository();

export async function getProjects(params: GetsParams) {
    const projects = await repository.findProjects(params);
    return projects;
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