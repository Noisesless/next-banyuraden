import { NextRequest, NextResponse } from "next/server";
import { getSlemankabPosts } from "@/lib/slemankab-news";
import { fetchOpenSIDArsip, createApiRouteHandler } from "@/lib/api-helpers";

function formatDateToOpenSID(isoString: string): string {
    const d = new Date(isoString);
    if (isNaN(d.getTime())) return "01-01-2026 00:00:00";
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");
    const seconds = String(d.getSeconds()).padStart(2, "0");
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
}

export const { GET, OPTIONS } = createApiRouteHandler(async (request: NextRequest) => {
    try {
        const { searchParams } = new URL(request.url);
        const search = searchParams.get("search") || undefined;
        const slug = searchParams.get("slug") || undefined;

        // Fetch up to 50 latest posts from WordPress REST API (banyuradensid.slemankab.go.id)
        const wpResult = await getSlemankabPosts({
            perPage: 50,
            search,
            slug,
        });

        // Convert WordPress posts to OpenSIDArticle structure for seamless lib/opensid compatibility
        const wpArticles = wpResult.posts.map((post) => ({
            type: "artikel",
            id: String(post.id),
            attributes: {
                config_id: "1",
                gambar: post.featuredImage,
                gambar1: null,
                gambar2: null,
                gambar3: null,
                dokumen: null,
                isi: post.content,
                enabled: "1",
                tgl_upload: formatDateToOpenSID(post.date),
                tgl_upload_local: formatDateToOpenSID(post.date),
                judul: post.title,
                url_slug: post.slug,
                slug: post.slug,
                author: {
                    id: String(post.author.id),
                    grup: "Admin",
                    nama: post.author.name,
                    username: "admin",
                },
                category: post.categories[0]
                    ? {
                          id: String(post.categories[0].id),
                          slug: post.categories[0].slug,
                          kategori: post.categories[0].name,
                      }
                    : null,
                hit: post.viewCount,
                comments: [],
            },
        }));

        // Also fetch OpenSID articles from banyuraden.sleman-desa.id
        let openSidArticles: unknown[] = [];
        try {
            const openSidResponse = await fetchOpenSIDArsip();
            if (openSidResponse.success && openSidResponse.data) {
                const raw = openSidResponse.data as { data?: unknown[] };
                openSidArticles = raw.data || [];
            }
        } catch (e) {
            console.warn("OpenSID fallback in proxy failed:", e);
        }

        // Combine WP articles first, then OpenSID articles
        const allArticles = [...wpArticles, ...openSidArticles];

        return NextResponse.json({
            data: allArticles,
            meta: {
                pagination: {
                    total: allArticles.length,
                    count: allArticles.length,
                    per_page: allArticles.length,
                    current_page: 1,
                    total_pages: 1,
                },
            },
            links: {
                self: request.url,
                first: request.url,
                last: request.url,
            },
        });
    } catch (error) {
        console.error("OpenSID Proxy error:", error);
        return NextResponse.json(
            { error: "Failed to fetch articles", data: [] },
            { status: 500 }
        );
    }
});
