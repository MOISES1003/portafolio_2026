"use client";

import { Input } from "@/components";
import { useFormik } from "formik";
import { mapZodErrors } from "@/utils";
import { technologySchema } from "../schemas";
import { TechnologyFormData } from "../technology.type";


interface TechnologyFormProps {
    idForm: string;
    initialValues: TechnologyFormData;
    onSubmitTechnology: (form: TechnologyFormData) => void;
}

export default function TechnologyForm({
    idForm,
    initialValues,
    onSubmitTechnology,
}: TechnologyFormProps) {

    const formik = useFormik<TechnologyFormData>({
        initialValues,
        enableReinitialize: true,
        validate: (values) => {
            const result = technologySchema.safeParse(values);
            if (result.success) return {};
            return mapZodErrors<TechnologyFormData>(result.error);
        },
        onSubmit: async (values) => {
            console.log(values);
            await onSubmitTechnology(values);
        },
    });

    return (
        <form
            id={idForm}
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-4"
        >
            <Input
                label="Nombre"
                name="name"
                placeholder="Nombre de la tecnología"
                value={formik.values.name ?? ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.name}
                touched={formik.touched.name}
            />

            <Input
                label="Nomenclatura"
                name="nomenclature"
                placeholder="Nomenclatura de la tecnología"
                value={formik.values.nomenclature ?? ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.nomenclature}
                touched={formik.touched.nomenclature}
            />
        </form>
    );
}