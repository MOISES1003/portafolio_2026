import { ApiResponse } from "@/globalTypes";
import { CompanyFormData, ICompanies } from "../companies.type";
import { normalizeError } from "@/utils/erros";

export async function fetchCompanies(): Promise<ICompanies[]> {
    try {
        const response = await fetch("/api/companies");
        const data: ApiResponse<ICompanies[]> = await response.json();
        console.log("Data recibida en fetchCompanies:", data);
        return data.data || [];
    } catch (error) {
        const res = normalizeError(error);
        console.log("Error en fetchProjects:", res);
        throw res;
    }
}

export async function insertCompany(data: CompanyFormData) {
    const res = await fetch("/api/companies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    const responseData: ApiResponse<ICompanies> = await res.json();
    if (!responseData.data) {
        throw new Error("No se devolvió el proyecto");
    }
    return responseData.data;
}

export async function updateCompany(id: number, data: CompanyFormData) {
    const res = await fetch(`/api/companies/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    const responseData: ApiResponse<ICompanies> = await res.json();
    if (!responseData.data) {
        throw new Error("No se devolvió el proyecto");
    }
    return responseData.data;
}
