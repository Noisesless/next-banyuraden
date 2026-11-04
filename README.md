<p align="center">
  <img src="public/images/logo.png" width="120" alt="Logo Resmi Kalurahan Banyuraden" />
</p>

# Portal Resmi Kalurahan Banyuraden

**Pusat Informasi & Layanan Digital Terpadu Kalurahan Banyuraden**  
*Kapanewon Gamping, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55293*  
🌐 **Portal Publik:** [https://banyuraden.smartdesa.net](https://banyuraden.smartdesa.net)

---

## 📌 Tentang Portal

Portal Resmi Kalurahan Banyuraden dikembangkan sebagai platform pelayanan publik dan keterbukaan informasi bagi seluruh warga masyarakat Banyuraden dan publik luas. Website ini memadukan berbagai kanal informasi resmi kalurahan, agenda kegiatan, transparansi data pembangunan, serta integrasi layanan kemasyarakatan dalam satu antarmuka yang modern, cepat, dan mudah diakses.

---

## ✨ Fitur & Layanan Utama

### 1. Informasi & Berita Terkini
Menyajikan publikasi liputan kegiatan pamong kalurahan, artikel pembangunan, serta agenda pengumuman resmi pemerintah kalurahan secara berkala.

### 2. Layanan Mandiri Kependudukan
Akses langsung ke portal layanan mandiri kependudukan untuk kemudahan warga dalam pengurusan administrasi surat-menyurat secara digital.

### 3. Layanan Pengaduan Masyarakat
Saluran aspirasi dan pengaduan warga yang terhubung langsung dengan sistem pelayanan penanganan pengaduan resmi kalurahan.

### 4. Layanan Ambulans Siaga Kalurahan
Informasi operasional dan kontak darurat layanan ambulans kalurahan 24 jam yang disediakan **bebas biaya (gratis)** bagi warga Kalurahan Banyuraden, mencakup kebutuhan rujukan medis dan pendampingan lansia (Layanan Lansia Terintegrasi).
- **Hotline Darurat / WhatsApp:** 0896-1262-4627
- **Telepon Kantor:** (0274) 621626

### 5. Transparansi SDGs Kalurahan
Penyajian data capaian indikator Tujuan Pembangunan Berkelanjutan (SDGs) Desa berbasis 18 kriteria arah pembangunan Permendesa No. 21 Tahun 2020.

### 6. Lapak Digital UMKM
Katalog etalase produk-produk unggulan karya pelaku usaha mikro, kecil, dan menengah (UMKM) dari 8 padukuhan di Kalurahan Banyuraden.

### 7. Inovasi SiPenTa
Integrasi program pencegahan dan pemantauan stunting balita kalurahan untuk mewujudkan generasi sehat Banyuraden.

### 8. Peta Geospasial Padukuhan
Peta interaktif wilayah administratif yang mencakup 8 Padukuhan: *Banyumeneng, Cokrowijayan, Dowangan, Guyangan, Kaliabu, Kanoman, Modinan, dan Sukunan*.

---

## 🛠️ Teknologi

- **Framework:** Next.js (App Router), React, TypeScript
- **Antarmuka & Styling:** Tailwind CSS, Radix UI
- **Basis Data:** Prisma ORM
- **Peta Digital:** MapLibre GL & GeoJSON

---

## 🚀 Panduan Memulai (Development Lokal)

### 1. Prasyarat
- Node.js (versi 20 atau lebih baru)
- npm (versi 10 atau lebih baru)

### 2. Instalasi
```bash
# Clone repositori
git clone https://github.com/Noisesless/next-banyuraden.git
cd next-banyuraden

# Instal dependensi
npm install
```

### 3. Konfigurasi Lingkungan
Salin berkas template environment:
```bash
cp .env.example .env.local
```
Sesuaikan variabel lingkungan yang diperlukan pada berkas `.env.local`.

### 4. Menjalankan Server Lokal
```bash
npm run dev
```
Buka peramban di [http://localhost:3000](http://localhost:3000) untuk melihat antarmuka website.

### 5. Kompilasi Produksi
```bash
npm run build
npm start
```

---

## 🔒 Standar Keamanan & Privasi

- **Enkripsi Transmisi:** Seluruh komunikasi data dilindungi dengan sertifikat SSL/TLS (HTTPS).
- **Perlindungan Data Warga:** Sistem tidak mengekspos data pribadi sensitif kependudukan ke ruang publik sesuai kaidah regulasi perlindungan data pribadi.
- **Sanitasi Konten:** Seluruh konten artikel publik disaring secara ketat dari potensi skrip berbahaya.
- **Tautan Aman:** Setiap tautan keluar menggunakan standar atribut keamanan untuk melindungi sesi pengguna.

---

## 📞 Sekretariat & Kontak Resmi

**Pemerintah Kalurahan Banyuraden**  
- **Alamat:** Jl. Ringroad Barat, Banyuraden, Kapanewon Gamping, Kabupaten Sleman, D.I. Yogyakarta 55293  
- **Telepon:** (0274) 621626  
- **Hotline Pelayanan & Ambulans:** 0896-1262-4627  
- **Email:** [desa.banyuraden@gmail.com](mailto:desa.banyuraden@gmail.com)  
- **Media Sosial:**  
  - Instagram: [@kalurahan.banyuraden](https://www.instagram.com/kalurahan.banyuraden)  
  - YouTube: [Kalurahan Banyuraden](https://www.youtube.com/@KalurahanBanyuraden)  
  - Facebook: [Kalurahan Banyuraden](https://www.facebook.com/kalurahan.banyuraden.3)

---
*Dikelola oleh Pemerintah Kalurahan Banyuraden untuk kemudahan pelayanan dan transparansi informasi publik.*
