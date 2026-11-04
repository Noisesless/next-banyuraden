# Spesifikasi API — Portal Kalurahan Banyuraden

## 1. `/api/external-news`
Mengambil artikel berita aktual dari portal resmi `https://banyuradensid.slemankab.go.id/` (dengan fallback terpadu ke `https://banyuraden.sleman-desa.id/`).

- **Method:** `GET`
- **Query Parameters:**
  - `limit` (optional, default: `20`): Jumlah berita yang ingin diambil.
  - `search` (optional): Kata kunci pencarian judul/konten.
  - `category` (optional): ID kategori WordPress.
- **Contoh Respons (HTTP 200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "8830",
      "title": "WARGA SEHAT, LINGKUNGAN KUAT, KOORDINASI RUTIN KADER KESEHATAN BANYURADEN",
      "slug": "warga-sehat-lingkungan-kuat-koordinasi-rutin-kader-kesehatan-banyuraden",
      "excerpt": "Dalam upaya mewujudkan derajat kesehatan masyarakat yang optimal...",
      "featuredImage": "https://banyuradensid.slemankab.go.id/wp-content/uploads/sites/4/2026/11/FB_IMG_1793668630597-scaled.jpg",
      "readingTime": 3,
      "category": "Berita",
      "publishedAt": "2026-11-03T01:19:05.000Z",
      "link": "/berita/warga-sehat-lingkungan-kuat-koordinasi-rutin-kader-kesehatan-banyuraden"
    }
  ],
  "total": 1008
}
```

---

## 2. `/api/pengumuman`
Menyajikan pengumuman dan agenda resmi pamong Kalurahan Banyuraden dari upstream Kategori 3 WordPress REST API.

- **Method:** `GET`
- **Query Parameters:**
  - `halaman` (optional, default: `1`): Nomor halaman pagination.
  - `limit` (optional, default: `20`): Jumlah data per halaman.
  - `kategori` (optional): Filter kategori (`Pengumuman Resmi`, `Agenda Kegiatan`, `Lowongan & Pamong`).
  - `search` (optional): Pencarian teks.
- **Contoh Respons (HTTP 200):**
```json
{
  "success": true,
  "message": "Daftar agenda & pengumuman berhasil dimuat",
  "data": [
    {
      "id": 8820,
      "judul": "📢 PENGUMUMAN RESMI 📢",
      "prioritas": "TINGGI",
      "kategori": "Pengumuman Resmi",
      "publishedAt": "2026-11-02T04:11:52.000Z",
      "penulis": "Panitia Pengangkatan Pamong Kalurahan",
      "featuredImage": "https://banyuradensid.slemankab.go.id/wp-content/uploads/sites/4/2026/11/PANITIA-PENGANGKATAN-PAMONG-KALURAHAN.jpg-1.jpeg"
    }
  ],
  "meta": {
    "total": 52,
    "halaman": 1,
    "perHalaman": 20,
    "totalHalaman": 3
  }
}
```

---

## 3. `/api/opensid-proxy`
Endpoint jembatan (proxy) dengan caching internal untuk konsumsi antarmuka halaman berita, sidebar, dan arsip bulanan.

- **Method:** `GET`
- **Query Parameters:**
  - `slug` (optional): Pencarian langsung berdasarkan slug artikel.
  - `search` (optional): Pencarian global.
- **Format Respons:** Kompatibel dengan schema JSON:API OpenSID (`{ data: [ { id, type: 'artikel', attributes: { ... } } ] }`).
