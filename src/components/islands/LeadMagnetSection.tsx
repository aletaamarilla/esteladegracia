import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Download, Mail, CheckCircle, Sparkles } from "lucide-react"

export default function LeadMagnetSection() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubmitted(true)
    }
  }

  return (
    <section className="py-14 md:py-20 lg:py-32 relative">
      {/* Organic shapes — centrados verticalmente para no crear cortes en los bordes */}
      <div className="absolute top-1/3 -left-10 w-40 h-40 bg-[#cfcdff]/30 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-1/3 -right-10 w-60 h-60 bg-[#98465d]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-5 relative">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-[#f6f3f5] to-white rounded-3xl p-5 md:p-12 lg:p-16 shadow-lg relative overflow-hidden">
            {/* Corner decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#cfcdff]/30 rounded-bl-full" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#98465d]/10 rounded-tr-full" />

            <div className="relative grid md:grid-cols-2 gap-8 items-center">
              {/* Content */}
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 bg-[#9591eb]/20 px-4 py-2 rounded-full">
                  <Download className="w-4 h-4 text-[#9591eb]" />
                  <span className="text-sm font-medium text-[#5d5a5a]">Recurso Gratuito</span>
                </div>

                <h2 className="font-display text-3xl md:text-4xl text-[#5d5a5a] text-balance">
                  Kit de Herramientas{" "}
                  <span className="text-[#98465d]">para la Ansiedad</span>
                </h2>

                <p className="text-[#5d5a5a]/70 leading-relaxed">
                  Obt&eacute;n acceso instantaneo a tecnicas y ejercicios practicos que uso con mis pacientes. Comienza a manejar la ansiedad hoy con metodos suaves y comprobados.
                </p>

                <ul className="space-y-3">
                  {["5 Tecnicas de Anclaje", "Guia de Ejercicios de Respiracion", "Plantilla de Check-in Diario", "Protocolo de Calma de Emergencia"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-[#5d5a5a]">
                      <Sparkles className="w-4 h-4 text-[#9591eb]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Form */}
              <div className="bg-white rounded-3xl p-5 md:p-8 shadow-lg">
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <label htmlFor="lead-email" className="text-sm font-medium text-[#5d5a5a]">
                        Tu correo electronico
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#5d5a5a]/40" />
                        <Input
                          id="lead-email"
                          type="email"
                          placeholder="hola@ejemplo.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-12 py-6 rounded-2xl border-[#cfcdff] focus:border-[#9591eb] focus:ring-[#9591eb]/20"
                          required
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-[#98465d] hover:bg-[#98465d]/90 text-white rounded-2xl py-6 text-lg font-medium transition-all hover:scale-[1.02]"
                    >
                      Obtener Herramientas Gratis
                    </Button>

                    <p className="text-xs text-center text-[#5d5a5a]/50">
                      Sin spam, nunca. Cancela cuando quieras.
                    </p>
                  </form>
                ) : (
                  <div className="text-center py-8 space-y-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#5d5a5a]">Revisa tu bandeja de entrada!</h3>
                    <p className="text-[#5d5a5a]/70">
                      Tus herramientas gratuitas para la ansiedad estan en camino. Llegaran en los proximos minutos.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
