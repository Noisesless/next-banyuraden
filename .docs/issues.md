# Log Pelacakan Isu & Perbaikan Teknis

Dokumen ini mencatat pelacakan isu (issues), bug fixes, dan perbaikan arsitektural yang telah diimplementasikan pada Portal Resmi Kalurahan Banyuraden.

---

## 1. Status Ringkasan Isu

- **Total Isu Ditangani:** 5
- **Isu Terselesaikan (CLOSED):** 5
- **Isu Terbuka (OPEN):** 0

---

## 2. Riwayat Isu & Resolusi

### ISSUE-001: Galeri Foto Gutenberg Merenggang Vertikal Hingga Ribuan Piksel
- **Komponen:** `lib/sanitize.ts`, `styles/article.css`, `app/berita/[slug]/page.tsx`
- **Gejala:** Artikel berita dari upstream WordPress yang memiliki galeri gambar Gutenberg merender 9+ gambar portrait berukuran penuh tanpa batas grid, membuat halaman berita memanjang ribuan piksel ke bawah.
- **Akar Masalah:**
  1. `DOMPurify` melucuti tag `<figure>` dan `<figcaption>` karena belum terdaftar di whitelist `ALLOWED_TAGS`. Akibatnya kontainer `.wp-block-gallery` hilang.
  2. CSS `.article-content img` menerapkan `width: 100%; height: auto;` sehingga setiap foto vertikal membentang selebar kontainer artikel.
- **Resolusi:**
  - Whitelist `<figure>`, `<figcaption>` dan atribut `srcset`, `sizes`, `loading`, `decoding` di `lib/sanitize.ts`.
  - Menerapkan CSS Grid responsif untuk `.wp-block-gallery` (1 col mobile, 2 col tablet, 3 col desktop) dengan tinggi terbatas `height: 220px; object-fit: cover; border-radius: 0.75rem`.
- **Status:** `CLOSED (VERIFIED)`

---

### ISSUE-002: Gambar Rusak / 404 pada Card Berita Statis Tanpa Cover Asli
- **Komponen:** `components/ui/custom/ImageFallback.tsx`, `lib/opensid.ts`, `lib/slemankab-news.ts`
- **Gejala:** Kartu berita yang tidak memiliki cover asli atau merujuk ke placeholder internal yang tidak dapat diakses menampilkan ikon gambar rusak di browser pengguna.
- **Akar Masalah:** `ImageFallback` tidak memiliki penanganan onError robust untuk fallback lokal jika URL remote gagal dimuat atau mengembalikan status 404.
- **Resolusi:**
  - Mengonfigurasi `banyuraden-cover.jpg` sebagai cover fallback resmi default kalurahan.
  - Normalisasi URL sumber di `ImageFallback.tsx` dengan event listener `onError` yang menggantikan src secara mulus.
- **Status:** `CLOSED (VERIFIED)`

---

### ISSUE-003: Halaman Pengumuman Masih Menampilkan Template Statis dalam Pengembangan
- **Komponen:** `app/pengumuman/page.tsx`, `app/api/pengumuman/route.ts`
- **Gejala:** Rute `/pengumuman` menampilkan "Halaman dalam Pengembangan", padahal Kalurahan Banyuraden memiliki 52 agenda & pengumuman aktif di sistem Sleman.
- **Akar Masalah:** Modul pengumuman belum terhubung ke upstream WordPress REST API Kategori 3.
- **Resolusi:**
  - Menghubungkan endpoint `/api/pengumuman` ke Kategori 3 WordPress REST API via `getSlemankabAgenda`.
  - Merombak `app/pengumuman/page.tsx` menjadi halaman dinamis dengan filter kategori, pencarian, dan modal dialog baca pengumuman lengkap.
- **Status:** `CLOSED (VERIFIED)`

---

### ISSUE-004: Redirect Tautan Komunitas & Inovasi Menuju Domain Kalurahan Lain
- **Komponen:** `components/layout/Footer.tsx`, `components/layout/Header.tsx`, `app/HomePageClient.tsx`
- **Gejala:** Tautan menu dan footer masih mengarah ke Kalurahan Pondokrejo.
- **Resolusi:** Menghapus redirect dan memperbarui semua tautan ke aset resmi Kalurahan Banyuraden (Instagram, YouTube, nomor telepon kantor, dan email resmi).
- **Status:** `CLOSED (VERIFIED)`

---

### ISSUE-005: Map Libres GL Worker Error pada Lingkungan Produksi
- **Komponen:** `next.config.ts`, `components/ui/custom/MapLibreMap.tsx`
- **Gejala:** CSP memblokir worker blob atau CDN eksternal saat memuat peta batas wilayah Banyuraden.
- **Resolusi:** Menambahkan `worker-src 'self' blob:` ke konfigurasi CSP di `next.config.ts` dan menyediakan worker lokal di `public/maplibre-gl-worker.js`.
- **Status:** `CLOSED (VERIFIED)`
