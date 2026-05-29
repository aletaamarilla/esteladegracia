import { useState, useEffect, useRef, useCallback } from "react"
import { createPortal } from "react-dom"
import { Play, X } from "lucide-react"

interface VideoModalProps {
  videoUrl: string
  triggerLabel?: string
  triggerDescription?: string
  variant?: "link" | "showcase" | "overlay" | "thumbnail" | "cta"
  orientation?: "landscape" | "portrait"
  posterUrl?: string
  posterSrcSet?: string
  posterSizes?: string
}

export default function VideoModal({
  videoUrl,
  triggerLabel = "Conóceme en 1 minuto",
  triggerDescription,
  variant = "link",
  orientation = "landscape",
  posterUrl,
  posterSrcSet,
  posterSizes = "(max-width: 767px) 90vw, 768px",
}: VideoModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isPortrait, setIsPortrait] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  const open = useCallback(() => setIsOpen(true), [])

  const close = useCallback(() => {
    const video = videoRef.current
    if (video) {
      video.pause()
      video.currentTime = 0
    }
    setIsOpen(false)
    setIsPortrait(false)
    triggerRef.current?.focus()
  }, [])

  const handleMetadata = useCallback(() => {
    const v = videoRef.current
    if (v) setIsPortrait(v.videoHeight > v.videoWidth)
  }, [])

  useEffect(() => {
    if (!isOpen) return
    document.body.style.overflow = "hidden"
    closeButtonRef.current?.focus()
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [isOpen, close])

  const thumbnailVideoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (variant !== "thumbnail") return
    const vid = thumbnailVideoRef.current
    if (!vid) return
    const seekToFirst = () => {
      vid.currentTime = 0.1
    }
    vid.addEventListener("loadeddata", seekToFirst, { once: true })
    return () => vid.removeEventListener("loadeddata", seekToFirst)
  }, [variant])

  const trigger =
    variant === "thumbnail" ? (
      <button
        ref={triggerRef}
        onClick={open}
        className="group mx-auto flex flex-col items-center gap-3 cursor-pointer"
        aria-label={triggerLabel}
      >
        <div
          className="relative rounded-2xl overflow-hidden shadow-md ring-1 ring-black/5 transition-all duration-300 group-hover:shadow-xl group-hover:scale-[1.02]"
          style={{ width: "210px", height: "130px" }}
        >
          {posterUrl ? (
            <img
              src={posterUrl}
              srcSet={posterSrcSet}
              sizes="210px"
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
              decoding="async"
              aria-hidden="true"
            />
          ) : (
            <video
              ref={thumbnailVideoRef}
              src={videoUrl}
              muted
              preload="metadata"
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              aria-hidden="true"
            />
          )}
          <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors" />
        </div>
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#98465d]/10 transition-all duration-300 group-hover:bg-[#98465d]/20 group-hover:scale-110">
            <Play className="w-3 h-3 text-[#98465d] ml-[1px]" fill="#98465d" />
          </span>
          <span className="text-[13px] font-medium text-[#98465d]/80 tracking-wide transition-colors duration-300 group-hover:text-[#98465d]">
            {triggerLabel}
          </span>
        </div>
      </button>
    ) : variant === "showcase" ? (
      <button
        ref={triggerRef}
        onClick={open}
        className={`relative rounded-2xl overflow-hidden shadow-2xl group cursor-pointer ${
          orientation === "portrait"
            ? "aspect-[9/16] w-full max-w-[320px] mx-auto"
            : "aspect-video w-full"
        }`}
        aria-label={triggerLabel}
      >
        {posterUrl ? (
          <img
            src={posterUrl}
            srcSet={posterSrcSet}
            sizes={posterSizes}
            alt=""
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="w-full h-full bg-[#5d5a5a]/10" />
        )}
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/30 transition-colors">
          <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <Play className="w-8 h-8 text-[#98465d] ml-1" fill="#98465d" />
          </div>
        </div>
      </button>
    ) : variant === "overlay" ? (
      <button
        ref={triggerRef}
        onClick={open}
        className="group inline-flex items-center gap-3 rounded-full bg-white/85 backdrop-blur-md pl-1.5 pr-6 py-1.5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.15)] transition-all duration-300 hover:bg-white hover:shadow-[0_8px_30px_-4px_rgba(152,70,93,0.25)] hover:scale-105 cursor-pointer"
        aria-label={triggerLabel}
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#98465d] shadow-md transition-transform duration-300 group-hover:scale-110">
          <Play className="w-4 h-4 text-white ml-0.5" fill="white" />
        </span>
        <span className="text-sm font-semibold text-[#3a3535] group-hover:text-[#98465d] transition-colors">
          {triggerLabel}
        </span>
      </button>
    ) : variant === "cta" ? (
      <button
        ref={triggerRef}
        onClick={open}
        className="group flex w-full items-center gap-4 rounded-2xl bg-white/80 p-4 text-left shadow-sm ring-1 ring-[#cfcdff]/50 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-md hover:ring-[#98465d]/25 cursor-pointer"
        aria-label={triggerLabel}
      >
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#98465d] shadow-[0_8px_20px_-10px_rgba(152,70,93,0.8)] transition-transform duration-300 group-hover:scale-105">
          <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
        </span>
        <span className="min-w-0">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-[0.18em] text-[#9591eb]">
            Vídeo explicativo
          </span>
          <span className="block font-display text-lg leading-snug text-[#5d5a5a] transition-colors group-hover:text-[#98465d]">
            {triggerLabel}
          </span>
          {triggerDescription && (
            <span className="mt-1 block text-sm leading-relaxed text-[#5d5a5a]/65">
              {triggerDescription}
            </span>
          )}
        </span>
      </button>
    ) : (
      <button
        ref={triggerRef}
        onClick={open}
        className="inline-flex items-center gap-2 text-[#98465d] font-medium hover:underline underline-offset-4 transition-all cursor-pointer"
        aria-label={triggerLabel}
      >
        <Play className="w-4 h-4" fill="#98465d" />
        {triggerLabel}
      </button>
    )

  return (
    <>
      {trigger}

      {isOpen && createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label={triggerLabel}
        >
          <div
            className="absolute inset-0 bg-black/80"
            onClick={close}
          />

          <div className="relative z-10 flex flex-col items-center">
            <button
              ref={closeButtonRef}
              onClick={close}
              className="absolute -top-12 right-0 text-white/80 hover:text-white transition-colors cursor-pointer z-20"
              aria-label="Cerrar vídeo"
            >
              <X className="w-8 h-8" />
            </button>

            <video
              ref={videoRef}
              src={videoUrl}
              poster={posterUrl}
              autoPlay
              controls
              playsInline
              onLoadedMetadata={handleMetadata}
              className={`rounded-2xl shadow-2xl ${
                isPortrait
                  ? "h-[85vh] max-w-[90vw]"
                  : "w-[90vw] max-w-6xl max-h-[85vh]"
              }`}
            />
          </div>
        </div>,
        document.body,
      )}
    </>
  )
}
