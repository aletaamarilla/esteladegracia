import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { MessageCircle, Mail, Phone, Send, CheckCircle, Heart } from "lucide-react"
import { useState } from "react"
import { submitHubspotForm } from "@/lib/hubspot"

const DEFAULT_FORM_ID = "3f5d96ef-02a0-4c6e-a743-58da044c4481"

interface ContactSectionProps {
  sectionLabel?: string
  title?: string
  titleHighlight?: string
  subtitle?: string
  sideImageUrl?: string
  sideImageSrcSet?: string
  sideImagePosition?: string
  hubspotFormId?: string
  formLabels?: {
    nameLabel?: string
    namePlaceholder?: string
    emailLabel?: string
    emailPlaceholder?: string
    phoneLabel?: string
    phonePlaceholder?: string
    messageLabel?: string
    messagePlaceholder?: string
    submitButton?: string
    privacyNote?: string
  }
  successState?: {
    title?: string
    message?: string
    farewell?: string
  }
  whatsappSection?: {
    title?: string
    description?: string
    buttonText?: string
  }
  whatsappUrl?: string
  whatsappPhone?: string
}

export default function ContactSection({
  sectionLabel,
  title,
  titleHighlight,
  subtitle,
  formLabels,
  successState,
  whatsappSection,
  sideImageUrl,
  sideImageSrcSet,
  sideImagePosition = "center",
  hubspotFormId,
  whatsappUrl,
  whatsappPhone,
}: ContactSectionProps) {
  const [contactMethod, setContactMethod] = useState<"form" | "whatsapp">(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search)
      if (params.get("method") === "form") return "form"
    }
    return "whatsapp"
  })
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [consentChecked, setConsentChecked] = useState(false)
  const hasSideImage = Boolean(sideImageUrl)
  const contactLayoutClass = hasSideImage
    ? contactMethod === "whatsapp"
      ? "max-w-4xl grid md:grid-cols-[minmax(0,520px)_minmax(240px,320px)] gap-6 lg:gap-8 items-stretch justify-center"
      : "max-w-5xl grid md:grid-cols-[minmax(0,1fr)_320px] gap-8 items-start"
    : "max-w-2xl"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formState.name || !formState.email || !formState.message || !consentChecked) return

    setIsSubmitting(true)
    setError(null)

    const formId = hubspotFormId || DEFAULT_FORM_ID

    try {
      await submitHubspotForm(formId, [
        { objectTypeId: "0-1", name: "firstname", value: formState.name },
        { objectTypeId: "0-1", name: "email", value: formState.email },
        { objectTypeId: "0-1", name: "cuentame_un_poco_sobre_ti", value: formState.message },
      ])
      setIsSubmitted(true)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Ha ocurrido un error. Por favor, inténtalo de nuevo."
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleWhatsApp = () => {
    window.open(whatsappUrl, "_blank")
  }

  return (
    <section id="contact" className="py-14 md:py-20 lg:py-32 relative overflow-hidden">
      <div className="absolute top-20 right-10 w-40 h-40 bg-[#98465d]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-32 h-32 bg-[#9591eb]/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-5 relative z-10">
        <div className="text-center mb-12">
          <span className="inline-block text-[#98465d] font-medium mb-4 tracking-wide uppercase text-sm">{sectionLabel}</span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-[#5d5a5a] mb-6 text-balance">
            {title}{" "}
            <span className="text-[#9591eb]">{titleHighlight}</span>
          </h2>
          <p className="text-lg text-[#5d5a5a]/70 max-w-xl mx-auto">{subtitle}</p>
        </div>

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

        {hasSideImage && (
          <div className="md:hidden max-w-2xl mx-auto mb-8">
            <img
              src={sideImageUrl}
              srcSet={sideImageSrcSet}
              sizes="100vw"
              alt=""
              aria-hidden="true"
              className="w-full h-48 object-cover rounded-3xl shadow-lg"
              style={{ objectPosition: sideImagePosition }}
              loading="lazy"
              decoding="async"
            />
          </div>
        )}

        <div className={`mx-auto ${contactLayoutClass}`}>
          {contactMethod === "form" ? (
            <Card className="bg-white border-0 shadow-xl rounded-3xl overflow-hidden py-0">
              <CardContent className="p-5 md:p-10">
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="contact-name" className="text-sm font-medium text-[#5d5a5a]">
                          {formLabels?.nameLabel}
                        </label>
                        <Input
                          id="contact-name"
                          type="text"
                          placeholder={formLabels?.namePlaceholder}
                          value={formState.name}
                          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                          className="py-5 rounded-xl border-[#cfcdff] focus:border-[#9591eb] focus:ring-[#9591eb]/20"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="contact-email" className="text-sm font-medium text-[#5d5a5a]">
                          {formLabels?.emailLabel}
                        </label>
                        <Input
                          id="contact-email"
                          type="email"
                          placeholder={formLabels?.emailPlaceholder}
                          value={formState.email}
                          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                          className="py-5 rounded-xl border-[#cfcdff] focus:border-[#9591eb] focus:ring-[#9591eb]/20"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="contact-phone" className="text-sm font-medium text-[#5d5a5a]">
                        {formLabels?.phoneLabel}
                      </label>
                      <Input
                        id="contact-phone"
                        type="tel"
                        placeholder={formLabels?.phonePlaceholder}
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                        className="py-5 rounded-xl border-[#cfcdff] focus:border-[#9591eb] focus:ring-[#9591eb]/20"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="contact-message" className="text-sm font-medium text-[#5d5a5a]">
                        {formLabels?.messageLabel}
                      </label>
                      <Textarea
                        id="contact-message"
                        placeholder={formLabels?.messagePlaceholder}
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        className="min-h-[120px] rounded-xl border-[#cfcdff] focus:border-[#9591eb] focus:ring-[#9591eb]/20 resize-none"
                        required
                      />
                    </div>

                    <label className="flex items-start gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={consentChecked}
                        onChange={(e) => setConsentChecked(e.target.checked)}
                        className="mt-0.5 accent-[#9591eb]"
                        required
                      />
                      <span className="text-xs text-[#5d5a5a]/70">
                        {formLabels?.privacyNote || "Acepto la política de privacidad y el tratamiento de mis datos."}
                      </span>
                    </label>

                    <Button
                      type="submit"
                      disabled={isSubmitting || !consentChecked}
                      className={`w-full bg-[#98465d] hover:bg-[#98465d]/90 text-white rounded-xl py-6 text-lg font-medium transition-all hover:scale-[1.02] flex items-center justify-center gap-2 ${
                        isSubmitting || !consentChecked ? "opacity-60 cursor-not-allowed" : ""
                      }`}
                    >
                      <Send className="w-5 h-5" />
                      {isSubmitting ? "Enviando..." : formLabels?.submitButton}
                    </Button>

                    {error && (
                      <p className="text-xs text-center text-red-500">{error}</p>
                    )}
                  </form>
                ) : (
                  <div className="text-center py-8 space-y-4">
                    <div className="w-20 h-20 bg-[#98465d]/10 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle className="w-10 h-10 text-[#98465d]" />
                    </div>
                    <h3 className="text-2xl font-display text-[#5d5a5a]">
                      {successState?.title}
                    </h3>
                    <p className="text-[#5d5a5a]/70 max-w-sm mx-auto">
                      {successState?.message}
                    </p>
                    <div className="flex items-center justify-center gap-2 text-[#98465d]">
                      <Heart className="w-4 h-4" fill="#98465d" />
                      <span className="text-sm font-medium">
                        {successState?.farewell}
                      </span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-white border-0 shadow-xl rounded-3xl overflow-hidden py-0 h-full">
              <CardContent className="p-6 md:p-8 lg:p-10 text-center min-h-[360px] h-full flex flex-col justify-center">
                <div className="space-y-5">
                  <div className="w-20 h-20 bg-[#25D366]/10 rounded-full flex items-center justify-center mx-auto">
                    <MessageCircle className="w-10 h-10 text-[#25D366]" />
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-2xl font-display text-[#5d5a5a]">
                      {whatsappSection?.title}
                    </h3>
                    <p className="text-[#5d5a5a]/70 max-w-md mx-auto">
                      {whatsappSection?.description}
                    </p>
                  </div>

                  <div className="space-y-5">
                    <Button
                      onClick={handleWhatsApp}
                      className="bg-[#25D366] hover:bg-[#25D366]/90 text-white rounded-xl px-8 py-6 text-lg font-medium transition-all hover:scale-[1.02] flex items-center justify-center gap-3 mx-auto"
                    >
                      <MessageCircle className="w-6 h-6" />
                      {whatsappSection?.buttonText}
                    </Button>

                    <div className="inline-flex items-center justify-center gap-4 text-sm text-[#5d5a5a]/60">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        <span>{whatsappPhone}</span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-[#cfcdff]/40 bg-[#f6f3f5]/70 px-5 py-4">
                    <p className="text-xs leading-relaxed text-[#5d5a5a]/55">
                      Horario de respuesta: Lunes a Viernes, 9:00 - 20:00
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {hasSideImage && (
            <div className="hidden md:block">
              <div className={contactMethod === "form" ? "sticky top-32" : "h-full"}>
                <img
                  src={sideImageUrl}
                  srcSet={sideImageSrcSet}
                  sizes="(min-width: 768px) 320px, 100vw"
                  alt=""
                  aria-hidden="true"
                  className={`w-full rounded-3xl shadow-xl object-cover ${
                    contactMethod === "whatsapp" ? "h-full min-h-[360px]" : "aspect-[3/4]"
                  }`}
                  style={{ objectPosition: sideImagePosition }}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
