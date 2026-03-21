export type App = {
  slug: string
  name: string
  tagline: string
  description: string
  category: string
  color: string
  icon: string
  problem: string
  solution: string
  features: string[]
  free: string
  pro: string
  audience: string
}

export const apps: App[] = [
  {
    slug: 'dictum',
    name: 'Dictum',
    tagline: 'Escribí menos. Facturá más.',
    description:
      'Los abogados dictan sus notas de voz y Dictum las convierte en escritos jurídicos listos para presentar.',
    category: 'Legal Tech',
    color: '#6366f1',
    icon: '⚖️',
    problem:
      'Un abogado pierde 3 horas diarias redactando escritos, demandas y notas que podría dictar en 20 minutos.',
    solution:
      'Dictás tu nota de voz → Dictum la transcribe, la formatea con lenguaje jurídico correcto y la deja lista para copiar o exportar a Word.',
    features: [
      'Transcripción en tiempo real con IA',
      'Templates por tipo de escrito (demanda, contrato, carta documento)',
      'Vocabulario jurídico argentino',
      'Exportación a DOCX / PDF',
      'Historial de 90 días',
    ],
    free: '5 dictados/mes · hasta 3 min cada uno',
    pro: '$12 USD/mes — ilimitado + templates + exportación',
    audience: 'Abogados, estudios jurídicos',
  },
  {
    slug: 'tradelog',
    name: 'TradeLog',
    tagline: 'Tu diario de trading con memoria.',
    description:
      'Registrá cada operación, la IA detecta tus patrones de error y te muestra qué estás haciendo mal.',
    category: 'Finanzas',
    color: '#10b981',
    icon: '📈',
    problem:
      'El 80% de los traders pierden porque repiten los mismos errores sin darse cuenta. No llevan un diario, o si lo llevan no lo analizan.',
    solution:
      "Cargás tus trades (entrada, salida, par, resultado, notas), TradeLog los analiza y te da insights concretos: 'Perdés el 70% cuando operás después de las 15hs', 'Tu win-rate en EUR/USD es 2x mejor que en cripto'.",
    features: [
      'Registro rápido de operaciones',
      'Dashboard de estadísticas en tiempo real',
      'Análisis de patrones con IA',
      'Alertas de sesgos detectados',
      'Exportación CSV para tu contador',
    ],
    free: '20 operaciones/mes · estadísticas básicas',
    pro: '$9 USD/mes — ilimitado + análisis IA + alertas',
    audience: 'Traders retail, estudiantes de trading',
  },
  {
    slug: 'mednota',
    name: 'MedNota',
    tagline: 'La consulta anotada, sin perder el hilo.',
    description:
      'El médico dicta la consulta, MedNota genera la historia clínica y el resumen para el paciente.',
    category: 'Health Tech',
    color: '#3b82f6',
    icon: '🩺',
    problem:
      'Los médicos dedican entre 1 y 2 horas por día a escribir historias clínicas después de terminar la consulta. Tiempo que podrían estar con pacientes.',
    solution:
      'Activás la grabación al empezar la consulta, la pausás al terminar. MedNota transcribe, estructura la HC según la especialidad y genera un resumen claro para el paciente.',
    features: [
      'Grabación discreta durante la consulta',
      'Transcripción automática con IA médica',
      'Templates por especialidad (clínica, pediatría, traumatología...)',
      'Resumen para el paciente en lenguaje simple',
      'HIPAA-ready: datos encriptados',
    ],
    free: '10 consultas/mes',
    pro: '$19 USD/mes — ilimitado + templates + integración agenda',
    audience: 'Médicos, psicólogos, kinesiólogos',
  },
  {
    slug: 'cvmatch',
    name: 'CVMatch',
    tagline: 'Tu CV, afinado para cada búsqueda.',
    description:
      'Pegás tu CV + la descripción del puesto. La IA reescribe tu CV para que pase el ATS y destaque ante el recruiter.',
    category: 'Carrera',
    color: '#f59e0b',
    icon: '📄',
    problem:
      'El 75% de los CVs son rechazados por sistemas automáticos (ATS) antes de que un humano los lea. La gente manda el mismo CV para todos los puestos.',
    solution:
      'Subís tu CV y pegás la descripción del trabajo. CVMatch lo analiza, reescribe los puntos clave para que coincidan con las palabras del recruiter y optimiza el formato para pasar el ATS.',
    features: [
      'Análisis de compatibilidad CV ↔ oferta',
      'Reescritura automática con IA',
      'Score de ATS antes y después',
      'Carta de presentación personalizada',
      'Historial de versiones',
    ],
    free: '3 optimizaciones/mes',
    pro: '$7 USD/mes — ilimitado + carta de presentación',
    audience: 'Profesionales en búsqueda laboral, recién graduados',
  },
  {
    slug: 'lexgen',
    name: 'LexGen',
    tagline: 'Contratos simples en minutos, no en horas.',
    description:
      'Generá contratos de alquiler, servicios, confidencialidad y más. Sin abogado, sin letra chica sorpresa.',
    category: 'Legal Tech',
    color: '#8b5cf6',
    icon: '📝',
    problem:
      'Contratar a un abogado para un contrato simple cuesta entre $150 y $500 USD y tarda días. La mayoría de las pymes y freelancers usan contratos copiados de internet sin saber si son válidos.',
    solution:
      'Respondés 5 preguntas sobre tu acuerdo, LexGen genera un contrato legal válido, claro y personalizado. Revisable, descargable en PDF y DOCX.',
    features: [
      '10+ tipos de contrato (alquiler, servicios, NDA, compraventa...)',
      'Formulario guiado de 5 pasos',
      'Cláusulas opcionales con explicación',
      'Descarga en PDF y DOCX',
      'Válido bajo ley argentina',
    ],
    free: '2 contratos/mes',
    pro: '$15 USD/mes — ilimitado + todos los tipos + cláusulas custom',
    audience: 'Freelancers, pymes, propietarios de inmuebles',
  },
  {
    slug: 'pitchia',
    name: 'PitchIA',
    tagline: 'De idea a deck en 10 minutos.',
    description:
      'Describís tu startup, PitchIA arma una presentación de pitch con estructura probada ante inversores.',
    category: 'Startups',
    color: '#ef4444',
    icon: '🚀',
    problem:
      'Armar un pitch deck lleva días de trabajo y requiere conocer la estructura que esperan los inversores. La mayoría de los founders primerizos lo hacen mal.',
    solution:
      'Completás un brief de 10 preguntas sobre tu startup, PitchIA genera un deck de 12 slides con la estructura Problem → Solution → Market → Traction → Team → Ask, con textos listos para editar.',
    features: [
      '12 slides con estructura probada',
      'Textos generados por IA para cada slide',
      'Templates por industria (SaaS, consumer, deep tech...)',
      'Exportación a PDF y Google Slides',
      'Feedback automático del deck',
    ],
    free: '1 pitch/mes',
    pro: '$12 USD/mes — ilimitado + templates premium + exportación',
    audience: 'Founders, estudiantes de entrepreneurship, aceleradoras',
  },
  {
    slug: 'cotizador',
    name: 'Cotizador',
    tagline: 'Presupuestá en segundos. Cobrá a tiempo.',
    description:
      'Generá presupuestos profesionales, enviálos con un link y hacé seguimiento de pagos sin mover un dedo.',
    category: 'Freelance',
    color: '#06b6d4',
    icon: '💼',
    problem:
      'Los freelancers pierden entre 5 y 10 horas por semana en administración: armar presupuestos en Word, perseguir pagos por WhatsApp, olvidarse de hacer seguimiento.',
    solution:
      'Creás el presupuesto en 2 minutos, lo enviás por link, el cliente lo aprueba online y el sistema te avisa. Reminder automático si no pagaron en 7 días.',
    features: [
      'Presupuestos con tu logo y marca',
      'Link de aprobación para el cliente',
      'Reminders automáticos de pago',
      'Historial de clientes y servicios',
      'Dashboard de ingresos y pendientes',
    ],
    free: '5 presupuestos/mes',
    pro: '$10 USD/mes — ilimitado + reminders + recibos',
    audience: 'Freelancers, diseñadores, programadores, consultores',
  },
  {
    slug: 'docenteia',
    name: 'DocenteIA',
    tagline: 'Enseñá más. Planificá menos.',
    description:
      'El docente escribe el tema, DocenteIA genera el plan de clase, los ejercicios y la evaluación.',
    category: 'EdTech',
    color: '#84cc16',
    icon: '🎓',
    problem:
      'Los docentes argentinos dedican entre 8 y 12 horas semanales fuera del aula a planificar clases y corregir — tiempo no remunerado que muchos pasan los domingos.',
    solution:
      'Escribís el tema, el nivel educativo y los objetivos. DocenteIA genera un plan de clase con actividades, material de apoyo y una evaluación lista para imprimir.',
    features: [
      'Plan de clase estructurado (objetivos, desarrollo, cierre)',
      'Ejercicios diferenciados por nivel',
      'Evaluaciones con criterios de corrección',
      'Banco de preguntas reutilizable',
      'Alineado a diseños curriculares',
    ],
    free: '3 clases/mes',
    pro: '$8 USD/mes — ilimitado + banco de preguntas + exportación',
    audience: 'Docentes de primaria, secundaria y terciaria',
  },
  {
    slug: 'fokus',
    name: 'Fokus',
    tagline: 'Trabajá en bloques. Mejorá con datos.',
    description:
      'Pomodoro inteligente que analiza tus sesiones de trabajo y te sugiere cuándo y cuánto trabajar para rendir al máximo.',
    category: 'Productividad',
    color: '#f97316',
    icon: '⏱️',
    problem:
      'La técnica Pomodoro existe desde los 80s pero no se adapta a cada persona. Algunos rinden mejor en bloques de 45 minutos, otros en 25. Sin datos, nunca sabés cuál es el tuyo.',
    solution:
      'Trabajás con el temporizador, calificás tu concentración al final de cada sesión. Fokus aprende tu ritmo y empieza a sugerirte los bloques óptimos, los mejores horarios y cuándo tomar descansos.',
    features: [
      'Temporizador configurable (15, 25, 45, 60 min)',
      'Calificación de sesión post-bloque',
      'Análisis de productividad semanal',
      'Sugerencias IA personalizadas',
      'Integración con tareas propias',
    ],
    free: 'Pomodoro básico + historial 7 días',
    pro: '$5 USD/mes — análisis IA + insights + historial ilimitado',
    audience: 'Estudiantes, freelancers, remote workers',
  },
  {
    slug: 'sleeptones',
    name: 'SleepTones',
    tagline: 'Dormite mejor. Cada noche.',
    description:
      'Sonidos de naturaleza y frecuencias binaurales diseñados para ayudarte a conciliar el sueño, mantenerte dormido y despertarte descansado.',
    category: 'Bienestar',
    color: '#a78bfa',
    icon: '🌙',
    problem:
      '35% de los adultos tiene problemas para dormir. Las apps de ruido blanco son todas iguales y no se adaptan a lo que cada persona necesita para dormirse.',
    solution:
      'Elegís tu objetivo (dormirte más rápido, no despertarte a las 3am, despertar descansado) y SleepTones te arma la combinación de sonidos y frecuencias exacta para vos.',
    features: [
      '50+ sonidos de naturaleza en alta calidad',
      'Frecuencias binaurales por objetivo',
      'Temporizador de apagado automático',
      'Mezclas personalizadas guardables',
      'Sin anuncios · funciona offline (Pro)',
    ],
    free: '10 sonidos base · sesiones de hasta 30 min',
    pro: '$6 USD/mes — todos los sonidos + offline + mezclas ilimitadas',
    audience: 'Adultos con insomnio leve, viajeros, trabajadores nocturnos',
  },
]

export function getApp(slug: string): App | undefined {
  return apps.find((a) => a.slug === slug)
}
