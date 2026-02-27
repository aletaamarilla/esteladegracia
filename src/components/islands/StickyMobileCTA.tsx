import { useState, useEffect } from "react"
import { X, Mail, MessageCircle } from "lucide-react"

const DISMISSED_KEY = "stickyMobileCTA_dismissed"

export default function StickyMobileCTA() {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem(DISMISSED_KEY)) {
      setDismissed(true)
      return
    }

    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleDismiss = () => {
    setDismissed(true)
    sessionStorage.setItem(DISMISSED_KEY, "1")
  }

  if (dismissed) return null

  return (
    <div
      className={`md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-[#cfcdff]/30 px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex items-center gap-2">
        <a href="/contacto?method=form" className="flex-1">
          <button className="hover-shimmer w-full flex items-center justify-center gap-2 bg-[#98465d] hover:bg-[#98465d]/90 text-white rounded-full py-3 text-sm font-medium">
            <Mail className="w-4 h-4" />
            Reservar cita
          </button>
        </a>
        <a
          href="https://wa.me/34600000000?text=Hola!%20Me%20gustaria%20agendar%20una%20cita."
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1"
        >
          <button className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#25D366]/90 text-white rounded-full py-3 text-sm font-medium">
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </button>
        </a>
        <button
          onClick={handleDismiss}
          className="w-9 h-9 flex items-center justify-center text-[#5d5a5a]/40 hover:text-[#5d5a5a] rounded-full hover:bg-[#f6f3f5] transition-colors flex-shrink-0"
          aria-label="Cerrar"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
