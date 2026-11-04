<!-- Last: 2026-11-04T14:10:00+07:00 | Phase: Gutenberg Gallery Layout & Agenda Integration | Build: OK -->

## [APP]
name="Portal Kalurahan Banyuraden" slug="next-banyuraden" type="Village Portal & OpenSID Consumer" stack="Next.js 15.3.4|Prisma 6.18.0|Tailwind CSS|MapLibre GL 5.15"
pkg=npm port=5091 url=https://banyuraden.smartdesa.net server="Nargaroth VPS 103.255.133.227 (PM2 Cluster 2x)" ssl="Let's Encrypt (YR1)"
contacts="Telp: (0274) 621626 / 089612624627 | Email: desa.banyuraden@gmail.com | YT: @KalurahanBanyuraden | FB: kalurahan.banyuraden.3 | IG: @kalurahan.banyuraden | WA: 089612624627"

## [PALETTE] IMMUTABLE
bg=#F9FAFB surface=#FFFFFF text=#111827 accent1=#059669 accent2=#0284C7
font_head=Inter font_body=Inter radius=8px nav=sticky theme=light

## [STATE]
phase=Production Deployed done=100% last="Gutenberg gallery 3-col responsive grid, cover fallback cover asli + fallback next, Agenda Cat 3 terintegrasi langsung ke /pengumuman & API"
build=OK issues=0

## [ISSUES]
<!-- Max 3 open issues aktif — 1 baris per issue -->

## [VISUAL_GATE]
icon_lib=lucide
🔴 SVG mentah→icon_lib | border logo→as-is | hardcode hex→var(--vibe-*)
🔴 font tunggal→2 font | bg:white hardcode→var(--vibe-background)
🔴 spacing acak→8pt grid | campur icon lib→ONE family
🔴 [Design Read]+Three Dials sebelum halaman baru
🔴 kontras text vs bg ≥ 4.5:1 | baca taste-skill sebelum visual
🔴 scratchpad_dom=FORBIDDEN | browser_gate=STRICT

## [FLOWS]
[Auth Login]=Form→POST /api/auth/callback/credentials→bcrypt.compare→JWT session
[Berita Mutasi]=Admin Session Guard→POST/PUT/DELETE /api/berita→mock/db
[Pengumuman & Agenda]=GET /api/pengumuman→getSlemankabAgenda (WP Cat 3: 52 posts)→/pengumuman interactive page (search + modal dialog)
[Live News Integration]=GET /api/external-news & /api/opensid-proxy→lib/slemankab-news.ts (WP REST API 1008 posts)→fallback OpenSID (sleman-desa.id)
[IoT Live Monitoring]=GET /api/iot/stream→Server-Sent Events (SSE) 15s interval
[IoT Historical]=GET /api/iot/historical/[channelId]→numeric validate→ThingSpeak feeds

## [PAGES] BUILT
/=Beranda=public=STABLE
/berita=Berita Desa=public=STABLE
/berita/[slug]=Detail Berita=public=STABLE
/pengumuman=Pengumuman & Agenda=public=STABLE
/profil=Profil Kalurahan=public=STABLE
/pemerintah=Pemerintah Desa=public=STABLE
/aparatur=Aparatur Pamong=public=STABLE
/wilayah-administratif=Wilayah Administratif=public=STABLE
/statistik=Statistik Kependudukan=public=STABLE
/iot=IoT Monitoring=public=STABLE
/potensi-desa=Potensi Desa=public=STABLE
/fasilitas=Fasilitas Umum=public=STABLE
/login=Login Internal=public=STABLE

## [SCHEMA]
User: id, email, name, password, role, createdAt, updatedAt
Berita: id, judul, slug, konten, gambar, kategori, status, publishedAt, createdAt, updatedAt
Pengumuman: id, judul, slug, konten, kategori, prioritas, status, tglMulai, tglSelesai, createdAt, updatedAt

## [DECISIONS]
ADR-001=Session guard auth() wajib untuk route mutasi API (POST/PUT/DELETE)
ADR-002=Sanitasi HTML wajib menggunakan DOMPurify (isomorphic-dompurify) pada konten dinamis dengan whitelist figure & figcaption untuk blok Gutenberg
ADR-003=Strict numeric regex validation untuk IoT dynamic route channelId
ADR-004=Nginx reverse proxy CloudPanel port 5091 dengan PM2 Cluster mode dan SSL Let's Encrypt
ADR-005=WordPress REST API banyuradensid.slemankab.go.id wajib menggunakan modul https Node.js dengan browser headers untuk menembus proteksi Cloudflare WAF
ADR-006=Gutenberg gallery (.wp-block-gallery) distyle grid responsif 1-3 kolom dengan object-cover 220px untuk mencegah layout memanjang ke bawah
