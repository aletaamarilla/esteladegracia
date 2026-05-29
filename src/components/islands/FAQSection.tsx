import { useState, useRef, useEffect, useCallback } from "react"
import { ChevronDown } from "lucide-react"
import type { FaqItem } from "@/lib/sanityTypes"
import { GROUP_PROGRAM, normalizeGroupProgramText } from "@/lib/groupProgram"

type CategoryKey = "individual" | "grupal" | "ansiedad"

interface FAQSectionProps {
  faqItems?: FaqItem[]
  showAll?: boolean
  category?: CategoryKey
}

const tabs = [
  { key: "individual" as const, label: "Individual", accent: "#98465d", borderClass: "border-l-[#98465d]" },
  { key: "grupal" as const, label: GROUP_PROGRAM.navLabel, accent: "#9591eb", borderClass: "border-l-[#9591eb]" },
  { key: "ansiedad" as const, label: "Ansiedad", accent: "#5d5a5a", borderClass: "border-l-[#5d5a5a]" },
]

function normalizeCategory(category?: FaqItem["category"]): CategoryKey | undefined {
  if (category === "group") return "grupal"
  if (category === "anxiety") return "ansiedad"
  return category
}

function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
  borderClass,
}: {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
  borderClass: string
}) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight)
    }
  }, [answer])

  return (
    <div
      className={`bg-white rounded-2xl border-0 border-l-4 ${borderClass} shadow-sm hover:shadow-md transition-shadow overflow-hidden`}
    >
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-4 px-5 py-4 md:px-6 md:py-5 text-left text-sm md:text-base font-medium text-[#5d5a5a] cursor-pointer"
        aria-expanded={isOpen}
      >
        {question}
        <ChevronDown
          className={`text-[#5d5a5a]/40 size-4 shrink-0 translate-y-0.5 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
        style={{ maxHeight: isOpen ? `${height}px` : "0px" }}
        role="region"
      >
        <div className="px-5 pb-5 md:px-6 md:pb-6 text-[#5d5a5a]/75 leading-relaxed text-sm md:text-base whitespace-pre-line">
          {answer}
        </div>
      </div>
    </div>
  )
}

function FAQAccordion({
  items,
  borderClass,
  prefix,
}: {
  items: FaqItem[]
  borderClass: string
  prefix: string
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const handleToggle = useCallback((index: number) => {
    setOpenIndex(prev => (prev === index ? null : index))
  }, [])

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <AccordionItem
          key={`${prefix}-${item._id ?? index}`}
          question={normalizeGroupProgramText(item.question) ?? item.question}
          answer={normalizeGroupProgramText(item.answer) ?? item.answer}
          isOpen={openIndex === index}
          onToggle={() => handleToggle(index)}
          borderClass={borderClass}
        />
      ))}
    </div>
  )
}

export default function FAQSection({ faqItems = [], showAll = false, category }: FAQSectionProps) {
  const [activeTab, setActiveTab] = useState<CategoryKey>(category ?? "individual")

  const limit = (items: FaqItem[]) => showAll || category ? items : items.slice(0, 3)
  const normalizedItems: FaqItem[] = faqItems.map((item) => ({
    ...item,
    category: normalizeCategory(item.category) ?? item.category,
  }))
  const grouped = {
    individual: limit(normalizedItems.filter(i => i.category === "individual")),
    grupal: limit(normalizedItems.filter(i => i.category === "grupal")),
    ansiedad: limit(normalizedItems.filter(i => i.category === "ansiedad")),
  }
  const activeTabConfig = tabs.find(tab => tab.key === activeTab) ?? tabs[0]
  const activeItems = grouped[activeTab]

  if (category) {
    const config = tabs.find(tab => tab.key === category) ?? tabs[0]
    const items = grouped[category]
    if (items.length === 0) return null

    return (
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-5">
          <div className="text-center mb-10 md:mb-12">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[#9591eb] mb-3">
              Preguntas frecuentes
            </span>
            <h2 className="font-display text-3xl md:text-4xl text-[#5d5a5a] mb-3">
              Resuelve tus <span className="text-[#98465d]">dudas</span>
            </h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <FAQAccordion items={items} borderClass={config.borderClass} prefix={category} />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-14 md:py-20 lg:py-28 bg-gradient-to-b from-[#f0eef5] via-[#f6f3f5] to-[#f5eff2]">
      <div className="container mx-auto px-5">
        <div className="text-center mb-10 md:mb-14">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[#9591eb] mb-3">
            Preguntas frecuentes
          </span>
          <h2 className="font-display text-3xl md:text-4xl text-[#5d5a5a] mb-3">
            Resuelve tus <span className="text-[#98465d]">dudas</span>
          </h2>
          <p className="text-[#5d5a5a]/60 max-w-lg mx-auto">
            Todo lo que necesitas saber antes de dar el primer paso
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="flex rounded-2xl bg-white/80 p-1.5 mb-8 shadow-sm border border-[#cfcdff]/30">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 py-2.5 px-3 rounded-xl text-sm md:text-base font-medium transition-all duration-300 cursor-pointer ${
                  activeTab === tab.key
                    ? "bg-white text-[#5d5a5a] shadow-sm"
                    : "text-[#5d5a5a]/55 hover:text-[#5d5a5a]"
                }`}
                aria-pressed={activeTab === tab.key}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="mb-5 flex items-center gap-3">
            <div className="w-1 h-6 rounded-full" style={{ backgroundColor: activeTabConfig.accent }} />
            <h3 className="text-xl md:text-2xl font-semibold text-[#5d5a5a]">
              {activeTab === "individual" && "Sesiones individuales"}
              {activeTab === "grupal" && GROUP_PROGRAM.navLabel}
              {activeTab === "ansiedad" && "Ansiedad"}
            </h3>
          </div>

          <FAQAccordion
            items={activeItems}
            borderClass={activeTabConfig.borderClass}
            prefix={activeTab}
          />
        </div>
      </div>
    </section>
  )
}
