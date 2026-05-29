import { useState, useRef, useEffect } from "react"
import { Star, Play, Heart, X } from "lucide-react"
import type { Testimonial } from "@/lib/sanityTypes"
import { iconSvgMap } from "@/lib/icons"

const sourceColors: Record<string, string> = {
  WhatsApp: "#25D366",
  Facebook: "#1877F2",
  "Reseña Google": "#4285F4",
}

type FilterType = "all" | "individual" | "group"

interface TestimonialsLandingProps {
  testimonials?: Testimonial[]
}

function StarRating({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(rating)].map((_, i) => (
        <Star key={i} className="text-yellow-400" fill="#facc15" style={{ width: size, height: size }} />
      ))}
    </div>
  )
}

function ReviewCard({
  testimonial,
  variant,
  onPlayVideo,
}: {
  testimonial: Testimonial
  variant: "desktop" | "mobile"
  onPlayVideo?: () => void
}) {
  const borderColor =
    testimonial.serviceType === "group" ? "border-[#9591eb]" : "border-[#98465d]"

  const isVideoOnly = !testimonial.text && testimonial.hasVideo
  const posterUrl = testimonial.videoPosterUrl ?? testimonial.videoPoster?.asset?.url
  const posterSrcSet = testimonial.videoPosterSrcSet
  const mobilePoster = testimonial.videoPosterMobileUrl ?? posterUrl
  const mobilePosterSrcSet = testimonial.videoPosterMobileSrcSet ?? posterSrcSet

  const abbreviatedName = (() => {
    const parts = testimonial.name.split(" ")
    if (parts.length > 1) return `${parts[0]} ${parts[parts.length - 1][0]}.`
    return parts[0]
  })()

  if (variant === "mobile") {
    if (isVideoOnly) {
      return (
        <div
          onClick={onPlayVideo}
          className={`bg-white rounded-2xl shadow-sm overflow-hidden border-l-4 ${borderColor} h-full flex flex-col cursor-pointer`}
        >
          <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-[#98465d]/20 to-[#9591eb]/20">
            {mobilePoster && (
              <img
                src={mobilePoster}
                srcSet={mobilePosterSrcSet}
                sizes="(max-width: 767px) 85vw, 340px"
                alt={`Vídeo testimonio de ${testimonial.name}`}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            )}
            <div className="absolute inset-0 bg-black/15" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                <Play className="w-6 h-6 text-[#98465d] ml-0.5" fill="#98465d" />
              </div>
            </div>
          </div>
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-sans font-semibold text-[#5d5a5a] text-sm">
                {abbreviatedName}
              </span>
              {testimonial.source && (
                <span className="flex items-center gap-1 font-sans text-xs text-[#5d5a5a]/50">
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill={sourceColors[testimonial.source] ?? "#5d5a5a"} dangerouslySetInnerHTML={{ __html: iconSvgMap[testimonial.source] ?? "" }} />
                  {testimonial.source}
                </span>
              )}
              <StarRating rating={testimonial.rating} size={12} />
            </div>
            <span className="text-[10px] bg-[#f6f3f5] px-2.5 py-1 rounded-full text-[#5d5a5a]/50 font-medium">
              {testimonial.serviceType === "group" ? "Grupal" : "Individual"}
            </span>
          </div>
        </div>
      )
    }

    return (
      <div
        className={`bg-white rounded-2xl shadow-sm overflow-hidden border-l-4 ${borderColor} p-5 h-full flex flex-col`}
      >
        <StarRating rating={testimonial.rating} size={14} />

        <div className="relative mt-3 mb-4 flex-1">
          <span className="font-display text-4xl text-[#cfcdff]/40 leading-none select-none absolute -top-2 -left-1">
            &ldquo;
          </span>
          <p className="font-serif italic text-[#5d5a5a] leading-relaxed text-[14px] pl-5 line-clamp-4">
            {testimonial.text}
          </p>
        </div>

        <div className="border-t border-[#f6f3f5] pt-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="font-sans font-semibold text-[#5d5a5a] text-sm">
              {abbreviatedName}
            </span>
            {testimonial.source && (
              <span className="flex items-center gap-1 font-sans text-xs text-[#5d5a5a]/50">
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill={sourceColors[testimonial.source] ?? "#5d5a5a"} dangerouslySetInnerHTML={{ __html: iconSvgMap[testimonial.source] ?? "" }} />
                {testimonial.source}
              </span>
            )}
            {testimonial.hasVideo && (
              <button
                onClick={onPlayVideo}
                className="text-[#98465d] hover:text-[#98465d]/80"
                aria-label={`Reproducir video de ${testimonial.name}`}
              >
                <Play className="w-3.5 h-3.5" fill="#98465d" />
              </button>
            )}
          </div>
          <span className="text-[10px] bg-[#f6f3f5] px-2.5 py-1 rounded-full text-[#5d5a5a]/50 font-medium">
            {testimonial.serviceType === "group" ? "Grupal" : "Individual"}
          </span>
        </div>
      </div>
    )
  }

  if (isVideoOnly) {
    return (
      <div
        className={`bg-white rounded-2xl shadow-sm hover:shadow-lg hover-relief overflow-hidden h-full transition-shadow duration-300 border-l-4 ${borderColor}`}
      >
        <div
          onClick={onPlayVideo}
          className="aspect-video flex items-center justify-center cursor-pointer group relative overflow-hidden bg-gradient-to-br from-[#98465d]/30 to-[#9591eb]/30"
        >
          {posterUrl && (
            <img
              src={posterUrl}
              srcSet={posterSrcSet}
              sizes="(max-width: 1023px) 50vw, 360px"
              alt={`Vídeo testimonio de ${testimonial.name}`}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          )}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
          <div className="relative w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <Play className="w-7 h-7 text-[#98465d] ml-1" fill="#98465d" />
          </div>
        </div>
        <div className="p-6 md:p-7">
          <div className="flex items-center justify-between mb-2">
            <StarRating rating={testimonial.rating} />
            <span className="text-[10px] bg-[#f6f3f5] px-2.5 py-1 rounded-full text-[#5d5a5a]/50 font-medium">
              {testimonial.serviceType === "group" ? "Grupal" : "Individual"}
            </span>
          </div>
          <p className="font-sans font-semibold text-[#5d5a5a] text-sm">
            {testimonial.name}
          </p>
          {testimonial.date && (
            <p className="text-xs text-[#5d5a5a]/50">{testimonial.date}</p>
          )}
          {testimonial.source && (
            <span className="flex items-center gap-1 font-sans text-xs text-[#5d5a5a]/50 mt-1">
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill={sourceColors[testimonial.source] ?? "#5d5a5a"} dangerouslySetInnerHTML={{ __html: iconSvgMap[testimonial.source] ?? "" }} />
              {testimonial.source}
            </span>
          )}
        </div>
      </div>
    )
  }

  return (
    <div
      className={`bg-white rounded-2xl shadow-sm hover:shadow-lg hover-relief overflow-hidden h-full transition-shadow duration-300 border-l-4 ${borderColor}`}
    >
      <div className="p-6 md:p-7 flex flex-col h-full">
        <div className="flex items-center justify-between mb-4">
          <StarRating rating={testimonial.rating} />
          <span className="text-[10px] bg-[#f6f3f5] px-2.5 py-1 rounded-full text-[#5d5a5a]/50 font-medium">
            {testimonial.serviceType === "group" ? "Grupal" : "Individual"}
          </span>
        </div>

        <div className="relative flex-1 mb-5">
          <span className="font-display text-6xl text-[#cfcdff]/40 leading-none select-none absolute -top-3 -left-1">
            &ldquo;
          </span>
          <p className="font-serif italic text-[#5d5a5a] leading-relaxed text-[15px] pl-6 pt-4">
            {testimonial.text}
          </p>
        </div>

        <div className="border-t border-[#f6f3f5] pt-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-sans font-semibold text-[#5d5a5a] text-sm">
                {testimonial.name}
              </p>
              {testimonial.date && (
                <p className="text-xs text-[#5d5a5a]/50">{testimonial.date}</p>
              )}
              {testimonial.source && (
                <span className="flex items-center gap-1 font-sans text-xs text-[#5d5a5a]/50 mt-1">
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill={sourceColors[testimonial.source] ?? "#5d5a5a"} dangerouslySetInnerHTML={{ __html: iconSvgMap[testimonial.source] ?? "" }} />
                  {testimonial.source}
                </span>
              )}
            </div>
            {testimonial.hasVideo && (
              <button
                onClick={onPlayVideo}
                className="text-sm text-[#98465d] hover:underline cursor-pointer flex items-center gap-1"
                aria-label={`Reproducir video de ${testimonial.name}`}
              >
                Ver video <span aria-hidden="true">▶</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function TestimonialsLanding({ testimonials = [] }: TestimonialsLandingProps) {
  const [activeVideo, setActiveVideo] = useState<number | null>(null)
  const [filter, setFilter] = useState<FilterType>("all")
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set())
  const [activeIndex, setActiveIndex] = useState(0)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const validTestimonials = (testimonials ?? []).filter(t => t.text || t.hasVideo)
  const filtered = filter === "all"
    ? validTestimonials
    : validTestimonials.filter((t) => t.serviceType === filter)

  // Staggered reveal for desktop grid
  useEffect(() => {
    cardRefs.current = []
    setVisibleCards(new Set())
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const index = Number(entry.target.getAttribute("data-index"))
              setVisibleCards((prev) => new Set([...prev, index]))
            }
          })
        },
        { threshold: 0.15 }
      )
      cardRefs.current.forEach((ref) => {
        if (ref) observer.observe(ref)
      })
      return () => observer.disconnect()
    }, 50)
    return () => clearTimeout(timer)
  }, [filter])

  // Reset carousel on filter change
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = 0
    }
    setActiveIndex(0)
  }, [filter])

  // Carousel dots via IntersectionObserver
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container || filtered.length <= 1) return

    const cards = Array.from(container.children) as HTMLElement[]
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = cards.indexOf(entry.target as HTMLElement)
            if (idx !== -1) setActiveIndex(idx)
          }
        }
      },
      { root: container, threshold: 0.5 }
    )

    cards.forEach((card) => observer.observe(card))
    return () => observer.disconnect()
  }, [filtered.length, filter])

  const handleCarouselKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const container = scrollContainerRef.current
    if (!container) return

    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault()
      const firstChild = container.firstElementChild as HTMLElement | null
      if (!firstChild) return
      const cardWidth = firstChild.offsetWidth + 16
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      const behavior = prefersReduced ? "auto" : "smooth"
      container.scrollBy({
        left: e.key === "ArrowRight" ? cardWidth : -cardWidth,
        behavior,
      })
    }
  }

  // Video modal: body overflow + Escape
  useEffect(() => {
    if (activeVideo !== null) {
      document.body.style.overflow = "hidden"
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") setActiveVideo(null)
      }
      document.addEventListener("keydown", handleEscape)
      return () => {
        document.body.style.overflow = ""
        document.removeEventListener("keydown", handleEscape)
      }
    }
  }, [activeVideo])

  const filters: { key: FilterType; label: string }[] = [
    { key: "all", label: "Todos" },
    { key: "individual", label: "Sesiones individuales" },
    { key: "group", label: "Terapia grupal" },
  ]

  return (
    <div className="relative">
      {/* Trust bar */}
      <section className="py-8 md:py-10 border-b border-[#cfcdff]/20">
        <div className="container mx-auto px-5">
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-14">
            <div className="flex items-center gap-3">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 md:w-5 h-4 md:h-5 text-yellow-400" fill="#facc15" />
                ))}
              </div>
              <div>
                <span className="text-xl md:text-2xl font-display text-[#98465d]">4.9</span>
                <span className="text-[#5d5a5a]/60 text-sm ml-1">/ 5</span>
              </div>
            </div>
            <div className="w-px h-6 bg-[#cfcdff]/40" />
            <div className="text-center">
              <span className="text-xl md:text-2xl font-display text-[#98465d]">50+</span>
              <p className="text-[10px] md:text-xs text-[#5d5a5a]/60 mt-0.5">Reseñas verificadas</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main testimonials section */}
      <section className="py-10 md:py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute top-20 right-0 w-72 h-72 bg-[#9591eb]/8 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-24 w-80 h-80 bg-[#98465d]/[0.04] rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-[#98465d]/[0.03] rounded-full blur-3xl" />

        <div className="container mx-auto px-5 relative">
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-10 md:mb-14">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  filter === f.key
                    ? "bg-[#98465d] text-white shadow-lg shadow-[#98465d]/20"
                    : "bg-[#f6f3f5] text-[#5d5a5a] hover:bg-[#cfcdff]/30 hover-relief"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="font-serif italic text-[#5d5a5a]/60 text-lg">
                No hay testimonios de este tipo todavía.
              </p>
            </div>
          ) : (
            <>
              {/* Mobile carousel */}
              <div
                ref={scrollContainerRef}
                role="region"
                aria-label="Testimonios"
                aria-roledescription="carrusel"
                tabIndex={0}
                onKeyDown={handleCarouselKeyDown}
                className="md:hidden overflow-x-auto scrollbar-hide snap-x snap-mandatory flex gap-4 px-5 -mx-5 pb-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9591eb]/50 focus-visible:ring-offset-2 rounded-lg"
              >
                {filtered.map((testimonial, index) => {
                  const globalIndex = validTestimonials.indexOf(testimonial)
                  return (
                    <div key={`m-${filter}-${testimonial._id ?? index}`} role="article" className="snap-center shrink-0 w-[85vw] max-w-[340px]">
                      <ReviewCard
                        testimonial={testimonial}
                        variant="mobile"
                        onPlayVideo={() => setActiveVideo(globalIndex)}
                      />
                    </div>
                  )
                })}
              </div>

              {/* Mobile dots */}
              {filtered.length > 1 && (
                <div className="md:hidden flex justify-center gap-2 mt-4">
                  {filtered.map((_, i) => (
                    <span
                      key={i}
                      className={`carousel-dot ${i === activeIndex ? "carousel-dot-active" : ""}`}
                    />
                  ))}
                </div>
              )}

              {/* Desktop grid with staggered animation */}
              <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-8 max-w-6xl mx-auto">
                {filtered.map((testimonial, index) => {
                  const globalIndex = validTestimonials.indexOf(testimonial)
                  const isVisible = visibleCards.has(index)

                  return (
                    <div
                      key={`d-${filter}-${testimonial._id ?? index}`}
                      ref={(el) => { cardRefs.current[index] = el }}
                      data-index={index}
                      className={`transition-all duration-700 ${
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                      }`}
                      style={{ transitionDelay: `${Math.min(index * 0.1, 0.6)}s` }}
                    >
                      <ReviewCard
                        testimonial={testimonial}
                        variant="desktop"
                        onPlayVideo={() => setActiveVideo(globalIndex)}
                      />
                    </div>
                  )
                })}
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA section */}
      <section className="py-14">
        <div className="container mx-auto px-5 text-center">
          <p className="font-serif text-lg text-[#5d5a5a]/80 italic mb-5">
            Cada historia empezo con un primer mensaje...
          </p>
          <a href="/contacto">
            <button className="hover-shimmer inline-flex items-center justify-center bg-[#98465d] hover:bg-[#98465d]/90 text-white rounded-full px-8 py-4 text-lg font-medium transition-all hover:scale-105 hover:shadow-lg hover:shadow-[#98465d]/25">
              Empieza la tuya
            </button>
          </a>
        </div>
      </section>

      {/* Video modal */}
      {activeVideo !== null && validTestimonials[activeVideo] && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative bg-white rounded-3xl overflow-hidden max-w-2xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
            >
              <X className="w-5 h-5 text-[#5d5a5a]" />
            </button>

            {(() => {
              const t = validTestimonials[activeVideo]
              const videoSrc = t.videoUrl || t.videoFile?.asset?.url
              const modalPoster = t.videoPosterUrl ?? t.videoPoster?.asset?.url
              return videoSrc ? (
                <video
                  className="w-full aspect-video bg-black"
                  src={videoSrc}
                  poster={modalPoster}
                  controls
                  autoPlay
                  playsInline
                />
              ) : (
                <div className="aspect-video bg-gradient-to-br from-[#98465d]/60 to-[#9591eb]/60 flex items-center justify-center">
                  <div className="text-center text-white space-y-4">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto">
                      <Play className="w-8 h-8 text-white ml-1" fill="white" />
                    </div>
                    <div>
                      <p className="font-display text-xl">Video próximamente</p>
                      <p className="text-white/70 text-sm">con {validTestimonials[activeVideo].name}</p>
                    </div>
                  </div>
                </div>
              )
            })()}

            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <Heart className="w-5 h-5 text-[#98465d]" fill="#98465d" />
                <span className="font-display text-lg text-[#5d5a5a]">
                  {validTestimonials[activeVideo].name}
                </span>
              </div>
              {validTestimonials[activeVideo].text && (
                <p className="font-serif italic text-[#5d5a5a]/80 text-sm">
                  &ldquo;{validTestimonials[activeVideo].text}&rdquo;
                </p>
              )}
              <div className="flex justify-center mt-4">
                <StarRating rating={validTestimonials[activeVideo].rating} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
