import { supabase } from "@/lib/supabase/browser";
import { normalizeError } from "@/utils/erros";

export class StorageRepository {
    async uploadImage(file: File, folder: string): Promise<string> {
        try {
            const fileName = `${Date.now()}_${file.name}`;

            // Subir archivo
            const { error } = await supabase.storage
                .from(folder)
                .upload(fileName, file, { cacheControl: "3600", upsert: false });

            if (error?.statusCode === '42501') {
                throw new Error("No tienes permisos para subir esta imagen");
            }
            
            if (error) throw error; // correcto


            // Obtener URL pública
            const { data: urlData } = supabase.storage.from(folder).getPublicUrl(fileName);

            // data siempre existe y tiene { publicUrl: string }
            if (!urlData?.publicUrl) throw new Error("No se pudo obtener la URL pública");

            return urlData.publicUrl;
        } catch (error) {
            throw normalizeError(error);
        }

    }
}