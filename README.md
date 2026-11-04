<p align="center">
  <img src="public/images/logo.png" width="120" alt="Logo Resmi Kalurahan Banyuraden" />
</p>

# Portal Resmi Kalurahan Banyuraden

**Sistem Informasi & Portal Layanan Digital Terpadu Kalurahan Banyuraden**  
*Kapanewon Gamping, Kabupaten Sleman, Daerah Istimewa Yogyakarta*  
🌐 **Live URL Produksi:** [https://banyuraden.smartdesa.net](https://banyuraden.smartdesa.net)

---

## 📌 Ringkasan Sistem

Portal Resmi Kalurahan Banyuraden adalah platform web modern berbasis **Next.js 15 (App Router)** yang berfungsi sebagai pusat layanan digital dan **API Aggregator** terpadu. Sistem ini mengintegrasikan berbagai sumber data upstream resmi pemerintah kalurahan, kabupaten, dan sistem geospasial guna menyajikan informasi publik yang transparan, akurat, dan berkecepatan tinggi.

### Keunggulan Arsitektur
- **High-Performance Hybrid Rendering:** Kombinasi Server-Side Rendering (SSR), Incremental Static Regeneration (ISR), dan Static Site Generation (SSG) untuk meminimalkan waktu muat halaman (<1 detik).
- **Multi-Source Upstream Resilience:** Didukung mekanisme failover otomatis antara REST API resmi Kabupaten Sleman, OpenSID Kalurahan, dan cached static data.
- **Laptop-First & Mobile Responsive:** Tampilan responsif optimal pada resolusi laptop (1366×768) hingga smartphone Android (360px – 412px).
- **Keamanan Tingkat Produksi:** Proteksi menyeluruh dari serangan XSS, Clickjacking, MIME-sniffing, dan abusive request.

---

## 🌐 Integrasi Sumber Data Upstream

Portal ini secara aktif menyinkronkan data dari saluran resmi berikut:

1. **WordPress REST API Kabupaten Sleman** (`banyuradensid.slemankab.go.id`):
   - Publikasi berita dan kegiatan kalurahan terkini.
   - Feed **Pengumuman Resmi & Agenda Pamong** (Kategori ID 3).
2. **OpenSID Kalurahan Banyuraden** (`banyuraden.sleman-desa.id` / `banyuraden.id`):
   - Layanan administrasi kependudukan dan surat-menyurat online.
   - Portal pengaduan warga resmi.
   - Data APBKal, transparansi anggaran, dan realisasi keuangan desa.
3. **Peta Interaktif Geospasial (GeoJSON & MapLibre GL):**
   - Batas administratif Kalurahan Banyuraden dan 8 Padukuhan: *Banyumeneng, Cokrowijayan, Dowangan, Guyangan, Kaliabu, Kanoman, Modinan, Sukunan*.
   - Pemetaan titik fasilitas kesehatan, pendidikan, ibadah, dan kantor pamong.
4. **Sensor IoT Lingkungan & Cuaca (ThingSpeak API):**
   - Pemantauan metrik kualitas lingkungan dan stasiun cuaca lokal secara real-time.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 15.x (React 19, TypeScript)
- **Styling & UI:** Tailwind CSS, Radix UI, Lucide Icons, Phosphor Icons
- **Database & ORM:** MySQL / MariaDB via Prisma ORM
- **Pemetaan:** MapLibre GL / OpenStreetMap (CDN compliant)
- **Sanitasi Konten:** DOMPurify (`isomorphic-dompurify`)
- **Proses Manajer VPS:** PM2 Cluster Mode (Node.js runtime)

---

## 🚀 Panduan Memulai (Local Development)

### 1. Prasyarat
- Node.js versi 20.x atau lebih baru
- npm versi 10.x atau lebih baru
- Akses database MySQL (opsional untuk mode baca API statis)

### 2. Instalasi Dependensi
```bash
git clone https://github.com/Noisesless/next-banyuraden.git
cd next-banyuraden
npm install
```

### 3. Konfigurasi Lingkungan (.env)
Salin berkas `.env.example` menjadi `.env.local`:
```bash
cp .env.example .env.local
```
Sesuaikan parameter koneksi database dan domain upstream sesuai kebutuhan lokal.

### 4. Menjalankan Server Development
```bash
npm run dev
```
Buka browser pada alamat: **`http://localhost:5091`** (port dev default).

---

## 📦 Build & Deployment Produksi

### 1. Kompilasi Produksi
```bash
# Generate Prisma client
npx prisma generate

# Build Next.js bundle
npm run build
```

### 2. Menjalankan via PM2 (Server Produksi)
```bash
pm2 start npm --name "next-banyuraden" -- start -- -p 5091
pm2 save
```

---

## 🔒 Standar Keamanan Produksi (Production Hardening)

Portal ini telah melalui serangkaian audit keamanan (SAST & DAST) dengan implementasi proteksi aktif:

### 1. Content Security Policy (CSP) & Security Headers
Dikonfigurasi secara terpusat pada `next.config.ts`:
- **`Content-Security-Policy`**: Membatasi eksekusi skrip hanya dari sumber internal terpercaya (`'self'`), melarang embedding iframe tidak sah (`frame-ancestors 'none'`), serta mengizinkan aset gambar upstream terverifikasi.
- **`X-Frame-Options: DENY`**: Mencegah serangan Clickjacking.
- **`X-Content-Type-Options: nosniff`**: Menangkal MIME-type sniffing exploit.
- **`Strict-Transport-Security (HSTS)`**: Memaksa enkripsi HTTPS (`max-age=31536000; includeSubDomains; preload`).
- **`Referrer-Policy: strict-origin-when-cross-origin`**: Menjaga kerahasiaan URL internal dari rujukan luar.

### 2. Perlindungan XSS (Cross-Site Scripting)
Seluruh konten HTML yang ditarik dari WordPress Gutenberg dan OpenSID wajib melalui proses sanitasi ketat (`lib/sanitize.ts`) menggunakan whitelist tag aman (`p`, `h1`-`h6`, `figure`, `figcaption`, `img`, `table`, dll). Semua tag skrip berbahaya, iframe, dan inline event handler (`onload`, `onerror`) dibuang sebelum dirender ke DOM.

### 3. Rate Limiting Transparan Berstandar RFC
Diterapkan pada seluruh rute `/api/*` melalui `middleware.ts` untuk memitigasi serangan DDoS dan Brute Force:
- Header transparan yang disertakan: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, dan `X-RateLimit-Reset`.
- Mengembalikan HTTP status `429 Too Many Requests` saat batas kuota request per menit terlampaui.

### 4. Isolasi Kredensial & Sanitasi Git
- Seluruh rahasia server (database password, API key, auth secret) diisolasi dalam file `.env` yang berada di dalam `.gitignore`.
- Menggunakan script sanitasi pra-commit untuk memastikan tidak ada token atau file kredensial yang terunggah ke repositori publik.

### 5. Atribut Tautan Eksternal Aman
Semua tautan yang mengarah ke luar portal (OpenSID, media sosial, Google Maps) wajib menggunakan atribut:
```html
target="_blank" rel="noopener noreferrer"
```
guna mencegah kerentanan *Tabnabbing* / `window.opener` hijacking.

---

## 📂 Struktur Direktori Utama

```
next-banyuraden/
├── app/                      # Next.js 15 App Router (Pages & API Routes)
│   ├── api/                  # Endpoint API (external-news, pengumuman, iot, dll)
│   ├── berita/               # Halaman arsip & detail berita ([slug])
│   ├── pengumuman/           # Halaman pengumuman resmi & agenda
│   ├── profil/               # Profil kalurahan & pamong
│   ├── layout.tsx            # Root layout & meta tags resmi
│   └── page.tsx              # Beranda utama
├── components/               # Komponen UI modular
│   ├── layout/               # Header, Footer, MobileNav
│   └── ui/                   # Komponen Radix, Button, Card, ImageFallback
├── lib/                      # Helper, services, sanitasi XSS, upstream API client
├── prisma/                   # Schema database & seeder
├── public/                   # Asset statis (logo, GeoJSON, cover default)
├── styles/                   # Global CSS & Gutenberg gallery grid styling
└── .docs/                    # Dokumentasi arsitektur, database, API, & audit keamanan
```

---

## 📞 Kontak & Sekretariat Resmi

**Pemerintah Kalurahan Banyuraden**  
- **Alamat Kantor:** Jl. Ringroad Barat, Banyuraden, Kapanewon Gamping, Kabupaten Sleman, D.I. Yogyakarta 55293  
- **Telepon / Fax:** (0274) 621626  
- **WhatsApp Pelayanan:** 0896-1262-4627  
- **Email Resmi:** [desa.banyuraden@gmail.com](mailto:desa.banyuraden@gmail.com)  
- **Instagram:** [@kalurahan.banyuraden](https://www.instagram.com/kalurahan.banyuraden)  
- **YouTube:** [Kalurahan Banyuraden](https://www.youtube.com/@KalurahanBanyuraden)  
- **Facebook:** [Kalurahan Banyuraden](https://www.facebook.com/kalurahan.banyuraden.3)  

---
*Dikembangkan dengan dedikasi untuk transparansi dan kemajuan pelayanan warga Kalurahan Banyuraden.*
