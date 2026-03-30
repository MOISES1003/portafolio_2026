export interface GetsParams {
  search?: string;        // texto a buscar
}

export type ApiResponse<T> = {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  detailError?: unknown;
};

export interface AppError {
  message: string;
  detail?: unknown;
  status?: HttpStatus;
}

export type HttpStatus =
  | 200  // OK: La solicitud se completó con éxito
  | 201  // Created: Recurso creado correctamente
  | 204  // No Content: Solicitud exitosa pero sin contenido que devolver
  | 400  // Bad Request: La solicitud es inválida o mal formada
  | 401  // Unauthorized: No autenticado o token inválido
  | 403  // Forbidden: El usuario no tiene permisos para acceder
  | 404  // Not Found: Recurso no encontrado
  | 409  // Conflict: Conflicto de estado (por ejemplo, duplicado)
  | 422  // Unprocessable Entity: Datos válidos pero semánticamente incorrectos
  | 500; // Internal Server Error: Error interno del servidor