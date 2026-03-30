import { createProject, getProjects } from "@/features/projects";
import { ProjectFormData } from "@/features/projects/project.types";
import { errorResponse, successResponse } from "@/utils";
import { normalizeError } from "@/utils/erros";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const search = searchParams.get("search") || undefined;

        const data = await getProjects({ search });
        return successResponse({
            data,
            message: "Proyectos obtenidos exitosamente",
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
        const data: ProjectFormData = body;
        const project = await createProject(data);
        return successResponse({
            data: project,
            message: "Project created successfully",
        });
    } catch (err: unknown) {
        const appError = normalizeError(err);
        return errorResponse({
            error: appError.message,
            detailError: appError.detail,
        });
    }
}

