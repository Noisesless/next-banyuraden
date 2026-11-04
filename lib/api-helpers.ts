import { NextRequest, NextResponse } from "next/server";
import {
    opensidApi,
    externalApi,
    localApi,
    sdgsApi,
    createApiNextResponse,
    createCorsNextResponse,
    withErrorHandling,
    CORS_HEADERS,
} from "./api-service";

/**
 * Common query parameter extraction
 */
export function extractQueryParams(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    return {
        page: parseInt(searchParams.get("halaman") || searchParams.get("page") || "1"),
        limit: parseInt(searchParams.get("limit") || "10"),
        search: searchParams.get("search") || undefined,
        category: searchParams.get("kategori") || searchParams.get("category") || undefined,
        year: searchParams.get("year") || undefined,
        locationCode: searchParams.get("location_code") || undefined,
        allParams: Object.fromEntries(searchParams.entries()),
    };
}

/**
 * OpenSID statistik API helper
 */
export async function fetchOpenSIDStatistik(endpoint: string, config?: { cacheTags?: string[]; fallbackData?: unknown }) {
    const { fetchWithFallback } = await import("./api-service");
    const response = await fetchWithFallback(endpoint, {
        config: {
            cache: {
                revalidate: 3600,
                tags: config?.cacheTags,
            },
        }
    });


    // Return fallback data if request fails
    if (!response.success && config?.fallbackData) {
        console.warn(`OpenSID API failed for ${endpoint}, using fallback data`);
        return {
            ...response,
            success: true,
            data: config.fallbackData,
        };
    }

    return response;
}

/**
 * Unwrap OpenSID API response - extracts data array from response
 * Returns empty array on failure
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function unwrapOpenSIDResponse(response: { success: boolean; data?: unknown }): any[] {
    if (!response.success || !response.data) return [];
    // Handle JSON:API format { data: [...], meta: {...}, links: {...} }
    const raw = response.data as { data?: unknown[] };
    return raw.data ?? [];
}

/**
 * OpenSID statistik by ID helper (for statistik/{id} endpoints)
 */
export async function fetchOpenSIDStatistikById(
    statistikId: string | number,
    dataType: string,
    config?: { fallbackData?: unknown }
) {
    const endpoint = `/internal_api/statistik/${statistikId}`;
    return fetchOpenSIDStatistik(endpoint, {
        cacheTags: [`opensid-data-${dataType}`],
        fallbackData: config?.fallbackData || [],
    });
}

/**
 * OpenSID arsip/berita API helper
 */
export async function fetchOpenSIDArsip(page?: number) {
    const { fetchWithFallback } = await import("./api-service");
    const endpoint = page ? `/internal_api/arsip?page[number]=${page}` : "/internal_api/arsip";
    return fetchWithFallback(endpoint, {
        config: {
            cache: {
                revalidate: 60, // 60 seconds
                tags: ["opensid-data-proxy"],
            },
        }
    });
}


/**
 * SDGS API helper with location code
 */
export async function fetchSDGSData(locationCode = "3404140004") {
    try {
        const { fetchWithFallback } = await import("./api-service");
        const openSidRes = await fetchWithFallback("/internal_api/sdgs", {
            config: {
                cache: {
                    revalidate: 60 * 60 * 24 * 7, // 7 days
                    tags: ["sdgs-data"],
                },
            },
        });

        if (openSidRes.success && openSidRes.data) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const raw = openSidRes.data as any;
            const attr = raw?.data?.[0]?.attributes;
            if (attr && Array.isArray(attr.data) && attr.data.length > 0) {
                return {
                    success: true,
                    status: 200,
                    data: {
                        average: attr.average || "0",
                        data: attr.data,
                        total_desa: attr.total_desa || 0,
                    },
                };
            }
        }
    } catch (e) {
        console.warn("[sdgs] OpenSID fetch failed, falling back to Kemendesa:", e);
    }

    return sdgsApi.get(`/sdgs/searching/score-sdgs?location_code=${locationCode}`, {
        cache: {
            revalidate: 60 * 60 * 24 * 30, // 30 days
            tags: ["sdgs-data"],
        },
    });
}

/**
 * SDGS detail API helper with goal and location code
 * Jika endpoint Kemendesa mengembalikan data kosong atau gagal,
 * otomatis fallback ke metadata resmi 18 kriteria SDGs Desa (Permendesa No. 21/2020).
 */
