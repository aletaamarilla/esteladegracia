import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Sparkles, Heart, MessageCircle, Shield, Compass } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const problems = [
  { text: "Tu cabeza no para ni un segundo", rotation: -3, delay: 0 },
  { text: "Hay un nubarron constante sobre ti", rotation: 2, delay: 0.1 },
  { text: "Sientes inseguridad todo el rato", rotation: -1, delay: 0.2 },
  { text: "No sabes por que, pero estas triste", rotation: 3, delay: 0.15 },
  { text: "Te cuesta mucho decir que no", rotation: -2, delay: 0.25 },
  { text: "Sientes que no encajas en ningun sitio", rotation: 1, delay: 0.3 },
  { text: "El miedo te paraliza constantemente", rotation: -4, delay: 0.05 },
  { text: "Tu autoestima esta por los suelos", rotation: 2, delay: 0.35 },
  { text: "Necesitas la aprobacion de todos", rotation: -1, delay: 0.2 },
  { text: "Te cuesta gestionar tus emociones", rotation: 3, delay: 0.4 },
  { text: "Sientes que no eres suficiente", rotation: -2, delay: 0.1 },
  { text: "Vives en piloto automatico", rotation: 1, delay: 0.3 },
  { text: "Las relaciones te agotan", rotation: -3, delay: 0.25 },
  { text: "Te preocupas por todo, siempre", rotation: 2, delay: 0.15 },
]

const howIHelp = [
  {
    icon: MessageCircle,
    title: "Escucha activa y sin juicios",
    description: "Un espacio donde puedes ser tu mismo/a sin filtros. Aqui no hay respuestas correctas o incorrectas."
  },
  {
    icon: Compass,
    title: "Herramientas practicas",
    description: "Tecnicas que funcionan en tu dia a dia, no solo teoria. Cosas que puedes aplicar desde la primera sesion."
  },
  {
    icon: Shield,
    title: "Ritmo que te respeta",
    description: "Cada persona tiene su proceso. No hay prisa, no hay presion. Avanzamos juntos a tu ritmo."
  },
  {
    icon: Heart,
    title: "Conexion genuina",
    description: "No soy una terapeuta distante detras de un escritorio. Soy una persona que entiende porque tambien ha estado ahi."
  },
]

export default function ProblemsAnimated() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-14 md:py-20 lg:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-20 w-80 h-80 bg-[#98465d]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-[#9591eb]/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-5 relative z-10">
        {/* "Si te pasa esto" section */}
        <div className="text-center mb-12">
          <span className="inline-block text-[#98465d] font-medium mb-4 tracking-wide uppercase text-sm">Reconoces algo de esto?</span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-[#5d5a5a] mb-6 text-balance">
            Si te pasa algo de esto...{" "}
            <span className="text-[#9591eb]">no estas solo/a</span>
          </h2>
        </div>

        {/* Scattered problem tags */}
        <div className="relative max-w-4xl mx-auto mb-16 md:mb-24">
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {problems.map((problem, index) => (
              <div
                key={index}
                className={`transition-all duration-700 ${index >= 6 ? 'hidden md:block' : ''} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{
                  transitionDelay: `${problem.delay}s`,
                  transform: isVisible ? `rotate(${problem.rotation}deg)` : 'rotate(0deg) translateY(20px)',
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

          {/* Connecting element */}
          <div className="flex justify-center my-16">
            <div className="flex flex-col items-center gap-2">
              <div className="w-px h-12 bg-gradient-to-b from-transparent via-[#9591eb] to-transparent" />
              <div className="bg-[#9591eb] text-white px-6 py-3 rounded-full font-medium shadow-lg">
                <Sparkles className="w-5 h-5 inline-block mr-2" />
                Hay salida
              </div>
              <div className="w-px h-12 bg-gradient-to-b from-transparent via-[#9591eb] to-transparent" />
            </div>
          </div>
        </div>

        {/* "Asi es como puedo ayudarte" section */}
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-[#5d5a5a] mb-6 text-balance">
            Asi es como{" "}
            <span className="text-[#98465d]">puedo ayudarte</span>
          </h2>
          <p className="text-lg text-[#5d5a5a]/70 max-w-2xl mx-auto">
            Mi enfoque es cercano, humano y sin distancia. Porque la terapia funciona mejor cuando hay conexion real.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
          {howIHelp.map((item, index) => (
            <Card
              key={index}
              className={`bg-white border-0 shadow-lg rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-1 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${0.4 + index * 0.1}s` }}
            >
              <CardContent className="p-5 md:p-8">
                <div className="flex gap-5">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#98465d]/10 to-[#9591eb]/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-7 h-7 text-[#98465d]" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl text-[#5d5a5a] mb-2">{item.title}</h3>
                    <p className="text-[#5d5a5a]/70 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <a href="/contacto">
            <Button
              size="lg"
              className="bg-[#98465d] hover:bg-[#98465d]/90 text-white rounded-full px-8 py-6 text-lg font-medium transition-all hover:scale-105 hover:shadow-lg group"
            >
              Quiero empezar
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  )
}
