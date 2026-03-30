import { ApiResponse, GetsParams } from "@/globalTypes";
import { IProject, ProjectFormData } from "../project.types";
import { normalizeError } from "@/utils/erros";

export async function fetchProjects(params?: GetsParams): Promise<IProject[]> {
    let query = "";

    if (params) {
        const parts: string[] = [];

        if (params.search !== undefined) parts.push(`search=${encodeURIComponent(params.search)}`);

        query = parts.join("&");
    }
    const url = query ? `/api/projects?${query}` : `/api/projects`;
    try {
        const res = await fetch(url);
        const data: ApiResponse<IProject[]> = await res.json();
        return data.data || [];
    } catch (error) {
        const res = normalizeError(error,"Error al obtener proyectos");
        throw res;
    }
}

export async function insertProject(data: ProjectFormData) {
    const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    const responseData: ApiResponse<IProject> = await res.json();
    if (!responseData.data) {
        throw new Error("No se devolvió el proyecto");
    }
    return responseData.data;
}

export async function updateProject(id: number, data: ProjectFormData) {
    const res = await fetch(`/api/projects/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    const responseData: ApiResponse<IProject> = await res.json();
    if (!responseData.data) {
        throw new Error("No se devolvió el proyecto");
    }
    return responseData.data;
}

export async function deleteProject(id: number) {
    const res = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) throw new Error("Error updating project");

    return res.json();
}