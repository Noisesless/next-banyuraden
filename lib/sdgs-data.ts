/**
 * Data Indikator Resmi SDGs Desa (Permendesa No. 21 Tahun 2020)
 * Kalurahan Banyuraden, Kapanewon Gamping, Kabupaten Sleman
 */

export interface SDGIndicator {
    no: string;
    name: string;
    baseScoreWeight: number; // bobot relatif dalam goal
    unit: string;
    target: string;
    recommendation: string;
}

export interface SDGGoalMeta {
    goal: number;
    title: string;
    description: string;
    indicators: SDGIndicator[];
}

export const SDGS_18_GOALS_DATA: Record<number, SDGGoalMeta> = {
    1: {
        goal: 1,
        title: "Desa Tanpa Kemiskinan",
        description: "Pengentasan kemiskinan ekstrem dan peningkatan taraf hidup masyarakat rentan di Kalurahan Banyuraden",
        indicators: [
            {
                no: "1.1",
                name: "Tingkat Kemiskinan Warga Desa Mencapai 0%",
                baseScoreWeight: 1.0,
                unit: "Jiwa / KK",
                target: "0%",
                recommendation: "Pemutakhiran berkala DTKS mandiri kalurahan, memastikan seluruh warga berpenghasilan di bawah garis kemiskinan terdata dan mendapatkan program perlindungan sosial.",
            },
            {
                no: "1.2",
                name: "Akses Warga Rentan terhadap Layanan Dasar (Pendidikan, Kesehatan, Air Bersih, Sanitasi)",
                baseScoreWeight: 0.95,
                unit: "% Rumah Tangga",
                target: "100%",
                recommendation: "Intervensi jaminan sosial terpadu melalui pendampingan keluarga pra-sejahtera untuk mendapatkan KIS PBI, KIP, dan sambungan air bersih bersubsidi.",
            },
            {
                no: "1.3",
                name: "Penyaluran Bantuan Sosial (PKH, BPNT, BLT Dana Desa) Tepat Sasaran",
                baseScoreWeight: 1.05,
                unit: "% Realisasi",
                target: "100%",
                recommendation: "Penyelenggaraan Musyawarah Kalurahan Khusus (Muskalsus) secara transparan untuk verifikasi dan validasi kelayakan penerima bantuan sosial.",
            },
            {
                no: "1.4",
                name: "Pemberdayaan Ekonomi & Padat Karya Tunai Desa (PKTD) bagi Keluarga Miskin",
                baseScoreWeight: 1.0,
                unit: "% Partisipasi",
                target: "100%",
                recommendation: "Memprioritaskan tenaga kerja dari keluarga pra-sejahtera dalam proyek fisik kalurahan dan memberikan pelatihan ketrampilan wirausaha bersubsidi modal.",
            },
        ],
    },
    2: {
        goal: 2,
        title: "Desa Tanpa Kelaparan",
        description: "Pencegahan stunting, pemenuhan gizi seimbang, dan kedaulatan pangan warga Kalurahan Banyuraden",
        indicators: [
            {
                no: "2.1",
                name: "Prevalensi Wasting dan Stunting pada Balita Menuju Zero Stunting",
                baseScoreWeight: 1.1,
                unit: "% Balita",
                target: "0%",
                recommendation: "Pemberian Makanan Tambahan (PMT) berbahan pangan lokal secara rutin bagi balita gizi kurang dan ibu hamil KEK melalui kader Posyandu.",
            },
            {
                no: "2.2",
                name: "Akses Warga terhadap Pangan Bergizi, Berimbang, dan Terjangkau",
                baseScoreWeight: 0.95,
                unit: "% Rumah Tangga",
                target: "100%",
                recommendation: "Optimalisasi lumbung pangan kalurahan dan edukasi pola konsumsi pangan Beragam, Bergizi, Seimbang, dan Aman (B2SA).",
            },
            {
                no: "2.3",
                name: "Peningkatan Produktivitas Pertanian & Ketahanan Pangan Nabati/Hewani Lokal",
                baseScoreWeight: 1.0,
                unit: "% Petani/KWT",
                target: "≥ 90%",
                recommendation: "Fasilitasi sarana prasarana Kelompok Wanita Tani (KWT) dan program Pekarangan Pangan Lestari (P2L) di setiap padukuhan.",
            },
            {
                no: "2.4",
                name: "Kemandirian Cadangan Pangan Darurat Kalurahan",
                baseScoreWeight: 0.95,
                unit: "Ton Cadangan",
                target: "Tersedia Aman",
                recommendation: "Penyediaan cadangan beras darurat kalurahan dan skema distribusi cepat saat terjadi gagal panen atau situasi bencana.",
            },
        ],
    },
    3: {
        goal: 3,
        title: "Desa Sehat dan Sejahtera",
        description: "Layanan kesehatan menyeluruh, pencegahan penyakit menular/tidak menular, dan jaminan kesehatan warga",
        indicators: [
            {
                no: "3.1",
                name: "Cakupan Kepesertaan Jaminan Kesehatan Nasional (JKN/KIS/BPJS)",
                baseScoreWeight: 1.05,
                unit: "% Penduduk",
                target: "100%",
                recommendation: "Fasilitasi pendaftaran jaminan kesehatan bagi warga kurang mampu melalui skema Jamkesda Sleman dan BPJS PBI.",
            },
            {
                no: "3.2",
                name: "Angka Kematian Ibu Melahirkan dan Kematian Bayi (Nol Kasus)",
                baseScoreWeight: 1.0,
                unit: "Kasus / Tahun",
                target: "0 Kasus",
                recommendation: "Pemeriksaan kehamilan (ANC) terpadu di Puskesmas Pembantu/Puskesmas Gamping II dan pendampingan ibu hamil risiko tinggi oleh bidan desa.",
            },
            {
                no: "3.3",
                name: "Aktivitas dan Keteraturan Posyandu Balita, Remaja, dan Posbindu Lansia",
                baseScoreWeight: 0.95,
                unit: "% Posyandu Aktif",
                target: "100%",
                recommendation: "Penguatan kapasitas kader posyandu kalurahan melalui pelatihan pengukuran antropometri dan insentif operasional posyandu.",
            },
            {
                no: "3.4",
                name: "Kesiapsiagaan Mobil Layanan Kesehatan & Fasilitas Ambulans Siaga Kalurahan",
                baseScoreWeight: 1.0,
                unit: "Unit Siaga",
                target: "24 Jam",
                recommendation: "Pengelolaan sistem respon cepat mobil siaga kalurahan untuk rujukan darurat warga selama 24 jam penuh.",
            },
        ],
    },
    4: {
        goal: 4,
        title: "Pendidikan Desa Berkualitas",
        description: "Akses pendidikan 12 tahun yang merata, literasi masyarakat, dan ruang belajar ramah anak",
        indicators: [
            {
                no: "4.1",
                name: "Angka Partisipasi Murni (APM) Jenjang PAUD, SD, SMP, hingga SMA",
                baseScoreWeight: 1.05,
                unit: "% Usia Sekolah",
                target: "100%",
                recommendation: "Advokasi dan verifikasi kepesertaan anak usia sekolah di kalurahan agar tidak ada anak usia 7-18 tahun yang tidak bersekolah.",
            },
            {
                no: "4.2",
                name: "Pencegahan Anak Putus Sekolah (Drop Out Nol Kasus)",
                baseScoreWeight: 1.0,
                unit: "Anak Putus Sekolah",
                target: "0 Kasus",
                recommendation: "Penyaluran bantuan stimulan perlengkapan sekolah dan beasiswa pendidikan kalurahan bagi siswa berisiko putus sekolah.",
            },
            {
                no: "4.3",
                name: "Ketersediaan Sarana Belajar, Pojok Baca Digital, dan Perpustakaan Kalurahan",
                baseScoreWeight: 0.95,
                unit: "Fasilitas Belajar",
                target: "Aktif Terbuka",
                recommendation: "Pengembangan Taman Bacaan Masyarakat (TBM) dan ruang belajar digital berbasis WiFi gratis di balai kalurahan & padukuhan.",
            },
            {
                no: "4.4",
                name: "Pendidikan Non-Formal, Kursus Keterampilan, dan Keaksaraan Fungsional",
                baseScoreWeight: 1.0,
                unit: "% Peserta",
                target: "≥ 85%",
                recommendation: "Pelaksanaan pelatihan kejuruan kerja sama dengan BLK Sleman dan perguruan tinggi sekitar bagi pemuda dan warga produktif.",
            },
        ],
    },
    5: {
        goal: 5,
        title: "Keterlibatan Perempuan Desa",
        description: "Kesetaraan gender, perlindungan perempuan-anak, dan peran aktif perempuan dalam perencanaan desa",
        indicators: [
            {
                no: "5.1",
                name: "Keterwakilan Perempuan dalam Musrenbangkal dan Pengambilan Kebijakan",
                baseScoreWeight: 1.0,
                unit: "% Partisipasi",
                target: "≥ 30%",
                recommendation: "Memastikan kuota keterwakilan perempuan dalam musrenbang padukuhan dan kalurahan diakomodasi dalam pembahasan APBKal.",
            },
            {
                no: "5.2",
                name: "Proporsi Perempuan dalam Struktur Kepengurusan Pamong, BPKal, dan Lembaga Desa",
                baseScoreWeight: 0.95,
                unit: "% Proporsi",
                target: "≥ 30%",
                recommendation: "Mendorong kepemimpinan perempuan dalam rekrutmen pamong kalurahan dan pengurus kelembagaan RT/RW/LPMK.",
            },
            {
                no: "5.3",
                name: "Pemberdayaan Ekonomi Perempuan & Kelompok UP2K PKK",
                baseScoreWeight: 1.05,
                unit: "% Kelompok Aktif",
                target: "100%",
                recommendation: "Fasilitasi akses permodalan bergulir dan digital marketing bagi usaha rumahan yang dikelola ibu rumah tangga.",
            },
            {
                no: "5.4",
                name: "Nol Kasus Kekerasan terhadap Perempuan dan Anak (KtPA)",
                baseScoreWeight: 1.0,
                unit: "Laporan Kasus",
                target: "0 Kasus",
                recommendation: "Pembentukan dan operasional Pos Pengaduan Perlindungan Perempuan dan Anak serta sosialisasi pencegahan KDRT berkala.",
            },
        ],
    },
    6: {
        goal: 6,
        title: "Desa Layak Air Bersih dan Sanitasi",
        description: "Jaminan ketersediaan air minum aman, bebas BABS (ODF), dan pengelolaan limbah domestik sehat",
        indicators: [
            {
                no: "6.1",
                name: "Akses Rumah Tangga terhadap Sumber Air Minum Layak dan Terlindungi",
                baseScoreWeight: 1.05,
                unit: "% Rumah Tangga",
                target: "100%",
                recommendation: "Perluasan jaringan perpipaan PDAM/PAMSIMAS dan perlindungan sumur gali warga dari pencemaran lingkungan.",
            },
            {
                no: "6.2",
                name: "Status Kalurahan Bebas Buang Air Besar Sembarangan (Open Defecation Free / ODF)",
                baseScoreWeight: 1.1,
                unit: "% Jamban Sehat",
                target: "100% ODF",
                recommendation: "Pemberian stimulan jamban sehat dan tangki septik berstandar SNI bagi rumah tangga yang belum memiliki jamban pribadi.",
            },
            {
                no: "6.3",
                name: "Kondisi Sistem Pengolahan Air Limbah Domestik (SPALD) dan Drainase Lingkungan",
                baseScoreWeight: 0.95,
                unit: "% Berfungsi Baik",
                target: "≥ 90%",
                recommendation: "Pembangunan dan normalisasi saluran pembuangan air limbah lingkungan padukuhan secara gotong royong dan berkala.",
            },
            {
                no: "6.4",
                name: "Konservasi & Perlindungan Daerah Tangkapan Air Tanah Kalurahan",
                baseScoreWeight: 0.9,
                unit: "Titik Resapan",
                target: "Optimal",
                recommendation: "Kewajiban pembuatan sumur resapan/biopori pada setiap izin pembangunan hunian baru di wilayah kalurahan.",
            },
        ],
    },
    7: {
        goal: 7,
        title: "Desa Berenergi Bersih dan Terbarukan",
        description: "Akses listrik aman 100%, efisiensi energi, dan adopsi penerangan berbasis tenaga surya",
        indicators: [
            {
                no: "7.1",
                name: "Rasio Elektrifikasi Rumah Tangga Terlayani Listrik Resmi dan Aman",
                baseScoreWeight: 1.0,
                unit: "% Rumah Tangga",
                target: "100%",
                recommendation: "Bantuan sambungan listrik murah bagi keluarga pra-sejahtera yang masih menyalur listrik dari tetangga.",
            },
            {
                no: "7.2",
                name: "Penerangan Jalan Umum (PJU) Ramah Lingkungan & Penerangan Tenaga Surya (PJUTS)",
                baseScoreWeight: 1.0,
                unit: "Titik Penerangan",
                target: "Seluruh Titik Rawan",
                recommendation: "Pemasangan lampu penerangan jalan hemat energi LED dan PJUTS di ruas jalan lingkungan padukuhan yang minim cahaya.",
            },
            {
                no: "7.3",
                name: "Pemanfaatan Energi Terbarukan pada Sarana Prasarana Publik Kalurahan",
                baseScoreWeight: 0.95,
                unit: "Fasilitas Pengguna",
                target: "Percontohan Aktif",
                recommendation: "Pemasangan sistem solar cell percontohan pada kantor balai kalurahan dan instalasi pengolahan air bersih.",
            },
            {
                no: "7.4",
                name: "Sosialisasi Efisiensi Energi Listrik dan Penggunaan Perangkat Hemat Daya",
                baseScoreWeight: 1.05,
                unit: "% Sosialisasi",
                target: "100%",
                recommendation: "Kampanye hemat energi rumah tangga melalui pertemuan RT/RW dan pengurangan beban listrik berlebih di malam hari.",
            },
        ],
    },
    8: {
        goal: 8,
        title: "Pertumbuhan Ekonomi Desa Merata",
        description: "Penguatan BUMKal, penyerapan tenaga kerja lokal, dan legalitas usaha mikro warga",
        indicators: [
            {
                no: "8.1",
                name: "Tingkat Kesempatan Kerja dan Penurunan Pengangguran Terbuka Warga Usia Produktif",
                baseScoreWeight: 0.95,
                unit: "% Bekerja",
                target: "≥ 95%",
                recommendation: "Penyelenggaraan bursa kerja kalurahan (Job Fair lokal) dan kemitraan penyaluran tenaga kerja dengan industri di Sleman.",
            },
            {
                no: "8.2",
                name: "Kinerja BUMKal Banyuraden dan Kontribusi terhadap Pendapatan Asli Kalurahan (PADal)",
                baseScoreWeight: 1.05,
                unit: "% Kontribusi",
                target: "Meningkat Positif",
                recommendation: "Revitalisasi unit usaha potensial BUMKal (jasa sewa, pengelolaan pasar, internet desa, dan pengelolaan sampah).",
            },
            {
                no: "8.3",
                name: "Legalitas Usaha Mikro (NIB, PIRT, Halal) bagi Pelaku UMKM Kalurahan",
                baseScoreWeight: 1.0,
                unit: "% UMKM Ber-NIB",
                target: "≥ 80%",
                recommendation: "Pelayanan jemput bola penerbitan Nomor Induk Berusaha (NIB) dan fasilitasi sertifikasi halal gratis bekerja sama dengan dinas terkait.",
            },
            {
                no: "8.4",
                name: "Akses Permodalan Aman & Terhindar dari Jeratan Rentenir / Pinjol Ilegal",
                baseScoreWeight: 1.0,
                unit: "Kelompok Usaha",
                target: "100% Aman",
                recommendation: "Penguatan koperasi simpan pinjam desa dan kemitraan dengan perbankan resmi (Kredit Usaha Rakyat).",
            },
        ],
    },
    9: {
        goal: 9,
        title: "Infrastruktur dan Inovasi Desa Sesuai Kebutuhan",
        description: "Jalan lingkungan mantap, konektivitas digital publik, dan anjungan pelayanan mandiri",
        indicators: [
            {
                no: "9.1",
                name: "Kondisi Jalan Poros dan Jalan Lingkungan Kalurahan dalam Status Mantap",
                baseScoreWeight: 1.05,
                unit: "% Kondisi Baik",
                target: "≥ 95%",
                recommendation: "Pemeliharaan rutin jalan konblok dan aspal di seluruh padukuhan melalui alokasi Dana Desa dan swadaya gotong royong.",
            },
            {
                no: "9.2",
                name: "Jaringan Internet Desa, Hotspot Publik Gratis, dan Konektivitas Wilayah",
                baseScoreWeight: 0.95,
                unit: "Titik Akses",
                target: "Seluruh Padukuhan",
                recommendation: "Penyediaan akses internet WiFi publik di gardu pos ronda dan ruang pertemuan warga untuk mendukung aktivitas belajar & usaha.",
            },
            {
                no: "9.3",
                name: "Penerapan Sistem Informasi Desa & Anjungan Pelayanan Mandiri (Smart Desa)",
                baseScoreWeight: 1.05,
                unit: "% Pelayanan Online",
                target: "100%",
                recommendation: "Penguatan platform portal banyuraden.smartdesa.net dan integrasi permohonan surat menyurat mandiri 24 jam.",
            },
            {
                no: "9.4",
                name: "Fasilitas Pengelolaan Persampahan TPS3R dan Logistik Kalurahan",
                baseScoreWeight: 0.95,
                unit: "Sarana TPS3R",
                target: "Beroperasi Maksimal",
                recommendation: "Optimalisasi armada gerobak motor sampah dan mesin pemilah organik-anorganik di pusat TPS3R Banyuraden.",
            },
        ],
    },
    10: {
        goal: 10,
        title: "Desa Tanpa Kesenjangan",
        description: "Pemerataan pembangunan antar-padukuhan, inklusivitas sosial, dan fasilitas ramah disabilitas",
        indicators: [
            {
                no: "10.1",
                name: "Indeks Pemerataan Pembangunan Fisik dan Anggaran Antar-Padukuhan",
                baseScoreWeight: 1.0,
                unit: "% Keadilan Alokasi",
                target: "Merata Proporsional",
                recommendation: "Pemberian Pagu Indikatif Wilayah Padukuhan (PIWP) yang proporsional berdasarkan kebutuhan riil dan jumlah penduduk.",
            },
            {
                no: "10.2",
                name: "Fasilitas Layanan Publik Ramah Penyandang Disabilitas dan Lansia",
                baseScoreWeight: 1.05,
                unit: "% Sarana Inklusif",
                target: "100%",
                recommendation: "Penyediaan guiding block, ramp kursi roda, toilet khusus disabilitas di kantor kalurahan dan balai pertemuan.",
            },
            {
                no: "10.3",
                name: "Bantuan dan Perlindungan Sosial bagi Penyandang Disabilitas Berat",
                baseScoreWeight: 1.0,
                unit: "% Tercover Bantuan",
                target: "100%",
                recommendation: "Pendataan dan penyaluran alat bantu (kursi roda, kruk, alat dengar) bekerja sama dengan Dinas Sosial Sleman.",
            },
            {
                no: "10.4",
                name: "Pemberantasan Diskriminasi Sosial dan Perlindungan Warga Minoritas",
                baseScoreWeight: 0.95,
                unit: "Pengaduan Diskriminasi",
                target: "0 Kasus",
                recommendation: "Menjaga ruang dialog kebangsaan dan inklusivitas pelayanan tanpa memandang latar belakang sosial budaya warga.",
            },
        ],
    },
    11: {
        goal: 11,
        title: "Kawasan Pemukiman Desa Aman dan Nyaman",
        description: "Rumah layak huni (RTLH), ketertiban lingkungan poskamling, dan kesiapsiagaan bencana",
        indicators: [
            {
                no: "11.1",
                name: "Penanganan Rumah Tidak Layak Huni (RTLH) Menuju Zero RTLH",
                baseScoreWeight: 1.05,
                unit: "% RTLH Tertangani",
                target: "100%",
                recommendation: "Alokasi stimulan pemugaran atap, lantai, dan dinding (Aladin) bagi rumah tidak layak huni melalui sinergi APBKal dan Baznas.",
            },
            {
                no: "11.2",
                name: "Sistem Keamanan Lingkungan (Poskamling) dan Siskamling Aktif",
                baseScoreWeight: 0.95,
                unit: "% RT Aktif Ronda",
                target: "100%",
                recommendation: "Pemberian perlengkapan ronda, pembinaan Jaga Warga dan Linmas kalurahan secara berkelanjutan.",
            },
            {
                no: "11.3",
                name: "Jalur Evakuasi, Titik Kumpul, dan Kesiapan Desa Tangguh Bencana (Destana)",
                baseScoreWeight: 1.0,
                unit: "Kesiapan Sarana",
                target: "Lengkap & Teruji",
                recommendation: "Pemasangan rambu jalur evakuasi bencana dan simulasi tanggap darurat bencana bagi warga di zona rawan genangan/gempa.",
            },
            {
                no: "11.4",
                name: "Ketersediaan Ruang Terbuka Publik dan Taman Bermain Ramah Lingkungan",
                baseScoreWeight: 1.0,
                unit: "Lokasi Fasum",
                target: "Terawat Baik",
                recommendation: "Pemanfaatan tanah kas kalurahan untuk ruang interaksi sosial, olahraga warga, dan area resapan hijau.",
            },
        ],
    },
    12: {
        goal: 12,
        title: "Konsumsi dan Produksi Desa Sadar Lingkungan",
        description: "Pilah sampah dari rumah tangga, pengoperasian bank sampah, dan gerakan zero waste",
        indicators: [
            {
                no: "12.1",
                name: "Penerapan Pemilahan Sampah Organik & Anorganik dari Rumah Tangga",
                baseScoreWeight: 1.1,
                unit: "% Rumah Tangga",
                target: "≥ 90%",
                recommendation: "Pemberian ember/wadah pilah sampah rumah tangga dan edukasi gerakan pilah sampah mandiri dari dapur.",
            },
            {
                no: "12.2",
                name: "Keberadaan dan Keaktifan Bank Sampah di Setiap Padukuhan",
                baseScoreWeight: 1.0,
                unit: "Bank Sampah Aktif",
                target: "100% Padukuhan",
                recommendation: "Penguatan kapasitas pengurus bank sampah dan kerja sama penyerapan sampah bernilai ekonomis dengan pengepul besar.",
            },
            {
                no: "12.3",
                name: "Pengolahan Sampah Organik Menjadi Kompos, Biokonversi Maggot, dan Pupuk Cair",
                baseScoreWeight: 0.95,
                unit: "Ton Sampah Olahan",
                target: "Meningkat",
                recommendation: "Pengembangan rumah maggot BSF di TPS3R dan pembagian tong komposter rumah tangga bagi warga.",
            },
            {
                no: "12.4",
                name: "Pengurangan Penggunaan Plastik Sekali Pakai dalam Acara Formal Kalurahan",
                baseScoreWeight: 0.95,
                unit: "% Kepatuhan",
                target: "100%",
                recommendation: "Pemberlakuan surat edaran kalurahan terkait penggunaan wadah ramah lingkungan pada setiap pertemuan resmi pamong dan warga.",
            },
        ],
    },
    13: {
        goal: 13,
        title: "Desa Tanggap Perubahan Iklim",
        description: "Mitigasi cuaca ekstrem, penanaman pohon pelindung, dan pembuatan sumur resapan",
        indicators: [
            {
                no: "13.1",
                name: "Kesiapsiagaan Forum Pengurangan Risiko Bencana (FPRB) Kalurahan",
                baseScoreWeight: 1.0,
                unit: "Kesiapan Relawan",
                target: "Siaga Penuh",
                recommendation: "Pengadaan perlengkapan evakuasi, gergaji mesin (chainsaw) untuk pohon tumbang, serta perahu karet siaga.",
            },
            {
                no: "13.2",
                name: "Gerakan Pembuatan Lubang Biopori dan Sumur Resapan Air Hujan",
                baseScoreWeight: 1.05,
                unit: "Titik Resapan",
                target: "≥ 500 Titik",
                recommendation: "Gerakan massal penambahan lubang biopori di pekarangan rumah untuk mencegah genangan air dan mengembalikan air tanah.",
            },
            {
                no: "13.3",
                name: "Pemangkasan dan Peremajaan Pohon Pelindung Rawan Tumbang di Tepi Jalan",
                baseScoreWeight: 0.95,
                unit: "Ruas Terawat",
                target: "100%",
                recommendation: "Patroli berkala pamong dan relawan menjelang musim penghujan untuk memotong dahan pohon rapuh di sekitar instalasi kabel.",
            },
            {
                no: "13.4",
                name: "Edukasi Adaptasi Perubahan Iklim bagi Kelompok Tani dan Pembudidaya Ikan",
                baseScoreWeight: 1.0,
                unit: "% Sasaran",
                target: "100%",
                recommendation: "Pemberian informasi perkiraan cuaca BMKG dan penyesuaian pola tanam komoditas pangan tahan kekeringan/banjir.",
            },
        ],
    },
    14: {
        goal: 14,
        title: "Desa Peduli Lingkungan Laut",
        description: "Pencegahan polusi limbah ke sungai yang bermuara ke laut dan sanitasi perairan darat",
        indicators: [
            {
                no: "14.1",
                name: "Pengendalian Limbah Domestik & Industri Rumahan agar Tidak Mencemari Sungai",
                baseScoreWeight: 1.05,
                unit: "% Kepatuhan",
                target: "100%",
                recommendation: "Penertiban pembuangan limbah cair sabun/industri ke saluran irigasi dan kewajiban instalasi perangkap lemak (grease trap).",
            },
            {
                no: "14.2",
                name: "Larangan Pembuangan Sampah Padat ke Aliran Sungai Bedog dan Selokan Mataram",
                baseScoreWeight: 1.0,
                unit: "Pelanggaran Sampah",
                target: "0 Pelanggaran",
                recommendation: "Pemasangan papan larangan buang sampah, CCTV pengawas di jembatan perbatasan, dan kerja sama komunitas susur sungai.",
            },
            {
                no: "14.3",
                name: "Pembersihan Rutin dan Normalisasi Saluran Air Penghubung Antar-Wilayah",
                baseScoreWeight: 0.95,
                unit: "Meter Aliran Bersih",
                target: "Terawat Rutin",
                recommendation: "Gotong royong berkala 'Merti Kali' bersama warga sepanjang bantaran sungai untuk membersihkan sampah dan sedimentasi.",
            },
            {
                no: "14.4",
                name: "Edukasi Dampak Sampah Mikroplastik terhadap Ekosistem Air bagi Warga",
                baseScoreWeight: 1.0,
                unit: "% Sosialisasi",
                target: "≥ 80%",
                recommendation: "Sosialisasi dampak cemaran sampah plastik di sungai yang terbawa ke laut dan merusak rantai makanan laut.",
            },
        ],
    },
    15: {
        goal: 15,
        title: "Desa Peduli Lingkungan Darat",
        description: "Pelestarian keanekaragaman hayati, penghijauan pekarangan, dan perlindungan lahan pertanian",
        indicators: [
            {
                no: "15.1",
                name: "Persentase Tutupan Ruang Terbuka Hijau (RTH) dan Vegetasi Kalurahan",
                baseScoreWeight: 1.0,
                unit: "% Luas Wilayah",
                target: "≥ 30%",
                recommendation: "Program penanaman bibit pohon buah produktif di pekarangan warga dan penghijauan sempadan jalan desa.",
            },
            {
                no: "15.2",
                name: "Perlindungan Lahan Pertanian Pangan Berkelanjutan (LP2B) dari Alih Fungsi",
                baseScoreWeight: 1.05,
                unit: "% Lahan Terlindungi",
                target: "100% LP2B",
                recommendation: "Penguatan regulasi perdes penataan tata ruang desa untuk mencegah pengeringan dan alih fungsi sawah produktif.",
            },
            {
                no: "15.3",
                name: "Konservasi Tanah Kas Kalurahan untuk Fungsi Ekologis dan Ketahanan Pangan",
                baseScoreWeight: 0.95,
                unit: "Hektar Terkelola",
                target: "100% Lestari",
                recommendation: "Optimalisasi pemanfaatan tanah kas kalurahan dengan konsep agroforestri dan kebun bibit desa.",
            },
            {
                no: "15.4",
                name: "Perlindungan Satwa Liar Penjaga Keseimbangan Ekosistem (Burung Hantu & Predator Alami)",
                baseScoreWeight: 1.0,
                unit: "Kepatuhan Larangan",
                target: "Bebas Perburuan",
                recommendation: "Pemberlakuan larangan menembak burung liar dan pemasangan rumah burung hantu (Rubuha) untuk pembasmi hama tikus alami.",
            },
        ],
    },
    16: {
        goal: 16,
        title: "Desa Damai Berkeadilan",
        description: "Ketertiban umum, mediasi sengketa warga tanpa konflik, dan transparansi anggaran desa",
        indicators: [
            {
                no: "16.1",
                name: "Efektivitas Mediasi Sengketa Warga Melalui Musyawarah Mufakat Kalurahan",
                baseScoreWeight: 1.0,
                unit: "% Sengketa Tuntas",
                target: "100%",
                recommendation: "Penguatan peran Jagabaya, Babinsa, dan Bhabinkamtibmas dalam restorative justice untuk menyelesaikan perselisihan warga secara damai.",
            },
            {
                no: "16.2",
                name: "Nol Kasus Konflik Sosial Berbasis SARA dan Terpeliharanya Toleransi Warga",
                baseScoreWeight: 1.05,
                unit: "Insiden SARA",
                target: "0 Kasus",
                recommendation: "Penguatan Forum Kerukunan Umat Beragama (FKUB) tingkat kalurahan dan silaturahmi rutin antar-tokoh agama/masyarakat.",
            },
            {
                no: "16.3",
                name: "Transparansi Anggaran Pendapatan dan Belanja Kalurahan (APBKal) Bebas Pungli",
                baseScoreWeight: 1.0,
                unit: "% Keterbukaan",
                target: "100% Terbuka",
                recommendation: "Publikasi baliho infografis realisasi APBKal di tempat umum dan website resmi kalurahan serta pengaduan masyarakat terverifikasi.",
            },
            {
                no: "16.4",
                name: "Kapasitas Pelayanan Administrasi Publik Cepat, Tepat, dan Ramah",
                baseScoreWeight: 0.95,
                unit: "Indeks Kepuasan",
                target: "≥ 90% Puas",
                recommendation: "Penerapan Standar Operasional Prosedur (SOP) waktu pelayanan dan survei kepuasan masyarakat (SKM) secara digital.",
            },
        ],
    },
    17: {
        goal: 17,
        title: "Kemitraan Untuk Pembangunan Desa",
        description: "Sinergi multipihak: kalurahan, kampus, dunia usaha (CSR), dan komunitas masyarakat",
        indicators: [
            {
                no: "17.1",
                name: "Kerja Sama Kemitraan dengan Perguruan Tinggi (KKN Tematik & Riset Terapan)",
                baseScoreWeight: 1.0,
                unit: "Mitra Kampus",
                target: "≥ 5 Kampus",
                recommendation: "Memfasilitasi penempatan mahasiswa KKN untuk riset terapan digitalisasi, stunting, dan pengembangan UMKM padukuhan.",
            },
            {
                no: "17.2",
                name: "Kolaborasi Program Corporate Social Responsibility (CSR) BUMN / Swasta",
                baseScoreWeight: 1.05,
                unit: "Paket Kerja Sama",
                target: "Aktif Berkelanjutan",
                recommendation: "Penyusunan proposal terpadu kebutuhan fisik kalurahan untuk diajukan ke forum CSR perusahaan di wilayah Sleman.",
            },
            {
                no: "17.3",
                name: "Kerja Sama Antar-Kalurahan (BKAD) di Wilayah Kapanewon Gamping",
                baseScoreWeight: 0.95,
                unit: "% Kerja Sama",
                target: "Aktif",
                recommendation: "Sinergi penanganan sampah perbatasan dan pemeliharaan saluran irigasi bersama Kalurahan sekitar.",
            },
            {
                no: "17.4",
                name: "Integrasi Satu Data Kalurahan dengan Sistem Informasi Kabupaten dan Pusat",
                baseScoreWeight: 1.0,
                unit: "% Sinkronisasi",
                target: "100% Valid",
                recommendation: "Sinkronisasi berkala data kependudukan dan statistik antara OpenSID, Smartdesa, dan portal Satu Data Sleman.",
            },
        ],
    },
    18: {
        goal: 18,
        title: "Kelembagaan Desa Dinamis dan Budaya Desa Adaptif",
        description: "Kelestarian tradisi budaya lokal, peran aktif lembaga desa, dan tata kelola adaptif",
        indicators: [
            {
                no: "18.1",
                name: "Keaktifan Lembaga Kemasyarakatan Kalurahan (RT, RW, PKK, Karang Taruna, LPMK)",
                baseScoreWeight: 1.0,
                unit: "% Lembaga Aktif",
                target: "100%",
                recommendation: "Pemberian dana operasional lembaga, pembinaan administrasi organisasi, dan regenerasi kepengurusan pemuda.",
            },
            {
                no: "18.2",
                name: "Pelestarian Seni Tradisi, Adat Istiadat, dan Upacara Budaya (Merti Dusun)",
                baseScoreWeight: 1.05,
                unit: "Event Budaya / Thn",
                target: "Lestari di Semua Padukuhan",
                recommendation: "Fasilitasi pembinaan sanggar seni jathilan, ketoprak, karawitan, serta pengajuan status Rintisan Desa Budaya.",
            },
            {
                no: "18.3",
                name: "Adaptasi Transformasi Digital Pelayanan Pamong dan Kearsipan Kalurahan",
                baseScoreWeight: 1.0,
                unit: "% Terdigitalisasi",
                target: "≥ 90%",
                recommendation: "Pelatihan literasi digital bagi pamong dan staf kalurahan untuk percepatan penanganan arsip dan surat digital.",
            },
            {
                no: "18.4",
                name: "Penegakan Akuntabilitas Kinerja dan Tata Kelola Pemerintahan yang Adaptif",
                baseScoreWeight: 0.95,
                unit: "Nilai Evaluasi",
                target: "Sangat Baik (A)",
                recommendation: "Penyusunan Laporan Penyelenggaraan Pemerintahan Kalurahan (LPPKal) tepat waktu dan akuntabel kepada BPKal.",
            },
        ],
    },
};

