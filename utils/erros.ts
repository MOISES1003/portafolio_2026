import { AppError, HttpStatus } from "@/globalTypes";

export function normalizeError(error: unknown, messageOverride?: string, status: HttpStatus = 500): AppError {
    let detail: unknown;

    if (error instanceof Error) {
        detail = error.stack || error.message;
    } else if (typeof error === "object" && error !== null) {
        detail = JSON.stringify(error);
    } else {
        detail = error;
    }

    return {
        message: messageOverride || "Ocurrió un error",
        detail,
        status,
    };
}