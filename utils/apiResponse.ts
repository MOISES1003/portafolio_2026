// utils/apiResponse.ts
import { ApiResponse, HttpStatus } from "@/globalTypes";
import { NextResponse } from "next/server";

interface SuccessResponseParams<T> {
    data: T;
    message?: string;
    status?: HttpStatus;
    success?: boolean;
}

export function successResponse<T>({ data, message = "Success", status = 200, success = true }: SuccessResponseParams<T>) {
    const response: ApiResponse<T> = {
        success,
        message,
        data,
    };

    return NextResponse.json(response, { status });
}

interface ErrorResponseParams {
    status?: HttpStatus;
    error?: string | unknown;
    detailError?: unknown;
}

export function errorResponse({ status = 500, error, detailError }: ErrorResponseParams) {
    const response: ApiResponse<null> = {
        success: false,
        error: error instanceof Error ? error.message : (error as string | undefined),
        detailError: detailError instanceof Error ? detailError.message : detailError,
    };

    return NextResponse.json(response, { status });
}