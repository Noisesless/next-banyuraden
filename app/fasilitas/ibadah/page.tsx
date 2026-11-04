import { Landmark, MapPin, Phone } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXTAUTH_URL || "http://localhost:3000";

interface FasilitasItem {
    id: number | string;
    nama?: string;
    alamat?: string;
    telepon?: string;
    jenis?: string;
    padukuhan?: { nama?: string; slug?: string };
    attributes?: {
        nama?: string;
        alamat?: string;
        telepon?: string;
        jenis?: string;
        padukuhan?: { nama?: string; slug?: string };
    };
}

function getJenisBadge(jenis?: string) {
    const styles: Record<string, string> = {
        MASJID: "bg-emerald-100 text-emerald-800 border-emerald-200",
        MUSHOLA: "bg-teal-100 text-teal-800 border-teal-200",
        GEREJA: "bg-blue-100 text-blue-800 border-blue-200",
    };
    return (jenis ? styles[jenis] : undefined) || "bg-gray-100 text-gray-800 border-gray-200";
}

function getJenisLabel(jenis?: string): string {
    const labels: Record<string, string> = {
        MASJID: "Masjid",
        MUSHOLA: "Mushola",
        GEREJA: "Gereja",
    };
    return (jenis ? labels[jenis] : undefined) || jenis || "";
}

async function fetchIbadahFasilitas(): Promise<FasilitasItem[]> {
    const JENIS_IBADAH = ["MASJID", "MUSHOLA", "GEREJA"];
    try {
        const res = await fetch(`${BASE_URL}/api/fasilitas`, {
            next: { revalidate: 3600 },
        });
        if (!res.ok) return [];
        const json = await res.json();
        if (!json.success) return [];
        return (json.data || [])
            .filter((item: FasilitasItem) => {
                const jenis = item.attributes?.jenis || item.jenis || "";
                return JENIS_IBADAH.includes(jenis);
            })
            .map((item: FasilitasItem) => ({
                id: item.id,
                nama: item.attributes?.nama || item.nama || "",
                alamat: item.attributes?.alamat || item.alamat,
                telepon: item.attributes?.telepon || item.telepon,
                jenis: item.attributes?.jenis || item.jenis || "",
                padukuhan: item.attributes?.padukuhan || item.padukuhan,
            }))
            .sort((a: FasilitasItem, b: FasilitasItem) => {
                return (a.nama || "").localeCompare(b.nama || "");
            });
    } catch {
        return [];
    }
}

export default async function IbadahPage() {
    const fasilitas = await fetchIbadahFasilitas();

    // Group by padukuhan
    const grouped = fasilitas.reduce<Record<string, FasilitasItem[]>>((acc, f) => {
        const key = f.padukuhan?.nama || "Tanpa Padukuhan";
        if (!acc[key]) acc[key] = [];
        acc[key].push(f);
        return acc;
    }, {});

    return (
        <div className="min-h-screen bg-linear-to-b from-gray-50 to-white py-8">
            <div className="container mx-auto px-4 space-y-8">
                {/* Page Header */}
                <div className="text-center space-y-6">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 rounded-full">
                        <Landmark className="h-10 w-10 text-emerald-600" />
                    </div>
                    <h1 className="text-4xl font-bold text-primary">Tempat Ibadah</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Masjid, mushola, dan tempat ibadah di wilayah Kalurahan Banyuraden
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card className="relative overflow-hidden bg-linear-to-br from-emerald-100 to-emerald-200 border-0">
                        <CardContent className="p-4 text-center">
                            <Landmark className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
                            <div className="text-3xl font-bold text-emerald-900">
                                {fasilitas.filter((f) => f.jenis === "MASJID").length}
                            </div>
                            <p className="text-xs text-emerald-700">Masjid</p>
                        </CardContent>
                    </Card>
                    <Card className="relative overflow-hidden bg-linear-to-br from-teal-100 to-teal-200 border-0">
                        <CardContent className="p-4 text-center">
                            <Landmark className="h-8 w-8 text-teal-600 mx-auto mb-2" />
                            <div className="text-3xl font-bold text-teal-900">
                                {fasilitas.filter((f) => f.jenis === "MUSHOLA").length}
                            </div>
                            <p className="text-xs text-teal-700">Mushola</p>
                        </CardContent>
                    </Card>
                    <Card className="relative overflow-hidden bg-linear-to-br from-blue-100 to-blue-200 border-0">
                        <CardContent className="p-4 text-center">
                            <Landmark className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                            <div className="text-3xl font-bold text-blue-900">
                                {fasilitas.filter((f) => f.jenis === "GEREJA").length}
                            </div>
                            <p className="text-xs text-blue-700">Gereja</p>
                        </CardContent>
                    </Card>
                    <Card className="relative overflow-hidden bg-linear-to-br from-violet-100 to-violet-200 border-0">
                        <CardContent className="p-4 text-center">
                            <Landmark className="h-8 w-8 text-violet-600 mx-auto mb-2" />
                            <div className="text-3xl font-bold text-violet-900">{fasilitas.length}</div>
                            <p className="text-xs text-violet-700">Total</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Info */}
                <Card className="bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200">
                    <CardHeader>
                        <CardTitle className="text-emerald-800">Tentang Tempat Ibadah</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">
                            Kalurahan Banyuraden memiliki berbagai tempat ibadah yang tersebar di setiap padukuhan.
                            Masjid dan mushola menjadi pusat kegiatan keagamaan dan sosial masyarakat.
                        </p>
                    </CardContent>
                </Card>

                {/* Places by Padukuhan */}
                {Object.entries(grouped).map(([padukuhan, items]) => (
                    <Card key={padukuhan}>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <MapPin className="h-5 w-5 text-emerald-600" />
                                {padukuhan}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {items.map((f) => (
                                    <Card key={f.id}>
                                        <CardHeader className="pb-2">
                                            <CardTitle className="text-base">{f.nama}</CardTitle>
                                            <Badge className={getJenisBadge(f.jenis)}>
                                                {getJenisLabel(f.jenis)}
                                            </Badge>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-1 text-sm text-muted-foreground">
                                                <div className="flex items-start gap-2">
                                                    <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                                                    <span className="line-clamp-2">{f.alamat}</span>
                                                </div>
                                                {f.telepon && (
                                                    <div className="flex items-center gap-2">
                                                        <Phone className="h-4 w-4 shrink-0" />
                                                        <span>{f.telepon}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
