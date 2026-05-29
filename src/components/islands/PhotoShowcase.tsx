import { useState, useRef, useEffect, useCallback } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

interface PhotoShowcaseImage {
  url: string
  srcSet?: string
  alt: string
  position?: string
}

interface PhotoShowcaseProps {
  images: PhotoShowcaseImage[]
  layout?: "masonry" | "carousel" | "grid" | "row"
}

const ASPECT_CLASSES = ["aspect-[2/3]", "aspect-[4/5]", "aspect-[3/4]", "aspect-[4/5]"]

function Lightbox({
  image,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}: {
  image: PhotoShowcaseImage
  onClose: () => void
  onPrev: () => void
  onNext: () => void
  hasPrev: boolean
  hasNext: boolean
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft" && hasPrev) onPrev()
      if (e.key === "ArrowRight" && hasNext) onNext()
    }
    window.addEventListener("keydown", handler)
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", handler)
      document.body.style.overflow = ""
    }
  }, [onClose, onPrev, onNext, hasPrev, hasNext])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Foto ampliada"
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center transition-colors z-10"
        aria-label="Cerrar"
      >
        <X className="w-5 h-5 text-white" />
      </button>

      {hasPrev && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev() }}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center transition-colors z-10"
          aria-label="Foto anterior"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
      )}

      {hasNext && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext() }}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center transition-colors z-10"
          aria-label="Foto siguiente"
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </button>
      )}

      <img
        src={image.url}
        srcSet={image.srcSet}
        sizes="90vw"
        alt={image.alt}
        className="max-h-[90vh] max-w-[90vw] object-contain rounded-xl shadow-2xl"
        style={{ objectPosition: image.position ?? "center" }}
        decoding="async"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  )
}

export default function PhotoShowcase({ images, layout = "masonry" }: PhotoShowcaseProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [activeSlide, setActiveSlide] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  const updateActiveSlide = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const scrollLeft = el.scrollLeft
    const slideWidth = el.firstElementChild?.clientWidth ?? 1
    const gap = 16
    setActiveSlide(Math.round(scrollLeft / (slideWidth + gap)))
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    el.addEventListener("scroll", updateActiveSlide, { passive: true })
    return () => el.removeEventListener("scroll", updateActiveSlide)
  }, [updateActiveSlide])

  const scrollToSlide = (index: number) => {
    const el = scrollRef.current
    if (!el || !el.children[index]) return
    ;(el.children[index] as HTMLElement).scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    })
  }

  if (images.length === 0) return null

  const isFourPhotos = images.length === 4
  const isSingleRow = layout === "row"
  const desktopImageSizes = isFourPhotos
    ? "(max-width: 1024px) 50vw, 576px"
    : isSingleRow
      ? "(max-width: 1024px) 33vw, 384px"
    : "(max-width: 1024px) 50vw, 33vw"

  return (
    <>
      {/* Desktop: masonry/grid */}
      <div className="hidden md:block">
        <div
          className={
            isFourPhotos
              ? "grid grid-cols-2 gap-6"
              : isSingleRow
                ? "grid grid-cols-3 gap-6"
              : layout === "grid"
                ? "grid grid-cols-2 lg:grid-cols-3 gap-6"
                : "columns-2 lg:columns-3 gap-6 space-y-6"
          }
        >
          {images.map((image, i) => (
            <button
              key={i}
              onClick={() => setLightboxIndex(i)}
              className={`group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer w-full ${
                isFourPhotos
                  ? "aspect-[3/4]"
                  : isSingleRow
                    ? "aspect-[4/5]"
                  : layout === "grid"
                    ? ASPECT_CLASSES[i % ASPECT_CLASSES.length]
                    : "break-inside-avoid"
              }`}
            >
              <img
                src={image.url}
                srcSet={image.srcSet}
                sizes={desktopImageSizes}
                alt={image.alt}
                className={`w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ${
                  isFourPhotos
                    ? ""
                    : isSingleRow
                      ? ""
                    : layout !== "grid" ? ASPECT_CLASSES[i % ASPECT_CLASSES.length] : ""
                }`}
                style={{ objectPosition: image.position ?? "center" }}
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
            </button>
          ))}
        </div>
      </div>

      {/* Mobile: carousel */}
      <div className="md:hidden">
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 -mx-5 px-5"
        >
          {images.slice(0, 4).map((image, i) => (
            <button
              key={i}
              onClick={() => setLightboxIndex(i)}
              className="flex-shrink-0 min-w-[80vw] snap-center"
            >
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={image.url}
                  srcSet={image.srcSet}
                  sizes="80vw"
                  alt={image.alt}
                  className="w-full h-full object-cover"
                  style={{ objectPosition: image.position ?? "center" }}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </button>
          ))}
        </div>

        {images.length > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            {images.slice(0, 4).map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToSlide(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === activeSlide
                    ? "bg-[#98465d] w-6"
                    : "bg-[#cfcdff] hover:bg-[#9591eb]"
                }`}
                aria-label={`Ir a foto ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          image={images[lightboxIndex]}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex((prev) => Math.max(0, (prev ?? 0) - 1))}
          onNext={() => setLightboxIndex((prev) => Math.min(images.length - 1, (prev ?? 0) + 1))}
          hasPrev={lightboxIndex > 0}
          hasNext={lightboxIndex < images.length - 1}
        />
      )}
    </>
  )
}
