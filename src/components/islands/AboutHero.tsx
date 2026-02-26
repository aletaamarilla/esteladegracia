import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Play, ChevronRight } from "lucide-react"
import { HugIcon } from "@/components/icons/hug-icon"

interface AboutHeroProps {
  headline: string
  subheadline: string
  badge: string
  videoPlaceholderText: string
  ctaLabel?: string
  ctaHref?: string
}

export default function AboutHero({
  headline,
  subheadline,
  badge,
  videoPlaceholderText,
  ctaLabel = "Reservar mi primera sesion",
  ctaHref = "/contacto",
}: AboutHeroProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative bg-gradient-to-br from-[#f6f3f5] via-[#cfcdff]/20 to-[#f6f3f5] pt-8 pb-16 lg:pt-12 lg:pb-24 overflow-hidden"
    >
      {/* Decorative blurs */}
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#cfcdff]/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 -left-20 w-72 h-72 bg-[#98465d]/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm mb-8">
          <a href="/" className="text-[#5d5a5a]/60 hover:text-[#98465d] transition-colors">
            Inicio
          </a>
          <ChevronRight className="w-3 h-3 text-[#cfcdff]" />
          <span className="text-[#98465d] font-medium">Sobre Mi</span>
        </nav>

        <div
          className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Text content */}
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

          {/* Photo/Video placeholder */}
          <div
            className="order-1 lg:order-2 relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div
              className={`relative aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl transition-transform duration-700 ease-out ${
                isHovered ? "scale-[1.02]" : ""
              }`}
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#9591eb]/40 to-[#98465d]/40" />

              {/* Play button center */}
              <div className="absolute inset-0 flex items-center justify-center bg-[#cfcdff]/30 backdrop-blur-sm">
                <div className="text-center space-y-3">
                  <div
                    className={`w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-lg cursor-pointer transition-all duration-300 mx-auto ${
                      isHovered ? "scale-110" : ""
                    }`}
                  >
                    <Play className="w-8 h-8 text-[#98465d] ml-1" fill="#98465d" />
                  </div>
                  <p className="text-[#5d5a5a] font-medium">{videoPlaceholderText}</p>
                </div>
              </div>

              {/* Decorative circles */}
              <div
                className={`absolute top-6 right-6 w-12 h-12 bg-[#98465d]/20 rounded-full transition-all duration-500 ${
                  isHovered ? "translate-y-2" : ""
                }`}
              />
              <div
                className={`absolute bottom-8 left-6 w-8 h-8 bg-[#9591eb]/30 rounded-full transition-all duration-700 ${
                  isHovered ? "-translate-y-2" : ""
                }`}
              />
            </div>

            {/* Badge */}
            <div className="absolute -bottom-4 -left-2 sm:-left-4 bg-white px-6 py-3 rounded-2xl shadow-lg">
              <p className="text-sm text-[#5d5a5a]">
                <span className="font-bold text-[#98465d]">500+</span> {badge.replace("500+ ", "")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
