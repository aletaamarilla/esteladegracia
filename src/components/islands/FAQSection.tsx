import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqData = {
  individual: [
    {
      question: "Que pasa en la primera sesion?",
      answer: "La primera sesion es una evaluacion donde nos conocemos. Te preguntare sobre tu historia, que te trae a terapia y que esperas lograr. Tambien es una oportunidad para que hagas preguntas y veas si somos un buen match. Sin presion—solo una conversacion abierta.",
    },
    {
      question: "Cuanto duran las sesiones?",
      answer: "Las sesiones de terapia individual duran 50 minutos. Esto nos da suficiente tiempo para profundizar mientras mantenemos las cosas enfocadas y productivas. Algunos clientes prefieren sesiones mas largas para trabajo especifico como procesamiento de trauma—podemos discutir que funciona mejor para ti.",
    },
    {
      question: "Con que frecuencia deberia venir?",
      answer: "La mayoria de los clientes comienzan con sesiones semanales. A medida que progresas, podriamos pasar a sesiones quincenales o mensuales. La frecuencia siempre es flexible y basada en tus necesidades, metas y lo que se sienta correcto para ti.",
    },
  ],
  group: [
    {
      question: "Cuantas personas hay en un grupo?",
      answer: "Los grupos se mantienen pequenos e intimos—entre 6 a 8 participantes. Esto asegura que todos tengan espacio para compartir mientras se benefician de diversas perspectivas y experiencias.",
    },
    {
      question: "Que incluye el kit de herramientas?",
      answer: "El kit de herramientas incluye hojas de trabajo, ejercicios guiados, prompts de diario y recursos que complementan nuestro trabajo grupal. Tambien tendras acceso a grabaciones de meditaciones guiadas y tecnicas que practicamos juntos.",
    },
    {
      question: "Puedo unirme con un amigo?",
      answer: "Absolutamente! Lo alentamos. Cuando traes a un amigo, ambos reciben \u20AC30 de descuento en el programa. El crecimiento compartido con alguien en quien confias puede ser increiblemente poderoso.",
    },
  ],
  anxiety: [
    {
      question: "Que tecnicas usas para la ansiedad?",
      answer: "Uso una combinacion de enfoques basados en evidencia incluyendo Terapia Cognitivo-Conductual (TCC), tecnicas de mindfulness y practicas somaticas. Trabajaremos juntos para encontrar lo que resuena contigo—la terapia nunca deberia sentirse como un enfoque unico para todos.",
    },
    {
      question: "Que tan rapido vere resultados?",
      answer: "El viaje de cada persona es diferente, pero la mayoria de los clientes notan algun alivio dentro de las primeras sesiones—a menudo solo por ser escuchados y comprendidos. El cambio duradero tipicamente se desarrolla en 8-12 sesiones, aunque esto varia segun las circunstancias individuales.",
    },
    {
      question: "Ofreces apoyo de emergencia?",
      answer: "Aunque no proporciono soporte de crisis 24/7, ofrezco flexibilidad para situaciones urgentes. Siempre te proporcionare recursos de emergencia y crearemos un plan de seguridad juntos como parte de tu tratamiento.",
    },
  ],
}

export default function FAQSection() {
  return (
    <section className="py-20 lg:py-32 bg-[#f6f3f5]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block text-[#98465d] font-medium mb-4 tracking-wide uppercase text-sm">Preguntas Frecuentes</span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-[#5d5a5a] mb-6 text-balance">
            Preguntas que podrias{" "}
            <span className="text-[#9591eb]">tener</span>
          </h2>
          <p className="text-lg text-[#5d5a5a]/70 max-w-2xl mx-auto">
            No encuentras lo que buscas? No dudes en contactarme—siempre estoy feliz de conversar.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Individual Therapy */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#98465d]/10 rounded-xl flex items-center justify-center">
                <span className="text-[#98465d] font-bold">1</span>
              </div>
              <h3 className="text-lg font-semibold text-[#5d5a5a]">Terapia Individual</h3>
            </div>
            <Accordion type="single" collapsible className="space-y-3">
              {faqData.individual.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`individual-${index}`}
                  className="bg-white rounded-2xl border-0 shadow-sm overflow-hidden"
                >
                  <AccordionTrigger className="px-6 py-4 text-left text-[#5d5a5a] hover:text-[#98465d] hover:no-underline [&[data-state=open]]:text-[#98465d]">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-[#5d5a5a]/70 leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Group Sessions */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#9591eb]/10 rounded-xl flex items-center justify-center">
                <span className="text-[#9591eb] font-bold">2</span>
              </div>
              <h3 className="text-lg font-semibold text-[#5d5a5a]">Sesiones Grupales</h3>
            </div>
            <Accordion type="single" collapsible className="space-y-3">
              {faqData.group.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`group-${index}`}
                  className="bg-white rounded-2xl border-0 shadow-sm overflow-hidden"
                >
                  <AccordionTrigger className="px-6 py-4 text-left text-[#5d5a5a] hover:text-[#9591eb] hover:no-underline [&[data-state=open]]:text-[#9591eb]">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-[#5d5a5a]/70 leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Anxiety Specific */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#cfcdff]/50 rounded-xl flex items-center justify-center">
                <span className="text-[#5d5a5a] font-bold">3</span>
              </div>
              <h3 className="text-lg font-semibold text-[#5d5a5a]">Preguntas sobre Ansiedad</h3>
            </div>
            <Accordion type="single" collapsible className="space-y-3">
              {faqData.anxiety.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`anxiety-${index}`}
                  className="bg-white rounded-2xl border-0 shadow-sm overflow-hidden"
                >
                  <AccordionTrigger className="px-6 py-4 text-left text-[#5d5a5a] hover:text-[#5d5a5a]/80 hover:no-underline [&[data-state=open]]:text-[#98465d]">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-[#5d5a5a]/70 leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  )
}
