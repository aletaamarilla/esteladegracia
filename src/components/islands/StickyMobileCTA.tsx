import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

const DISMISSED_KEY = "stickyMobileCTA_dismissed"

interface StickyMobileCTAProps {
  label?: string
  href?: string
}

export default function StickyMobileCTA({
  label = "Reservar cita",
  href = "/contacto",
}: StickyMobileCTAProps) {
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
      <div className="flex items-center gap-3">
        <a href={href} className="flex-1">
          <Button className="hover-shimmer w-full bg-[#98465d] hover:bg-[#98465d]/90 text-white rounded-full py-5 text-base font-medium">
            {label}
          </Button>
        </a>
        <button
          onClick={handleDismiss}
          className="w-10 h-10 flex items-center justify-center text-[#5d5a5a]/40 hover:text-[#5d5a5a] rounded-full hover:bg-[#f6f3f5] transition-colors flex-shrink-0"
          aria-label="Cerrar"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
