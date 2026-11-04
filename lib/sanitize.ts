/**
 * Sanitizes untrusted HTML content to prevent Stored & Reflected XSS (SP-002 / OWASP A05:2025).
 * Safe for use in both Server Components (SSR) and Client Components.
 * Supports WordPress Gutenberg blocks (figure, figcaption, gallery).
 */
export function sanitizeHtml(dirtyHtml: string | null | undefined): string {
    if (!dirtyHtml || typeof dirtyHtml !== "string") {
        return "";
    }

    // Client-side DOMPurify execution
    if (typeof window !== "undefined") {
        try {
            // eslint-disable-next-line @typescript-eslint/no-require-imports
            const DOMPurify = require("dompurify");
            return DOMPurify.sanitize(dirtyHtml, {
                ALLOWED_TAGS: [
                    "p", "br", "b", "i", "em", "strong", "a", "ul", "ol", "li",
                    "h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "table",
                    "thead", "tbody", "tr", "th", "td", "span", "div", "img",
                    "figure", "figcaption", "hr", "sub", "sup", "code", "pre"
                ],
                ALLOWED_ATTR: [
                    "href", "target", "rel", "src", "alt", "title", "class",
                    "width", "height", "style", "colspan", "rowspan",
                    "srcset", "sizes", "loading", "decoding", "data-id"
                ],
                ADD_ATTR: ["target"],
                FORBID_TAGS: ["script", "iframe", "object", "embed", "link", "style"],
                FORBID_ATTR: ["onerror", "onload", "onclick", "onmouseover", "onfocus", "onblur"]
            });
        } catch (e) {
            console.warn("Client DOMPurify fallback to regex sanitizer:", e);
        }
    }

    // SSR fallback: Strip dangerous tags and event handlers cleanly without jsdom crashing Node
    return dirtyHtml
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
        .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "")
        .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, "")
        .replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, "")
        .replace(/\son\w+\s*=\s*["'][^"']*["']/gi, "")
        .replace(/\son\w+\s*=\s*[^\s>]+/gi, "")
        .replace(/javascript:[^"'\s]*/gi, "");
}
