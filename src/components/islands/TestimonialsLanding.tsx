import { useState, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Play, Heart, X, Quote } from "lucide-react"
import { testimonials } from "@/data/testimonials"

type FilterType = "all" | "individual" | "group"

function StarRating({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(rating)].map((_, i) => (
        <Star key={i} className="text-yellow-400" fill="#facc15" style={{ width: size, height: size }} />
      ))}
    </div>
  )
}

export default function TestimonialsLanding() {
  const [activeVideo, setActiveVideo] = useState<number | null>(null)
  const [filter, setFilter] = useState<FilterType>("all")
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set())
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  const filtered = filter === "all"
    ? testimonials
    : testimonials.filter((t) => t.serviceType === filter)

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

  const filters: { key: FilterType; label: string }[] = [
    { key: "all", label: "Todos" },
    { key: "individual", label: "Terapia Individual" },
    { key: "group", label: "Terapia Grupal" },
  ]

  return (
    <div className="relative">
      {/* Trust Stats Header */}
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
                <span className="text-xl md:text-2xl font-bold text-[#98465d]">4.9</span>
                <span className="text-[#5d5a5a]/60 text-sm ml-1">/ 5</span>
              </div>
            </div>
            <div className="w-px h-6 bg-[#cfcdff]/40" />
            <div className="text-center">
              <span className="text-xl md:text-2xl font-bold text-[#98465d]">50+</span>
              <p className="text-[10px] md:text-xs text-[#5d5a5a]/60 mt-0.5">Resenas verificadas</p>
            </div>
            <div className="w-px h-6 bg-[#cfcdff]/40 hidden md:block" />
            <div className="hidden md:flex items-center gap-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="text-sm text-[#5d5a5a]/70 font-medium">Google Reviews</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="py-10 md:py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute top-20 right-0 w-72 h-72 bg-[#9591eb]/8 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-24 w-80 h-80 bg-[#98465d]/[0.04] rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-[#98465d]/[0.03] rounded-full blur-3xl" />

        <div className="container mx-auto px-5 relative">
          {/* Filter pills */}
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

          {/* Testimonial grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-8 max-w-6xl mx-auto">
            {filtered.map((testimonial, index) => {
              const globalIndex = testimonials.indexOf(testimonial)
              const isVisible = visibleCards.has(index)

              return (
                <div
                  key={`${filter}-${globalIndex}`}
                  ref={(el) => { cardRefs.current[index] = el }}
                  data-index={index}
                  className={`transition-all duration-700 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${Math.min(index * 0.1, 0.6)}s` }}
                >
                  <Card className="group hover-relief bg-white border-0 shadow-md rounded-3xl overflow-hidden h-full">
                    {/* Video thumbnail strip */}
                    {testimonial.hasVideo && (
                      <div
                        className="relative h-36 cursor-pointer overflow-hidden"
                        onClick={() => setActiveVideo(globalIndex)}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-[#98465d]/45 to-[#9591eb]/45 group-hover:from-[#98465d]/55 group-hover:to-[#9591eb]/55 transition-all duration-500" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                            <Play className="w-5 h-5 text-[#98465d] ml-0.5" fill="#98465d" />
                          </div>
                        </div>
                        <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full">
                          <Heart className="w-3 h-3 text-[#98465d]" fill="#98465d" />
                          <span className="text-[10px] font-medium text-[#5d5a5a]">Ver video</span>
                        </div>
                      </div>
                    )}

                    <CardContent className="p-6 md:p-7">
                      <StarRating rating={testimonial.rating} />

                      <div className="relative mt-4 mb-5">
                        <Quote className="absolute -top-1 -left-1 w-5 h-5 text-[#cfcdff]/50" />
                        <p className="text-[#5d5a5a] leading-relaxed pl-4 font-serif italic text-[15px]">
                          "{testimonial.text}"
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-[#f6f3f5]">
                        <div>
                          <p className="font-semibold text-[#5d5a5a] text-sm">{testimonial.name}</p>
                          <p className="text-xs text-[#5d5a5a]/50">{testimonial.date}</p>
                        </div>
                        <span className="text-[10px] bg-[#f6f3f5] px-2.5 py-1 rounded-full text-[#5d5a5a]/50 font-medium">
                          {testimonial.serviceType === "individual" ? "Individual" : "Grupal"}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Mid-page CTA */}
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

      {/* Video Modal */}
      {activeVideo !== null && (
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

            {testimonials[activeVideo].videoUrl ? (
              <video
                className="w-full aspect-video bg-black"
                src={testimonials[activeVideo].videoUrl}
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
                    <p className="font-display text-xl">Momento del Abrazo</p>
                    <p className="text-white/70 text-sm">con {testimonials[activeVideo].name}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <Heart className="w-5 h-5 text-[#98465d]" fill="#98465d" />
                <span className="font-display text-lg text-[#5d5a5a]">
                  Momento del abrazo con {testimonials[activeVideo].name}
                </span>
              </div>
              <p className="font-serif italic text-[#5d5a5a]/80 text-sm">
                {`"${testimonials[activeVideo].text}"`}
              </p>
              <div className="flex justify-center mt-4">
                <StarRating rating={testimonials[activeVideo].rating} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
