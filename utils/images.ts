export async function resizeImage(file: File, maxWidth = 200, maxHeight = 200): Promise<File> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = (event) => {
            img.src = event.target?.result as string;
        };

        img.onload = () => {
            const canvas = document.createElement("canvas");

            let width = img.width;
            let height = img.height;

            // Mantener proporción
            if (width > height) {
                if (width > maxWidth) {
                    height *= maxWidth / width;
                    width = maxWidth;
                }
            } else {
                if (height > maxHeight) {
                    width *= maxHeight / height;
                    height = maxHeight;
                }
            }

            canvas.width = width;
            canvas.height = height;

            const ctx = canvas.getContext("2d");
            if (!ctx) return reject("No se pudo crear el canvas");

            ctx.drawImage(img, 0, 0, width, height);

            canvas.toBlob(
                (blob) => {
                    if (!blob) return reject("Error al convertir imagen");

                    const resizedFile = new File([blob], file.name, {
                        type: file.type,
                    });

                    resolve(resizedFile);
                },
                file.type,
                0.8 // calidad (0.1 - 1)
            );
        };

        img.onerror = reject;
    });
}