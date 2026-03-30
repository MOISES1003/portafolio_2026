import { useMutation } from "react-query";
import { deleteProject } from "../api";
import { showConfirm } from "@/utils/alerts";
import { alertMessages } from "@/utils/alertMessages";
import { IProject } from "../project.types";
import { useProjectStore } from "@/store/useProjectStore";
import { toast } from "sonner";

interface IInsertProjectResult {
    handleDeleteProject: (id: number) => void;
    isLoadingDelete: boolean;
    error: unknown;
}


export const useDeleteProject = (): IInsertProjectResult => {
    const { removeProject } = useProjectStore();
    const { msAll, msProjects } = alertMessages;

    const {
        mutate,
        isLoading,
        error,
    } = useMutation<IProject, unknown, { id: number }>(
        ({ id }) => deleteProject(id),
        {
            onSuccess: async (data) => {
                removeProject(data.id);
                toast.success(msProjects.successDelete);
            },
            onError: (err) => {
                toast.error(msProjects.errorDelete);
                console.error(msProjects.errorDelete, err);
            },
        }
    );

    const handleDeleteProject = async (id: number) => {
        const isConfirmed = await showConfirm({
            title: msAll.delete,
            text: msProjects.delete
        })

        if (!isConfirmed) return;

        mutate({ id });
    }

    return {
        handleDeleteProject,
        isLoadingDelete: isLoading,
        error,
    };
};
