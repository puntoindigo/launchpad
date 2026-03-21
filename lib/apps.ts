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
  // Marketing layer
  heroHeadline: string
  heroSubtext: string
  stats: { value: string; label: string }[]
  steps: { title: string; desc: string }[]
  testimonials: { quote: string; name: string; role: string }[]
  benefits: { title: string; desc: string }[]
  faqs: { q: string; a: string }[]
  dailyCost: string
  closingLine: string
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
    heroHeadline: '¿Cuántas horas de tu vida le regalaste a Word esta semana?',
    heroSubtext:
      'Los mejores abogados no escriben más rápido — delegan lo que la IA puede hacer por ellos.',
    stats: [
      { value: '3 hs', label: 'que recuperás por día' },
      { value: '94%', label: 'de precisión jurídica' },
      { value: '< 60 seg', label: 'de nota de voz a escrito' },
    ],
    steps: [
      { title: 'Dictás', desc: 'Hablás como siempre lo hacés con tu asistente. Desde el celular, la PC o la tablet.' },
      { title: 'Dictum procesa', desc: 'La IA transcribe, detecta el tipo de escrito y aplica la estructura y el lenguaje correcto.' },
      { title: 'Lo recibís listo', desc: 'El documento aparece formateado, con numeración y cláusulas correctas. Listo para firmar o enviar.' },
    ],
    testimonials: [
      { quote: 'Pasé de escribir 4 horas a menos de 30 minutos. Ahora puedo atender más clientes sin contratar más gente.', name: 'Martín R.', role: 'Abogado civilista, Córdoba' },
      { quote: 'Al principio era escéptico. La primera semana ya recuperé el tiempo que perdía en cada demanda.', name: 'Luciana V.', role: 'Estudio jurídico, CABA' },
      { quote: 'El vocabulario jurídico argentino es impecable. No tengo que corregir nada.', name: 'Diego M.', role: 'Abogado laboralista, Rosario' },
    ],
    benefits: [
      { title: 'Tiempo para lo que importa', desc: 'Recuperás horas para atender más clientes, preparar mejor cada caso o simplemente salir a tiempo.' },
      { title: 'Ningún error de tipeo', desc: 'La IA no se equivoca de nombre, no borra párrafos ni pierde el hilo entre dictados.' },
      { title: 'Formato listo para presentar', desc: 'Numeración, márgenes, encabezados — todo según las exigencias de cada fuero.' },
      { title: 'Vocabulario jurídico argentino', desc: 'Entiende la jerga local. No tenés que corregir calcos del inglés ni reemplazar términos.' },
      { title: 'Historial accesible', desc: 'Todos tus dictados guardados y buscables. Nunca más "¿dónde quedó ese borrador?"' },
      { title: 'Funciona desde el celular', desc: 'Dictás camino al juzgado o entre audiencias. El escrito te espera cuando llegás a la oficina.' },
    ],
    faqs: [
      { q: '¿Qué tan preciso es con términos jurídicos argentinos?', a: 'Dictum fue entrenado específicamente con legislación y doctrina argentina. Reconoce términos del CCCN, CPCyC, normas del BCRA y vocabulario de los principales fueros.' },
      { q: '¿Mis dictados quedan almacenados?', a: 'Sí, con encriptación de extremo a extremo. Solo vos podés acceder a tu historial. Nunca usamos tu contenido para entrenar el modelo.' },
      { q: '¿Qué pasa si el escrito necesita correcciones?', a: 'El editor integrado te deja modificar cualquier parte. También podés darle instrucciones a la IA: "cambiá el tono", "agregá cláusula de rescisión".' },
      { q: '¿Funciona con audio de baja calidad?', a: 'Sí. Dictum maneja ruido de fondo, acentos regionales y dictados rápidos. Desde la voz humana, no hace falta articular perfecto.' },
    ],
    dailyCost: '$0.40 USD por día',
    closingLine: 'El estudio que no usa IA ya le lleva ventaja a los que sí la usan. No al revés.',
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
      "Cargás tus trades, TradeLog los analiza y te da insights concretos sobre tus patrones.",
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
    heroHeadline: 'Tu peor enemigo en el mercado sos vos mismo.',
    heroSubtext:
      'Los traders que ganan de forma consistente no son más inteligentes — tienen mejor memoria que los que pierden.',
    stats: [
      { value: '+23%', label: 'de win-rate promedio en 3 meses' },
      { value: '8.200+', label: 'traders usando TradeLog' },
      { value: '1.4M', label: 'operaciones analizadas' },
    ],
    steps: [
      { title: 'Registrás cada trade', desc: 'Entrada, salida, par, resultado y una nota rápida. Menos de 30 segundos por operación.' },
      { title: 'La IA analiza tus patrones', desc: 'Detecta en qué horarios perdés más, en qué mercados sobre-operás, cuándo tu tamaño de posición no cierra.' },
      { title: 'Mejorás con datos, no con suerte', desc: 'Recibís alertas antes de cometer errores que ya cometiste antes. Tu yo del pasado te cuida las espaldas.' },
    ],
    testimonials: [
      { quote: 'Descubrí que el 60% de mis pérdidas eran los viernes después de las 15hs. Dejé de operar ese horario y mi cuenta cambió.', name: 'Gonzalo P.', role: 'Trader retail, Argentina' },
      { quote: 'Pensaba que tenía mala racha. TradeLog me mostró que operaba con tamaño doble cuando estaba en pérdida. Ahora lo controlo.', name: 'Sofía L.', role: 'Day trader, Uruguay' },
      { quote: 'La feature de alertas de sesgo vale sola lo que cuesta el plan Pro.', name: 'Rodrigo F.', role: 'Swing trader, Chile' },
    ],
    benefits: [
      { title: 'Memoria perfecta del mercado', desc: 'Cada trade que hiciste, con contexto, resultado y notas. La curva de aprendizaje se acorta cuando tenés datos.' },
      { title: 'Detecta sesgos antes de que quemen tu cuenta', desc: 'Revenge trading, FOMO, over-trading — la IA los detecta en tus patrones y te avisa antes de que lo hagas de nuevo.' },
      { title: 'Tu edge, definido con datos', desc: 'Sabés exactamente en qué mercados, horarios y configuraciones ganás más. Operás menos, mejor.' },
      { title: 'Dashboard que entendés en segundos', desc: 'Win rate, expectativa, factor de beneficio — todo visible de un vistazo, sin Excel, sin fórmulas manuales.' },
      { title: 'Notas de contexto', desc: 'Anotás por qué entraste. Con el tiempo, ves si tu tesis de mercado es consistente o estás improvisando.' },
      { title: 'Exportación para el contador', desc: 'CSV con todas tus operaciones, listo para declarar sin buscar entre capturas de pantalla.' },
    ],
    faqs: [
      { q: '¿Funciona con cualquier broker?', a: 'Sí. TradeLog no se conecta a tu broker — vos cargás los trades manualmente o importás un CSV. Compatible con Binance, MetaTrader, Interactive Brokers y más.' },
      { q: '¿Cuánto tiempo lleva ver resultados?', a: 'La mayoría de los usuarios identifica su primer patrón significativo en la primera semana. Con 30+ trades, el análisis de IA ya es estadísticamente relevante.' },
      { q: '¿Mis datos son privados?', a: 'Totalmente. Tus operaciones no se comparten con nadie. No vendemos datos, no los mostramos, no los usamos para trading propio.' },
      { q: '¿Funciona para cripto, forex y acciones?', a: 'Sí, para todos. Podés mezclar activos en el mismo diario y filtrar por tipo cuando necesitás analizar una categoría.' },
    ],
    dailyCost: '$0.30 USD por día',
    closingLine: 'El mercado tiene memoria. Ahora vos también.',
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
      'Los médicos dedican entre 1 y 2 horas por día a escribir historias clínicas después de terminar la consulta.',
    solution:
      'Activás la grabación, MedNota transcribe y estructura la HC según la especialidad.',
    features: [
      'Grabación discreta durante la consulta',
      'Transcripción automática con IA médica',
      'Templates por especialidad',
      'Resumen para el paciente en lenguaje simple',
      'HIPAA-ready: datos encriptados',
    ],
    free: '10 consultas/mes',
    pro: '$19 USD/mes — ilimitado + templates + integración agenda',
    audience: 'Médicos, psicólogos, kinesiólogos',
    heroHeadline: 'Sos médico. No secretario.',
    heroSubtext:
      'Cada minuto que pasás escribiendo es un minuto que no estás con tu paciente. MedNota cambia eso.',
    stats: [
      { value: '90 min', label: 'recuperados por día en promedio' },
      { value: '3.100+', label: 'profesionales de la salud activos' },
      { value: '99.1%', label: 'de precisión en términos clínicos' },
    ],
    steps: [
      { title: 'Activás la grabación', desc: 'Con un toque al inicio de la consulta. Discreta, sin pantallas de por medio, sin interrumpir el vínculo con tu paciente.' },
      { title: 'MedNota escucha y estructura', desc: 'Reconoce motivo de consulta, antecedentes, examen físico, diagnóstico y plan de tratamiento. Automáticamente.' },
      { title: 'HC y resumen en segundos', desc: 'La historia clínica queda lista en formato médico. El resumen para el paciente, en lenguaje claro. Todo en menos de un minuto.' },
    ],
    testimonials: [
      { quote: 'Volví a disfrutar la consulta. Antes terminaba agotado de escribir. Ahora salgo a tiempo y con la cabeza despejada.', name: 'Dr. Ariel S.', role: 'Médico clínico, Buenos Aires' },
      { quote: 'Mis pacientes me dicen que les explico mejor. Es porque ya no estoy pensando en cómo voy a escribir la HC después.', name: 'Dra. Valeria M.', role: 'Pediatra, Mendoza' },
      { quote: 'El resumen para el paciente es oro. Me ahorra responder las mismas dudas por WhatsApp al día siguiente.', name: 'Lic. Paula R.', role: 'Psicóloga, Córdoba' },
    ],
    benefits: [
      { title: 'Más presencia en la consulta', desc: 'Sin pantalla de por medio, sin apuntes apresurados — podés mirar a tu paciente a los ojos mientras hablás.' },
      { title: 'HC estructurada sin esfuerzo', desc: 'MedNota detecta cada sección de la historia clínica y la organiza según el formato de tu especialidad.' },
      { title: 'Resumen claro para el paciente', desc: 'Un texto en lenguaje simple que tu paciente puede leer, compartir con su familia o guardar para otra consulta.' },
      { title: 'Funciona en cualquier especialidad', desc: 'Clínica, pediatría, traumatología, psicología, kinesiología — templates específicos para cada una.' },
      { title: 'Datos encriptados y privados', desc: 'HIPAA-ready. Las grabaciones se procesan y borran. Solo la HC estructurada queda guardada, encriptada.' },
      { title: 'Se integra con tu agenda', desc: 'Cada HC queda vinculada al turno correspondiente. Sin archivos sueltos, sin perder el hilo entre consultas.' },
    ],
    faqs: [
      { q: '¿Los pacientes saben que se está grabando?', a: 'Sí, y es tu responsabilidad informarlo — igual que con cualquier registro de consulta. En la práctica, los pacientes lo reciben bien cuando entienden que es para su historia clínica.' },
      { q: '¿Qué pasa con el audio después de procesar?', a: 'Se borra automáticamente. Solo queda el texto de la HC. Nunca almacenamos audio de consultas.' },
      { q: '¿Funciona en consultas rápidas de 10 minutos?', a: 'Perfectamente. MedNota procesa desde 2 minutos de audio. Cuanto más hablás, más completa la HC.' },
      { q: '¿Puedo editar la HC antes de guardarla?', a: 'Siempre. La HC generada es editable antes de confirmar. Vos tenés la última palabra médica, siempre.' },
    ],
    dailyCost: '$0.63 USD por día',
    closingLine: 'Cada consulta debería ser un momento de conexión. No de burocracia.',
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
      'El 75% de los CVs son rechazados por sistemas automáticos antes de que un humano los lea.',
    solution:
      'CVMatch optimiza tu CV para cada oferta, mejorando el score ATS y destacando lo que el recruiter busca.',
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
    heroHeadline: 'Tu CV llega. El problema es que no lo leen.',
    heroSubtext:
      'Antes de que un humano vea tu perfil, un algoritmo ya decidió si seguís o no. CVMatch te pone del lado correcto.',
    stats: [
      { value: '3x', label: 'más respuestas de recruiters' },
      { value: '+67%', label: 'de score ATS promedio tras optimizar' },
      { value: '48 hs', label: 'promedio hasta la primera entrevista' },
    ],
    steps: [
      { title: 'Pegás tu CV y la oferta', desc: 'Copiás el texto de tu CV y la descripción del puesto que te interesa. Sin archivos, sin formatos raros.' },
      { title: 'CVMatch analiza el gap', desc: 'Ve qué keywords usa el ATS, qué valora el recruiter y qué le falta a tu CV para ese puesto en particular.' },
      { title: 'Recibís tu CV optimizado', desc: 'Con el mismo contenido tuyo pero reordenado, reescrito y con las palabras clave que abren puertas. Más tu carta de presentación.' },
    ],
    testimonials: [
      { quote: 'Mandaba CVs hace 3 meses sin respuesta. En la primera semana con CVMatch tuve 4 entrevistas.', name: 'Camila T.', role: 'Diseñadora UX, Buenos Aires' },
      { quote: 'Me di cuenta que mi CV estaba bien escrito pero para nadie en particular. CVMatch me enseñó a customizarlo.', name: 'Javier L.', role: 'Desarrollador backend, remoto' },
      { quote: 'La carta de presentación que genera es mucho mejor que las que yo escribía. Y eso que escribo bien.', name: 'Florencia G.', role: 'Marketing Manager, Montevideo' },
    ],
    benefits: [
      { title: 'Pasás el filtro automático', desc: 'El ATS ya no descarta tu CV antes de que un humano lo vea. Tu experiencia llega a la mesa.' },
      { title: 'Destacás para ese puesto, no para cualquiera', desc: 'Un CV genérico no te lleva a ningún lado. CVMatch adapta tu perfil para lo que esa empresa está buscando hoy.' },
      { title: 'Carta de presentación que no suena a template', desc: 'Personalizada con tu voz y los puntos relevantes para esa oferta. El recruiter lo nota.' },
      { title: 'Ves el antes y el después', desc: 'Score de ATS antes y después de optimizar. Sabés exactamente cuánto mejoró y por qué.' },
      { title: 'Historial por empresa', desc: 'Guardás cada versión de tu CV con la oferta asociada. Nunca más confundís qué mandaste a quién.' },
      { title: 'Feedback específico', desc: 'CVMatch te dice qué le falta a tu CV para ese rol, no solo lo reescribe. Aprendés mientras buscás.' },
    ],
    faqs: [
      { q: '¿CVMatch inventa cosas en mi CV?', a: 'No. Solo reformula y reorganiza lo que vos pusiste. Nunca agrega experiencia que no tenés. La información es 100% tuya.' },
      { q: '¿Funciona para cualquier rubro?', a: 'Sí. Fue usado en tech, marketing, salud, derecho, finanzas, diseño y más. La IA entiende el vocabulario específico de cada industria.' },
      { q: '¿Qué tan diferente es el CV optimizado del original?', a: 'Depende del gap entre tu CV y la oferta. Puede ser cambios mínimos de keywords o una reestructuración completa del orden de secciones.' },
      { q: '¿Puedo editar el resultado?', a: 'Siempre. El CV optimizado es tuyo para editarlo como quieras antes de descargarlo.' },
    ],
    dailyCost: '$0.23 USD por día',
    closingLine: 'El trabajo que querés existe. El CV que te abre la puerta, también.',
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
      'Contratar a un abogado para un contrato simple cuesta entre $150 y $500 USD y tarda días.',
    solution:
      'Respondés 5 preguntas, LexGen genera un contrato válido, claro y personalizado.',
    features: [
      '10+ tipos de contrato',
      'Formulario guiado de 5 pasos',
      'Cláusulas opcionales con explicación',
      'Descarga en PDF y DOCX',
      'Válido bajo ley argentina',
    ],
    free: '2 contratos/mes',
    pro: '$15 USD/mes — ilimitado + todos los tipos + cláusulas custom',
    audience: 'Freelancers, pymes, propietarios de inmuebles',
    heroHeadline: 'Un acuerdo de palabra no te protege. Un contrato sí.',
    heroSubtext:
      'Cada vez que acordás algo sin papel, estás apostando. LexGen cierra el trato en minutos, no en semanas.',
    stats: [
      { value: '12.000+', label: 'contratos generados' },
      { value: '5 min', label: 'de formulario a contrato firmable' },
      { value: '$0', label: 'de honorario de abogado' },
    ],
    steps: [
      { title: 'Elegís el tipo de contrato', desc: 'Alquiler, servicios, NDA, locación de obra, compraventa, sociedad simple — más de 10 tipos disponibles.' },
      { title: 'Respondés 5 preguntas', desc: 'Partes, objeto, monto, plazos, condiciones especiales. Sin jerga legal, en lenguaje directo.' },
      { title: 'Descargás el contrato', desc: 'En PDF y DOCX, listo para firmar. Con cada cláusula explicada en lenguaje simple al costado.' },
    ],
    testimonials: [
      { quote: 'Le mandé contratos a 30 clientes este mes. Antes le pagaba a un abogado por cada uno o usaba contratos del Google que ni sabía si eran válidos.', name: 'Tomás H.', role: 'Fotógrafo freelance, Buenos Aires' },
      { quote: 'Alquilo tres propiedades. Con LexGen generé los contratos actualizados por el CCCN en 15 minutos. Antes tardaba semanas.', name: 'Graciela M.', role: 'Propietaria, Córdoba' },
      { quote: 'El NDA para mi startup lo generé en 3 minutos. El inversor lo aceptó sin preguntas.', name: 'Nicolás A.', role: 'Founder, Rosario' },
    ],
    benefits: [
      { title: 'Protección real por escrito', desc: 'Un contrato claro evita malentendidos, defiende tu trabajo y te da respaldo legal si algo sale mal.' },
      { title: 'Sin abogados, sin esperas', desc: 'No hace falta coordinar turnos, esperar borradores ni pagar honorarios por algo que podés hacer vos mismo en minutos.' },
      { title: 'Cláusulas explicadas en humano', desc: 'Cada punto del contrato tiene una explicación en lenguaje simple. Sabés exactamente qué estás firmando.' },
      { title: 'Actualizado por el CCCN', desc: 'Los contratos siguen el Código Civil y Comercial vigente. No son copias viejas de internet.' },
      { title: 'Personalizado para tu caso', desc: 'No es un template genérico — LexGen adapta montos, plazos, partes y condiciones a lo que vos necesitás.' },
      { title: 'Descarga en PDF y DOCX', desc: 'Para firmar digitalmente, imprimir o enviarlo por mail. El formato que necesites.' },
    ],
    faqs: [
      { q: '¿Los contratos tienen validez legal?', a: 'Sí. Están basados en el Código Civil y Comercial de la Nación. Para contratos de alta complejidad o montos muy grandes, siempre recomendamos revisión de un profesional.' },
      { q: '¿Qué tipos de contrato están disponibles?', a: 'Alquiler temporal y permanente, prestación de servicios, NDA/confidencialidad, compraventa de bienes, locación de obra, cesión de derechos, acuerdo de socios y más.' },
      { q: '¿Puedo modificar el contrato generado?', a: 'Sí, descargás el DOCX y editás lo que necesitás. El contrato es tuyo.' },
      { q: '¿Es lo mismo que contratar un abogado?', a: 'Para contratos simples y de uso cotidiano, sí. Para litigios, operaciones inmobiliarias complejas o sociedades de múltiples socios, un abogado es el camino.' },
    ],
    dailyCost: '$0.50 USD por día',
    closingLine: 'Un contrato no es desconfianza. Es claridad. Y claridad es respeto.',
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
      'Armar un pitch deck lleva días y requiere conocer la estructura que esperan los inversores.',
    solution:
      'Completás un brief de 10 preguntas, PitchIA genera un deck de 12 slides con estructura probada.',
    features: [
      '12 slides con estructura probada',
      'Textos generados por IA para cada slide',
      'Templates por industria',
      'Exportación a PDF y Google Slides',
      'Feedback automático del deck',
    ],
    free: '1 pitch/mes',
    pro: '$12 USD/mes — ilimitado + templates premium + exportación',
    audience: 'Founders, estudiantes de entrepreneurship, aceleradoras',
    heroHeadline: 'Tu idea vale. ¿Tu deck también?',
    heroSubtext:
      'Los inversores ven 200 decks por mes. Los que consiguen reunión no tienen la mejor idea — tienen la mejor presentación.',
    stats: [
      { value: '1 de cada 3', label: 'decks generados consiguió reunión' },
      { value: '12 slides', label: 'con estructura validada por VCs' },
      { value: '10 min', label: 'de brief a deck completo' },
    ],
    steps: [
      { title: 'Completás el brief', desc: '10 preguntas sobre tu startup: problema, solución, mercado, tracción, equipo y cuánto buscás levantar.' },
      { title: 'PitchIA construye el deck', desc: 'Genera los textos de cada slide con la estructura Problem → Solution → Market → Traction → Team → Ask que los inversores esperan.' },
      { title: 'Lo refinás y exportás', desc: 'Editás, ajustás el tono y exportás a PDF o Google Slides. Listo para la próxima reunión.' },
    ],
    testimonials: [
      { quote: 'Entré al Demo Day de mi aceleradora con un deck que tardé 2 horas en armar. Los otros founders tardaron dos semanas.', name: 'Agustín B.', role: 'Founder SaaS, Córdoba' },
      { quote: 'El feedback automático del deck me mostró que mi slide de mercado era débil. Lo corregí antes de mandarle al VC.', name: 'Mariana K.', role: 'Co-founder, Buenos Aires' },
      { quote: 'Usé PitchIA para cada etapa: pre-seed, seed y Serie A. Cada vez adapté el mismo brief y el deck evolucionó solo.', name: 'Pablo E.', role: 'CEO, startup de logística' },
    ],
    benefits: [
      { title: 'Estructura que los VCs reconocen', desc: 'El orden de los slides importa. PitchIA sigue el formato que usan Y Combinator, Sequoia y los fondos locales más activos.' },
      { title: 'Textos que no suenan a IA', desc: 'No es un template con blancos para llenar. Los textos son específicos a tu startup, con tu voz y tus números.' },
      { title: 'Feedback antes de mandar', desc: 'PitchIA revisa tu deck y te dice qué slide está débil, qué argumento falta y dónde perdés la atención del inversor.' },
      { title: 'Adaptable a cada ronda', desc: 'Pre-seed, seed, Serie A — el brief cambia, el deck evoluciona. No empezás de cero en cada etapa.' },
      { title: 'Templates por industria', desc: 'SaaS, consumer, marketplace, deep tech, fintech — el lenguaje y los KPIs que mencionar varían por industria.' },
      { title: 'Exportación en el formato que pidan', desc: 'PDF para mail, Google Slides para editar en reunión, PPT para los que todavía lo piden.' },
    ],
    faqs: [
      { q: '¿PitchIA reemplaza a un mentor de pitch?', a: 'No, lo complementa. PitchIA resuelve el 80% del trabajo estructural. El 20% de storytelling y personalización lo ponés vos, idealmente con feedback humano también.' },
      { q: '¿Qué pasa si mi startup está en etapa muy temprana y no tengo tracción?', a: 'PitchIA maneja eso. Para etapas pre-revenue, adapta el slide de tracción para mostrar validación de hipótesis, usuarios piloto y señales de mercado.' },
      { q: '¿Los inversores pueden ver que usé IA?', a: 'No. El deck que reciben es un PDF o Google Slides normal. Lo que importa es el contenido, no cómo lo generaste.' },
      { q: '¿Puedo hacer múltiples versiones para distintos inversores?', a: 'Sí. Con el plan Pro podés generar versiones ilimitadas del mismo brief o de briefs distintos.' },
    ],
    dailyCost: '$0.40 USD por día',
    closingLine: 'La próxima ronda empieza con un deck que abre puertas, no que las cierra.',
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
      'Los freelancers pierden entre 5 y 10 horas por semana en administración: presupuestos en Word, perseguir pagos por WhatsApp.',
    solution:
      'Presupuesto en 2 minutos, link de aprobación para el cliente, reminder automático si no pagaron.',
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
    heroHeadline: 'Cobrás bien. ¿Por qué perseguís los pagos como si no?',
    heroSubtext:
      'El trabajo ya está hecho. La plata debería llegar sola — o al menos sin que tengas que mandar mensajes incómodos.',
    stats: [
      { value: '-68%', label: 'menos tiempo en administración' },
      { value: '4.7 días', label: 'promedio hasta cobrar (antes: 18)' },
      { value: '6.400+', label: 'freelancers activos' },
    ],
    steps: [
      { title: 'Armás el presupuesto', desc: 'Elegís el cliente, los ítems, los precios y la validez. Con tu logo, en tu moneda. Menos de 2 minutos.' },
      { title: 'El cliente lo aprueba online', desc: 'Le mandás un link. Él ve el presupuesto, lo aprueba con un clic y vos recibís la notificación al instante.' },
      { title: 'Cotizador hace el seguimiento', desc: 'Si no pagaron en 7 días, manda un reminder automático. Vos no tenés que hacer nada incómodo.' },
    ],
    testimonials: [
      { quote: 'Dejé de perder el 30% de mis cobros en seguimiento. Ahora el sistema lo hace por mí y los clientes pagan antes.', name: 'Romina S.', role: 'Diseñadora gráfica, Mendoza' },
      { quote: 'Mis presupuestos antes eran un PDF hecho en Canva. Ahora son profesionales y tienen tracking. El cliente lo nota.', name: 'Matías C.', role: 'Desarrollador web, CABA' },
      { quote: 'El dashboard de ingresos me mostró que tenía un cliente que me pagaba 3 semanas tarde siempre. Lo cobro por adelantado ahora.', name: 'Laura F.', role: 'Consultora de marketing, Rosario' },
    ],
    benefits: [
      { title: 'Presupuestos que dan imagen profesional', desc: 'Con tu logo, colores y datos fiscales. La diferencia entre que te perciban como freelancer o como estudio.' },
      { title: 'El cliente aprueba en un clic', desc: 'Sin mail de ida y vuelta, sin "sí, dale" por WhatsApp que no vale nada. Aprobación con timestamp y registro.' },
      { title: 'Reminders que hacen el trabajo sucio', desc: 'Vos no tenés que preguntar si pagaron. Cotizador pregunta por vos, en el momento justo y con el tono correcto.' },
      { title: 'Visibilidad de lo que te deben', desc: 'Dashboard en tiempo real: qué aprobaron, qué pagaron, qué está vencido. Sin Excel, sin contar en la cabeza.' },
      { title: 'Historial de clientes y servicios', desc: 'Cada cliente con su historial completo. Generás un presupuesto nuevo en 20 segundos reutilizando ítems anteriores.' },
      { title: 'Recibos automáticos al cobrar', desc: 'Cuando marcás un pago como recibido, el sistema genera y manda el recibo al cliente. Limpio y prolijo.' },
    ],
    faqs: [
      { q: '¿Mis clientes necesitan crearse una cuenta para aprobar?', a: 'No. Reciben un link, ven el presupuesto y aprueban con un clic. Sin registro, sin fricción.' },
      { q: '¿Puedo cobrar en pesos, dólares o euros?', a: 'Sí. Elegís la moneda por presupuesto. Podés tener clientes en distintas monedas sin problemas.' },
      { q: '¿Cómo funciona el reminder automático?', a: 'Vos configurás cuántos días después del vencimiento querés que salga el reminder. Cotizador lo manda por mail con tono profesional y tu firma.' },
      { q: '¿Puedo personalizar el presupuesto con mis colores?', a: 'Sí. Subís tu logo, elegís el color principal y el sistema lo aplica a todos tus presupuestos.' },
    ],
    dailyCost: '$0.33 USD por día',
    closingLine: 'Tu trabajo es crear. El cobro es un trámite. Automatizalo.',
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
      'Los docentes dedican entre 8 y 12 horas semanales fuera del aula a planificar clases y corregir.',
    solution:
      'Escribís el tema y los objetivos, DocenteIA genera plan de clase, ejercicios y evaluación lista para imprimir.',
    features: [
      'Plan de clase estructurado',
      'Ejercicios diferenciados por nivel',
      'Evaluaciones con criterios de corrección',
      'Banco de preguntas reutilizable',
      'Alineado a diseños curriculares',
    ],
    free: '3 clases/mes',
    pro: '$8 USD/mes — ilimitado + banco de preguntas + exportación',
    audience: 'Docentes de primaria, secundaria y terciaria',
    heroHeadline: 'Elegiste enseñar. No pasarte el domingo planificando.',
    heroSubtext:
      'Cada hora que dedicás a armar clases es una hora que no estás descansando, con tu familia ni preparándote para ser mejor docente.',
    stats: [
      { value: '8 hs', label: 'semanales recuperadas en promedio' },
      { value: '7.200+', label: 'docentes activos en Latam' },
      { value: '3 min', label: 'de tema a plan de clase completo' },
    ],
    steps: [
      { title: 'Escribís el tema y el nivel', desc: 'Por ejemplo: "Fracciones equivalentes, 5to grado, duración 40 minutos". Nada más que eso.' },
      { title: 'DocenteIA genera todo', desc: 'Plan de clase con objetivos, apertura, desarrollo, cierre y tiempo estimado. Más ejercicios y evaluación incluidos.' },
      { title: 'Imprimís o adaptás', desc: 'Descargás en PDF o Word, editás lo que quieras y llevás al aula. Tu criterio docente siempre al mando.' },
    ],
    testimonials: [
      { quote: 'Planifico 5 materias por semana. Antes me llevaba el fin de semana entero. Ahora lo hago el viernes en dos horas.', name: 'Carla M.', role: 'Profesora de secundaria, Santa Fe' },
      { quote: 'Los ejercicios diferenciados por nivel son exactamente lo que necesitaba para el aula heterogénea. No tenía cómo generarlos tan rápido.', name: 'Federico N.', role: 'Maestro, Buenos Aires' },
      { quote: 'Uso el banco de preguntas para armar exámenes distintos por división. Nunca más el mismo examen copiado.', name: 'Patricia S.', role: 'Profesora terciario, Mendoza' },
    ],
    benefits: [
      { title: 'El domingo es tuyo otra vez', desc: 'Planificar una semana de clases pasa de 8 horas a menos de 2. El resto del tiempo, tuyo.' },
      { title: 'Clases alineadas al currículo', desc: 'DocenteIA conoce los diseños curriculares de Argentina. No generá actividades que no corresponden al año.' },
      { title: 'Diferenciación sin esfuerzo extra', desc: 'Genera ejercicios en tres niveles de dificultad para el mismo tema. Inclusión real, sin trabajo doble.' },
      { title: 'Evaluaciones con rúbricas', desc: 'No solo las preguntas — los criterios de corrección también. Corrección más justa, menos tiempo en cada examen.' },
      { title: 'Banco de preguntas acumulativo', desc: 'Cada clase genera preguntas que se suman al banco. Con el tiempo, tenés un repositorio enorme para reusar.' },
      { title: 'Exportación lista para imprimir', desc: 'PDF con el formato de la institución o Word para editar. Sin copiar y pegar desde ningún lado.' },
    ],
    faqs: [
      { q: '¿DocenteIA reemplaza mi criterio pedagógico?', a: 'No, lo asiste. El plan generado es un punto de partida sólido que vos ajustás con tu conocimiento del grupo, el contexto y los objetivos específicos.' },
      { q: '¿Funciona para nivel universitario o terciario?', a: 'Sí. Podés especificar el nivel y la complejidad esperada. Genera clases para cualquier etapa educativa.' },
      { q: '¿Está alineado a los planes de estudio actuales?', a: 'Sí, para Argentina, Uruguay y Chile. Si tu currículo es de otro país, podés especificarlo y se adapta.' },
      { q: '¿Puedo compartir clases con colegas?', a: 'Con el plan Pro, sí. Podés exportar y compartir cualquier clase generada. También podés importar clases de otros docentes.' },
    ],
    dailyCost: '$0.27 USD por día',
    closingLine: 'Enseñar es un acto de amor. La burocracia, no. DocenteIA se encarga de la segunda.',
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
      'La técnica Pomodoro no se adapta a cada persona. Sin datos, nunca sabés cuál es tu ritmo óptimo.',
    solution:
      'Trabajás con el temporizador, calificás tu concentración. Fokus aprende tu ritmo y sugiere los bloques óptimos.',
    features: [
      'Temporizador configurable',
      'Calificación de sesión post-bloque',
      'Análisis de productividad semanal',
      'Sugerencias IA personalizadas',
      'Integración con tareas propias',
    ],
    free: 'Pomodoro básico + historial 7 días',
    pro: '$5 USD/mes — análisis IA + insights + historial ilimitado',
    audience: 'Estudiantes, freelancers, remote workers',
    heroHeadline: 'No trabajás poco. Trabajás en el momento equivocado.',
    heroSubtext:
      'Tu pico de concentración tiene horario. Fokus lo encuentra con datos reales de tus sesiones, no con teorías genéricas.',
    stats: [
      { value: '+31%', label: 'más output en las primeras 4 semanas' },
      { value: '11.000+', label: 'usuarios activos' },
      { value: '2.3M', label: 'sesiones de trabajo registradas' },
    ],
    steps: [
      { title: 'Iniciás el bloque', desc: 'Elegís el tiempo (15, 25, 45 o 60 min) y arrancás. Sin configuraciones complicadas, sin onboarding eterno.' },
      { title: 'Calificás tu concentración', desc: 'Al terminar cada bloque, un número del 1 al 5. ¿Estuviste realmente enfocado? Eso es todo lo que necesitamos.' },
      { title: 'Fokus aprende y te guía', desc: 'Con el tiempo, detecta tus mejores horarios, tu duración óptima de bloque y cuándo descansar más. Te lo dice antes de que lo necesitás.' },
    ],
    testimonials: [
      { quote: 'Descubrí que mis mejores bloques son entre las 7 y las 10am. Ahora agendo el trabajo difícil ahí y el mail para después. Cambió todo.', name: 'Santiago V.', role: 'Freelancer, remoto' },
      { quote: 'Soy estudiante y pensaba que no podía concentrarme. Fokus me mostró que sí puedo, pero en bloques de 40 min, no de 25.', name: 'Valentina A.', role: 'Estudiante universitaria, Córdoba' },
      { quote: 'El análisis semanal es lo que más uso. Ver la curva de productividad de la semana me ayuda a planificar la siguiente.', name: 'Emilio R.', role: 'Diseñador, remoto' },
    ],
    benefits: [
      { title: 'Tu ritmo, no el de un libro', desc: 'Fokus no te impone 25 minutos porque Pomodoro lo dice. Aprende cuánto tiempo realmente te rinde a vos.' },
      { title: 'Sabés cuándo rendís más', desc: 'No es intuición — son datos de tus sesiones reales. Agenda el trabajo importante cuando realmente podés hacerlo.' },
      { title: 'Menos culpa, más claridad', desc: '"Hoy no pude concentrarme" deja de ser una sensación vaga. Fokus te dice cuántas horas reales de foco tuviste esta semana.' },
      { title: 'Alertas antes de que te agotes', desc: 'Cuando tu patrón muestra señales de fatiga, Fokus te sugiere un descanso antes de que caigas en el scroll infinito.' },
      { title: 'Integración con tu lista de tareas', desc: 'Asociás cada bloque a una tarea. Al final de la semana ves cuánto tiempo le dedicaste a cada proyecto.' },
      { title: 'Sin suscripción a distracciones', desc: 'Fokus no tiene feed, no tiene notificaciones de otros, no gamifica el trabajo. Solo el timer y tus datos.' },
    ],
    faqs: [
      { q: '¿Cuántas sesiones necesito para que la IA aprenda mi ritmo?', a: 'Con 20 sesiones ya tenés insights iniciales. Con 50 el análisis es realmente preciso. La mayoría lo alcanza en 2-3 semanas.' },
      { q: '¿Puedo cambiar la duración de los bloques en cualquier momento?', a: 'Sí. Fokus no te obliga a ningún tiempo fijo. El punto es que registrés cómo te sentiste en cada duración para que el sistema pueda comparar.' },
      { q: '¿Funciona sin conexión?', a: 'El timer funciona offline. Los datos se sincronizan cuando volvés a conectarte.' },
      { q: '¿Es compatible con el método Pomodoro tradicional?', a: 'Totalmente. Si preferís el 25/5 clásico, lo configurás así y usás Fokus como tu Pomodoro con tracking. El análisis IA es opcional.' },
    ],
    dailyCost: '$0.17 USD por día',
    closingLine: 'Tu tiempo es finito. Fokus te ayuda a saber exactamente cómo lo estás usando.',
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
      '35% de los adultos tiene problemas para dormir. Las apps de ruido blanco son todas iguales.',
    solution:
      'SleepTones combina sonidos y frecuencias binaurales según tu objetivo de sueño específico.',
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
    heroHeadline: 'Ocho horas en cama no son ocho horas de descanso.',
    heroSubtext:
      'El sueño profundo no llega porque decidís dormirte. Llega cuando el ambiente y la mente están listos. SleepTones crea ese ambiente.',
    stats: [
      { value: '18 min', label: 'promedio para conciliar el sueño (antes: 47 min)' },
      { value: '89%', label: 'reporta mejor calidad de sueño en 7 días' },
      { value: '50+', label: 'sonidos en calidad de estudio' },
    ],
    steps: [
      { title: 'Elegís tu objetivo', desc: '¿Querés dormirte más rápido, no despertarte a las 3am o despertar con más energía? SleepTones adapta la mezcla a lo que necesitás hoy.' },
      { title: 'La mezcla se arma sola', desc: 'Sonidos de naturaleza + frecuencias binaurales en la combinación exacta para tu objetivo. Sin que tengas que saber nada de neurociencia.' },
      { title: 'Dormís. El timer hace el resto.', desc: 'El apagado automático corta el sonido cuando ya estás durmiendo. Sin alarmas que te saquen, sin pantalla que te despierte.' },
    ],
    testimonials: [
      { quote: 'Probé todas las apps de ruido blanco. SleepTones es la única que siento que realmente me lleva al sueño, no solo me distrae mientras me duermo.', name: 'Cecilia M.', role: 'Enfermera nocturna, Córdoba' },
      { quote: 'Viajo mucho por trabajo. Antes tardaba horas en dormirme en hoteles. Ahora tengo mi mezcla guardada y me duermo en minutos.', name: 'Fernando A.', role: 'Consultor, Buenos Aires' },
      { quote: 'Mis hijos se duermen con la mezcla "Lluvia + Delta". Lo que antes era una pelea de 45 minutos ahora son 10.', name: 'Natalia R.', role: 'Madre de 3, Mendoza' },
    ],
    benefits: [
      { title: 'Dormís antes, dormís más profundo', desc: 'Las frecuencias delta y theta llevan tu cerebro al estado de sueño profundo sin pastillas, sin suplementos, sin dependencia.' },
      { title: 'Personalizado a tu objetivo de hoy', desc: 'No es siempre la misma mezcla. SleepTones adapta los sonidos según si necesitás relajarte, dormirte o volver a dormir a las 3am.' },
      { title: 'Sin anuncios que te despierten', desc: 'Nunca un aviso publicitario en medio de la noche. El plan Pro es silencio total — y offline, sin depender del wifi.' },
      { title: 'Mezclas que guardás y reutilizás', desc: 'Encontraste la combinación perfecta para vos. La guardás, la nombrás y la tenés en un toque para la próxima noche.' },
      { title: 'Timer inteligente de apagado', desc: 'Se apaga solo después de que te dormiste — no a una hora fija que podría despertarte. El sistema detecta cuándo ya no lo necesitás.' },
      { title: 'Funciona para toda la familia', desc: 'Cada persona puede tener su perfil con sus mezclas. Para niños, adultos, personas mayores — el sonido que calma varía.' },
    ],
    faqs: [
      { q: '¿Las frecuencias binaurales funcionan de verdad?', a: 'Hay evidencia científica creciente de que las frecuencias en rango delta (0.5-4 Hz) facilitan el sueño profundo. SleepTones usa frecuencias en ese rango, mezcladas con sonidos ambientales que las hacen más efectivas.' },
      { q: '¿Necesito auriculares para que funcione?', a: 'Para las frecuencias binaurales, sí — necesitás auriculares para que cada oído reciba una frecuencia diferente. Para los sonidos de naturaleza, funciona con altavoz normalmente.' },
      { q: '¿Puedo usarlo para la siesta también?', a: 'Sí. Hay mezclas específicas para siesta corta (20 min) que usan frecuencias alfa en vez de delta, para que despertés activo y no atontado.' },
      { q: '¿Crea dependencia?', a: 'No. Los sonidos crean un ambiente propicio para el sueño, pero no alteran química cerebral. Podés dejar de usarlo cuando quieras sin ningún efecto de abstinencia.' },
    ],
    dailyCost: '$0.20 USD por día',
    closingLine: 'El descanso no es un lujo. Es el fundamento de todo lo demás.',
  },
]

export function getApp(slug: string): App | undefined {
  return apps.find((a) => a.slug === slug)
}
