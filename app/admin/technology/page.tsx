"use client";
import ContentPage from "@/components/admin/ContentPage";
import DataTable from "@/components/admin/DataTable";
import TitlePage from "@/components/admin/TitlePage";
import { FooterModal } from "@/components/FooterModal";
import Modal from "@/components/Modal";
import Image from "next/image";
import TechnologyForm from "@/features/technology/components/TechnologyForm";
import TechnologyLogoForm from "@/features/technology/components/TechnologyLogoForm";
import { useInsertTechnology, useQueryTechnology, useUpdatedTechnology, useUploadImgTechnology } from "@/features/technology/hooks";
import { ITechnology, TechnologyFormData } from "@/features/technology/technology.type";
import { ColDef, ICellRendererParams } from "ag-grid-community";
import { ImageUp, PencilLine, Plus } from "lucide-react";
import { useState } from "react";


const initialValues: TechnologyFormData = {
    name: "",
    nomenclature: "",
}

export default function TechnologyPage() {
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [openLogoModal, setOpenLogoModal] = useState<boolean>(false)
    const [currentTechnology, setCurrentTechnology] = useState<ITechnology | null>(null);
    const { technologyData, isLoading } = useQueryTechnology();
    const { handleInsertTechnology, isLoadingInsert } = useInsertTechnology({ setOpenModal });
    const { handleUpdatedTechnology, isLoadingUpdated } = useUpdatedTechnology({ setOpenModal });
    const { handleUploadImgTechnology, isLoadingUpload } = useUploadImgTechnology({ setOpenModal: setOpenLogoModal });

    const companyColumns: ColDef<ITechnology>[] = [
        {
            field: "name",
            headerName: "Tecnología",
            flex: 1,
            minWidth: 150
        },
        {
            field: "nomenclature",
            headerName: "Nomenclatura",
            width: 150
        },
        {
            field: "logoUrl",
            headerName: "Logo",
            width: 100,
            cellRenderer: (params: ICellRendererParams) => {
                const logoUrl = params.value;
                return logoUrl ? (
                    <div className="flex items-center justify-center w-full h-full">
                        <Image
                            src={logoUrl}
                            alt="Logo"
                            width={25}
                            height={25}
                            className="object-contain max-h-12"
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
            headerName: "Actions",
            width: 100,
            pinned: "right",
            cellRenderer: (params: ICellRendererParams) => {
                const technology: ITechnology = params.data;
                return (
                    <div className="flex w-full h-full items-center justify-center flex-wrap gap-2.5">
                        <button className="cursor-pointer" title={`Editar ${technology.name}`}
                            onClick={() => {
                                setCurrentTechnology(technology);
                                setOpenModal(true)
                            }}>
                            <PencilLine />
                        </button>
                        <button className="cursor-pointer" title={`Subir Logo`}
                            onClick={() => {
                                setCurrentTechnology(technology);
                                setOpenLogoModal(true)
                            }}>
                            <ImageUp />
                        </button>
                    </div>
                )
            }
        }
    ];

    const onSubmitTechnology = async (form: TechnologyFormData) => {
        if (currentTechnology) {
            await handleUpdatedTechnology({
                id: currentTechnology.id,
                data: form,
            });
        } else {
            await handleInsertTechnology(form);
        }
    }

    const onUploadComplete = async (file: File) => {
        if (currentTechnology) {

            await handleUploadImgTechnology(
                {
                    id: currentTechnology.id,
                    data: {
                        name: currentTechnology.name,
                        nomenclature: currentTechnology.nomenclature || "",
                        logoUrl: currentTechnology.logoUrl || "",
                    },
                }, file);
        }
    };


    return (
        <ContentPage >
            <TitlePage title="Mantenimiento de Tecnologías" />

            <DataTable rowData={technologyData} columnDefs={companyColumns} loading={isLoading} headerAction={
                <button className="flex gap-2 bg-blue-200 p-2 text-black cursor-pointer rounded-2xl" title="Agregar Tecnología" onClick={() => {
                    setCurrentTechnology(null);
                    setOpenModal(true)
                }}>
                    <Plus /> Nueva Tecnología
                </button>} />

            <Modal
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
                title="Nueva Tecnología"
                footer={
                    <FooterModal
                        form="technologyForm"
                        onClose={() => setOpenModal(false)}
                        loading={isLoadingInsert || isLoadingUpdated}
                    />
                }
            >
                <TechnologyForm idForm="technologyForm" initialValues={
                    currentTechnology
                        ? {
                            name: currentTechnology.name,
                            nomenclature: currentTechnology.nomenclature || "",
                        }
                        : initialValues
                }
                    onSubmitTechnology={onSubmitTechnology}
                />
            </Modal>

            {
                currentTechnology && (
                    <Modal
                        isOpen={openLogoModal}
                        onClose={() => setOpenLogoModal(false)}
                        title="Subir Logo"
                    >
                        <TechnologyLogoForm
                            currentTechnology={currentTechnology}
                            onClose={() => setOpenLogoModal(false)}
                            onUploadComplete={onUploadComplete}
                            loading={isLoadingUpload}
                        />
                    </Modal>
                )
            }
        </ContentPage>
    )
}