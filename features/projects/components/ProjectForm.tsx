"use client";

import { Input, Textarea } from "@/components";
import { useFormik } from "formik";
import { mapZodErrors } from "@/utils";
import { ProjectFormData } from "../project.types";
import { projectSchema } from "../schemas";
import { ICompanies } from "@/features/companies/companies.type";


interface ProjectFormProps {
  idForm: string;
  initialValues: ProjectFormData;
  companies: ICompanies[];
  onSubmitProject: (form: ProjectFormData) => void;
}

export default function ProjectForm({
  idForm,
  initialValues,
  companies,
  onSubmitProject,
}: ProjectFormProps) {
  const formik = useFormik<ProjectFormData>({
    initialValues: initialValues,
    enableReinitialize: true,
    validate: (values) => {
      const result = projectSchema.safeParse(values);
      if (result.success) return {};
      return mapZodErrors<ProjectFormData>(result.error);
    },
    onSubmit: async (values) => {
      console.log(values);
      await onSubmitProject(values);
    },
  });

  return (
    <form id={idForm} onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
      <Input
        label="Título"
        name="title"
        placeholder="Título del proyecto"
        value={formik.values.title ?? ""}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.errors.title}
        touched={formik.touched.title}
      />
      {/* Select para Compañías */}
      <label className="flex flex-col gap-1">
        Compañía
        <select
          name="companyId"
          value={formik.values.companyId ?? ""}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="border rounded p-2"
        >
          <option value="">Selecciona una compañía</option>
          {companies.map((company) => (
            <option key={company.id} value={company.id}>
              {company.title}
            </option>
          ))}
        </select>
        {formik.errors.companyId && formik.touched.companyId && (
          <span className="text-red-500 text-sm">{formik.errors.companyId}</span>
        )}
      </label>


      <Textarea
        label="Descripción"
        name="description"
        placeholder="Descripción"
        value={formik.values.description ?? ""}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.errors.description}
        touched={formik.touched.description}
        rows={3}
      />

      <Input
        label="Repo URL"
        name="repoUrl"
        placeholder="https://github.com/..."
        value={formik.values.repoUrl ?? ""}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.errors.repoUrl}
        touched={formik.touched.repoUrl}
      />

      <Input
        label="Live URL"
        name="liveUrl"
        placeholder="https://..."
        value={formik.values.liveUrl ?? ""}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.errors.liveUrl}
        touched={formik.touched.liveUrl}
      />


      {/* Checkbox */}
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="featured"
          checked={formik.values.featured}
          onChange={formik.handleChange}
        />
        Destacado
      </label>
    </form>
  );
}