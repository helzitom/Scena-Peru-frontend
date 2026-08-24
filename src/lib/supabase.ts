import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

export const supabase = createClient(
    supabaseUrl,
    supabasePublishableKey
);

// Sube un flyer al bucket público "flyers" y devuelve su URL pública.
export async function subirFlyer(archivo: Blob): Promise<string> {
    const nombreArchivo = `${Date.now()}-${Math.random()
        .toString(36)
        .slice(2)}.jpg`;

    const { error } = await supabase.storage
        .from("flyers")
        .upload(nombreArchivo, archivo, {
            cacheControl: "3600",
            upsert: false,
            contentType: "image/jpeg"
        });

    if (error) {
        throw new Error(`No se pudo subir el flyer: ${error.message}`);
    }

    const { data } = supabase.storage
        .from("flyers")
        .getPublicUrl(nombreArchivo);

    return data.publicUrl;
}