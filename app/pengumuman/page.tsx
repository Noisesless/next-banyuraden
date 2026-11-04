"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
    Megaphone,
    Calendar,
    Clock,
    User,
    Search,
    X,
    ExternalLink,
    AlertCircle,
    Bell,
    Briefcase,
    FileText,
    Eye,
    ChevronRight,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import ImageFallback from "@/components/ui/custom/ImageFallback";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { sanitizeHtml } from "@/lib/sanitize";

interface Pengumuman {
    id: number;
    judul: string;
    konten: string;
    ringkasan?: string;
    prioritas: string;
    kategori: string;
    status: string;
    publishedAt: string;
    penulis: string;
    views: number;
    slug?: string;
    featuredImage?: string;
}

export default function PengumumanPage() {
    const [items, setItems] = useState<Pengumuman[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedItem, setSelectedItem] = useState<Pengumuman | null>(null);

    useEffect(() => {
        async function fetchPengumuman() {
            try {
                setLoading(true);
                setError(null);
                const res = await fetch("/api/pengumuman?limit=50");
                const json = await res.json();
                if (json.data && Array.isArray(json.data)) {
                    setItems(json.data);
                } else if (json.data?.data) {
                    setItems(json.data.data);
                }
            } catch (err) {
                console.error("Failed to load pengumuman:", err);
                setError("Gagal memuat daftar agenda dan pengumuman.");
            } finally {
                setLoading(false);
            }
        }
        fetchPengumuman();
    }, []);

    // Filter items
    const filteredItems = items.filter((item) => {
        const matchCategory =
            selectedCategory === "all" ||
            item.kategori.toLowerCase().includes(selectedCategory.toLowerCase());
        const matchSearch =
            !searchTerm ||
            item.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.konten.toLowerCase().includes(searchTerm.toLowerCase());
        return matchCategory && matchSearch;
    });

    const formatDate = (dateString: string) => {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString("id-ID", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
            });
        } catch {
            return dateString;
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            {/* Header Area */}
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 text-primary rounded-full mb-3">
                    <Megaphone className="h-8 w-8 text-primary" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-2">
                    Pengumuman & Agenda Kalurahan
                </h1>
                <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
                    Informasi resmi, agenda kegiatan pamong, pengumuman penting, dan lowongan pamong dari Pemerintah Kalurahan Banyuraden
                </p>
            </div>

            {/* Controls Bar: Search & Category Filter */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8 bg-card border border-border p-4 rounded-xl shadow-sm">
                {/* Search Box */}
                <div className="relative w-full md:w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder="Cari agenda atau pengumuman..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9 pr-8 h-10 w-full"
                    />
                    {searchTerm && (
                        <button
                            onClick={() => setSearchTerm("")}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    )}
                </div>

                {/* Category Pills */}
                <div className="flex flex-wrap gap-2 w-full md:w-auto">
                    {[
                        { id: "all", label: "Semua" },
                        { id: "Pengumuman Resmi", label: "Pengumuman Resmi" },
                        { id: "Agenda & Kegiatan", label: "Agenda Kegiatan" },
                        { id: "Lowongan & Pamong", label: "Lowongan & Seleksi" },
                    ].map((cat) => (
                        <Button
                            key={cat.id}
                            variant={selectedCategory === cat.id ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedCategory(cat.id)}
                            className="rounded-full text-xs h-8"
                        >
                            {cat.label}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Content State */}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                        <Card key={i} className="overflow-hidden">
                            <Skeleton className="h-48 w-full" />
                            <CardHeader className="space-y-2">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-6 w-full" />
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-3/4" />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : error ? (
                <div className="text-center py-12 bg-card border rounded-xl">
                    <AlertCircle className="h-10 w-10 text-destructive mx-auto mb-3" />
                    <h3 className="text-lg font-semibold mb-1">Terjadi Kesalahan</h3>
                    <p className="text-muted-foreground text-sm mb-4">{error}</p>
                    <Button onClick={() => window.location.reload()} variant="outline">
                        Coba Lagi
                    </Button>
                </div>
            ) : filteredItems.length === 0 ? (
                <div className="text-center py-12 bg-card border rounded-xl">
                    <Bell className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                    <h3 className="text-lg font-semibold mb-1">Tidak Ada Pengumuman</h3>
                    <p className="text-muted-foreground text-sm">
                        Tidak ada pengumuman atau agenda yang cocok dengan kriteria pencarian Anda.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredItems.map((item) => (
                        <Card
                            key={item.id}
                            className="overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow group border-border"
                        >
                            <div>
                                {/* Card Media */}
                                <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                                    <ImageFallback
                                        src={item.featuredImage}
                                        _fallbackSrc="/images/banyuraden-cover.jpg"
                                        alt={item.judul}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    {/* Priority Badge */}
                                    <div className="absolute top-3 left-3 z-10 flex gap-2">
                                        <Badge
                                            variant={
                                                item.prioritas === "TINGGI"
                                                    ? "destructive"
                                                    : item.prioritas === "PENTING"
                                                      ? "secondary"
                                                      : "outline"
                                            }
                                            className="text-xs backdrop-blur-md shadow-sm"
                                        >
                                            {item.prioritas === "TINGGI" ? "Penting" : item.kategori}
                                        </Badge>
                                    </div>
                                </div>

                                <CardHeader className="pb-2 pt-4">
                                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="h-3.5 w-3.5" />
                                            <span>{formatDate(item.publishedAt)}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <User className="h-3.5 w-3.5" />
                                            <span className="truncate max-w-[120px]">{item.penulis}</span>
                                        </div>
                                    </div>
                                    <CardTitle className="text-lg font-bold leading-snug line-clamp-2 text-foreground group-hover:text-primary transition-colors">
                                        {item.judul}
                                    </CardTitle>
                                </CardHeader>

                                <CardContent className="pb-4">
                                    <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">
                                        {item.ringkasan || item.konten.replace(/<[^>]*>/g, "")}
                                    </p>
                                </CardContent>
                            </div>

                            {/* Card Footer Actions */}
                            <div className="p-4 pt-0 border-t mt-auto flex items-center justify-between gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setSelectedItem(item)}
                                    className="w-full text-xs font-medium"
                                >
                                    <FileText className="h-3.5 w-3.5 mr-1" />
                                    Baca Pengumuman
                                </Button>
                                {item.slug && (
                                    <Button variant="ghost" size="sm" asChild className="text-xs px-2">
                                        <Link href={`/berita/${item.slug}`} title="Buka Halaman Lengkap">
                                            <ExternalLink className="h-4 w-4" />
                                        </Link>
                                    </Button>
                                )}
                            </div>
                        </Card>
                    ))}
                </div>
            )}

            {/* Announcement Detail Modal */}
            {selectedItem && (
                <Dialog open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)}>
                    <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
                        <DialogHeader>
                            <div className="flex items-center gap-2 mb-2">
                                <Badge
                                    variant={selectedItem.prioritas === "TINGGI" ? "destructive" : "secondary"}
                                    className="text-xs"
                                >
                                    {selectedItem.kategori}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                    {formatDate(selectedItem.publishedAt)}
                                </span>
                            </div>
                            <DialogTitle className="text-xl md:text-2xl font-bold leading-snug text-left text-foreground">
                                {selectedItem.judul}
                            </DialogTitle>
                            <DialogDescription className="text-left text-xs text-muted-foreground">
                                Diterbitkan oleh: {selectedItem.penulis}
                            </DialogDescription>
                        </DialogHeader>

                        {/* Modal Image */}
                        {selectedItem.featuredImage && (
                            <div className="relative h-60 w-full rounded-lg overflow-hidden my-3 bg-slate-100">
                                <ImageFallback
                                    src={selectedItem.featuredImage}
                                    _fallbackSrc="/images/banyuraden-cover.jpg"
                                    alt={selectedItem.judul}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 600px"
                                    className="object-cover"
                                />
                            </div>
                        )}

                        {/* Modal Content */}
                        <div className="article-content prose prose-sm md:prose-base max-w-none text-foreground my-2">
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: sanitizeHtml(selectedItem.konten),
                                }}
                            />
                        </div>

                        {/* Modal Actions */}
                        <div className="flex justify-between items-center pt-4 border-t mt-4">
                            {selectedItem.slug ? (
                                <Button variant="outline" size="sm" asChild>
                                    <Link href={`/berita/${selectedItem.slug}`}>
                                        <ExternalLink className="h-4 w-4 mr-2" />
                                        Buka di Halaman Berita
                                    </Link>
                                </Button>
                            ) : (
                                <div />
                            )}
                            <Button size="sm" onClick={() => setSelectedItem(null)}>
                                Tutup
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
}
