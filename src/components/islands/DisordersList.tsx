import { useState } from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface DisorderCategory {
  category: string
  items: string[]
}

interface Props {
  disorders: DisorderCategory[]
  transdiagnostic: string[]
}

export default function DisordersList({ disorders, transdiagnostic }: Props) {
  const [activeTab, setActiveTab] = useState<"disorders" | "transdiagnostic">("disorders")

  return (
    <div>
      {/* Tab Buttons */}
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

      {/* Disorders Accordion */}
      {activeTab === "disorders" && (
        <div className="max-w-2xl mx-auto">
          <Accordion type="single" collapsible className="space-y-3">
            {disorders.map((category, index) => (
              <AccordionItem
                key={index}
                value={`disorder-${index}`}
                className="bg-white rounded-2xl border-0 shadow-sm overflow-hidden"
              >
                <AccordionTrigger className="px-6 py-4 text-left text-[#5d5a5a] hover:text-[#98465d] hover:no-underline [&[data-state=open]]:text-[#98465d] font-semibold">
                  {category.category}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <ul className="space-y-2">
                    {category.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-[#5d5a5a]/70">
                        <div className="w-1.5 h-1.5 bg-[#98465d] rounded-full flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}

      {/* Transdiagnostic Grid */}
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
