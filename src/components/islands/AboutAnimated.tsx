import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useState, useRef } from "react"
import { resolveIcon } from "@/lib/icons"

interface ProfessionalStat {
  icon: string
  label: string
  value: string
}

interface PersonalTrait {
  icon: string
  label: string
  description: string
}

interface AboutAnimatedProps {
  sectionLabel?: string
  title?: string
  titleHighlight?: string
  professionalStats?: ProfessionalStat[]
  personalQuote?: string
  personalTraits?: PersonalTrait[]
  profileImageUrl?: string
  profileImageSrcSet?: string
  profileImagePosition?: string
  humanImageUrl?: string
  humanImageSrcSet?: string
  humanImagePosition?: string
}

function FloatingHearts({ isVisible }: { isVisible: boolean }) {
  const [hearts, setHearts] = useState<
    Array<{ id: number; left: number; delay: number; size: number; duration: number; opacity: number }>
  >([])

  useEffect(() => {
    if (isVisible) {
      setHearts(
        Array.from({ length: 15 }, (_, i) => ({
          id: i,
          left: Math.random() * 100,
          delay: Math.random() * 5,
          size: 18 + Math.random() * 24,
          duration: 6 + Math.random() * 5,
          opacity: 0.2 + Math.random() * 0.25,
        }))
      )
    } else {
      setHearts([])
    }
  }, [isVisible])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute animate-float-up"
          style={{
            left: `${heart.left}%`,
            bottom: "-50px",
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`,
          }}
        >
          <span
            className="drop-shadow-sm select-none"
            style={{
              fontSize: heart.size,
              opacity: heart.opacity,
              lineHeight: 1,
            }}
            aria-hidden="true"
          >
            💖
          </span>
        </div>
      ))}
    </div>
  )
}

export default function AboutAnimated({
  sectionLabel = "Sobre Mi",
  title = "Mas que titulos.",
  titleHighlight = "Una persona real.",
  professionalStats = [
    { icon: "Users", label: "En consulta, programas y espacios terapéuticos", value: "+600 personas acompañadas" },
    { icon: "GraduationCap", label: "Formacion especializada", value: "TCC avanzada y EMDR" },
    { icon: "Award", label: "Anos de experiencia", value: "12+" },
  ],
  personalQuote = '"Creo que la verdadera conexion viene de la humanidad compartida. Mi propio viaje—como artista, migrante y viajera de toda la vida—ha moldeado como entiendo el dolor, la resiliencia y la hermosa complejidad de ser humano."',
  personalTraits = [
    { icon: "Palette", label: "Artista", description: "La creatividad fluye en todo lo que hago" },
    { icon: "Plane", label: "Migrante", description: "Entendiendo el desplazamiento de primera mano" },
    { icon: "Globe", label: "Viajera", description: "30+ paises, infinitas perspectivas" },
  ],
  profileImageUrl,
  profileImageSrcSet,
  profileImagePosition = 'center',
  humanImageUrl,
  humanImageSrcSet,
  humanImagePosition = 'center',
}: AboutAnimatedProps) {
  const [isInView, setIsInView] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="about" className="py-14 md:py-20 lg:py-32 relative overflow-hidden">
      <FloatingHearts isVisible={isInView} />
      <div className="container mx-auto px-5 relative z-10">
        <div className="text-center mb-10 md:mb-16">
          <span className="inline-block text-[#9591eb] font-medium mb-4 tracking-wide uppercase text-sm">{sectionLabel}</span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-[#5d5a5a] mb-6 text-balance">
            {title}{" "}
            <span className="text-[#98465d]">{titleHighlight}</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-1 bg-[#9591eb] rounded-full" />
              <h3 className="text-xl font-semibold text-[#5d5a5a]">La Profesional</h3>
            </div>

            <Card className="h-full flex flex-col bg-white/95 backdrop-blur-sm border-0 shadow-lg rounded-3xl overflow-hidden">
              {profileImageUrl && (
                <img
                  src={profileImageUrl}
                  srcSet={profileImageSrcSet}
                  sizes="(max-width: 767px) 90vw, (max-width: 1023px) 45vw, 550px"
                  alt="Estela de Gracia"
                  className="w-full aspect-[4/5] object-cover"
                  style={{ objectPosition: profileImagePosition }}
                  loading="lazy"
                  decoding="async"
                />
              )}
              <CardContent className="flex-1 p-5 md:p-8">
                <div className="space-y-6">
                  {professionalStats.map((stat, index) => {
                    const Icon = resolveIcon(stat.icon)
                    return (
                      <div
                        key={index}
                        className="flex items-center gap-6 p-4 rounded-2xl hover:bg-[#cfcdff]/20 transition-colors"
                      >
                        <div className="w-14 h-14 bg-[#cfcdff]/40 rounded-2xl flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-[#9591eb]" />
                        </div>
                        <div>
                          <p className="text-lg md:text-xl font-bold text-[#98465d] leading-snug">{stat.value}</p>
                          <p className="text-sm text-[#5d5a5a]/70 mt-0.5">{stat.label}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-1 bg-[#98465d] rounded-full" />
              <h3 className="text-xl font-semibold text-[#5d5a5a]">La Humana</h3>
            </div>

            <Card className="h-full flex flex-col bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-3xl overflow-hidden">
              {humanImageUrl && (
                <img
                  src={humanImageUrl}
                  srcSet={humanImageSrcSet}
                  sizes="(max-width: 767px) 90vw, (max-width: 1023px) 45vw, 550px"
                  alt="Estela de Gracia – lado personal"
                  className="w-full aspect-[4/5] object-cover"
                  style={{ objectPosition: humanImagePosition }}
                  loading="lazy"
                  decoding="async"
                />
              )}
              <CardContent className="flex-1 p-5 md:p-8">
                <div className="space-y-6">
                  {personalTraits.map((trait, index) => {
                    const Icon = resolveIcon(trait.icon)
                    return (
                      <div
                        key={index}
                        className="flex items-center gap-6 p-4 rounded-2xl hover:bg-[#98465d]/10 transition-colors"
                      >
                        <div className="w-14 h-14 bg-[#98465d]/15 rounded-2xl flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-[#98465d]" />
                        </div>
                        <div>
                          <p className="text-lg font-bold text-[#98465d]">{trait.label}</p>
                          <p className="text-[#5d5a5a]/70">{trait.description}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
