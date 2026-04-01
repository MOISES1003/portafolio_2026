import { createProjectTechnology } from "@/features/projectTechnology";
import { errorResponse, successResponse } from "@/utils";
import { normalizeError } from "@/utils/erros";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const { projectId, technologies } = body;

        // Validación básica
        if (!projectId || !technologies?.length) {
            return errorResponse({
                error: "projectId y technologies son obligatorios",
            });
        }

        await createProjectTechnology(projectId, technologies);

        return successResponse({
            data: null,
            message: "Relaciones creadas correctamente",
        });

    } catch (err: unknown) {
        const appError = normalizeError(err);
        return errorResponse({
            error: appError.message,
            detailError: appError.detail,
        });
    }
}