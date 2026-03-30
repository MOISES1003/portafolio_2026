"use client";

import { Input, Textarea } from "@/components";
import { useFormik } from "formik";
import { mapZodErrors } from "@/utils";
import { companySchema } from "../schemas";
import { CompanyFormData } from "../companies.type";

interface CompanyFormProps {
  idForm: string;
  initialValues: CompanyFormData;
  onSubmitCompany: (form: CompanyFormData) => void;
}

export default function CompanyForm({
  idForm,
  initialValues,
  onSubmitCompany,
}: CompanyFormProps) {

  const formik = useFormik<CompanyFormData>({
    initialValues,
    enableReinitialize: true,
    validate: (values) => {
      const result = companySchema.safeParse(values);
      if (result.success) return {};
      return mapZodErrors<CompanyFormData>(result.error);
    },
    onSubmit: async (values) => {
      console.log(values);
      await onSubmitCompany(values);
    },
  });

  return (
    <form
      id={idForm}
      onSubmit={formik.handleSubmit}
      className="flex flex-col gap-4"
    >
      <Input
        label="Título"
        name="title"
        placeholder="Nombre de la empresa"
        value={formik.values.title ?? ""}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.errors.title}
        touched={formik.touched.title}
      />

      <Textarea
        label="Descripción"
        name="description"
        placeholder="Descripción de la empresa"
        value={formik.values.description ?? ""}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.errors.description}
        touched={formik.touched.description}
        rows={3}
      />
    </form>
  );
}