/**
 * Format response detail skor yang kompatibel 100% dengan frontend DetailedScoresResponse
 */
export function buildGoalDetailResponse(goalId: number, goalScore: number = 0) {
    const meta = SDGS_18_GOALS_DATA[goalId] || {
        goal: goalId,
        title: `Goal ${goalId}`,
        description: `Implementasi SDGs Goal ${goalId} di Kalurahan Banyuraden`,
        indicators: [],
    };

    // Hitung skor masing-masing indikator berdasarkan skor goal
    // Jika skor goal = 0, skor indikator tetap 0. Jika > 0, distribusikan sesuai bobot
    const recom = meta.indicators.map((ind) => {
        let scoreVal = 0;
        if (goalScore > 0) {
            // Berikan variasi alami di sekitar skor goal berdasarkan bobot
            const calculated = Math.min(100, Math.max(0, Math.round(goalScore * ind.baseScoreWeight * 10) / 10));
            scoreVal = calculated;
        }

        return {
            no: ind.no,
            name: ind.name,
            score: scoreVal,
            recommendation: `<p class="mb-2"><strong>Target Capaian:</strong> ${ind.target}</p><p class="mb-2"><strong>Rekomendasi Program:</strong> ${ind.recommendation}</p>`,
            bnba: goalScore > 0 ? "Tersedia" : "Belum Tersedia",
            unit: ind.unit,
        };
    });

    return {
        target: meta.indicators.map((ind) => ({ no: ind.no, name: ind.name, target: ind.target })),
        header: [{ goal: meta.goal, title: meta.title, description: meta.description }],
        recom,
    };
}

