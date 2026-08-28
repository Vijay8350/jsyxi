import Image from "next/image";
import { ArrowUpRight, Check, MousePointerClick, Star, TrendingUp } from "lucide-react";
import { MARKETING_IMAGES } from "@/lib/marketing-images";

export function ProductShowcase() {
  return (
    <figure className="product-stage mx-auto w-full max-w-[620px]">
      <figcaption className="sr-only">A storefront enhanced with jsyxi review, lead, and analytics widgets.</figcaption>
      <div className="product-browser">
        <div className="flex h-11 items-center justify-between border-b border-white/10 bg-slate-950/95 px-4">
          <div className="flex items-center gap-1.5" aria-hidden>
            <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </div>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-medium tracking-wide text-white/60">
            bloomandco.in
          </span>
          <span className="h-5 w-5 rounded-full border border-white/10" aria-hidden />
        </div>

        <div className="relative min-h-[400px] overflow-hidden bg-slate-900 sm:min-h-[500px]">
          <Image
            src={MARKETING_IMAGES.merchant.src}
            alt={MARKETING_IMAGES.merchant.alt}
            fill
            sizes="(max-width: 1024px) 92vw, 48vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-7 text-white sm:p-9">
            <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-300">
              Small batch. Big care.
            </span>
            <h3 className="mt-2 max-w-sm text-3xl font-bold tracking-tight sm:text-4xl">
              Made to be remembered.
            </h3>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/72">
              Thoughtful essentials, packed by hand and delivered with care.
            </p>
            <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-slate-950">
              Shop the collection <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>
      </div>

      <div className="showcase-float showcase-float-review">
        <div className="flex items-center gap-1 text-amber-400" aria-label="Five star review">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star key={index} className="h-3.5 w-3.5 fill-current" />
          ))}
        </div>
        <p className="mt-2 text-sm font-semibold text-slate-900">“The quality is beautiful.”</p>
        <p className="mt-1 text-[11px] text-slate-500">Verified customer · just now</p>
      </div>

      <div className="showcase-float showcase-float-lead">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
          <Check className="h-4 w-4" />
        </span>
        <div>
          <p className="text-xs font-semibold text-slate-900">New lead captured</p>
          <p className="mt-0.5 text-[11px] text-slate-500">Sent to your workspace</p>
        </div>
      </div>

      <div className="showcase-float showcase-float-growth">
        <div className="flex items-center justify-between gap-6">
          <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
            <TrendingUp className="h-3.5 w-3.5 text-emerald-600" /> Conversion
          </span>
          <span className="text-sm font-bold text-emerald-600">+24%</span>
        </div>
        <div className="mt-3 flex h-8 items-end gap-1" aria-hidden>
          {[28, 44, 36, 54, 63, 58, 82].map((height, index) => (
            <span
              key={height + index}
              className="w-3 rounded-sm bg-gradient-to-t from-teal-600 to-emerald-300"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </div>

      <div className="showcase-cursor" aria-hidden>
        <MousePointerClick className="h-4 w-4" />
      </div>
    </figure>
  );
}
