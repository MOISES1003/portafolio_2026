"use client";
import ContentPage from "@/components/admin/ContentPage";
import DataTable from "@/components/admin/DataTable";
import TitlePage from "@/components/admin/TitlePage";
import { FooterModal } from "@/components/FooterModal";
import Modal from "@/components/Modal";
import { CompanyFormData, ICompanies } from "@/features/companies/companies.type";
import CompanyForm from "@/features/companies/components/CompanyForm";
import { useInsertCompanies, useUpdatedProject, useUploadImgCompanies } from "@/features/companies/hooks";
import { useCompaniesStore } from "@/store";
import { ColDef, ICellRendererParams } from "ag-grid-community";
import { ImageUp, PencilLine, Plus } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import CompanyLogoForm from "@/features/companies/components/CompanyLogoForm";
const initialValues: CompanyFormData = {
  title: "",
  description: "",
}

export default function CompaniesPage() {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [openLogoModal, setOpenLogoModal] = useState<boolean>(false)
  const [currentCompany, setCurrentCompany] = useState<ICompanies | null>(null);
  const { companies, isLoading } = useCompaniesStore();
  const { handleInsertCompany, isLoadingInsert } = useInsertCompanies({ setOpenModal });
  const { handleUpdatedCompany, isLoadingUpdated } = useUpdatedProject({ setOpenModal });
  const { handleUploadImgCompanies, isLoadingUpload } = useUploadImgCompanies({ setOpenModal: setOpenLogoModal });

  const companyColumns: ColDef<ICompanies>[] = [
    {
      field: "title",
      headerName: "Empresa",
      flex: 1,
      minWidth: 150
    },
    {
      field: "imgUrl",
      headerName: "Logo",
      width: 100,
      cellRenderer: (params: ICellRendererParams) => {
        const logoUrl = params.value;
        return logoUrl ? (
          <div className="flex items-center justify-center w-full h-full">
            <Image
              src={logoUrl}
              alt="Logo"
              width={50}
              height={50}
              className="object-contain max-h-14"
            />
          </div>
        ) : (
          <div className="flex items-center justify-center w-full h-full text-gray-400">
            Sin Logo
          </div>
        );
      }
    },
    {
      field: "description",
      headerName: "descripción",
      flex: 1,
      minWidth: 150
    },
    {
      headerName: "Actions",
      width: 100,
      pinned: "right",
      cellRenderer: (params: ICellRendererParams) => {
        const company: ICompanies = params.data;
        return (
          <div className="flex h-full w-full items-center justify-center flex-wrap gap-2.5">
            <button className="cursor-pointer" title={`Editar ${company.title}`}
              onClick={() => {
                setCurrentCompany(company);
                setOpenModal(true)
              }}>
              <PencilLine />
            </button>
            <button className="cursor-pointer" title={`Subir Logo`}
              onClick={() => {
                setCurrentCompany(company);
                setOpenLogoModal(true)
              }}>
              <ImageUp />
            </button>
          </div>
        )
      }
    }
  ];

  const onSubmitCompany = async (form: CompanyFormData) => {
    if (currentCompany) {
      await handleUpdatedCompany({
        id: currentCompany.id,
        data: form,
      });
    } else {
      await handleInsertCompany(form);
    }

  }


  const onUploadComplete = async (file: File) => {
    if (currentCompany) {

      await handleUploadImgCompanies(
        {
          id: currentCompany.id,
          data: {
            title: currentCompany.title,
            description: currentCompany.description,
            imgUrl: currentCompany?.imgUrl || "",
          },
        }, file);
    }
  };


  return <ContentPage >
    <TitlePage title="Mantenimiento de Empresas" />


    <DataTable rowData={companies} columnDefs={companyColumns} loading={isLoading} headerAction={
      <button className="flex gap-2 bg-blue-200 p-2 text-black cursor-pointer rounded-2xl" title="Agregar Empresa" onClick={() => {
        setCurrentCompany(null);
        setOpenModal(true)
      }}>
        <Plus /> Nueva Empresa
      </button>} />

    <Modal
      isOpen={openModal}
      onClose={() => setOpenModal(false)}
      title="Nueva Empresa"
      footer={
        <FooterModal
          form="companyForm"
          onClose={() => setOpenModal(false)}
          loading={isLoadingInsert || isLoadingUpdated}
        />
      }
    >
      <CompanyForm idForm="companyForm" initialValues={
        currentCompany
          ? {
            title: currentCompany.title,
            description: currentCompany.description,
          }
          : initialValues
      }
        onSubmitCompany={onSubmitCompany}
      />
    </Modal>

    {
      currentCompany && (
        <Modal
          isOpen={openLogoModal}
          onClose={() => setOpenLogoModal(false)}
          title="Subir Logo"
        >
          <CompanyLogoForm
            currentTechnology={currentCompany}
            onClose={() => setOpenLogoModal(false)}
            onUploadComplete={onUploadComplete}
            loading={isLoadingUpload}
          />
        </Modal>
      )
    }
  </ContentPage>;
}