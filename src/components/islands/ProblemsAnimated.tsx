import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Sparkles } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { resolveIcon } from "@/lib/icons"

interface Problem {
  text: string
}

interface HelpCard {
  icon: string
  title: string
  description: string
}

interface ProblemsAnimatedProps {
  sectionLabel?: string
  title?: string
  titleHighlight?: string
  problems?: Problem[]
  transitionLabel?: string
  helpTitle?: string
  helpTitleHighlight?: string
  helpSubtitle?: string
  helpCards?: HelpCard[]
  ctaLabel?: string
  ctaHref?: string
}

const rotations = [-3, 2, -1, 3, -2, 1, -4, 2, -1, 3, -2, 1, -3, 2, -1, 3, -2, 1]
const delays = [0, 0.1, 0.2, 0.15, 0.25, 0.3, 0.05, 0.35, 0.2, 0.4, 0.1, 0.3, 0.25, 0.15, 0.05, 0.2, 0.35, 0.1]

const DEFAULT_PROBLEMS: Problem[] = [
  { text: 'Tu cabeza no para ni un segundo' },
  { text: 'Tienes la sensación de que algo malo va a pasar' },
  { text: 'Te preocupas por todo, siempre' },
  { text: 'Te cuesta tomar decisiones' },
  { text: 'Te cuesta mucho decir "no"' },
  { text: 'Te afecta demasiado lo que piensen los demás' },
  { text: 'Sientes que no eres suficiente' },
  { text: 'Sientes que no encajas en ningún sitio' },
  { text: 'Sientes que dejaste de ser tú hace tiempo' },
  { text: 'Te sientes vacío/a, sin ganas y no sabes por qué' },
  { text: 'Vives en piloto automático' },
  { text: 'Sientes las emociones muy intensas y te cuesta regularlas' },
  { text: 'El miedo te paraliza constantemente' },
  { text: 'Socializar te agobia y te bloquea' },
  { text: 'Sientes un nudo en el pecho, la garganta o el estómago' },
  { text: 'Tienes ataques de ansiedad o de pánico' },
  { text: 'Te preocupas demasiado por tu salud y la de la gente que quieres' },
  { text: 'Sientes que lo que te pasa no tiene solución' },
]

export default function ProblemsAnimated({
  sectionLabel,
  title,
  titleHighlight,
  problems = DEFAULT_PROBLEMS,
  transitionLabel,
  helpTitle,
  helpTitleHighlight,
  helpSubtitle,
  helpCards,
  ctaLabel,
  ctaHref,
}: ProblemsAnimatedProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

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
    <section ref={sectionRef} className="py-14 md:py-20 lg:py-32 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-20 w-80 h-80 bg-[#98465d]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-[#9591eb]/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-5 relative z-10">
        <div className="text-center mb-12">
          <span className="inline-block text-[#98465d] font-medium mb-4 tracking-wide uppercase text-sm">{sectionLabel}</span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-[#5d5a5a] mb-6 text-balance">
            {title}{" "}
            <span className="text-[#9591eb]">{titleHighlight}</span>
          </h2>
        </div>

        <div className="relative max-w-4xl mx-auto mb-16 md:mb-24">
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {(problems ?? []).map((problem, index) => (
              <div
                key={index}
                className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{
                  transitionDelay: `${delays[index % delays.length]}s`,
                  transform: isVisible ? `rotate(${rotations[index % rotations.length]}deg)` : 'rotate(0deg) translateY(20px)',
                }}
              >
                <div className="bg-white px-4 py-2.5 md:px-5 md:py-3 rounded-2xl shadow-md hover:shadow-lg transition-all hover:scale-105 cursor-default border border-[#cfcdff]/30 hover:border-[#98465d]/30 group">
                  <span className="text-[#5d5a5a] text-sm md:text-base font-medium group-hover:text-[#98465d] transition-colors">
                    {problem.text}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center my-16">
            <div className="flex flex-col items-center gap-2">
              <div className="w-px h-12 bg-gradient-to-b from-transparent via-[#9591eb] to-transparent" />
              <a
                href="/contacto"
                className="bg-[#9591eb] text-white px-6 py-3 rounded-full font-medium shadow-lg hover:bg-[#9591eb]/90 transition-all hover:scale-105 inline-flex items-center"
              >
                <Sparkles className="w-5 h-5 inline-block mr-2" />
                {transitionLabel}
              </a>
              <div className="w-px h-12 bg-gradient-to-b from-transparent via-[#9591eb] to-transparent" />
            </div>
          </div>
        </div>

        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-[#5d5a5a] mb-6 text-balance">
            {helpTitle}{" "}
            <span className="text-[#98465d]">{helpTitleHighlight}</span>
          </h2>
          <p className="text-lg text-[#5d5a5a]/70 max-w-2xl mx-auto">
            {helpSubtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
          {(helpCards ?? []).map((item, index) => {
            const Icon = resolveIcon(item.icon)
            return (
              <Card
                key={index}
                className={`bg-white border-0 shadow-lg rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-1 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${0.4 + index * 0.1}s` }}
              >
                <CardContent className="p-5 md:p-8">
                  <div className="flex gap-5">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#98465d]/10 to-[#9591eb]/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-7 h-7 text-[#98465d]" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl text-[#5d5a5a] mb-2">{item.title}</h3>
                      <p className="text-[#5d5a5a]/70 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="text-center">
          <a href={ctaHref}>
            <Button
              size="lg"
              className="bg-[#98465d] hover:bg-[#98465d]/90 text-white rounded-full px-8 py-6 text-lg font-medium transition-all hover:scale-105 hover:shadow-lg group"
            >
              {ctaLabel}
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  )
}
