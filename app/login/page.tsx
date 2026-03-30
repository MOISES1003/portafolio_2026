"use client";

import { Input } from "@/components";
import { LoginData, loginSchema, useLogin } from "@/features/login";
import { mapZodErrors } from "@/utils";
import { useFormik } from "formik";

export default function LoginPage() {

    const { login, loading } = useLogin();

    const formik = useFormik<LoginData>({
        initialValues: {
            password: "",
            email: ""
        },
        validate: (values) => {
            try {
                loginSchema.parse(values);
                return {};
            } catch (error) {
                return mapZodErrors<typeof values>(error);
            }
        },
        onSubmit: async (values) => {
            await login(values);
        },
    })

    return (
        <div className="flex items-center justify-center h-full">
            <div className="flex flex-col gap-4 border-2 border-black p-4 rounded-2xl">
                <h1 className="text-black text-center">Inicie Session</h1>
                <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 w-80">
                    <Input
                        label="Email"
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.errors.email}
                        touched={formik.touched.email}
                    />

                    <Input
                        label="Contraseña"
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.errors.password}
                        touched={formik.touched.password}
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-500 text-white p-2 rounded disabled:opacity-50"
                    >
                        {loading ? "Ingresando..." : "Ingresar"}
                    </button>
                </form>
            </div>
        </div>

    );
}
