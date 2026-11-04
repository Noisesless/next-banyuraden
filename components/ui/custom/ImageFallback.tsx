import type { ImageProps } from "next/image";
import Image from "next/image";
import { useState, useEffect } from "react";

const DEFAULT_COVER = "/images/banyuraden-cover.jpg";

interface ImageFallbackProps extends Omit<ImageProps, "src"> {
    src?: string | null;
    _fallbackSrc?: string;
    iconSize?: number;
}

export default function ImageFallback({
    src,
    _fallbackSrc = DEFAULT_COVER,
    alt = "",
    className = "",
    unoptimized,
    referrerPolicy,
    ...props
}: ImageFallbackProps) {
    // Validate and normalize the source URL
    const normalizeSrc = (url: string | null | undefined): string => {
        if (!url || typeof url !== "string" || url.trim() === "") {
            return _fallbackSrc;
        }
        // Allow relative local paths
        if (url.startsWith("/") && !url.startsWith("//")) {
            return url;
        }
        // Allow valid HTTP/HTTPS URLs
        if (url.startsWith("http://") || url.startsWith("https://")) {
            return url;
        }
        return _fallbackSrc;
    };

    const [imgSrc, setImgSrc] = useState<string>(normalizeSrc(src));

    useEffect(() => {
        setImgSrc(normalizeSrc(src));
    }, [src, _fallbackSrc]);

    const handleError = () => {
        if (imgSrc !== _fallbackSrc) {
            setImgSrc(_fallbackSrc);
        }
    };

    // External URLs (e.g. government domains protected by Cloudflare bot challenge)
    // MUST bypass Next.js image optimizer server proxy to load directly in the client browser
    const isExternal = typeof imgSrc === "string" && (imgSrc.startsWith("http://") || imgSrc.startsWith("https://"));

    return (
        <Image
            src={imgSrc}
            alt={alt}
            className={className}
            unoptimized={unoptimized ?? isExternal}
            referrerPolicy={referrerPolicy ?? (isExternal ? "no-referrer" : undefined)}
            onError={handleError}
            {...props}
        />
    );
}
