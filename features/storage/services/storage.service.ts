import { STORAGE_FOLDER } from "@/utils";
import { StorageRepository } from "../repositories";

const storageRepository = new StorageRepository();

export async function uploadImage(logoFile: File):Promise<string> {
    const imgUrl = await storageRepository.uploadImage(logoFile, STORAGE_FOLDER);
    return imgUrl;
}