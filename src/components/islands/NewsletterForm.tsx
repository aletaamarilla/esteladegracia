import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, CheckCircle } from "lucide-react"

interface Props {
  buttonText?: string
  successMessage?: string
  description?: string
  source?: string
}

export default function NewsletterForm({
  buttonText = "Suscribirme",
  successMessage = "Te has suscrito correctamente. Revisa tu email.",
  description,
  source: _source,
}: Props) {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubmitted(true)
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
          className="bg-[#98465d] hover:bg-[#98465d]/90 text-white rounded-xl px-6 py-5 font-medium whitespace-nowrap"
        >
          {buttonText}
        </Button>
      </div>
      <p className="text-xs text-[#5d5a5a]/50 text-center">
        Sin spam, nunca. Cancela cuando quieras.
      </p>
    </form>
  )
}
