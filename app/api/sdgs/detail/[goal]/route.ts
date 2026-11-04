import { NextRequest, NextResponse } from "next/server";
import { fetchSDGSDetail, createApiRouteHandler } from "@/lib/api-helpers";

export const { GET, OPTIONS } = createApiRouteHandler(async (request: NextRequest, context?: unknown) => {
    // Tangani params baik sebagai objek maupun Promise (Next.js 14 & 15 compatibility)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rawParams = (context as any)?.params;
    const resolvedParams = rawParams instanceof Promise ? await rawParams : rawParams;
    const ctxGoal = resolvedParams?.goal;

    // Fallback ambil segmen terakhir URL (misal: /api/sdgs/detail/1 -> "1")
    const segments = request.nextUrl.pathname.split("/").filter(Boolean);
    const lastSegment = segments[segments.length - 1];
    const pathGoal = /^\d+$/.test(lastSegment) ? lastSegment : "";
    const goalId = ctxGoal || pathGoal || "";

    const { searchParams } = new URL(request.url);
    const locationCode = searchParams.get("location_code") || "3404140004";

    // Validate goal ID
    if (!goalId || isNaN(parseInt(goalId)) || parseInt(goalId) < 1 || parseInt(goalId) > 18) {
        return NextResponse.json({ error: "Invalid goal ID. Must be between 1 and 18." }, { status: 400 });
    }

    // Validate location code
    if (!/^\d+$/.test(locationCode)) {
        return NextResponse.json({ error: "Parameter location_code tidak valid. Gunakan digit saja." }, { status: 400 });
    }

    let response;
    try {
        response = await fetchSDGSDetail(goalId, locationCode);
    } catch (err) {
        console.error('[sdgs] error:', err);
        return NextResponse.json({ error: 'Terjadi kesalahan internal. Coba lagi nanti.' }, { status: 500 });
    }

    if (!response.success) {
        return NextResponse.json(
            {
                error: "Failed to fetch SDGS detail data",
                message: response.message,
            },
            { status: response.status || 500 }
        );
    }

    return NextResponse.json(response.data);
});
