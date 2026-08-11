/**
 * Ajusta una imagen al tamaño de post de Instagram (4:5, 1080x1350) sin
 * recortar contenido. Modo "contain": la imagen completa se muestra dentro
 * del lienzo, y el espacio sobrante se rellena con un color solido - igual
 * a como Instagram maneja fotos que no vienen ya en 4:5. Esto evita perder
 * texto, fechas o logos que los flyers suelen poner cerca de los bordes.
 */
const ANCHO_DESTINO = 1080;
const ALTO_DESTINO = 1350; // 4:5, formato estandar de post en IG
const COLOR_RELLENO = "#F7F1E8"; // mismo tono "paper" del resto de la app

export async function recortarParaFlyer(archivo: File): Promise<Blob> {
    const bitmap = await createImageBitmap(archivo);

    const escala = Math.min(ANCHO_DESTINO / bitmap.width, ALTO_DESTINO / bitmap.height);
    const anchoFinal = bitmap.width * escala;
    const altoFinal = bitmap.height * escala;
    const offsetX = (ANCHO_DESTINO - anchoFinal) / 2;
    const offsetY = (ALTO_DESTINO - altoFinal) / 2;

    const canvas = document.createElement("canvas");
    canvas.width = ANCHO_DESTINO;
    canvas.height = ALTO_DESTINO;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("No se pudo procesar la imagen en este navegador");

    ctx.fillStyle = COLOR_RELLENO;
    ctx.fillRect(0, 0, ANCHO_DESTINO, ALTO_DESTINO);
    ctx.drawImage(bitmap, 0, 0, bitmap.width, bitmap.height, offsetX, offsetY, anchoFinal, altoFinal);

    return new Promise((resolve, reject) => {
        canvas.toBlob(
            (blob) => (blob ? resolve(blob) : reject(new Error("No se pudo generar la imagen"))),
            "image/jpeg",
            0.9
        );
    });
}