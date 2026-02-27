import { useEffect, useRef, useState } from "react"

interface MonthData {
  month: number
  title: string
  description: string
  topics: string[]
}

export default function GroupTherapyTimeline({ months }: { months: MonthData[] }) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const colors = [
    { bg: "from-[#98465d]/10 to-[#98465d]/5", accent: "#98465d", ring: "ring-[#98465d]/20" },
    { bg: "from-[#9591eb]/10 to-[#9591eb]/5", accent: "#9591eb", ring: "ring-[#9591eb]/20" },
    { bg: "from-[#cfcdff]/30 to-[#cfcdff]/10", accent: "#5d5a5a", ring: "ring-[#cfcdff]/30" },
  ]

  return (
    <div ref={sectionRef} className="grid md:grid-cols-3 gap-6">
      {months.map((month, index) => {
        const color = colors[index] || colors[0]
        return (
          <div
            key={month.month}
            className={`relative transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: `${index * 0.2}s` }}
          >
            <div className={`bg-gradient-to-br ${color.bg} rounded-3xl p-5 md:p-8 h-full`}>
              {/* Month number */}
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ring-4 ${color.ring}`}
                style={{ backgroundColor: color.accent }}
              >
                <span className="text-white font-bold text-lg">{month.month}</span>
              </div>

              <h3 className="font-display text-xl text-[#5d5a5a] mb-2">{month.title}</h3>
              <p className="text-[#5d5a5a]/70 mb-6 text-sm leading-relaxed">{month.description}</p>

              <ul className="space-y-2">
                {month.topics.map((topic, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-[#5d5a5a]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={color.accent}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    {topic}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )
      })}
    </div>
  )
}
