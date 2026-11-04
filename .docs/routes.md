# Routing & Endpoint Directory — Portal Kalurahan Banyuraden

## 1. Rute Antarmuka Publik (Public Pages)

| Path | Deskripsi | Status | Akses |
|---|---|---|---|
| `/` | Beranda portal, hero banner, layanan cepat, berita terkini, pengumuman, dan IoT summary | STABLE | Publik |
| `/berita` | Katalog berita kalurahan dengan filter kategori, arsip bulanan, dan pencarian | STABLE | Publik |
| `/berita/[slug]` | Halaman artikel berita utuh dengan galeri foto responsif dan rekomendasi berita | STABLE | Publik |
| `/pengumuman` | Portal pengumuman resmi, agenda pamong, dan lowongan kalurahan | STABLE | Publik |
| `/profil` | Gambaran umum, sejarah desa, batas wilayah geografis, dan visi-misi | STABLE | Publik |
| `/pemerintah` | Struktur pemerintahan dan bagan organisasi pamong Kalurahan Banyuraden | STABLE | Publik |
| `/aparatur` | Direktori pamong kalurahan (Lurah, Carik, Kamituwo, Jagabaya, Ulu-Ulu, Dukuh) | STABLE | Publik |
| `/wilayah-administratif` | Peta interaktif batas wilayah 8 padukuhan menggunakan MapLibre GL | STABLE | Publik |
| `/statistik` | Dasbor statistik kependudukan (agama, piramida usia, pendidikan, pekerjaan, dll.) | STABLE | Publik |
| `/iot` | Monitoring stasiun cuaca dan telemetri lingkungan real-time via ThingSpeak | STABLE | Publik |
| `/potensi-desa` | Potensi UMKM lokal, cagar budaya, tradisi desa, dan pariwisata | STABLE | Publik |
| `/fasilitas` | Peta dan direktori fasilitas umum, tempat ibadah, sarana kesehatan & olahraga | STABLE | Publik |
| `/login` | Gerbang autentikasi staf internal dan administrator kalurahan | STABLE | Publik (Form) |

---

## 2. Rute API Internal (`/api/*`)

| Endpoint | Method | Fungsi & Upstream | Proteksi |
|---|---|---|---|
| `/api/external-news` | GET | Mengambil 20 berita terbaru dari `banyuradensid.slemankab.go.id` | Publik / Cache 10m |
| `/api/opensid-proxy` | GET | Proxy agregator untuk OpenSID & WP REST API (katalog artikel) | Publik / Cache 1h |
| `/api/opensid-berita` | GET | Adapter format OpenSID untuk consumer eksternal | Publik |
| `/api/pengumuman` | GET | Mengambil agenda resmi & pengumuman dari WP Kategori 3 | Publik |
| `/api/pengumuman` | POST | Pembuatan pengumuman baru ke database | 🔒 ADMIN Required |
| `/api/pengumuman/[id]` | PUT / DELETE | Perubahan dan penghapusan pengumuman | 🔒 ADMIN Required |
| `/api/berita` | GET | Daftar berita internal dari database | Publik |
| `/api/berita` | POST | Pembuatan berita baru ke database | 🔒 ADMIN Required |
| `/api/berita/[id]` | PUT / DELETE | Perubahan dan penghapusan berita | 🔒 ADMIN Required |
| `/api/iot/stream` | GET | Server-Sent Events (SSE) telemetry data 15s interval | Publik |
| `/api/iot/historical/[channelId]` | GET | Data riwayat ThingSpeak channel (numeric validated) | Publik / Rate-limited |
| `/api/auth/[...nextauth]` | POST / GET | Session & credential management via NextAuth / Auth.js | Publik / Rate-limited |
