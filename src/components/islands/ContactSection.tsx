import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { MessageCircle, Mail, Phone, Send, CheckCircle, Heart } from "lucide-react"
import { useState } from "react"

export default function ContactSection() {
  const [contactMethod, setContactMethod] = useState<"form" | "whatsapp">("whatsapp")
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
  }

  const handleWhatsApp = () => {
    const message = encodeURIComponent("Hola! Me gustaria agendar una cita para conocernos.")
    window.open(`https://wa.me/34600000000?text=${message}`, "_blank")
  }

  return (
    <section id="contact" className="py-20 lg:py-32 bg-gradient-to-br from-[#f6f3f5] via-[#cfcdff]/10 to-[#f6f3f5] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-40 h-40 bg-[#98465d]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-32 h-32 bg-[#9591eb]/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <span className="inline-block text-[#98465d] font-medium mb-4 tracking-wide uppercase text-sm">Contacto</span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-[#5d5a5a] mb-6 text-balance">
            Da el primer paso.{" "}
            <span className="text-[#9591eb]">Estoy aqui.</span>
          </h2>
          <p className="text-lg text-[#5d5a5a]/70 max-w-xl mx-auto">
            Elige como prefieres contactarme. Sin compromiso, solo una conversacion para conocernos.
          </p>
        </div>

        {/* Contact Method Toggle */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-white rounded-full p-1.5 shadow-lg">
            <button
              onClick={() => setContactMethod("form")}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
                contactMethod === "form"
                  ? "bg-[#98465d] text-white"
                  : "text-[#5d5a5a] hover:bg-[#f6f3f5]"
              }`}
            >
              <Mail className="w-4 h-4" />
              Formulario
            </button>
            <button
              onClick={() => setContactMethod("whatsapp")}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
                contactMethod === "whatsapp"
                  ? "bg-[#25D366] text-white"
                  : "text-[#5d5a5a] hover:bg-[#f6f3f5]"
              }`}
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </button>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          {contactMethod === "form" ? (
            <Card className="bg-white border-0 shadow-xl rounded-3xl overflow-hidden">
              <CardContent className="p-8 md:p-10">
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="contact-name" className="text-sm font-medium text-[#5d5a5a]">
                          Tu nombre
                        </label>
                        <Input
                          id="contact-name"
                          type="text"
                          placeholder="Maria Garcia"
                          value={formState.name}
                          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                          className="py-5 rounded-xl border-[#cfcdff] focus:border-[#9591eb] focus:ring-[#9591eb]/20"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="contact-email" className="text-sm font-medium text-[#5d5a5a]">
                          Correo electronico
                        </label>
                        <Input
                          id="contact-email"
                          type="email"
                          placeholder="maria@ejemplo.com"
                          value={formState.email}
                          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                          className="py-5 rounded-xl border-[#cfcdff] focus:border-[#9591eb] focus:ring-[#9591eb]/20"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="contact-phone" className="text-sm font-medium text-[#5d5a5a]">
                        Telefono (opcional)
                      </label>
                      <Input
                        id="contact-phone"
                        type="tel"
                        placeholder="+34 600 000 000"
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                        className="py-5 rounded-xl border-[#cfcdff] focus:border-[#9591eb] focus:ring-[#9591eb]/20"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="contact-message" className="text-sm font-medium text-[#5d5a5a]">
                        Cuentame un poco sobre ti
                      </label>
                      <Textarea
                        id="contact-message"
                        placeholder="Que te trae aqui? No hay respuestas correctas o incorrectas..."
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        className="min-h-[120px] rounded-xl border-[#cfcdff] focus:border-[#9591eb] focus:ring-[#9591eb]/20 resize-none"
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-[#98465d] hover:bg-[#98465d]/90 text-white rounded-xl py-6 text-lg font-medium transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
                    >
                      <Send className="w-5 h-5" />
                      Enviar mensaje
                    </Button>

                    <p className="text-xs text-center text-[#5d5a5a]/50">
                      Respondo en menos de 24 horas. Tu informacion es completamente confidencial.
                    </p>
                  </form>
                ) : (
                  <div className="text-center py-8 space-y-4">
                    <div className="w-20 h-20 bg-[#98465d]/10 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle className="w-10 h-10 text-[#98465d]" />
                    </div>
                    <h3 className="text-2xl font-display text-[#5d5a5a]">Mensaje recibido!</h3>
                    <p className="text-[#5d5a5a]/70 max-w-sm mx-auto">
                      Gracias por dar el primer paso. Te respondere pronto para conocernos mejor.
                    </p>
                    <div className="flex items-center justify-center gap-2 text-[#98465d]">
                      <Heart className="w-4 h-4" fill="#98465d" />
                      <span className="text-sm font-medium">Hasta pronto</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-white border-0 shadow-xl rounded-3xl overflow-hidden">
              <CardContent className="p-8 md:p-10 text-center space-y-6">
                <div className="w-24 h-24 bg-[#25D366]/10 rounded-full flex items-center justify-center mx-auto">
                  <MessageCircle className="w-12 h-12 text-[#25D366]" />
                </div>

                <div className="space-y-3">
                  <h3 className="text-2xl font-display text-[#5d5a5a]">Contactame por WhatsApp</h3>
                  <p className="text-[#5d5a5a]/70 max-w-md mx-auto">
                    Si prefieres una respuesta mas rapida y directa, escribeme por WhatsApp.
                    Respondo personalmente a cada mensaje.
                  </p>
                </div>

                <div className="space-y-4">
                  <Button
                    onClick={handleWhatsApp}
                    className="bg-[#25D366] hover:bg-[#25D366]/90 text-white rounded-xl px-8 py-6 text-lg font-medium transition-all hover:scale-[1.02] flex items-center justify-center gap-3 mx-auto"
                  >
                    <MessageCircle className="w-6 h-6" />
                    Abrir WhatsApp
                  </Button>

                  <div className="flex items-center justify-center gap-4 text-sm text-[#5d5a5a]/60">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span>+34 600 000 000</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-[#f6f3f5]">
                  <p className="text-xs text-[#5d5a5a]/50">
                    Horario de respuesta: Lunes a Viernes, 9:00 - 20:00
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  )
}