export async function fetchSDGSDetail(goalId: string, locationCode = "3404140004") {
    const numGoal = parseInt(goalId);

    // Ambil skor riil goal saat ini dari summary data (OpenSID / Kemendesa)
    let currentScore = 0;
    try {
        const summary = await fetchSDGSData(locationCode);
        if (summary.success && summary.data && Array.isArray(summary.data.data)) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const targetGoal = summary.data.data.find((g: any) => g.goals === numGoal);
            if (targetGoal && typeof targetGoal.score === "number") {
                currentScore = targetGoal.score;
            }
        }
    } catch {
        // Abaikan jika summary gagal, gunakan default 0
    }

    try {
        const response = await sdgsApi.get(`/sdgs/searching/score-sdgs-detail?goal=${goalId}&location_code=${locationCode}`, {
            cache: {
                revalidate: 60 * 60 * 24 * 30, // 30 days
                tags: ["sdgs-data-detail"],
            },
        });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data = response.data as any;
        if (response.success && data && Array.isArray(data.recom) && data.recom.length > 0) {
            return response;
        }
    } catch {
        // Kemendesa score-sdgs-detail down/empty, fallback ke metadata resmi
    }

    // Fallback resmi Permendesa No. 21/2020
    const { buildGoalDetailResponse } = await import("./sdgs-data");
    return {
        success: true,
        status: 200,
        data: buildGoalDetailResponse(numGoal, currentScore),
    };
}

/**
 * IDM API helper with year parameter
 */
export async function fetchIDMData(year = "2024") {
    const { fetchWithFallback } = await import("./api-service");
    return fetchWithFallback(`/internal_api/idm/${year}`, {
        config: {
            cache: {
                revalidate: 60 * 60 * 24 * 30, // 30 days
                tags: ["idm-data"],
            },
        }
    });
}

/**
 * Holidays API helper
 */
export async function fetchHolidays(limit = 100) {
    const response = await externalApi.get("https://cdn.silirdev.com/widgets/events.json", {
        cache: {
            revalidate: 60 * 60 * 24 * 30, // 30 days
            tags: ["opensid-data-hari-libur"],
        },
    });

    if (!response.success || !response.data) {
        return response;
    }

    // Filter and sort holidays
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcomingHolidays = (response.data as { tanggal: string }[])
        .filter((holiday: { tanggal: string }) => {
            const holidayDate = new Date(holiday.tanggal);
            holidayDate.setHours(0, 0, 0, 0);
            return holidayDate >= today;
        })
        .sort((a: { tanggal: string }, b: { tanggal: string }) => new Date(a.tanggal).getTime() - new Date(b.tanggal).getTime())
        .slice(0, limit);

    return {
        ...response,
        data: upcomingHolidays,
    };
}

/**
 * Local API helper for internal calls
 */
export async function fetchLocalAPI(endpoint: string, config?: { cacheTags?: string[] }) {
    return localApi.get(endpoint, {
        cache: {
            revalidate: 3600,
            tags: config?.cacheTags,
        },
    });
}

/**
 * OpenSID APBDES (keuangan) API helper
 */
export async function fetchOpenSIDKeuangan(tahun: string) {
    const { fetchWithFallback } = await import("./api-service");
    return fetchWithFallback(`/internal_api/apbdes?tahun=${tahun}`, {
        config: {
            cache: {
                revalidate: 3600,
                tags: ["opensid-data-keuangan"],
            },
        }
    });
}

/**
 * OpenSID government API helper
 */
export async function fetchOpenSIDPemerintah() {
    const { fetchWithFallback } = await import("./api-service");
    return fetchWithFallback("/internal_api/pemerintah", {
        config: {
            cache: {
                revalidate: 3600,
                tags: ["opensid-data-pemerintah"],
            },
        }
    });
}

/**
 * OpenSID pembangunan API helper
 */
export async function fetchOpenSIDPembangunan() {
    const { fetchWithFallback } = await import("./api-service");
    return fetchWithFallback("/internal_api/pembangunan", {
        config: {
            cache: {
                revalidate: 3600,
                tags: ["opensid-data-pembangunan"],
            },
        }
    });
}

/**
 * OpenSID peta API helper
 */
export async function fetchOpenSIDPeta() {
    const { fetchWithFallback } = await import("./api-service");
    return fetchWithFallback("/internal_api/peta", {
        config: {
            cache: {
                revalidate: 3600,
                tags: ["opensid-data-peta"],
            },
        }
    });
}

