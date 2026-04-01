import { updateTechnology } from "@/features/technology";
import { TechnologyFormData } from "@/features/technology/technology.type";
import { errorResponse, successResponse } from "@/utils";
import { normalizeError } from "@/utils/erros";
import { NextRequest } from "next/server";

export async function PUT(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const body = await req.json();
        const data: TechnologyFormData = body;
        const { id } = await context.params;
        const numericId = Number(id);
        if (isNaN(numericId)) {
            return errorResponse({ status: 400, error: "ID inválido" });
        }
        const technology = await updateTechnology(numericId, data);
        return successResponse({
            data: technology,
            message: "Tecnología actualizada exitosamente",
        });
    } catch (error) {
        const appError = normalizeError(error);
        return errorResponse({
            status: 500,
            error: appError.message,
            detailError: appError.detail,
        });
    }
}