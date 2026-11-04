"use client";

import * as React from "react";
import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Layers, ChevronDown, Check, Shield } from "lucide-react";

export type MapStyleKey = "liberty" | "positron" | "bright" | "dark" | "satelit";

export interface IoTSensor {
    id: string;
    name: string;
    type?: string;
    lat: number;
    lng: number;
    status: "active" | "inactive" | "warning" | "critical";
    value?: number;
    unit?: string;
    lastUpdate?: string;
    location?: string;
    battery?: number;
    description?: string;
}

export interface MapLibreMapProps {
    sensors?: IoTSensor[];
    geoJsonData?: unknown;
    center?: [number, number]; // [lat, lng] or [lng, lat]
    zoom?: number;
    onSensorClick?: (sensor: IoTSensor) => void;
    className?: string;
}

const STYLES: Record<MapStyleKey, string | maplibregl.StyleSpecification> = {
    liberty: "https://tiles.openfreemap.org/styles/liberty",
    positron: "https://tiles.openfreemap.org/styles/positron",
    bright: "https://tiles.openfreemap.org/styles/bright",
    dark: "https://tiles.openfreemap.org/styles/dark",
    satelit: {
        version: 8,
        glyphs: "https://tiles.openfreemap.org/fonts/{fontstack}/{range}.pbf",
        sources: {
            "esri-satellite": {
                type: "raster",
                tiles: [
                    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
                ],
                tileSize: 256,
                maxzoom: 19,
                attribution: "Tiles &copy; Esri &mdash; World Imagery",
            },
        },
        layers: [
            {
                id: "esri-satellite-layer",
                type: "raster",
                source: "esri-satellite",
                minzoom: 0,
                maxzoom: 19,
            },
        ],
    } as unknown as maplibregl.StyleSpecification,
};

const LAYER_OPTIONS = [
    { key: "liberty" as MapStyleKey, label: "Liberty (Lengkap)", badge: "OFM" },
    { key: "positron" as MapStyleKey, label: "Positron (Terang)", badge: "Minimal" },
    { key: "bright" as MapStyleKey, label: "Bright (Kontras)", badge: "Terang" },
    { key: "dark" as MapStyleKey, label: "Dark (Gelap)", badge: "OFM Dark" },
    { key: "satelit" as MapStyleKey, label: "Citra Satelit", badge: "Esri" },
];

