import { ProjectTechnologyRepository } from "../repositories";

const repository = new ProjectTechnologyRepository();

export async function createProjectTechnology(projectId: number, technologyId: number[]) {
    await repository.replaceProjectTechnologies(projectId, technologyId);
}