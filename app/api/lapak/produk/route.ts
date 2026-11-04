import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { createApiRouteHandler } from "@/lib/api-helpers";

type LapakProduct = {
    id: string;
    name: string;
    description: string;
    unit: string | null;
    price: number | null;
    discountPrice: number | null;
    photos: string[];
    category: string | null;
    sellerName: string | null;
    waUrl: string | null;
};

type LapakPagination = {
    total: number;
    count: number;
    per_page: number;
    current_page: number;
    total_pages: number;
};

type UpstreamResponse = {
    data: Array<{
        id: string;
        attributes: {
            nama: string;
            deskripsi?: string | null;
            satuan?: string | null;
            harga?: number | null;
            harga_diskon?: number | null;
            foto?: string[] | null;
            pesan_wa?: string | null;
            kategori?: { kategori?: string | null } | null;
            pelapak?: { penduduk?: { nama?: string | null } | null } | null;
        };
    }>;
    meta?: { pagination?: LapakPagination };
};

const BASE_URL = "https://banyuraden.sleman-desa.id";

function clampNumber(value: number, min: number, max: number) {
    return Math.min(max, Math.max(min, value));
}

export const { GET, OPTIONS } = createApiRouteHandler(async (request: NextRequest) => {
    const url = new URL(request.url);

    const limit = clampNumber(Number(url.searchParams.get("limit") || "12") || 12, 1, 60);
    const page = Math.max(1, Number(url.searchParams.get("page") || "1") || 1);

    const kategori =
        (url.searchParams.get("kategori") || url.searchParams.get("id_kategori") || "").trim() || undefined;
    const search = (url.searchParams.get("search") || url.searchParams.get("q") || "").trim() || undefined;

    const upstreamUrl = new URL(`${BASE_URL}/internal_api/lapak/produk`);
    upstreamUrl.searchParams.set("page[number]", String(page));
    upstreamUrl.searchParams.set("page[size]", String(limit));
    if (kategori) upstreamUrl.searchParams.set("filter[id_produk_kategori]", kategori);
    if (search) upstreamUrl.searchParams.set("filter[search]", search);

    const res = await fetch(upstreamUrl.toString(), {
        method: "GET",
        headers: {
            "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
            Accept: "application/json",
        },
        next: {
            revalidate: 60 * 10,
            tags: ["lapak-produk"],
        },
        signal: AbortSignal.timeout(30000),
    });

    if (!res.ok) {
        return NextResponse.json(
            { success: false, error: `Gagal mengambil data Lapak: HTTP ${res.status}` },
            { status: res.status }
        );
    }

    const json = (await res.json()) as UpstreamResponse;
    const products: LapakProduct[] = (json.data || []).map((item) => {
        const a = item.attributes;
        const photos = Array.isArray(a.foto) ? a.foto.filter(Boolean) : [];

        return {
            id: String(item.id),
            name: String(a.nama || "").trim(),
            description: String(a.deskripsi || "").trim(),
            unit: a.satuan ?? null,
            price: typeof a.harga === "number" ? a.harga : null,
            discountPrice: typeof a.harga_diskon === "number" ? a.harga_diskon : null,
            photos,
            category: a.kategori?.kategori ?? null,
            sellerName: a.pelapak?.penduduk?.nama ?? null,
            waUrl: a.pesan_wa ?? null,
        };
    });

    return NextResponse.json({
        success: true,
        data: products,
        meta: {
            pagination: json.meta?.pagination ?? null,
        },
    });
});