/**
 * OpenSID PPID API helper
 */
export async function fetchOpenSIDPPID() {
    const { fetchWithFallback } = await import("./api-service");
    return fetchWithFallback("/internal_api/informasi-publik", {
        config: {
            cache: {
                revalidate: 3600,
                tags: ["opensid-data-ppid"],
            },
        }
    });
}

/**
 * OpenSID wilayah API helper
 */
export async function fetchOpenSIDWilayah() {
    const { fetchWithFallback } = await import("./api-service");
    return fetchWithFallback("/internal_api/wilayah/administratif", {
        config: {
            cache: {
                revalidate: 3600,
                tags: ["opensid-data-wilayah"],
            },
        }
    });
}



/**
 * Standard API route handler with CORS support
 */
export function createApiRouteHandler(
    handler: (request: NextRequest, context?: unknown) => Promise<NextResponse>,
    options: { enableCORS?: boolean } = {}
) {
    const { enableCORS = true } = options;

    return {
        async GET(request: NextRequest, context: unknown) {
            return withErrorHandling(async () => {
                const response = await handler(request, context);
                if (enableCORS) {
                    try {
                        response.headers.set("Access-Control-Allow-Origin", CORS_HEADERS["Access-Control-Allow-Origin"]);
                        response.headers.set("Access-Control-Allow-Methods", CORS_HEADERS["Access-Control-Allow-Methods"]);
                        response.headers.set("Access-Control-Allow-Headers", CORS_HEADERS["Access-Control-Allow-Headers"]);
                    } catch {}
                }
                return response;
            });
        },

        async POST(request: NextRequest, context: unknown) {
            return withErrorHandling(async () => {
                const response = await handler(request, context);
                if (enableCORS) {
                    try {
                        response.headers.set("Access-Control-Allow-Origin", CORS_HEADERS["Access-Control-Allow-Origin"]);
                        response.headers.set("Access-Control-Allow-Methods", CORS_HEADERS["Access-Control-Allow-Methods"]);
                        response.headers.set("Access-Control-Allow-Headers", CORS_HEADERS["Access-Control-Allow-Headers"]);
                    } catch {}
                }
                return response;
            });
        },

        async PUT(request: NextRequest, context: unknown) {
            return withErrorHandling(async () => {
                const response = await handler(request, context);
                if (enableCORS) {
                    try {
                        response.headers.set("Access-Control-Allow-Origin", CORS_HEADERS["Access-Control-Allow-Origin"]);
                        response.headers.set("Access-Control-Allow-Methods", CORS_HEADERS["Access-Control-Allow-Methods"]);
                        response.headers.set("Access-Control-Allow-Headers", CORS_HEADERS["Access-Control-Allow-Headers"]);
                    } catch {}
                }
                return response;
            });
        },

        async DELETE(request: NextRequest, context: unknown) {
            return withErrorHandling(async () => {
                const response = await handler(request, context);
                if (enableCORS) {
                    try {
                        response.headers.set("Access-Control-Allow-Origin", CORS_HEADERS["Access-Control-Allow-Origin"]);
                        response.headers.set("Access-Control-Allow-Methods", CORS_HEADERS["Access-Control-Allow-Methods"]);
                        response.headers.set("Access-Control-Allow-Headers", CORS_HEADERS["Access-Control-Allow-Headers"]);
                    } catch {}
                }
                return response;
            });
        },

        ...(enableCORS && {
            async OPTIONS() {
                return createCorsNextResponse();
            },
        }),
    };
}

/**
 * Mock data helper for build-time failures
 */
export function createMockDataFallback<T>(mockData: T, errorMessage = "Service unavailable") {
    return {
        success: true,
        data: mockData,
        status: "partial",
        message: errorMessage,
        timestamp: new Date().toISOString(),
    } as const;
}

/**
 * Pagination helper for array data
 */
export function paginateArray<T>(
    data: T[],
    page: number,
    limit: number
): { items: T[]; total: number; totalPages: number; hasMore: boolean } {
    const total = data.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const items = data.slice(startIndex, endIndex);
    const hasMore = page < totalPages;

    return {
        items,
        total,
        totalPages,
        hasMore,
    };
}

/**
 * Search filter helper for array data
 */
