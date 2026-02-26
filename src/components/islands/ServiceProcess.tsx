import { useEffect, useRef, useState } from "react"

interface Step {
  step: number
  title: string
  description: string
}

export default function ServiceProcess({ steps }: { steps: Step[] }) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={sectionRef} className="grid md:grid-cols-3 gap-8">
      {steps.map((step, index) => (
        <div
          key={step.step}
          className={`relative transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: `${index * 0.2}s` }}
        >
          {/* Connector line (not on last item) */}
          {index < steps.length - 1 && (
            <div className="hidden md:block absolute top-8 left-[calc(50%+2rem)] right-0 h-px bg-gradient-to-r from-[#cfcdff] to-transparent" />
          )}

          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-[#98465d] to-[#9591eb] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-white text-xl font-bold">{step.step}</span>
            </div>
            <h3 className="font-display text-xl text-[#5d5a5a] mb-3">{step.title}</h3>
            <p className="text-[#5d5a5a]/70 leading-relaxed">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
