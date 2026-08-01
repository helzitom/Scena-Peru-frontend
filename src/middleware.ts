import { NextRequest, NextResponse } from "next/server";

const RUTAS_PROTEGIDAS = ["/tocadas", "/recuerdos"];

export function middleware(request: NextRequest) {
    const sesion = request.cookies.get("escena_session");
    const esProtegida = RUTAS_PROTEGIDAS.some((ruta) =>
        request.nextUrl.pathname.startsWith(ruta)
    );

    if (esProtegida && !sesion) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("redirect", request.nextUrl.pathname);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/tocadas/:path*", "/recuerdos/:path*"]
};