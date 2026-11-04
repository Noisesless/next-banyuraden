import type { Metadata } from "next";
import Link from "next/link";
import {
    Ambulance,
    Phone,
    Clock,
    ShieldCheck,
    CheckCircle2,
    MapPin,
    AlertCircle,
    HeartHandshake,
    FileText,
    ArrowRight,
    Users,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
    title: "Layanan Ambulans Siaga | Kalurahan Banyuraden",
    description:
        "Layanan ambulans gratis dan siaga 24 jam untuk warga Kalurahan Banyuraden, Kapanewon Gamping, Kabupaten Sleman.",
};

const PHONE_NUMBER = "(0274) 621626";
const WA_NUMBER = "089612624627";
const WA_DISPLAY = "0896-1262-4627";
const WA_LINK = `https://wa.me/6289612624627?text=${encodeURIComponent(
    "Halo Call Center Layanan Ambulans Kalurahan Banyuraden, saya membutuhkan bantuan layanan ambulans darurat."
)}`;

export default function LayananAmbulansPage() {
    return (
        <div className="min-h-screen bg-linear-to-b from-gray-50 to-white py-10">
            <div className="container mx-auto px-4 max-w-5xl space-y-10">
                {/* Header Section */}
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-100 text-red-700 text-sm font-semibold">
                        <Ambulance className="h-4 w-4" />
                        Siaga Kegawatdaruratan Medis Warga
                    </div>
                    <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
                        Layanan Ambulans Kalurahan Banyuraden
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
                        Pelayanan transportasi medis darurat dan rujukan kesehatan yang siap melayani warga Kalurahan
                        Banyuraden secara cepat, sigap, dan bebas biaya.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                        <Badge variant="outline" className="text-xs px-3 py-1 border-emerald-300 text-emerald-800 bg-emerald-50">
                            <ShieldCheck className="h-3.5 w-3.5 mr-1" /> Gratis Tanpa Biaya Sewa
                        </Badge>
                        <Badge variant="outline" className="text-xs px-3 py-1 border-blue-300 text-blue-800 bg-blue-50">
                            <Clock className="h-3.5 w-3.5 mr-1" /> Siaga 24 Jam
                        </Badge>
                        <Badge variant="outline" className="text-xs px-3 py-1 border-purple-300 text-purple-800 bg-purple-50">
                            <HeartHandshake className="h-3.5 w-3.5 mr-1" /> Prioritas Lansia & Warga Rentan (LLT)
                        </Badge>
                    </div>
                </div>

                {/* Emergency Contact CTA Card */}
                <Card className="border-red-200 bg-gradient-to-br from-red-500 to-rose-600 text-white shadow-xl overflow-hidden">
                    <CardContent className="p-6 md:p-8">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="space-y-2 text-center md:text-left">
                                <span className="inline-block px-3 py-1 rounded bg-white/20 text-white text-xs font-bold uppercase tracking-wider">
                                    Kontak Darurat / Call Center
                                </span>
                                <h2 className="text-2xl md:text-3xl font-bold">Butuh Ambulans Sekarang?</h2>
                                <p className="text-red-100 text-sm max-w-xl">
                                    Hubungi tim siaga kami melalui sambungan telepon langsung atau chat WhatsApp resmi
                                    Kalurahan Banyuraden untuk penanganan segera.
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
                                <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                                    <Button className="w-full bg-white text-red-600 hover:bg-red-50 font-bold px-6 py-3 h-auto shadow-md">
                                        <Phone className="h-4 w-4 mr-2" />
                                        WhatsApp: {WA_DISPLAY}
                                    </Button>
                                </a>
                                <a href={`tel:${PHONE_NUMBER.replace(/\D/g, "")}`} className="w-full sm:w-auto">
                                    <Button
                                        variant="outline"
                                        className="w-full border-white text-white hover:bg-white/10 font-semibold px-6 py-3 h-auto"
                                    >
                                        <Phone className="h-4 w-4 mr-2" />
                                        Telepon: {PHONE_NUMBER}
                                    </Button>
                                </a>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Jenis Layanan & Fasilitas */}
                <div className="space-y-6">
                    <div className="text-center md:text-left">
                        <h3 className="text-2xl font-bold text-gray-900">Ruang Lingkup Pelayanan</h3>
                        <p className="text-sm text-gray-600">
                            Fasilitas ambulans Kalurahan Banyuraden difungsikan untuk berbagai kebutuhan medis darurat dan sosial warga.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Card className="hover:shadow-md transition">
                            <CardHeader className="pb-2">
                                <div className="w-10 h-10 rounded-lg bg-red-100 text-red-600 flex items-center justify-center mb-2">
                                    <AlertCircle className="h-5 w-5" />
                                </div>
                                <CardTitle className="text-base">Gawat Darurat Medis</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm text-gray-600">
                                Pengantaran cepat pasien gawat darurat dari kediaman warga menuju Puskesmas Gamping II atau Rumah Sakit rujukan.
                            </CardContent>
                        </Card>

                        <Card className="hover:shadow-md transition">
                            <CardHeader className="pb-2">
                                <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center mb-2">
                                    <Users className="h-5 w-5" />
                                </div>
                                <CardTitle className="text-base">Layanan Lansia (LLT)</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm text-gray-600">
                                Antar-jemput pasien Layanan Lansia Terintegrasi (LLT) dan disabilitas untuk kontrol rutin medis ke faskes.
                            </CardContent>
                        </Card>

                        <Card className="hover:shadow-md transition">
                            <CardHeader className="pb-2">
                                <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mb-2">
                                    <ShieldCheck className="h-5 w-5" />
                                </div>
                                <CardTitle className="text-base">Tanggap Bencana</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm text-gray-600">
                                Dukungan mobilitas penyelamatan korban bencana alam, kecelakaan lalu lintas, dan kondisi darurat wilayah kalurahan.
                            </CardContent>
                        </Card>

                        <Card className="hover:shadow-md transition">
                            <CardHeader className="pb-2">
                                <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center mb-2">
                                    <HeartHandshake className="h-5 w-5" />
                                </div>
                                <CardTitle className="text-base">Pelayanan Sosial</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm text-gray-600">
                                Pengantaran kepulangan jenazah warga Kalurahan Banyuraden sesuai dengan ketentuan operasional kalurahan.
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* SOP & Prosedur Alur Permohonan */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl flex items-center gap-2">
                            <FileText className="h-5 w-5 text-primary" />
                            Standar Operasional Prosedur (SOP) Permohonan Ambulans
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="border rounded-lg p-4 bg-gray-50/50 space-y-2">
                                <div className="w-8 h-8 rounded-full bg-primary text-white font-bold flex items-center justify-center text-sm">
                                    1
                                </div>
                                <h4 className="font-semibold text-gray-900 text-sm">Hubungi Call Center</h4>
                                <p className="text-xs text-gray-600">
                                    Keluarga atau warga menghubungi nomor darurat Kalurahan Banyuraden ({PHONE_NUMBER} / WA {WA_DISPLAY}).
                                </p>
                            </div>

                            <div className="border rounded-lg p-4 bg-gray-50/50 space-y-2">
                                <div className="w-8 h-8 rounded-full bg-primary text-white font-bold flex items-center justify-center text-sm">
                                    2
                                </div>
                                <h4 className="font-semibold text-gray-900 text-sm">Informasikan Pasien</h4>
                                <p className="text-xs text-gray-600">
                                    Sampaikan nama pasien, kondisi kegawatdaruratan, titik jemput padukuhan, dan rumah sakit rujukan yang dituju.
                                </p>
                            </div>

                            <div className="border rounded-lg p-4 bg-gray-50/50 space-y-2">
                                <div className="w-8 h-8 rounded-full bg-primary text-white font-bold flex items-center justify-center text-sm">
                                    3
                                </div>
                                <h4 className="font-semibold text-gray-900 text-sm">Keberangkatan Armada</h4>
                                <p className="text-xs text-gray-600">
                                    Driver dan petugas siaga ambulans segera meluncur ke lokasi penjemputan dengan peralatan pendukung.
                                </p>
                            </div>

                            <div className="border rounded-lg p-4 bg-gray-50/50 space-y-2">
                                <div className="w-8 h-8 rounded-full bg-primary text-white font-bold flex items-center justify-center text-sm">
                                    4
                                </div>
                                <h4 className="font-semibold text-gray-900 text-sm">Administrasi Menyusul</h4>
                                <p className="text-xs text-gray-600">
                                    Utamakan keselamatan pasien. Verifikasi administrasi (fotokopi KTP/KK domisili Banyuraden) diselesaikan menyusul.
                                </p>
                            </div>
                        </div>

                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-xs text-amber-900 space-y-1">
                            <div className="font-semibold flex items-center gap-1.5">
                                <AlertCircle className="h-4 w-4 text-amber-700" />
                                Catatan Penting:
                            </div>
                            <p>
                                Layanan ambulans diutamakan untuk rujukan darurat, penjemputan pasien berisiko tinggi, dan
                                pendampingan Layanan Lansia Terintegrasi (LLT) di wilayah administratif Kalurahan Banyuraden.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Dasar Hukum & Referensi Resmi */}
                <div className="border rounded-lg p-6 bg-gray-50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <h4 className="font-semibold text-gray-900 text-sm">Dasar Hukum Operasional Ambulans:</h4>
                        <p className="text-xs text-gray-600">
                            • Peraturan Lurah Banyuraden Nomor 8 Tahun 2023 tentang Layanan Ambulans Kalurahan Banyuraden
                        </p>
                        <p className="text-xs text-gray-600">
                            • Keputusan Lurah Banyuraden Nomor 11 Tahun 2024 tentang Petugas Ambulans Kalurahan
                        </p>
                        <p className="text-xs text-gray-500 pt-1">
                            Kantor Kalurahan Banyuraden: Jl. Ringroad Barat, Tegalyoso, Banyuraden, Gamping, Sleman, D.I. Yogyakarta 55293
                        </p>
                    </div>
                    <a
                        href="https://banyuradensid.slemankab.go.id/home/layanan-ambulans/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0"
                    >
                        <Button variant="outline" size="sm" className="text-xs">
                            Buka Arsip Resmi Kabupaten <ArrowRight className="h-3 w-3 ml-1" />
                        </Button>
                    </a>
                </div>
            </div>
        </div>
    );
}

