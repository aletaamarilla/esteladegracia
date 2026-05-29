import { useState, useEffect, useRef } from "react"
import { Star, Play, Heart, X, ChevronLeft, ChevronRight } from "lucide-react"
import type { Testimonial } from "@/lib/sanityTypes"
import { iconSvgMap } from "@/lib/icons"

const sourceColors: Record<string, string> = {
  WhatsApp: "#25D366",
  Facebook: "#1877F2",
  "Reseña Google": "#4285F4",
}

interface TestimonialsSectionProps {
  testimonials?: Testimonial[]
  showHeader?: boolean
  showTrustBar?: boolean
  sectionTitle?: string
  sectionHighlight?: string
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
              sizes="(max-width: 1023px) 50vw, 380px"
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

export default function TestimonialsSection({
  testimonials = [],
  showHeader = true,
  showTrustBar = true,
  sectionTitle = "Historias reales,",
  sectionHighlight = "procesos reales",
}: TestimonialsSectionProps) {
  const [activeVideo, setActiveVideo] = useState<number | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const desktopScrollRef = useRef<HTMLDivElement>(null)
  const displayTestimonials = (testimonials ?? []).filter(t => t.text || t.hasVideo)

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

  // Mobile carousel dot tracking
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container || displayTestimonials.length <= 1) return

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
  }, [displayTestimonials.length])

  // Desktop auto-scroll every 4 seconds
  useEffect(() => {
    if (displayTestimonials.length <= 3 || isPaused || activeVideo !== null) return
    const container = desktopScrollRef.current
    if (!container) return

    const interval = setInterval(() => {
      const firstChild = container.firstElementChild as HTMLElement | null
      if (!firstChild) return
      const cardWidth = firstChild.offsetWidth + 32
      const maxScroll = container.scrollWidth - container.clientWidth

      if (container.scrollLeft >= maxScroll - 10) {
        container.scrollTo({ left: 0, behavior: "smooth" })
      } else {
        container.scrollBy({ left: cardWidth, behavior: "smooth" })
      }
    }, 4000)

    return () => clearInterval(interval)
  }, [displayTestimonials.length, isPaused, activeVideo])

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

  const scrollDesktop = (direction: "left" | "right") => {
    const container = desktopScrollRef.current
    if (!container) return
    const firstChild = container.firstElementChild as HTMLElement | null
    if (!firstChild) return
    const cardWidth = firstChild.offsetWidth + 32
    container.scrollBy({
      left: direction === "right" ? cardWidth : -cardWidth,
      behavior: "smooth",
    })
  }

  if (displayTestimonials.length === 0) return null

  return (
    <section id="testimonials" className="py-14 md:py-20 lg:py-32 relative overflow-hidden">
      <div className="container mx-auto px-5 relative">
        {showHeader && (
          <div className="text-center mb-8 md:mb-16">
            <span className="inline-block text-[#9591eb] font-medium mb-3 md:mb-4 tracking-wide uppercase text-sm">
              Testimonios
            </span>
            <h2 className="font-display text-2xl md:text-4xl lg:text-5xl text-[#5d5a5a] mb-3 md:mb-6 text-balance">
              {sectionTitle}{" "}
              <span className="text-[#98465d]">{sectionHighlight}</span>
            </h2>
            <p className="text-sm md:text-lg text-[#5d5a5a]/70 max-w-2xl mx-auto">
              Estas historias hablan de personas que también estuvieron donde tú estás y, aunque sintieron que no podían más, se atrevieron a dar el paso.
            </p>
          </div>
        )}

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
          {displayTestimonials.map((testimonial, index) => (
            <div key={testimonial._id ?? index} role="article" className="snap-center shrink-0 w-[85vw] max-w-[340px]">
              <ReviewCard
                testimonial={testimonial}
                variant="mobile"
                onPlayVideo={() => setActiveVideo(index)}
              />
            </div>
          ))}
        </div>

        {/* Mobile dots */}
        {displayTestimonials.length > 1 && (
          <div className="md:hidden flex justify-center gap-2 mt-4">
            {displayTestimonials.map((_, i) => (
              <span
                key={i}
                className={`carousel-dot ${i === activeIndex ? "carousel-dot-active" : ""}`}
              />
            ))}
          </div>
        )}

        {/* Desktop horizontal carousel */}
        <div
          className="hidden md:block relative max-w-6xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {displayTestimonials.length > 3 && (
            <>
              <button
                onClick={() => scrollDesktop("left")}
                className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center text-[#5d5a5a] hover:text-[#98465d] transition-colors"
                aria-label="Anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollDesktop("right")}
                className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center text-[#5d5a5a] hover:text-[#98465d] transition-colors"
                aria-label="Siguiente"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          <div
            ref={desktopScrollRef}
            className="overflow-x-auto scrollbar-hide snap-x snap-mandatory flex gap-8"
          >
            {displayTestimonials.map((testimonial, index) => (
              <div
                key={testimonial._id ?? index}
                className="snap-start shrink-0 w-[calc((100%-4rem)/3)]"
              >
                <ReviewCard
                  testimonial={testimonial}
                  variant="desktop"
                  onPlayVideo={() => setActiveVideo(index)}
                />
              </div>
            ))}
          </div>
        </div>

        {showTrustBar && (
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 pt-6 md:pt-12 mt-6 md:mt-12 border-t border-[#cfcdff]/30">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 md:w-5 h-4 md:h-5 text-yellow-400" fill="#facc15" />
                ))}
              </div>
              <span className="text-[#5d5a5a] font-medium text-sm md:text-base">4.9/5 en Google</span>
            </div>
            <div className="w-px h-5 bg-[#cfcdff]" />
            <span className="text-[#5d5a5a]/70 text-sm md:text-base">50+ resenas verificadas</span>
          </div>
        )}
      </div>

      {/* Video modal */}
      {activeVideo !== null && displayTestimonials[activeVideo] && (
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
              const t = displayTestimonials[activeVideo]
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
                      <p className="text-white/70 text-sm">
                        con {displayTestimonials[activeVideo].name}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })()}

            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <Heart className="w-5 h-5 text-[#98465d]" fill="#98465d" />
                <span className="font-display text-lg text-[#5d5a5a]">
                  {displayTestimonials[activeVideo].name}
                </span>
              </div>
              {displayTestimonials[activeVideo].text && (
                <p className="font-serif italic text-[#5d5a5a]/80 text-sm">
                  &ldquo;{displayTestimonials[activeVideo].text}&rdquo;
                </p>
              )}
              <div className="flex justify-center mt-4">
                <StarRating rating={displayTestimonials[activeVideo].rating} />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
