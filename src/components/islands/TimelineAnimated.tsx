import { useEffect, useRef, useState } from "react"

interface TimelineItem {
  year: string
  title: string
  description: string
}

interface TimelineAnimatedProps {
  items: TimelineItem[]
}

export default function TimelineAnimated({ items }: TimelineAnimatedProps) {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set())
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"))
            setVisibleItems((prev) => new Set([...prev, index]))
          }
        })
      },
      { threshold: 0.3 }
    )

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [items])

  return (
    <section className="py-14 md:py-20 lg:py-28 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#cfcdff]/20 rounded-full blur-3xl" />

      <div className="container mx-auto px-5 relative">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-1 bg-[#9591eb] rounded-full" />
            <span className="text-[#9591eb] font-medium tracking-wide uppercase text-sm">
              Trayectoria
            </span>
          </div>

          <h2 className="font-display text-3xl md:text-4xl text-[#5d5a5a] mb-14 text-balance">
            Mi camino hasta{" "}
            <span className="text-[#98465d]">aqui</span>
          </h2>
        </div>

        <div className="max-w-3xl mx-auto relative">
          {/* Vertical line */}
          <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-px lg:-translate-x-1/2 bg-gradient-to-b from-[#98465d] via-[#9591eb] to-[#cfcdff]" />

          {items.map((item, i) => {
            const isVisible = visibleItems.has(i)
            const isLeft = i % 2 === 0

            return (
              <div
                key={i}
                ref={(el) => { itemRefs.current[i] = el }}
                data-index={i}
                className="relative mb-12 last:mb-0 timeline-item"
              >
                {/* Dot */}
                <div
                  className={`timeline-dot absolute left-4 lg:left-1/2 w-3.5 h-3.5 rounded-full -translate-x-1/2 mt-2 z-10 transition-all duration-700 ${
                    isVisible
                      ? "bg-[#98465d] ring-4 ring-white scale-100"
                      : "bg-[#cfcdff] ring-2 ring-white scale-75"
                  }`}
                />

                {/* Content */}
                <div
                  className={`w-auto ml-10 text-left lg:w-[calc(50%-1.75rem)] lg:ml-0 ${
                    isLeft ? "lg:mr-auto lg:pr-2 lg:text-right" : "lg:ml-auto lg:pl-2"
                  } transition-all duration-700 ${
                    isVisible
                      ? "opacity-100 translate-x-0 translate-y-0"
                      : `opacity-0 translate-x-[20px] ${isLeft ? "lg:translate-x-[-20px]" : ""}`
                  }`}
                  style={{ transitionDelay: `${i * 0.1}s` }}
                >
                  <div className="hover-relief bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-sm">
                    <span className="inline-block text-sm font-bold text-[#9591eb] mb-1">
                      {item.year}
                    </span>
                    <h4 className="font-semibold text-[#5d5a5a] mb-1">
                      {item.title}
                    </h4>
                    <p className="text-sm text-[#5d5a5a]/70">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
