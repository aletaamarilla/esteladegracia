import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Download, Mail, CheckCircle, Sparkles } from "lucide-react"
import { submitHubspotForm } from "@/lib/hubspot"

interface LeadMagnetSectionProps {
  badge?: string
  title?: string
  titleHighlight?: string
  description?: string
  features?: string[]
  formLabel?: string
  buttonText?: string
  successTitle?: string
  successMessage?: string
  privacyNote?: string
}

export default function LeadMagnetSection({
  badge,
  title,
  titleHighlight,
  description,
  features,
  formLabel,
  buttonText,
  successTitle,
  successMessage,
  privacyNote,
}: LeadMagnetSectionProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [consentChecked, setConsentChecked] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !name || !consentChecked) return

    setIsSubmitting(true)
    setError(null)

    const formId = import.meta.env.PUBLIC_HUBSPOT_FORM_ID

    try {
      await submitHubspotForm(formId, [
        { objectTypeId: "0-1", name: "firstname", value: name },
        { objectTypeId: "0-1", name: "email", value: email },
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

  return (
    <section className="py-14 md:py-20 lg:py-32 relative">
      <div className="absolute top-1/3 -left-10 w-40 h-40 bg-[#cfcdff]/30 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-1/3 -right-10 w-60 h-60 bg-[#98465d]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-5 relative">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-[#f6f3f5] to-white rounded-3xl p-5 md:p-12 lg:p-16 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#cfcdff]/30 rounded-bl-full" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#98465d]/10 rounded-tr-full" />

            <div className="relative grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 bg-[#9591eb]/20 px-4 py-2 rounded-full">
                  <Download className="w-4 h-4 text-[#9591eb]" />
                  <span className="text-sm font-medium text-[#5d5a5a]">{badge}</span>
                </div>

                <h2 className="font-display text-3xl md:text-4xl text-[#5d5a5a] text-balance">
                  {title}{" "}
                  <span className="text-[#98465d]">{titleHighlight}</span>
                </h2>

                <p className="text-[#5d5a5a]/70 leading-relaxed">{description}</p>

                <ul className="space-y-3">
                  {(features ?? []).map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-[#5d5a5a]">
                      <Sparkles className="w-4 h-4 text-[#9591eb]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-3xl p-5 md:p-8 shadow-lg">
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <label htmlFor="lead-name" className="text-sm font-medium text-[#5d5a5a]">
                        Tu nombre
                      </label>
                      <Input
                        id="lead-name"
                        type="text"
                        placeholder="María"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="py-6 rounded-2xl border-[#cfcdff] focus:border-[#9591eb] focus:ring-[#9591eb]/20"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="lead-email" className="text-sm font-medium text-[#5d5a5a]">
                        {formLabel}
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

                    <label className="flex items-start gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={consentChecked}
                        onChange={(e) => setConsentChecked(e.target.checked)}
                        className="mt-0.5 accent-[#9591eb]"
                        required
                      />
                      <span className="text-xs text-[#5d5a5a]/70">
                        {privacyNote || "Acepto la política de privacidad y el tratamiento de mis datos."}
                      </span>
                    </label>

                    <Button
                      type="submit"
                      disabled={isSubmitting || !consentChecked}
                      className={`w-full bg-[#98465d] hover:bg-[#98465d]/90 text-white rounded-2xl py-6 text-lg font-medium transition-all hover:scale-[1.02] ${
                        isSubmitting || !consentChecked ? "opacity-60 cursor-not-allowed" : ""
                      }`}
                    >
                      {isSubmitting ? "Enviando..." : buttonText}
                    </Button>

                    {error && (
                      <p className="text-xs text-center text-red-500">{error}</p>
                    )}
                  </form>
                ) : (
                  <div className="text-center py-8 space-y-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#5d5a5a]">{successTitle}</h3>
                    <p className="text-[#5d5a5a]/70">{successMessage}</p>
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
