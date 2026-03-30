import { useMutation } from "react-query";
import { updateProject } from "../api";
import { showConfirm } from "@/utils/alerts";
import { alertMessages } from "@/utils/alertMessages";
import { Dispatch, SetStateAction } from "react";
import { IProject, UpdateProjectPayload } from "../project.types";
import { useProjectStore } from "@/store";
import { toast } from "sonner";

interface IInsertProjectResult {
    handleUpdatedProject: (payload: UpdateProjectPayload) => void;
    isLoadingUpdated: boolean;
    error: unknown;
}
interface IInsertProjectResultProps {
    setOpenModal: Dispatch<SetStateAction<boolean>>;
}

export const useUpdatedProject = ({ setOpenModal }: IInsertProjectResultProps): IInsertProjectResult => {
    const { updateProjectInStore } = useProjectStore();
    const { msAll, msProjects } = alertMessages;

    const {
        mutate,
        isLoading,
        error,
    } = useMutation<IProject, unknown, UpdateProjectPayload>(
        ({ id, data }) => updateProject(id, data),
        {
            onSuccess: async (data) => {
                updateProjectInStore(data)
                setOpenModal(false);
                toast.success(msProjects.successUpdated);
            },
            onError: (err) => {
                toast.error(msProjects.errorUpdated);
                console.error(msProjects.errorUpdated, err);
            },
        }
    );

    const handleUpdatedProject = async (updatedProject: UpdateProjectPayload) => {
        const isConfirmed = await showConfirm({
            title: msAll.update,
            text: msProjects.updated
        })

        if (!isConfirmed) return;

        mutate(updatedProject);
    }

    return {
        handleUpdatedProject,
        isLoadingUpdated: isLoading,
        error,
    };
};
