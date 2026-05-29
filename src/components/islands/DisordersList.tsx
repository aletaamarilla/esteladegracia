import { useState, useRef, useEffect, useCallback } from "react"
import { ChevronDown } from "lucide-react"

interface DisorderCategory {
  category: string
  items: string[]
}

interface Props {
  disorders: DisorderCategory[]
  transdiagnostic: string[]
}

function DisorderAccordionItem({
  category,
  isOpen,
  onToggle,
}: {
  category: DisorderCategory
  isOpen: boolean
  onToggle: () => void
}) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight)
    }
  }, [category.items])

  return (
    <div className="bg-white rounded-2xl border-0 shadow-sm overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className={`w-full flex items-center justify-between gap-4 px-6 py-4 text-left font-semibold transition-colors cursor-pointer ${
          isOpen ? "text-[#98465d]" : "text-[#5d5a5a] hover:text-[#98465d]"
        }`}
        aria-expanded={isOpen}
      >
        {category.category}
        <ChevronDown
          className={`text-[#5d5a5a]/40 size-4 shrink-0 transition-transform duration-200 ${
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
        <ul className="px-6 pb-4 space-y-2">
          {category.items.map((item, i) => (
            <li key={i} className="flex items-center gap-3 text-[#5d5a5a]/70">
              <div className="w-1.5 h-1.5 bg-[#98465d] rounded-full flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default function DisordersList({ disorders, transdiagnostic }: Props) {
  const [activeTab, setActiveTab] = useState<"disorders" | "transdiagnostic">("disorders")
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const handleToggle = useCallback((index: number) => {
    setOpenIndex(prev => (prev === index ? null : index))
  }, [])

  return (
    <div>
      <div className="flex justify-center mb-10">
        <div className="inline-flex bg-white rounded-full p-1.5 shadow-lg">
          <button
            onClick={() => setActiveTab("disorders")}
            className={`px-6 py-3 rounded-full font-medium transition-all text-sm md:text-base ${
              activeTab === "disorders"
                ? "bg-[#98465d] text-white"
                : "text-[#5d5a5a] hover:bg-[#f6f3f5]"
            }`}
          >
            Trastornos clinicos
          </button>
          <button
            onClick={() => setActiveTab("transdiagnostic")}
            className={`px-6 py-3 rounded-full font-medium transition-all text-sm md:text-base ${
              activeTab === "transdiagnostic"
                ? "bg-[#9591eb] text-white"
                : "text-[#5d5a5a] hover:bg-[#f6f3f5]"
            }`}
          >
            Crecimiento personal
          </button>
        </div>
      </div>

      {activeTab === "disorders" && (
        <div className="max-w-2xl mx-auto space-y-3">
          {disorders.map((category, index) => (
            <DisorderAccordionItem
              key={index}
              category={category}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>
      )}

      {activeTab === "transdiagnostic" && (
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {transdiagnostic.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 text-center"
            >
              <div className="w-10 h-10 bg-[#9591eb]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#9591eb"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
                </svg>
              </div>
              <p className="text-[#5d5a5a] font-medium text-sm">{item}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
