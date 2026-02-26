import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Maria G.",
    text: "Encontrar a esta terapeuta cambio mi vida. Por primera vez, me senti verdaderamente escuchada y comprendida. La calidez y autenticidad en cada sesion hicieron toda la diferencia.",
    rating: 5,
    date: "hace 2 meses",
    source: "Resena Google",
    hasVideo: true,
  },
  {
    name: "Carlos R.",
    text: "Era esceptico sobre la terapia, pero la conexion genuina que encontre aqui me sorprendio. No se siente clinico para nada—solo conversaciones reales y honestas que ayudan.",
    rating: 5,
    date: "hace 1 mes",
    source: "Resena Google",
    hasVideo: true,
  },
  {
    name: "Ana L.",
    text: "Las sesiones de terapia grupal fueron transformadoras. Compartir con otros que entienden, guiados por una profesional tan compasiva, me dio herramientas que uso cada dia.",
    rating: 5,
    date: "hace 3 semanas",
    source: "Resena Google",
    hasVideo: false,
  },
  {
    name: "David M.",
    text: "Despues de anos de ansiedad frenandome, finalmente encontre a alguien que me ayudo a liberarme. El enfoque aqui es tan humano y cercano.",
    rating: 5,
    date: "hace 1 semana",
    source: "Resena Google",
    hasVideo: true,
  },
]

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 lg:py-32 bg-[#f6f3f5] relative overflow-hidden">
      {/* Decorative shapes */}
      <div className="absolute top-20 left-10 w-32 h-32 border-2 border-[#cfcdff] rounded-full opacity-30" />
      <div className="absolute bottom-20 right-10 w-24 h-24 border-2 border-[#98465d]/30 rounded-full opacity-40" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block text-[#9591eb] font-medium mb-4 tracking-wide uppercase text-sm">Testimonios</span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-[#5d5a5a] mb-6 text-balance">
            Historias reales de{" "}
            <span className="text-[#98465d]">personas reales</span>
          </h2>
          <p className="text-lg text-[#5d5a5a]/70 max-w-2xl mx-auto">
            Cada testimonio refleja un camino único de sanación y crecimiento personal.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="group hover-relief bg-white border-0 shadow-lg rounded-3xl overflow-hidden"
            >
              <CardContent className="p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400" fill="#facc15" />
                      ))}
                    </div>

                    <div className="relative mb-4">
                      <Quote className="absolute -top-1 -left-1 w-6 h-6 text-[#cfcdff]" />
                      <p className="text-[#5d5a5a] leading-relaxed pl-5 font-serif italic text-sm md:text-base">
                        {testimonial.text}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-[#f6f3f5]">
                      <div>
                        <p className="font-semibold text-[#5d5a5a] text-sm">{testimonial.name}</p>
                        <p className="text-xs text-[#5d5a5a]/50">{testimonial.date}</p>
                      </div>
                      <span className="text-xs bg-[#f6f3f5] px-2 py-1 rounded-full text-[#5d5a5a]/60">
                        {testimonial.source}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust indicators */}
        <div className="flex flex-wrap justify-center items-center gap-8 pt-12 mt-12 border-t border-[#cfcdff]/30">
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400" fill="#facc15" />
              ))}
            </div>
            <span className="text-[#5d5a5a] font-medium">4.9/5 en Google</span>
          </div>
          <div className="w-px h-6 bg-[#cfcdff]" />
          <span className="text-[#5d5a5a]/70">50+ resenas verificadas</span>
        </div>
      </div>
    </section>
  )
}