export function MapLibreMap({
    sensors = [],
    geoJsonData,
    center,
    zoom = 13.8,
    onSensorClick,
    className = "w-full h-full min-h-[500px]",
}: MapLibreMapProps) {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const mapRef = React.useRef<maplibregl.Map | null>(null);
    const markersRef = React.useRef<maplibregl.Marker[]>([]);
    const layerMenuRef = React.useRef<HTMLDivElement | null>(null);

    const [activeStyle, setActiveStyle] = React.useState<MapStyleKey>("liberty");
    const [isLayerMenuOpen, setIsLayerMenuOpen] = React.useState(false);
    const [mapReady, setMapReady] = React.useState(false);

    // Normalize coordinates: Leaflet uses [lat, lng], MapLibre uses [lng, lat]
    const resolvedCenter: [number, number] = React.useMemo(() => {
        if (!center) return [110.336198, -7.787341];
        // If first element is latitude (-7.xx) and second is longitude (110.xx)
        if (center[0] < 0 && center[1] > 0) {
            return [center[1], center[0]];
        }
        return center;
    }, [center]);

    // Close layer dropdown on click outside
    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (layerMenuRef.current && !layerMenuRef.current.contains(event.target as Node)) {
                setIsLayerMenuOpen(false);
            }
        };
        if (isLayerMenuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isLayerMenuOpen]);

    // Initialize MapLibre
    React.useEffect(() => {
        if (!containerRef.current || mapRef.current) return;

        if (typeof window !== "undefined") {
            maplibregl.setWorkerUrl("/maplibre-gl-worker.js");
        }

        const map = new maplibregl.Map({
            container: containerRef.current,
            style: STYLES[activeStyle],
            center: resolvedCenter,
            zoom: zoom,
            pitch: 0,
            bearing: 0,
            maxPitch: 0,
            dragRotate: false,
            touchPitch: false,
            attributionControl: false,
        });

        mapRef.current = map;
        map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-left");
        map.addControl(new maplibregl.ScaleControl({ unit: "metric" }), "bottom-left");

        const addBoundaryLayers = async () => {
            try {
                let geojson = geoJsonData;
                if (!geojson) {
                    const res = await fetch("/uploads/peta/BANYURADEN.geojson");
                    if (res.ok) {
                        geojson = await res.json();
                    }
                }

                if (geojson && !map.getSource("banyuraden-boundary")) {
                    map.addSource("banyuraden-boundary", {
                        type: "geojson",
                        data: geojson as GeoJSON.GeoJSON,
                    });

                    map.addLayer({
                        id: "banyuraden-boundary-fill",
                        type: "fill",
                        source: "banyuraden-boundary",
                        paint: {
                            "fill-color": "#0284c7",
                            "fill-opacity": 0.12,
                        },
                    });

                    map.addLayer({
                        id: "banyuraden-boundary-line",
                        type: "line",
                        source: "banyuraden-boundary",
                        paint: {
                            "line-color": "#0284c7",
                            "line-width": 2.5,
                        },
                    });

                    // Auto-fit bounds if features present
                    const featCol = geojson as GeoJSON.FeatureCollection;
                    if (featCol.features && featCol.features.length > 0) {
                        const bounds = new maplibregl.LngLatBounds();
                        const geom = featCol.features[0].geometry;
                        if (geom.type === "Polygon") {
                            geom.coordinates[0].forEach((c: number[]) => bounds.extend([c[0], c[1]]));
                            map.fitBounds(bounds, { padding: 40, maxZoom: 15 });
                        }
                    }
                }
            } catch (err) {
                console.warn("Could not load boundary layer:", err);
            }
        };

        map.on("load", () => {
            setMapReady(true);
            addBoundaryLayers();
        });

        map.on("style.load", () => {
            addBoundaryLayers();
        });

        return () => {
            map.remove();
            mapRef.current = null;
        };
    }, []);

    // Update markers when sensors or mapReady change
    React.useEffect(() => {
        const map = mapRef.current;
        if (!map || !mapReady) return;

        // Clear existing markers
        markersRef.current.forEach((m) => m.remove());
        markersRef.current = [];

        sensors.forEach((sensor) => {
            const el = document.createElement("div");
            el.className = "custom-sensor-marker";
            el.style.width = "30px";
            el.style.height = "30px";
            el.style.borderRadius = "50% 50% 50% 0";
            el.style.backgroundColor =
                sensor.status === "active"
                    ? "#10b981"
                    : sensor.status === "warning"
                      ? "#f59e0b"
                      : sensor.status === "critical"
                        ? "#ef4444"
                        : "#6b7280";
            el.style.border = "3px solid white";
            el.style.boxShadow = "0 2px 6px rgba(0,0,0,0.3)";
            el.style.transform = "rotate(-45deg)";
            el.style.cursor = "pointer";

            const popupContent = `
                <div style="padding: 8px; font-family: sans-serif;">
                    <h4 style="font-weight: bold; margin: 0 0 4px 0; font-size: 14px;">${sensor.name}</h4>
                    <p style="margin: 0 0 4px 0; font-size: 12px; color: #64748b;">${sensor.location || "Kalurahan Banyuraden"}</p>
                    ${sensor.value !== undefined ? `<div style="font-size: 16px; font-weight: bold; color: #0284c7;">${sensor.value} ${sensor.unit || ""}</div>` : ""}
                </div>
            `;

            const popup = new maplibregl.Popup({ offset: 12 }).setHTML(popupContent);

            const marker = new maplibregl.Marker({ element: el })
                .setLngLat([sensor.lng, sensor.lat])
                .setPopup(popup)
                .addTo(map);

            if (onSensorClick) {
                el.addEventListener("click", () => onSensorClick(sensor));
            }

            markersRef.current.push(marker);
        });
    }, [sensors, mapReady, onSensorClick]);

    const switchStyle = (key: MapStyleKey) => {
        setActiveStyle(key);
        setIsLayerMenuOpen(false);
        mapRef.current?.setStyle(STYLES[key]);
    };

    return (
        <div className={`relative w-full h-full overflow-hidden ${className}`}>
            <div ref={containerRef} className="w-full h-full" />

            {/* Layer Switcher Control */}
            <div ref={layerMenuRef} className="absolute top-3 right-3 z-10">
                <button
                    type="button"
                    onClick={() => setIsLayerMenuOpen((prev) => !prev)}
                    className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white/95 backdrop-blur-md rounded-lg shadow border border-slate-200 hover:bg-slate-50 transition cursor-pointer"
                >
                    <Layers size={14} className="text-sky-600 shrink-0" />
                    <span>Lapisan Peta</span>
                    <ChevronDown
                        size={13}
                        className={`text-slate-400 transition-transform duration-200 ${
                            isLayerMenuOpen ? "rotate-180" : ""
                        }`}
                    />
                </button>

                {isLayerMenuOpen && (
                    <div className="absolute right-0 mt-1.5 w-52 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-20">
                        <div className="px-3 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                            Pilih Basemap Bebas 403
                        </div>
                        {LAYER_OPTIONS.map((opt) => (
                            <button
                                key={opt.key}
                                type="button"
                                onClick={() => switchStyle(opt.key)}
                                className={`w-full flex items-center justify-between px-3 py-2 text-xs transition cursor-pointer ${
                                    activeStyle === opt.key
                                        ? "bg-sky-50 text-sky-700 font-semibold"
                                        : "text-slate-700 hover:bg-slate-50"
                                }`}
                            >
                                <div className="flex items-center gap-2">
                                    <div
                                        className={`w-2 h-2 rounded-full ${
                                            activeStyle === opt.key ? "bg-sky-600" : "bg-transparent"
                                        }`}
                                    />
                                    <span>{opt.label}</span>
                                </div>
                                <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded font-mono">
                                    {opt.badge}
                                </span>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

// Export default and LeafletMap drop-in alias
export default MapLibreMap;
export { MapLibreMap as LeafletMap };

