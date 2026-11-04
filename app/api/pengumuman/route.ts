import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import type { ApiResponse } from "@/lib/api-response";
import {
    createSuccessResponse,
    createErrorResponse,
    createValidationErrorResponse,
    createUnauthorizedResponse,
} from "@/lib/api-response";
import { auth } from "@/auth";
import { createApiRouteHandler } from "@/lib/api-helpers";
import { getSlemankabAgenda } from "@/lib/slemankab-news";

interface PengumumanItem {
    id: number;
    judul: string;
    konten: string;
    ringkasan?: string;
    prioritas: string;
    kategori: string;
    status: string;
    publishedAt: string | null;
    expiresAt: string | null;
    createdAt: string;
    updatedAt: string;
    penulis: string;
    lampiran: string[];
    views: number;
    slug?: string;
    featuredImage?: string;
}

export const { GET } = createApiRouteHandler(async (request: NextRequest) => {
    try {
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get("halaman") ?? "1", 10);
        const limit = parseInt(searchParams.get("limit") ?? "20", 10);
        const prioritas = searchParams.get("prioritas");
        const kategori = searchParams.get("kategori");
        const search = searchParams.get("search");

        // Fetch live Agenda & Pengumuman from banyuradensid.slemankab.go.id (Category ID 3)
        let liveAgendaItems: PengumumanItem[] = [];
        try {
            const agendaResult = await getSlemankabAgenda({
                perPage: 50,
                search: search || undefined,
            });

            liveAgendaItems = agendaResult.posts.map((post) => {
                const titleLower = post.title.toLowerCase();
                const isPenting =
                    titleLower.includes("resmi") ||
                    titleLower.includes("penting") ||
                    titleLower.includes("darurat");
                const isLowongan =
                    titleLower.includes("lowongan") ||
                    titleLower.includes("pamong") ||
                    titleLower.includes("seleksi") ||
                    titleLower.includes("dukuh");

                let itemCategory = "Agenda & Kegiatan";
                if (isLowongan) {
                    itemCategory = "Lowongan & Pamong";
                } else if (isPenting) {
                    itemCategory = "Pengumuman Resmi";
                }

                const itemPriority = isPenting ? "TINGGI" : isLowongan ? "PENTING" : "NORMAL";

                return {
                    id: post.id,
                    judul: post.title,
                    konten: post.content,
                    ringkasan: post.excerpt,
                    prioritas: itemPriority,
                    kategori: itemCategory,
                    status: "PUBLISHED",
                    publishedAt: post.date,
                    expiresAt: null,
                    createdAt: post.date,
                    updatedAt: post.modified,
                    penulis: post.author.name || "Pemerintah Kalurahan Banyuraden",
                    lampiran: [],
                    views: post.viewCount || 10,
                    slug: post.slug,
                    featuredImage: post.featuredImage || "/images/banyuraden-cover.jpg",
                };
            });
        } catch (e) {
            console.warn("Failed to fetch live Agenda, falling back to mock:", e);
        }

        let combined = liveAgendaItems;

        // Apply filters
        if (prioritas) {
            combined = combined.filter(
                (item) => item.prioritas.toLowerCase() === prioritas.toLowerCase()
            );
        }
        if (kategori && kategori !== "all") {
            const catLower = kategori.toLowerCase();
            combined = combined.filter((item) =>
                item.kategori.toLowerCase().includes(catLower)
            );
        }
        if (search) {
            const searchLower = search.toLowerCase();
            combined = combined.filter(
                (item) =>
                    item.judul.toLowerCase().includes(searchLower) ||
                    item.konten.toLowerCase().includes(searchLower) ||
                    item.kategori.toLowerCase().includes(searchLower)
            );
        }

        // Sort by date newest first
        combined.sort((a, b) => {
            const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
            const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
            return dateB - dateA;
        });

        const total = combined.length;
        const totalPages = Math.ceil(total / limit) || 1;
        const startIndex = (page - 1) * limit;
        const paginated = combined.slice(startIndex, startIndex + limit);

        const meta = { total, halaman: page, perHalaman: limit, totalHalaman: totalPages };
        return NextResponse.json(
            createSuccessResponse(paginated, "Daftar agenda & pengumuman berhasil dimuat", meta)
        );
    } catch (err) {
        console.error("Error in pengumuman GET:", err);
        return NextResponse.json(
            createErrorResponse("INTERNAL_SERVER_ERROR", "Gagal memuat pengumuman"),
            { status: 500 }
        );
    }
});

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse>> {
    try {
        const session = await auth();
        if (!session || (session.user as any)?.role !== "ADMIN") {
            return NextResponse.json(
                createUnauthorizedResponse("Akses ditolak: autentikasi admin diperlukan"),
                { status: 401 }
            );
        }

        const body = await request.json();

        const validationErrors: Record<string, string> = {};
        if (!body.judul) validationErrors.judul = "Judul wajib diisi";
        if (!body.konten) validationErrors.konten = "Konten wajib diisi";

        if (Object.keys(validationErrors).length > 0) {
            return NextResponse.json(createValidationErrorResponse(validationErrors), { status: 400 });
        }

        const newPengumuman: PengumumanItem = {
            id: Date.now(),
            judul: body.judul.trim(),
            konten: body.konten.trim(),
            prioritas: body.prioritas ?? "NORMAL",
            kategori: body.kategori ?? "Umum",
            status: body.status ?? "PUBLISHED",
            publishedAt: new Date().toISOString(),
            expiresAt: null,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            penulis: body.penulis ?? "Admin Kalurahan Banyuraden",
            lampiran: body.lampiran ?? [],
            views: 0,
        };

        return NextResponse.json(createSuccessResponse(newPengumuman, "Pengumuman berhasil dibuat"), {
            status: 201,
        });
    } catch {
        return NextResponse.json(
            createErrorResponse("INTERNAL_SERVER_ERROR", "Terjadi kesalahan saat membuat pengumuman"),
            { status: 500 }
        );
    }
}
