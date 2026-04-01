import { createTechnology, getTechnologies } from "@/features/technology";
import { TechnologyFormData } from "@/features/technology/technology.type";
import { errorResponse, successResponse } from "@/utils";
import { normalizeError } from "@/utils/erros";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const data = await getTechnologies();
        return successResponse({
            data,
            message: "Tecnologías obtenidas exitosamente",
        });
    } catch (error) {
        const appError = normalizeError(error);
        return errorResponse({
            error: appError.message,
            detailError: appError.detail,
        });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const data: TechnologyFormData = body;
        const technology = await createTechnology(data);
        return successResponse({
            data: technology,
            message: "Tecnología creada exitosamente",
        });
    } catch (error) {
        const appError = normalizeError(error);
        return errorResponse({
            error: appError.message,
            detailError: appError.detail,
        });
    }
}