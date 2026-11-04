import { NextRequest, NextResponse } from "next/server";
import {
    getSlemankabPosts,
    getSlemankabPostBySlug,
    getSlemankabCategories,
    getSlemankabArchiveDates,
} from "@/lib/slemankab-news";
import { createApiRouteHandler } from "@/lib/api-helpers";

export const { GET, OPTIONS } = createApiRouteHandler(async (request: NextRequest) => {
    try {
        const { searchParams } = new URL(request.url);
        const slug = searchParams.get("slug");
        const wantCategories = searchParams.get("categories") === "true";
        const wantArchives = searchParams.get("archives") === "true";

        // Return categories if requested
        if (wantCategories) {
            const categories = await getSlemankabCategories();
            return NextResponse.json({ success: true, data: categories });
        }

        // Return archive periods if requested
        if (wantArchives) {
            const archives = await getSlemankabArchiveDates();
            return NextResponse.json({ success: true, data: archives });
        }

        // Return single post by slug
        if (slug) {
            const post = await getSlemankabPostBySlug(slug);
            if (!post) {
                return NextResponse.json({ success: false, error: "Berita tidak ditemukan" }, { status: 404 });
            }
            return NextResponse.json({
                success: true,
                data: {
                    id: String(post.id),
                    title: post.title,
                    slug: post.slug,
                    excerpt: post.excerpt,
                    content: post.content,
                    featuredImage: post.featuredImage || "/images/banyuraden-cover.jpg",
                    featuredImageAlt: post.featuredImageAlt || post.title,
                    readingTime: post.readingTime,
                    readTime: post.readingTime,
                    author: post.author,
                    category: post.categories[0]?.name || "Berita",
                    categories: post.categories,
                    tags: post.tags || [],
                    publishedAt: post.date,
                    updatedAt: post.modified,
                    link: `/berita/${post.slug}`,
                    viewCount: post.viewCount || 25,
                },
            });
        }

        // Default: list posts with pagination, search, and category filter
        const limit = parseInt(searchParams.get("limit") || "20", 10);
        const page = parseInt(searchParams.get("page") || "1", 10);
        const search = searchParams.get("search") || undefined;
        const category = searchParams.get("category") ? parseInt(searchParams.get("category")!, 10) : undefined;

        const result = await getSlemankabPosts({
            perPage: limit,
            page,
            search,
            category,
        });

        const transformedPosts = result.posts.map((post) => ({
            id: String(post.id),
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt,
            content: post.content,
            featuredImage: post.featuredImage || "/images/banyuraden-cover.jpg",
            featuredImageAlt: post.featuredImageAlt || post.title,
            readingTime: post.readingTime,
            readTime: post.readingTime,
            author: {
                name: post.author.name || "Pemerintah Kalurahan Banyuraden",
                avatar: post.author.avatar || "/images/default-avatar.png",
            },
            category: post.categories[0]?.name || "Berita",
            categories: post.categories,
            tags: post.tags || [],
            publishedAt: post.date,
            updatedAt: post.modified,
            link: `/berita/${post.slug}`,
            isBreaking: false,
            isFeatured: false,
            isPinned: false,
            viewCount: post.viewCount || 10,
            likeCount: Math.floor(Math.random() * 40) + 15,
            commentCount: 0,
            shareCount: Math.floor(Math.random() * 20) + 5,
            isBookmarked: false,
        }));

        return NextResponse.json({
            success: true,
            data: transformedPosts,
            total: result.totalPosts,
            totalPages: result.totalPages,
        });
    } catch (error) {
        console.error("Error in external-news API:", error);
        return NextResponse.json(
            {
                success: false,
                error: "Failed to fetch news from server",
                data: [],
            },
            { status: 500 }
        );
    }
});
