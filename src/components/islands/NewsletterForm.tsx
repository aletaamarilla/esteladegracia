import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, CheckCircle } from "lucide-react"
import { submitHubspotForm } from "@/lib/hubspot"

const DEFAULT_FORM_ID = "067523de-e838-4405-87f6-3cdb8873e350"

interface Props {
  buttonText?: string
  successMessage?: string
  description?: string
  source?: string
  hubspotFormId?: string
}

export default function NewsletterForm({
  buttonText = "Suscribirme",
  successMessage = "Te has suscrito correctamente. Revisa tu email.",
  description,
  source: _source,
  hubspotFormId,
}: Props) {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [consentChecked, setConsentChecked] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !consentChecked) return

    setIsSubmitting(true)
    setError(null)

    const formId = hubspotFormId || DEFAULT_FORM_ID

    try {
      await submitHubspotForm(formId, [
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

  if (isSubmitted) {
    return (
      <div className="text-center py-6 space-y-3">
        <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="w-7 h-7 text-green-600" />
        </div>
        <p className="text-[#5d5a5a] font-medium">{successMessage}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {description && (
        <p className="text-[#5d5a5a]/70 text-sm">{description}</p>
      )}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5d5a5a]/40" />
          <Input
            type="email"
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-11 py-5 rounded-xl border-[#cfcdff] focus:border-[#9591eb] focus:ring-[#9591eb]/20"
            required
          />
        </div>
        <Button
          type="submit"
          disabled={isSubmitting || !consentChecked}
          className={`bg-[#98465d] hover:bg-[#98465d]/90 text-white rounded-xl px-6 py-5 font-medium whitespace-nowrap ${
            isSubmitting || !consentChecked ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? "Enviando..." : buttonText}
        </Button>
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
          Acepto la política de privacidad y el tratamiento de mis datos.
        </span>
      </label>

      {error && (
        <p className="text-xs text-center text-red-500">{error}</p>
      )}
    </form>
  )
}
