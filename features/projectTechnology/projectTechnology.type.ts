export type IProjectTechnology = {
    projectId: number;
    technologyId: number;
}
export interface CreateProjectTechnologyPayload {
    projectId: number;
    technologies: number[];
}