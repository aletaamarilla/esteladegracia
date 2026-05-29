import { useState, useEffect, useRef, useCallback } from "react"
import { createPortal } from "react-dom"
import { Button } from "@/components/ui/button"
import { Play, X, ChevronRight } from "lucide-react"
import { HugIcon } from "@/components/icons/hug-icon"

interface AboutHeroProps {
  headline?: string
  subheadline?: string
  videoPlaceholderText?: string
  ctaLabel?: string
  ctaHref?: string
  heroImageUrl?: string
  heroImageSrcSet?: string
  heroImageSizes?: string
  videoUrl?: string
  videoPosterUrl?: string
}

export default function AboutHero({
  headline = "Detrás de cada sesión hay alguien que te entiende de verdad",
  subheadline = "He vivido la ansiedad en primera persona y sé lo difícil que puede ser sentirse perdidx, saturadx o sin saber por dónde empezar. Por eso mi forma de acompañarte nace tanto de lo profesional como de lo vivido.",
  videoPlaceholderText = "Conoce a Estela en 2 minutos",
  ctaLabel = "Reservar mi primera sesión",
  ctaHref = "/contacto",
  heroImageUrl,
  heroImageSrcSet,
  heroImageSizes = "(max-width: 1023px) 100vw, 45vw",
  videoUrl,
  videoPosterUrl,
}: AboutHeroProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isPortrait, setIsPortrait] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const modalVideoRef = useRef<HTMLVideoElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  const openModal = useCallback(() => {
    if (!videoUrl) return
    setIsModalOpen(true)
  }, [videoUrl])

  const closeModal = useCallback(() => {
    const v = modalVideoRef.current
    if (v) { v.pause(); v.currentTime = 0 }
    setIsModalOpen(false)
    setIsPortrait(false)
  }, [])

  const handleMetadata = useCallback(() => {
    const v = modalVideoRef.current
    if (v) setIsPortrait(v.videoHeight > v.videoWidth)
  }, [])

  useEffect(() => {
    if (!isModalOpen) return
    document.body.style.overflow = "hidden"
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeModal() }
    window.addEventListener("keydown", onKey)
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey) }
  }, [isModalOpen, closeModal])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <section
        ref={sectionRef}
        className="relative pt-8 pb-16 lg:pt-12 lg:pb-24 overflow-hidden"
      >
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#cfcdff]/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -left-20 w-72 h-72 bg-[#98465d]/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-5 relative">
          <nav className="flex items-center gap-2 text-sm mb-8">
            <a href="/" className="text-[#5d5a5a]/60 hover:text-[#98465d] transition-colors">
              Inicio
            </a>
            <ChevronRight className="w-3 h-3 text-[#cfcdff]" />
            <span className="text-[#98465d] font-medium">Sobre Mi</span>
          </nav>

          <div
            className={`grid lg:grid-cols-[1.2fr_1fr] gap-6 lg:gap-8 items-center transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="order-2 lg:order-1 space-y-6">
              <div className="inline-flex items-center gap-2 bg-[#cfcdff]/40 px-4 py-2 rounded-full">
                <HugIcon className="w-4 h-4" fill="#98465d" />
                <span className="text-sm font-medium text-[#5d5a5a]">Sobre Mi</span>
              </div>

              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-[#5d5a5a] leading-tight text-balance">
                {headline.split("de verdad").map((part, i) =>
                  i === 0 ? (
                    <span key={i}>
                      {part}
                      <span className="text-[#98465d]">de verdad</span>
                    </span>
                  ) : (
                    <span key={i}>{part}</span>
                  )
                )}
              </h1>

              <p className="font-serif text-lg text-[#5d5a5a]/80 leading-relaxed max-w-lg">
                {subheadline}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a href={ctaHref}>
                  <Button
                    size="lg"
                    className="hover-shimmer bg-[#98465d] hover:bg-[#98465d]/90 text-white rounded-full px-8 py-6 text-base font-medium transition-all hover:scale-105 hover:shadow-lg hover:shadow-[#98465d]/25"
                  >
                    {ctaLabel}
                  </Button>
                </a>
                <a href="/servicios">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-[#9591eb] text-[#9591eb] hover:bg-[#9591eb] hover:text-white rounded-full px-8 py-6 text-base font-medium transition-all bg-transparent"
                  >
                    Ver servicios
                  </Button>
                </a>
              </div>
            </div>

            <div
              className="order-1 lg:order-2 relative"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div
                className={`relative aspect-[3/4] max-h-[55vh] lg:max-h-[65vh] w-full rounded-3xl overflow-hidden shadow-2xl transition-transform duration-700 ease-out mx-auto ${
                  isHovered ? "scale-[1.02]" : ""
                }`}
              >
                {heroImageUrl ? (
                  <img
                    src={heroImageUrl}
                    srcSet={heroImageSrcSet}
                    sizes={heroImageSizes}
                    alt="Estela de Gracia"
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-[#9591eb]/40 to-[#98465d]/40" />
                )}

                {(videoUrl || videoPlaceholderText) && (
                  <button onClick={videoUrl ? openModal : undefined} className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 flex items-center gap-3 z-10" aria-label="Reproducir vídeo">
                    <p className="hidden sm:block text-sm font-medium text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">{videoPlaceholderText}</p>
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 bg-white/90 rounded-full flex items-center justify-center shadow-lg cursor-pointer transition-all duration-300 flex-shrink-0 ${isHovered ? "scale-110" : ""}`}>
                      <Play className="w-5 h-5 sm:w-6 sm:h-6 text-[#98465d] ml-0.5" fill="#98465d" />
                    </div>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {isModalOpen && videoUrl && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center" role="dialog" aria-modal="true" aria-label="Vídeo de presentación">
          <div className="absolute inset-0 bg-black/80" onClick={closeModal} />
          <div className="relative z-10 flex flex-col items-center">
            <button ref={closeRef} onClick={closeModal} className="absolute -top-12 right-0 text-white/80 hover:text-white transition-colors cursor-pointer z-20" aria-label="Cerrar vídeo">
              <X className="w-8 h-8" />
            </button>
            <video
              ref={modalVideoRef}
              src={videoUrl}
              poster={videoPosterUrl}
              autoPlay
              controls
              playsInline
              onLoadedMetadata={handleMetadata}
              className={`rounded-2xl shadow-2xl ${isPortrait ? "h-[85vh] max-w-[90vw]" : "w-[90vw] max-w-6xl max-h-[85vh]"}`}
            />
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
