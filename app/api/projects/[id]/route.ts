import { deleteProject, updatedProject } from "@/features/projects";
import { ProjectFormData } from "@/features/projects/project.types";
import { errorResponse, successResponse } from "@/utils/apiResponse";
import { normalizeError } from "@/utils/erros";
import { NextRequest } from "next/server";

export async function PUT(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const body = await req.json();
        const data: ProjectFormData = body;

        const { id } = await context.params;

        const numericId = Number(id);

        if (isNaN(numericId)) {
            return errorResponse({ status: 400, error: "ID inválido" });
        }

        const project = await updatedProject(numericId, data);

        return successResponse({
            data: project,
            message: "Project updated successfully",
        });
        
    } catch (err: unknown) {
        const appError = normalizeError(err, "Error al actualizar el proyecto");
        return errorResponse({
            status: 500,
            error: appError.message,
            detailError: appError.detail,
        });
    }
}

export async function DELETE(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;

        const numericId = Number(id);

        if (isNaN(numericId)) {
            return errorResponse({ status: 400, error: "ID inválido" });
        }

        const project = await deleteProject(numericId);

        return successResponse({
            data: project,
            message: "Project deleted successfully",
        });
    } catch (err: unknown) {
        const appError = normalizeError(err, "Error al eliminar el proyecto");
        return errorResponse({
            error: appError.message,
            detailError: appError.detail,
        });
    }
}