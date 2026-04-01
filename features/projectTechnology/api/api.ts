import { ApiResponse } from "@/globalTypes";
import { CreateProjectTechnologyPayload } from "../projectTechnology.type";

export async function createProjectTechnologyApi(data: CreateProjectTechnologyPayload) {
    try {
        const res = await fetch("/api/projectTechnology", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        const responseData: ApiResponse<null> = await res.json();

        if (!res.ok || responseData.error) {
            throw new Error(responseData.error || "No se pudo crear la relación");
        }

        return responseData;
    } catch (error: unknown) {
        // Aquí puedes usar normalizeError si lo tienes en tu utils
        throw error;
    }
}