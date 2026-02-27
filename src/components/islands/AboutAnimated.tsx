import { Card, CardContent } from "@/components/ui/card"
import { Award, Users, GraduationCap, Palette, Plane, Globe } from "lucide-react"
import { useEffect, useState, useRef } from "react"

function FloatingHearts({ isVisible }: { isVisible: boolean }) {
  const [hearts, setHearts] = useState<
    Array<{ id: number; left: number; delay: number; size: number; duration: number; opacity: number }>
  >([])

  useEffect(() => {
    if (isVisible) {
      setHearts(
        Array.from({ length: 10 }, (_, i) => ({
          id: i,
          left: 5 + Math.random() * 90,
          delay: Math.random() * 6,
          size: 14 + Math.random() * 10,
          duration: 10 + Math.random() * 8,
          opacity: 0.08 + Math.random() * 0.1,
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
            bottom: "-30px",
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`,
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={heart.size}
            height={heart.size}
            viewBox="0 0 24 24"
            fill={`rgba(152, 70, 93, ${heart.opacity})`}
            stroke="none"
            aria-hidden="true"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        </div>
      ))}
    </div>
  )
}

export default function AboutAnimated() {
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


  const professionalStats = [
    { icon: Award, label: "Anos de experiencia", value: "12+" },
    { icon: GraduationCap, label: "Formacion especializada", value: "TCC avanzada y EMDR" },
    { icon: Users, label: "Pacientes ayudados", value: "500+" },
  ]

  const personalTraits = [
    { icon: Palette, label: "Artista", description: "La creatividad fluye en todo lo que hago" },
    { icon: Plane, label: "Migrante", description: "Entendiendo el desplazamiento de primera mano" },
    { icon: Globe, label: "Viajera", description: "30+ paises, infinitas perspectivas" },
  ]

  return (
    <section ref={sectionRef} id="about" className="py-14 md:py-20 lg:py-32 relative overflow-hidden">
      <FloatingHearts isVisible={isInView} />
      <div className="container mx-auto px-5 relative z-10">
        <div className="text-center mb-10 md:mb-16">
          <span className="inline-block text-[#9591eb] font-medium mb-4 tracking-wide uppercase text-sm">Sobre Mi</span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-[#5d5a5a] mb-6 text-balance">
            Mas que titulos.{" "}
            <span className="text-[#98465d]">Una persona real.</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 max-w-5xl mx-auto">
          {/* Professional Side */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-1 bg-[#9591eb] rounded-full" />
              <h3 className="text-xl font-semibold text-[#5d5a5a]">La Profesional</h3>
            </div>

            <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg rounded-3xl overflow-hidden">
              <CardContent className="p-5 md:p-8">
                <div className="space-y-6">
                  {professionalStats.map((stat, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-6 p-4 rounded-2xl hover:bg-[#cfcdff]/20 transition-colors"
                    >
                      <div className="w-14 h-14 bg-[#cfcdff]/40 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <stat.icon className="w-6 h-6 text-[#9591eb]" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-[#98465d]">{stat.value}</p>
                        <p className="text-[#5d5a5a]/70">{stat.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Personal Side */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-1 bg-[#98465d] rounded-full" />
              <h3 className="text-xl font-semibold text-[#5d5a5a]">La Humana</h3>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#98465d]/10 to-[#9591eb]/10 rounded-3xl -rotate-2" />

              <Card className="relative bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-3xl overflow-hidden">
                <CardContent className="p-5 md:p-8">
                  <p className="font-serif text-lg text-[#5d5a5a] leading-relaxed mb-8 italic">
                    {"\"Creo que la verdadera conexion viene de la humanidad compartida. Mi propio viaje—como artista, migrante y viajera de toda la vida—ha moldeado como entiendo el dolor, la resiliencia y la hermosa complejidad de ser humano.\""}
                  </p>

                  <div className="grid gap-4">
                    {personalTraits.map((trait, index) => (
                      <div
                        key={index}
                        className="group flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-transparent to-transparent hover:from-[#98465d]/5 hover:to-[#9591eb]/5 transition-all duration-300"
                      >
                        <div className="w-12 h-12 bg-[#98465d]/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                          <trait.icon className="w-5 h-5 text-[#98465d]" />
                        </div>
                        <div>
                          <p className="font-semibold text-[#5d5a5a]">{trait.label}</p>
                          <p className="text-sm text-[#5d5a5a]/60">{trait.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
