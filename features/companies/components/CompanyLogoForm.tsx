"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { resizeImage } from "@/utils";
import { showInfo } from "@/utils/alerts";
import { ICompanies } from "../companies.type";

interface CompanyLogoFormProps {
    currentTechnology: ICompanies;
    onUploadComplete: (file: File) => void;
    onClose: () => void;
    loading?: boolean;  
}

export default function CompanyLogoForm({
    currentTechnology,
    onUploadComplete,
    onClose,
    loading = false,
}: CompanyLogoFormProps) {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(currentTechnology.imgUrl || null);

    const inputRef = useRef<HTMLInputElement>(null);

    const handleFileClick = () => {
        // Solo abrir selector si queremos permitir cambiar imagen
        inputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (!selectedFile) return;

        if (!selectedFile.type.startsWith("image/")) {
            showInfo("Solo se permiten archivos de imagen (png, jpg, svg, etc.)");
            return;
        }

        setFile(selectedFile);
        setPreview(URL.createObjectURL(selectedFile));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) return showInfo("Seleccione un archivo primero");

        try {
            const resizedFile = await resizeImage(file, 200, 200);
            onUploadComplete(resizedFile);
        } catch (error) {
            console.error("Error al subir la imagen:", error);
            showInfo("No se pudo subir la imagen");
        } 
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center gap-4 p-6 bg-white rounded-2xl shadow-md w-full max-w-sm mx-auto"
        >
            <label className="font-semibold text-gray-700 mb-2">Logo / Imagen</label>

            <div
                onClick={handleFileClick}
                className="cursor-pointer w-full flex flex-col items-center p-4 border-2 border-dashed rounded-lg hover:border-blue-400 transition-colors"
            >
                {preview ? (
                    <div className="relative w-32 h-32">
                        <Image
                            src={preview}
                            alt="Vista previa"
                            fill
                            className="object-contain"
                        />
                    </div>
                ) : (
                    <span className="text-gray-500">Haz clic aquí o arrastra una imagen</span>
                )}
            </div>

            <input
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={handleFileChange}
                className="hidden"
            />

            <div className="flex gap-3 mt-4 w-full justify-center">
                <button
                    type="submit"
                    disabled={loading}
                    className={`flex-1 bg-green-500 text-white px-4 py-2 rounded-lg 
                                hover:bg-green-600 transition-colors ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
                >
                    {loading ? "Subiendo..." : "Subir Imagen"}
                </button>
                <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                >
                    Cancelar
                </button>
            </div>
        </form>
    );
}