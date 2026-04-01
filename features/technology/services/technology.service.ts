import { TechnologyRepository } from "../repositories";
import { TechnologyFormData } from "../technology.type";

const repository = new TechnologyRepository();

export async function getTechnologies() {
    const technologies = await repository.findTechnologies();
    return technologies;
}

export async function createTechnology(data: TechnologyFormData) {
    return repository.createTechnology(data);
}

export async function updateTechnology(id: number, data: TechnologyFormData) {
    return repository.updateTechnology(id, data);
}