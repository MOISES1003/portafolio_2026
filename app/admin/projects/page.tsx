"use client";
import ContentPage from "@/components/admin/ContentPage";
import DataTable from "@/components/admin/DataTable";
import TitlePage from "@/components/admin/TitlePage";
import { FooterModal } from "@/components/FooterModal";
import Modal from "@/components/Modal";
import ProjectForm from "@/features/projects/components/ProjectForm";
import { useDeleteProject, useInsertProject, useUpdatedProject } from "@/features/projects/hooks";
import { IProject, ProjectFormData } from "@/features/projects/project.types";
import { useCompaniesStore, useProjectStore } from "@/store";
import { ColDef, ICellRendererParams } from "ag-grid-community";
import { PencilLine, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

const initialValues: ProjectFormData = {
  title: "",
  description: "",
  repoUrl: "",
  liveUrl: "",
  featured: false,
  companyId: 0
}

export default function ProjectsPage() {
  const [currentProject, setCurrentProject] = useState<IProject | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false)

  const { projects, isLoading } = useProjectStore();
  const { companies } = useCompaniesStore();

  const { handleInsertProject, isLoadingInsert } = useInsertProject({
    setOpenModal
  });
  const { handleUpdatedProject, isLoadingUpdated } = useUpdatedProject({
    setOpenModal
  });
  const { handleDeleteProject } = useDeleteProject()

  const projectColumns: ColDef<IProject>[] = [
    {
      field: "title",
      headerName: "Proyecto",
      flex: 1,
      minWidth: 150
    },
    {
      field: "description",
      headerName: "descripción",
      flex: 1,
      minWidth: 150
    },
    {
      field: "repoUrl",
      headerName: "repoUrl",
      flex: 1,
      minWidth: 150
    },
    {
      field: "liveUrl",
      headerName: "liveUrl",
      flex: 1,
      minWidth: 150
    },
    {
      headerName: "Actions",
      width: 100,
      pinned: "right",
      cellRenderer: (params: ICellRendererParams) => {
        const project: IProject = params.data;
        return (
          <div className="flex items-center justify-center flex-wrap gap-2.5">
            <button className="cursor-pointer" title={`Editar ${project.title}`}
              onClick={() => {
                setCurrentProject(project);
                setOpenModal(true)
              }}>
              <PencilLine />
            </button>
            <button className="cursor-pointer" title={`Eliminar ${project.title}`}
              onClick={() => {
                handleDeleteProject(project.id)
              }}>
              <Trash2 />
            </button>
          </div>
        )
      }
    }
  ];

  const onSubmitProject = async (form: ProjectFormData) => {
    const payload: ProjectFormData = {
      ...form,
      companyId: Number(form.companyId)
    }
    if (currentProject) {
      const response = await handleUpdatedProject({
        id: currentProject.id,
        data: payload,
      });
      console.log("respuesta", response)
    } else {
      const response = await handleInsertProject(payload);
      console.log("respuesta", response)
    }

  }

  return <ContentPage >
    <TitlePage title="Mantenimiento de Proyectos" />

    <DataTable rowData={projects} columnDefs={projectColumns} loading={isLoading} headerAction={
      <button className="flex gap-2 bg-blue-200 p-2 text-black cursor-pointer rounded-2xl" title="Agregar Proyecto" onClick={() => {
        setCurrentProject(null);
        setOpenModal(true)
      }}>
        <Plus /> Nuevo Proyecto
      </button>} />

    <Modal
      isOpen={openModal}
      onClose={() => setOpenModal(false)}
      title="Nuevo Proyecto"
      footer={
        <FooterModal
          form="projectForm"
          onClose={() => setOpenModal(false)}
          loading={isLoadingInsert || isLoadingUpdated}
        />
      }
    >
      <ProjectForm idForm="projectForm"
        companies={companies}
        initialValues={
          currentProject
            ? {
              title: currentProject.title,
              description: currentProject.description,
              repoUrl: currentProject.repoUrl,
              liveUrl: currentProject.liveUrl,
              featured: currentProject.featured,
              companyId: currentProject.companyId
            }
            : initialValues
        }
        onSubmitProject={onSubmitProject}
      />
    </Modal>

  </ContentPage >;
}