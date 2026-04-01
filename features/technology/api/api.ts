import { ApiResponse } from "@/globalTypes";
import { ITechnology, TechnologyFormData } from "../technology.type";
import { normalizeError } from "@/utils/erros";

export async function fecthTechnologies(): Promise<ITechnology[]> {
    try {
        const res = await fetch("/api/technology");
        const data: ApiResponse<ITechnology[]> = await res.json();
        return data.data || [];
    } catch (error) {
        const res = normalizeError(error);
        console.log("Error en fetchTechnologies:", res);
        throw res;
    }
}

export async function insertTechnology(data: TechnologyFormData) {
    try {
        const res = await fetch("/api/technology", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        const responseData: ApiResponse<ITechnology> = await res.json();
        if (!responseData.data) {
            throw new Error("No se devolvió la tecnología");
        }
        return responseData.data;
    } catch (error) {
        const res = normalizeError(error);
        console.log("Error en insertTechnology:", res);
        throw res;
    }
}

export async function updateTechnology(id: number, data: TechnologyFormData) {
    try {
        const res = await fetch(`/api/technology/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        const responseData: ApiResponse<ITechnology> = await res.json();
        if (!responseData.data) {
            throw new Error("No se devolvió la tecnología");
        }
        return responseData.data;
    } catch (error) {
        const res = normalizeError(error);
        console.log("Error en updateTechnology:", res);
        throw res;
    }
}
