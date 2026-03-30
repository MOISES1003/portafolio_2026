import { ZodError } from "zod";

export function mapZodErrors<T>(error: unknown): Partial<Record<keyof T, string>> {
  if (!(error instanceof ZodError)) return {};

  const errors: Partial<Record<keyof T, string>> = {};

  error.issues.forEach(issue => {
    const field = issue.path[0] as keyof T;
    if (field) errors[field] = issue.message;
  });

  return errors;
}