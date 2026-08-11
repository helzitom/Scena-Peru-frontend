import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Sube un flyer al bucket publico "flyers" y devuelve su URL publica.
// El nombre de archivo incluye timestamp + random para evitar colisiones
// entre bandas subiendo flyers al mismo tiempo.
export async function subirFlyer(archivo: Blob): Promise<string> {
    const nombreArchivo = `${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`;

    const { error } = await supabase.storage.from("flyers").upload(nombreArchivo, archivo, {
        cacheControl: "3600",
        upsert: false,
        contentType: "image/jpeg"
    });

    if (error) throw new Error(`No se pudo subir el flyer: ${error.message}`);

    const { data } = supabase.storage.from("flyers").getPublicUrl(nombreArchivo);
    return data.publicUrl;
}