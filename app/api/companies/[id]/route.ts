import { updatedCompany } from "@/features/companies";
import { CompanyFormData } from "@/features/companies/companies.type";
import { errorResponse, successResponse } from "@/utils/apiResponse";
import { normalizeError } from "@/utils/erros";
import { NextRequest } from "next/server";

export async function PUT(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const body = await req.json();
        const data: CompanyFormData = body;

        const { id } = await context.params;

        const numericId = Number(id);

        if (isNaN(numericId)) {
            return errorResponse({ status: 400, error: "ID inválido" });
        }

        const company = await updatedCompany(numericId, data);

        return successResponse({
            data: company,
            message: "Company updated successfully",
        });

    } catch (err: unknown) {
        const appError = normalizeError(err, "Error al actualizar la empresa");
        return errorResponse({
            status: 500,
            error: appError.message,
            detailError: appError.detail,
        });
    }
}
