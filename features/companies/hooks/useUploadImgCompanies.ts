import { useMutation, useQueryClient } from "react-query";
import { showConfirm } from "@/utils/alerts";
import { alertMessages } from "@/utils/alertMessages";
import { Dispatch, SetStateAction } from "react";
import { ICompanies, UpdateCompanyPayload } from "../companies.type";
import { updateCompany } from "../api/api";
import { toast } from "sonner";
import { uploadImage } from "@/features/storage/services/storage.service";

interface IInsertProjectResult {
    handleUploadImgCompanies: (updatedCompany: UpdateCompanyPayload, file: File) => void;
    isLoadingUpload: boolean;
    error: unknown;
}
interface IInsertProjectResultProps {
    setOpenModal: Dispatch<SetStateAction<boolean>>;
}

export const useUploadImgCompanies = ({ setOpenModal }: IInsertProjectResultProps): IInsertProjectResult => {
    const client = useQueryClient();
    const { msAll, msCompanies } = alertMessages;

    const {
        mutate,
        isLoading,
        error,
    } = useMutation<ICompanies, unknown, UpdateCompanyPayload>(
        ({ id, data }) => updateCompany(id, data),
        {
            onSuccess: async (data) => {
                console.log("empresa actualizada:", data);

                // Refresca automáticamente la lista
                setOpenModal(false);
                toast.success(msCompanies.successUpdated)
                client.invalidateQueries("queryCompanies");

            },
            onError: (err) => {
                toast.error(msCompanies.errorUpdated)
                console.error("Error al actualizar la empresa:", err);
            },
        }
    );

    const handleUploadImgCompanies = async (updatedCompany: UpdateCompanyPayload, file: File) => {
        const isConfirmed = await showConfirm({
            title: msAll.update,
            text: msCompanies.updated
        })

        if (!isConfirmed) return;

        const imgUrl = await uploadImage(file);
        const payload = {
            ...updatedCompany,
            data: {
                ...updatedCompany.data,
                imgUrl,
            }
        }
        mutate(payload);
    }

    return {
        handleUploadImgCompanies,
        isLoadingUpload: isLoading,
        error,
    };
};
