import Swal, { SweetAlertIcon } from "sweetalert2";
import { alertMessages } from "./alertMessages";

const baseAlert = (
    title: string,
    text: string,
    icon: SweetAlertIcon
) => {
    return Swal.fire({
        title,
        text,
        icon,
        confirmButtonColor: "#2563eb",
        background: "#18181b",
        color: "#fff",
    });
};

/* ================================
   SUCCESS
================================ */
export const showSuccess = (title = "Éxito", text = "") => {
    return baseAlert(title, text, "success");
};

/* ================================
   ERROR
================================ */
export const showError = (title = "Error", text = "") => {
    return baseAlert(title, text, "error");
};

/* ================================
   INFO
================================ */
export const showInfo = (title = "Información", text = "") => {
    return baseAlert(title, text, "info");
};

/* ================================
   LOADING
================================ */
export const showLoading = (title = "Procesando...") => {
    Swal.fire({
        title,
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        didOpen: () => {
            Swal.showLoading();
        },
    });
};


export const closeAlert = () => {
    Swal.close();
};


/* ================================
   CONFIRM
================================ */
export const showConfirm = async (
    {
        title = "¿Estás seguro?",
        text = "No podrás revertir esto" }:
        {
            title: string,
            text: string
        }
): Promise<boolean> => {
    const {msAll} = alertMessages;
    const result = await Swal.fire({
        title,
        text,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#2563eb",
        cancelButtonColor: "#dc2626",
        confirmButtonText: msAll.btnConfirm,
        cancelButtonText: msAll.btnCancel,
        reverseButtons:true
    });

    return result.isConfirmed;
};