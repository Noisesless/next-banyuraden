"use client";

import dynamic from "next/dynamic";
import type { MapLibreMapProps } from "./MapLibreMap";

// Dynamic import with ssr: false for Next.js App Router
const DynamicMapLibre = dynamic(
    () => import("./MapLibreMap").then((mod) => mod.MapLibreMap),
    {
        ssr: false,
        loading: () => (
            <div className="w-full h-full flex items-center justify-center bg-slate-50 min-h-[500px]">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-sky-600 mb-3"></div>
                    <p className="text-slate-600 text-sm">Memuat Peta MapLibre Kalurahan Banyuraden...</p>
                </div>
            </div>
        ),
    }
);

// Drop-in compatible export for LeafletMap
export function LeafletMap(props: MapLibreMapProps) {
    return <DynamicMapLibre {...props} />;
}

export default LeafletMap;
