import { useState, useEffect, useCallback } from "react"

interface EmotionalRotatorProps {
  phrases: string[]
  intervalMs?: number
}

export default function EmotionalRotator({
  phrases,
  intervalMs = 4000,
}: EmotionalRotatorProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFading, setIsFading] = useState(false)

  const prefersReducedMotion = useCallback(() => {
    if (typeof window === "undefined") return false
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches
  }, [])

  useEffect(() => {
    if (!phrases || phrases.length <= 1 || prefersReducedMotion()) return

    const fadeDuration = 500

    const timer = setInterval(() => {
      setIsFading(true)
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % phrases.length)
        setIsFading(false)
      }, fadeDuration)
    }, intervalMs)

    return () => clearInterval(timer)
  }, [phrases, intervalMs, prefersReducedMotion])

  if (!phrases || phrases.length === 0) return null

  return (
    <p
      className="font-serif text-sm italic text-[#98465d] md:text-base transition-opacity duration-500"
      aria-live="polite"
      style={{ opacity: isFading ? 0 : 1 }}
    >
      {phrases[currentIndex]}
    </p>
  )
}
