import { createCompany, getCompanies } from "@/features/companies";
import { CompanyFormData } from "@/features/companies/companies.type";
import { errorResponse, successResponse } from "@/utils";
import { normalizeError } from "@/utils/erros";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    try {

        const data = await getCompanies();
        return successResponse({
            data,
            message: "Empresas obtenidas exitosamente",
        });
    } catch (err: unknown) {
        const appError = normalizeError(err);
        return errorResponse({
            error: appError.message,
            detailError: appError.detail,
        });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const data: CompanyFormData = body;
        const company = await createCompany(data);
        return successResponse({
            data: company,
            message: "Company created successfully",
        });
    } catch (err: unknown) {
        const appError = normalizeError(err);
        return errorResponse({
            error: appError.message,
            detailError: appError.detail,
        });
    }
}