export function filterBySearch<T>(data: T[], searchFields: (keyof T)[], searchTerm: string): T[] {
    if (!searchTerm) return data;

    const lowerSearchTerm = searchTerm.toLowerCase();
    return data.filter((item) =>
        searchFields.some((field) => {
            const value = item[field];
            return value && typeof value === "string" && value.toLowerCase().includes(lowerSearchTerm);
        })
    );
}

/**
 * OpenSID Aparatur (perangkat desa) API helper
 */
export async function fetchOpenSIDAparatur() {
    const { fetchWithFallback } = await import("./api-service");
    return fetchWithFallback("/internal_api/aparatur", {
        config: {
            cache: {
                revalidate: 3600,
                tags: ["opensid-data-aparatur"],
            },
        }
    });
}

/**
 * OpenSID Fasilitas API helper
 */
export async function fetchOpenSIDFasilitas() {
    const { fetchWithFallback } = await import("./api-service");
    return fetchWithFallback("/internal_api/fasilitas", {
        config: {
            cache: {
                revalidate: 3600,
                tags: ["opensid-data-fasilitas"],
            },
        }
    });
}

/**
 * OpenSID UMKM API helper
 */
export async function fetchOpenSIDUMKM() {
    const { fetchWithFallback } = await import("./api-service");
    return fetchWithFallback("/internal_api/umkm", {
        config: {
            cache: {
                revalidate: 3600,
                tags: ["opensid-data-umkm"],
            },
        }
    });
}

/**
 * OpenSID BUMKal API helper
 */
export async function fetchOpenSIDBumkal() {
    const { fetchWithFallback } = await import("./api-service");
    return fetchWithFallback("/internal_api/bumkal", {
        config: {
            cache: {
                revalidate: 3600,
                tags: ["opensid-data-bumkal"],
            },
        }
    });
}

/**
 * OpenSID Pertanahan API helper
 */
export async function fetchOpenSIDPertanahan() {
    const { fetchWithFallback } = await import("./api-service");
    return fetchWithFallback("/internal_api/pertanahan", {
        config: {
            cache: {
                revalidate: 3600,
                tags: ["opensid-data-pertanahan"],
            },
        }
    });
}

/**
 * OpenSID Inovasi API helper
 */
export async function fetchOpenSIDIInovasi() {
    const { fetchWithFallback } = await import("./api-service");
    return fetchWithFallback("/internal_api/inovasi", {
        config: {
            cache: {
                revalidate: 3600,
                tags: ["opensid-data-inovasi"],
            },
        }
    });
}

/**
 * OpenSID Tradisi Budaya API helper
 */
export async function fetchOpenSIDTradisi() {
    const { fetchWithFallback } = await import("./api-service");
    return fetchWithFallback("/internal_api/tradisi", {
        config: {
            cache: {
                revalidate: 3600,
                tags: ["opensid-data-tradisi"],
            },
        }
    });
}

/**
 * OpenSID Wisata API helper
 */
export async function fetchOpenSIDWisata() {
    const { fetchWithFallback } = await import("./api-service");
    return fetchWithFallback("/internal_api/wisata", {
        config: {
            cache: {
                revalidate: 3600,
                tags: ["opensid-data-wisata"],
            },
        }
    });
}

/**
 * OpenSID Produk Hukum API helper
 */
export async function fetchOpenSIDProdukHukum() {
    const { fetchWithFallback } = await import("./api-service");
    return fetchWithFallback("/internal_api/produk_hukum", {
        config: {
            cache: {
                revalidate: 3600,
                tags: ["opensid-data-produk-hukum"],
            },
        }
    });
}

/**
 * OpenSID Lurah (sejarah lurah) API helper
 */
export async function fetchOpenSIDISejarahLurah() {
    const { fetchWithFallback } = await import("./api-service");
    return fetchWithFallback("/internal_api/sejarah_lurah", {
        config: {
            cache: {
                revalidate: 3600,
                tags: ["opensid-data-sejarah-lurah"],
            },
        }
    });
}

/**
 * OpenSID Kelompok Tani API helper
 */
export async function fetchOpenSIDKelompokTani() {
    const { fetchWithFallback } = await import("./api-service");
    return fetchWithFallback("/internal_api/kelompok_tani", {
        config: {
            cache: {
                revalidate: 3600,
                tags: ["opensid-data-kelompok-tani"],
            },
        }
    });
}
