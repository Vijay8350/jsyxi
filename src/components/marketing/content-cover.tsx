import Image from "next/image";
import { MARKETING_IMAGES } from "@/lib/marketing-images";
import { cn } from "@/lib/utils";

type FallbackKey = "merchant" | "studio" | "workspace" | "skincare";

export function ContentCover({
  src,
  title,
  alt,
  fallback,
  className,
  sizes = "(max-width: 767px) calc(100vw - 2rem), (max-width: 1023px) calc((100vw - 3.5rem) / 2), 360px",
  preload = false,
}: {
  src?: string | null;
  title: string;
  alt?: string;
  fallback: FallbackKey;
  className?: string;
  sizes?: string;
  preload?: boolean;
}) {
  const fallbackImage = MARKETING_IMAGES[fallback];
  const resolvedAlt = alt ?? `${title} cover`;

  if (src?.startsWith("/")) {
    return (
      <Image
        src={src}
        alt={resolvedAlt}
        fill
        preload={preload}
        sizes={sizes}
        className={cn("object-cover", className)}
      />
    );
  }

  if (src) {
    return (
      // Admins can supply images from arbitrary approved hosts, so these stay
      // browser-native instead of widening Next Image's remote allow-list.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={resolvedAlt}
        loading={preload ? "eager" : "lazy"}
        decoding="async"
        className={cn("absolute inset-0 h-full w-full object-cover", className)}
      />
    );
  }

  return (
    <Image
      src={fallbackImage.src}
      alt={alt ?? fallbackImage.alt}
      fill
      preload={preload}
      sizes={sizes}
      className={cn("object-cover", className)}
    />
  );
}
