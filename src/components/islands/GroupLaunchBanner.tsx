import { ArrowRight } from "lucide-react"
import { GROUP_PROGRAM } from "@/lib/groupProgram"

interface GroupLaunchBannerProps {
  badge?: string
  title?: string
  subtitle?: string
  ctaLabel?: string
  ctaHref?: string
  secondaryCtaLabel?: string
  secondaryCtaHref?: string
  programLogoSrc?: string
  programLogoAlt?: string
  backgroundImageUrl?: string
  backgroundImageSrcSet?: string
  backgroundImagePosition?: string
}

const DEFAULT_TITLE = GROUP_PROGRAM.name
const DEFAULT_BADGE = GROUP_PROGRAM.eyebrow
const DEFAULT_SUBTITLE = GROUP_PROGRAM.description
const DEFAULT_PRIMARY_CTA = { label: "Reservar mi plaza", href: "/contacto" }

export default function GroupLaunchBanner({
  badge,
  title,
  subtitle,
  ctaLabel,
  ctaHref,
  secondaryCtaLabel,
  secondaryCtaHref,
  programLogoSrc,
  programLogoAlt = "Mirarte distinto",
  backgroundImageUrl,
  backgroundImageSrcSet,
  backgroundImagePosition,
}: GroupLaunchBannerProps) {
  const titleId = "group-launch-title"
  const primaryCta = ctaLabel && ctaHref ? { label: ctaLabel, href: ctaHref } : DEFAULT_PRIMARY_CTA
  const resolvedBadge = badge || DEFAULT_BADGE
  const resolvedTitle = title || DEFAULT_TITLE
  const resolvedSubtitle = subtitle || DEFAULT_SUBTITLE

  return (
    <>
      <section
        aria-labelledby={titleId}
        className="group-launch-enter relative isolate overflow-hidden bg-[#98465d] text-white"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.06),_transparent_60%)]" />
        {backgroundImageUrl && (
          <picture className="absolute inset-0">
            {backgroundImageSrcSet && <source srcSet={backgroundImageSrcSet} sizes="100vw" />}
            <img
              src={backgroundImageUrl}
              srcSet={backgroundImageSrcSet}
              sizes="100vw"
              alt=""
              aria-hidden="true"
              className="h-full w-full object-cover opacity-10"
              style={{ objectPosition: backgroundImagePosition }}
              loading="lazy"
              decoding="async"
            />
          </picture>
        )}

        <div className="relative container mx-auto px-5 py-7 md:py-8">
          <div className="mx-auto flex max-w-5xl flex-col items-center gap-5 text-center md:flex-row md:items-center md:justify-between md:gap-8 md:text-left">
            {programLogoSrc && (
              <div className="w-full max-w-[260px] shrink-0 rounded-2xl bg-white/90 px-4 py-3 shadow-sm ring-1 ring-white/60 backdrop-blur-sm md:w-auto md:max-w-none md:px-3 md:py-2">
                <img
                  src={programLogoSrc}
                  alt={programLogoAlt}
                  className="mx-auto h-auto w-full max-w-44 drop-shadow-sm md:w-52 md:max-w-none"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            )}

            <div className="space-y-3 md:space-y-2 min-w-0 flex-1">
              <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
                <span className="inline-flex items-center rounded-full bg-white/12 px-3 py-1 text-xs font-medium tracking-wide text-white/90">
                  {resolvedBadge}
                </span>
              </div>

              <h2 id={titleId} className="font-display text-xl leading-snug text-balance md:text-2xl">
                {resolvedTitle}
              </h2>

              <p className="mx-auto max-w-xl text-sm leading-relaxed text-white/70 md:mx-0">{resolvedSubtitle}</p>
            </div>

            <div className="flex w-full shrink-0 flex-col gap-2.5 sm:w-auto sm:flex-row sm:items-center">
              {primaryCta.href && primaryCta.label && (
                <a
                  href={primaryCta.href}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-[#98465d] shadow-sm transition-all hover:bg-white/92 hover:shadow-md sm:w-auto"
                >
                  {primaryCta.label}
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              )}

              {secondaryCtaLabel && secondaryCtaHref && (
                <a
                  href={secondaryCtaHref}
                  className="inline-flex w-full items-center justify-center rounded-full border border-white/25 px-5 py-2.5 text-sm font-medium text-white/90 transition-all hover:bg-white/10 sm:w-auto"
                >
                  {secondaryCtaLabel}
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes groupLaunchEnter {
          from { opacity: 0; transform: translate3d(0, -100%, 0); }
          to { opacity: 1; transform: translate3d(0, 0, 0); }
        }

        .group-launch-enter {
          animation: groupLaunchEnter 0.5s ease-out both;
        }

        @media (prefers-reduced-motion: reduce) {
          .group-launch-enter { animation: none !important; }
        }
      `}</style>
    </>
  )
}
