export interface FaqItem {
  question: string
  answer: string
}

export interface FaqData {
  individual: FaqItem[]
  group: FaqItem[]
  anxiety: FaqItem[]
}

export const faqData: FaqData = {
  individual: [
    {
      question: "Que pasa en la primera sesion?",
      answer:
        "La primera sesion es una evaluacion donde nos conocemos. Te preguntare sobre tu historia, que te trae a terapia y que esperas lograr. Tambien es una oportunidad para que hagas preguntas y veas si somos un buen match. Sin presion—solo una conversacion abierta.",
    },
    {
      question: "Cuanto duran las sesiones?",
      answer:
        "Las sesiones de terapia individual duran 50 minutos. Esto nos da suficiente tiempo para profundizar mientras mantenemos las cosas enfocadas y productivas. Algunos clientes prefieren sesiones mas largas para trabajo especifico como procesamiento de trauma—podemos discutir que funciona mejor para ti.",
    },
    {
      question: "Con que frecuencia deberia venir?",
      answer:
        "La mayoria de los clientes comienzan con sesiones semanales. A medida que progresas, podriamos pasar a sesiones quincenales o mensuales. La frecuencia siempre es flexible y basada en tus necesidades, metas y lo que se sienta correcto para ti.",
    },
    {
      question: "Puedo cambiar la frecuencia de las sesiones?",
      answer:
        "Por supuesto. La terapia se adapta a ti, no al reves. Podemos ajustar la frecuencia en cualquier momento segun como te sientas y lo que necesites. Algunas personas empiezan semanal y luego pasan a quincenal cuando se sienten mas estables.",
    },
    {
      question: "Como se si la terapia esta funcionando?",
      answer:
        "Juntos revisaremos tu progreso regularmente. Algunos indicadores incluyen: sentirte mas capaz de manejar situaciones dificiles, notar cambios en tus patrones de pensamiento, mejorar tus relaciones, y sentir mas claridad sobre ti mismo/a. El progreso no siempre es lineal, y eso esta bien.",
    },
  ],
  group: [
    {
      question: "Cuantas personas hay en un grupo?",
      answer:
        "Los grupos se mantienen pequenos e intimos—entre 6 a 8 participantes. Esto asegura que todos tengan espacio para compartir mientras se benefician de diversas perspectivas y experiencias.",
    },
    {
      question: "Que incluye el kit de herramientas?",
      answer:
        "El kit de herramientas incluye hojas de trabajo, ejercicios guiados, prompts de diario y recursos que complementan nuestro trabajo grupal. Tambien tendras acceso a grabaciones de meditaciones guiadas y tecnicas que practicamos juntos.",
    },
    {
      question: "Puedo unirme con un amigo?",
      answer:
        "Absolutamente! Lo alentamos. Cuando traes a un amigo, ambos reciben \u20AC30 de descuento en el programa. El crecimiento compartido con alguien en quien confias puede ser increiblemente poderoso.",
    },
    {
      question: "Que pasa si no me siento comodo/a compartiendo en grupo?",
      answer:
        "Es completamente normal sentir eso al principio. No hay obligacion de compartir hasta que te sientas preparado/a. Muchas personas empiezan escuchando y poco a poco se van abriendo. El grupo crea un espacio seguro donde cada persona va a su ritmo.",
    },
    {
      question: "Puedo combinar terapia grupal con individual?",
      answer:
        "Si, y de hecho es una combinacion muy potente. La terapia individual te permite profundizar en temas personales, mientras que la grupal te ofrece perspectivas y apoyo comunitario. Podemos hablar sobre como integrar ambas.",
    },
  ],
  anxiety: [
    {
      question: "Que tecnicas usas para la ansiedad?",
      answer:
        "Uso una combinacion de enfoques basados en evidencia incluyendo Terapia Cognitivo-Conductual (TCC), tecnicas de mindfulness y practicas somaticas. Trabajaremos juntos para encontrar lo que resuena contigo—la terapia nunca deberia sentirse como un enfoque unico para todos.",
    },
    {
      question: "Que tan rapido vere resultados?",
      answer:
        "El viaje de cada persona es diferente, pero la mayoria de los clientes notan algun alivio dentro de las primeras sesiones—a menudo solo por ser escuchados y comprendidos. El cambio duradero tipicamente se desarrolla en 8-12 sesiones, aunque esto varia segun las circunstancias individuales.",
    },
    {
      question: "Ofreces apoyo de emergencia?",
      answer:
        "Aunque no proporciono soporte de crisis 24/7, ofrezco flexibilidad para situaciones urgentes. Siempre te proporcionare recursos de emergencia y crearemos un plan de seguridad juntos como parte de tu tratamiento.",
    },
    {
      question: "Cual es la diferencia entre ansiedad normal y un trastorno de ansiedad?",
      answer:
        "La ansiedad es una emocion normal y util que todos experimentamos. Se convierte en un trastorno cuando es desproporcionada, persistente y afecta significativamente tu vida diaria—trabajo, relaciones, sueno. Si sientes que la ansiedad te controla en vez de al reves, es un buen momento para buscar ayuda.",
    },
    {
      question: "Se puede superar la ansiedad completamente?",
      answer:
        "El objetivo no es eliminar la ansiedad (es una emocion necesaria), sino aprender a gestionarla. Con las herramientas adecuadas, puedes reducir drasticamente su impacto en tu vida y sentirte capaz de manejar los momentos dificiles. Muchos de mis pacientes describen un antes y un despues.",
    },
    {
      question: "Necesito medicacion para tratar la ansiedad?",
      answer:
        "No necesariamente. La psicoterapia sola es muy efectiva para muchos tipos de ansiedad. En algunos casos, la combinacion de terapia y medicacion puede ser beneficiosa. Si lo consideramos necesario, te derivare a un psiquiatra de confianza para una valoracion. Siempre sera una decision conjunta.",
    },
  ],
}
