# Dokumentasi Skema Database (Prisma ORM)

Dokumen ini menjelaskan struktur arsitektur database, skema relasional, dan model data yang digunakan pada **Portal Resmi Kalurahan Banyuraden**.

---

## 1. Konfigurasi Datasource

- **Engine:** MySQL / MariaDB (kompatibel InnoDB)
- **ORM:** Prisma Client (`@prisma/client`)
- **Connection URL:** Ditentukan melalui environment variable `DATABASE_URL` (format: `mysql://user:password@host:port/database`)
- **Penamaan Enums & Kolom:** Mengikuti konvensi Bahasa Indonesia yang deskriptif dan konsisten.

---

## 2. Enums Utama

| Enum Name | Nilai | Deskripsi |
|---|---|---|
| `PeranPengguna` | `ADMIN`, `STAFF`, `WARGA`, `PENGUNJUNG` | Level hak akses dan otorisasi sistem |
| `Status` | `DRAFT`, `PUBLISHED`, `ARCHIVED` | Status publikasi konten berita/artikel/dokumen |
| `Prioritas` | `RENDAH`, `NORMAL`, `TINGGI`, `PENTING` | Tingkat urgensi pengumuman dan peringatan |
| `JenisLayanan` | `KK`, `KTP`, `KELAHIRAN`, `KEMATIAN`, `SURAT_DOMISILI`, dll. | Klasifikasi permohonan surat administrasi warga |
| `StatusPermohonan`| `MENUNGGU`, `DIPROSES`, `SELESAI`, `DITOLAK` | Siklus hidup tracking berkas permohonan layanan |
| `StatusProyek` | `PERENCANAAN`, `BERJALAN`, `SELESAI`, `DITUNDA` | Pelacakan progres proyek pembangunan desa |
| `JenisLokasi` | `PEMERINTAHAN`, `KESEHATAN`, `PENDIDIKAN`, `IBADAH`, dll. | Kategori geolokasi fasilitas publik pada peta interaktif |

---

## 3. Entitas dan Tabel Inti

### A. Autentikasi & Akun
- **`Pengguna`**: Menyimpan kredensial admin dan pamong (email, password hash Argon2id/Bcrypt, role, avatar, session token).

### B. Konten & Informasi Publik
- **`Berita`**: Konten berita lokal internal kalurahan (judul, slug, konten HTML ter-sanitize, gambar cover, penulis, kategori, status).
- **`Pengumuman`**: Pengumuman penting dari pemerintah desa dengan tagging prioritas dan badge darurat.
- **`Agenda`**: Kalender kegiatan pamong, PKK, posyandu, dan rapat koordinasi padukuhan.
- **`Galeri` & `Album`**: Dokumentasi visual kegiatan masyarakat dan arsip foto pembangunan.

### C. Layanan & Pengaduan Warga
- **`LayananSurat`**: Master data formulir dan persyaratan administrasi kependudukan.
- **`PermohonanSurat`**: Rekod pengajuan surat oleh warga beserta lampiran berkas dan status verifikasi.
- **`Pengaduan`**: Modul aspirasi dan keluhan publik dengan tracking respon pamong.

### D. Geospasial & Pemetaan Wilayah
- **`Padukuhan`**: Data 8 padukuhan di Banyuraden (Banyumeneng, Cokrowijayan, Dowangan, Guyangan, Kaliabu, Kanoman, Modinan, Sukunan).
- **`Fasilitas`**: Titik koordinat Latitude/Longitude fasilitas pendidikan, kesehatan, tempat ibadah, dan sarana umum.

### E. SDGs & Statistik Kalurahan
- **`IndikatorSDGs`**: Skor dan pencapaian 18 target SDGs Desa Banyuraden.
- **`StatistikKependudukan`**: Agregasi demografi penduduk per dusun, rentang usia, pendidikan, dan pekerjaan.

---

## 4. Alur Pemeliharaan & Migrasi Database

```bash
# Generate Prisma Client setelah perubahan skema
npx prisma generate

# Menjalankan migrasi pada lingkungan development
npx prisma migrate dev --name <nama_migrasi>

# Menjalankan push skema aman di VPS produksi
npx prisma db push

# Menjalankan seeding data awal
npx prisma db seed
```

> ⚠️ **Catatan Keamanan:** File `.env` yang memuat kredensial `DATABASE_URL` tidak boleh dikomit ke repositori publik Git dan harus dilindungi dengan permission ketat (`chmod 600 .env`) di server produksi.
