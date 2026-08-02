import { Service, TechStackItem, Testimonial } from "./types";

export const servicesData: Service[] = [
  {
    id: "ai-automation",
    title: "AI & Automation",
    shortDescription: "Agentes inteligentes autónomos con OpenClaw y Hermes Agent, automatizaciones e integraciones LLM avanzadas.",
    longDescription: "Revolucionamos la forma en que opera tu negocio implementando agentes cognitivos de IA de última generación y automatizaciones autónomas de flujos de trabajo. Nos especializamos en la integración de frameworks agenticos avanzados como OpenClaw para interacción de sistemas y Hermes Agent para toma de decisiones y orquestación multi-agente de alta fidelidad.",
    iconName: "Cpu",
    features: [
      "Agentes cognitivos autónomos (OpenClaw & Hermes Agent)",
      "Arquitecturas multi-agente y ejecución de herramientas (Tool Calling)",
      "Automatización avanzada de workflows complejos (Make, Zapier, n8n)",
      "Sistemas de recuperación con generación aumentada de IA (RAG con LLMs)",
      "Procesamiento autónomo inteligente de documentos y APIs legacy"
    ],
    techStack: ["OpenClaw", "Hermes Agent", "Gemini 3.5", "LangChain", "n8n / Python"],
    deliverables: [
      "Código fuente de orquestación agentica documentado",
      "Entorno OpenClaw / Hermes Agent aprovisionado en producción",
      "Flujos y triggers automatizados con logs en tiempo real",
      "Manual de gobernanza de agentes, guardrails y soporte técnico"
    ],
    timeline: "4 - 8 semanas",
    startingPrice: "$3,500"
  },
  {
    id: "ecommerce",
    title: "E-Commerce & Web Dev",
    shortDescription: "Tiendas virtuales premium y plataformas web rápidas de escala mundial.",
    longDescription: "Desarrollamos arquitecturas de comercio electrónico y web a medida, enfocadas en velocidades de carga excepcionales (Core Web Vitals excelentes), seguridad bancaria y tasas de conversión optimizadas. Creamos experiencias intuitivas y atractivas adaptadas para móviles y escritorios.",
    iconName: "ShoppingBag",
    features: [
      "E-commerce a medida (React / Next.js / Shopify Hydrogen)",
      "Paneles de administración personalizados e interactivos",
      "Integración de pasarelas globales (Stripe, PayPal, Apple Pay)",
      "SEO técnico de alto rendimiento y Core Web Vitals al 100%",
      "Sistemas de inventario y sincronización en tiempo real"
    ],
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Stripe"],
    deliverables: [
      "Plataforma web productiva en la nube",
      "Código de desarrollo optimizado",
      "Pruebas de estrés y auditoría de seguridad",
      "Capacitación de administración de contenidos"
    ],
    timeline: "5 - 10 semanas",
    startingPrice: "$4,500"
  },
  {
    id: "cloud-devops",
    title: "Cloud & DevOps",
    shortDescription: "Arquitecturas elásticas en la nube, seguridad robusta y despliegue continuo.",
    longDescription: "Diseñamos e implementamos infraestructuras cloud modernas bajo la filosofía de Infraestructura como Código (IaC). Garantizamos la resiliencia de tu negocio con balanceadores de carga inteligentes, configuraciones de alta disponibilidad, seguridad avanzada de datos y pipelines de CI/CD automatizados.",
    iconName: "Cloud",
    features: [
      "Diseño de arquitectura elástica y escalable",
      "Infraestructura como Código (Terraform)",
      "Configuración de contenedores y orquestación (Docker, K8s)",
      "Pipelines de integración y despliegue continuo (CI/CD)",
      "Auditorías de seguridad cloud y mitigación de riesgos"
    ],
    techStack: ["AWS", "Google Cloud", "Docker", "Terraform", "GitHub Actions"],
    deliverables: [
      "Infraestructura aprovisionada y operativa",
      "Scripts de Terraform y configuraciones de CI/CD",
      "Protocolos de respaldo y recuperación ante desastres",
      "Informe detallado de seguridad y optimización de costos"
    ],
    timeline: "3 - 6 semanas",
    startingPrice: "$3,000"
  },
  {
    id: "analytics-bi",
    title: "Data Analytics & BI",
    shortDescription: "Pipelines de datos potentes, analítica de negocio y cuadros de mando interactivos.",
    longDescription: "Transformamos datos crudos en decisiones estratégicas claras. Diseñamos pipelines de datos robustos para consolidar tu información (ETL), realizamos minería profunda y creamos cuadros de mando visualmente espectaculares con gráficos interactivos que te permiten monitorear tu negocio en tiempo real.",
    iconName: "BarChart3",
    features: [
      "Cuadros de mando interactivos en tiempo real",
      "Procesamiento y transformación de datos (ETL)",
      "Modelado de datos para almacenamiento centralizado (Data Warehousing)",
      "Análisis predictivo de tendencias comerciales",
      "Integración de múltiples fuentes de datos (CRMs, ERPs, Web)"
    ],
    techStack: ["D3.js", "PostgreSQL", "Python", "SQL", "Tableau/Looker API"],
    deliverables: [
      "Panel de analítica interactivo incorporado",
      "Modelos de datos y base de datos centralizada",
      "Reporte ejecutivo de hallazgos analíticos",
      "Pipeline ETL automatizado en producción"
    ],
    timeline: "4 - 8 semanas",
    startingPrice: "$3,200"
  },
  {
    id: "design-branding",
    title: "UI/UX & Digital Branding",
    shortDescription: "Sistemas de diseño modernos, interfaces interactivas e identidad tecnológica.",
    longDescription: "Creamos la identidad visual y la experiencia interactiva que define el futuro de tu marca. Construimos sistemas de diseño consistentes que aceleran el desarrollo, diseñamos interfaces de usuario con micro-interacciones pulidas y elaboramos una marca que inspira confianza, innovación y vanguardismo.",
    iconName: "Palette",
    features: [
      "Investigación de usuarios y wireframes interactivos",
      "Sistemas de diseño modulares e implementables",
      "Diseño UI de alta fidelidad para Web y Apps",
      "Prototipos interactivos de alta definición",
      "Identidad visual, paletas de colores y tipografías tecnológicas"
    ],
    techStack: ["Figma", "Sistemas de Diseño", "Tailwind UI", "Motion", "SVG Animado"],
    deliverables: [
      "Archivos fuente de Figma organizados con autolayout",
      "Guías de estilo completas y kit de UI",
      "Prototipo interactivo navegable",
      "Assets exportados optimizados para desarrollo (SVGs, fuentes)"
    ],
    timeline: "3 - 5 semanas",
    startingPrice: "$2,500"
  },
  {
    id: "seo-optimization",
    title: "SEO & Growth Programmatic",
    shortDescription: "Posicionamiento orgánico de alta autoridad, SEO técnico avanzado y campañas de contenido programático.",
    longDescription: "Hacemos que tu marca lidere las búsquedas de Google de forma orgánica y consistente. Implementamos SEO técnico de nivel avanzado (marcado schema semántico estructurado, optimización extrema de velocidad Core Web Vitals) y estrategias de SEO programático impulsadas por datos para dominar micronichos de mercado altamente competitivos.",
    iconName: "TrendingUp",
    features: [
      "Auditoría SEO técnica profunda e indexación garantizada",
      "Estrategia de contenidos y SEO programático automatizado",
      "Optimización SEO semántica on-page avanzada y Schema Markup",
      "Construcción de enlaces (Link Building) de alta autoridad institucional",
      "Optimización extrema de velocidad de página para rankings (Core Web Vitals)"
    ],
    techStack: ["Google Search Console", "Ahrefs API", "Next.js SEO", "Schema.org", "Gemini API"],
    deliverables: [
      "Auditoría técnica inicial y plan de corrección inmediato",
      "Arquitectura de información optimizada para indexación",
      "Monitoreo automatizado de palabras clave en tiempo real",
      "Informes mensuales interactivos de rendimiento orgánico"
    ],
    timeline: "3 - 6 semanas",
    startingPrice: "$2,200"
  },
  {
    id: "digital-marketing",
    title: "Marketing Digital & Performance",
    shortDescription: "Campañas de pauta optimizadas por datos, optimización de conversión (CRO) y automatización de embudos.",
    longDescription: "Diseñamos estrategias de adquisición integrales que transforman cada dólar invertido en crecimiento real. Creamos campañas de alta conversión en Google Ads, Meta Ads y LinkedIn Ads optimizadas dinámicamente con IA, acompañadas de automatizaciones de correo electrónico conductuales y flujos de nutrición de prospectos de alto rendimiento.",
    iconName: "Megaphone",
    features: [
      "Campañas publicitarias inteligentes (Google, Meta, LinkedIn Ads)",
      "Segmentación avanzada por audiencias automatizada con IA",
      "Pruebas A/B sistemáticas y optimización de tasa de conversión (CRO)",
      "Automatización de embudos de venta (Email marketing conductual)",
      "Atribución avanzada de canales y modelado de ROI en tiempo real"
    ],
    techStack: ["Meta Business API", "Google Ads API", "Klaviyo", "Google Analytics 4", "ActiveCampaign"],
    deliverables: [
      "Estructura de cuenta publicitaria y pixeles de seguimiento configurados",
      "Embudo de nutrición automatizado configurado y redactado",
      "Copys creativos y activos optimizados para conversión",
      "Panel interactivo de atribución de pauta y retorno de inversión"
    ],
    timeline: "4 - 8 semanas",
    startingPrice: "$2,800"
  }
];

export const techStackData: TechStackItem[] = [
  { name: "React / Next.js", category: "frontend", level: "expert", description: "Arquitecturas SPA y SSR ultra-rápidas" },
  { name: "Tailwind CSS", category: "frontend", level: "expert", description: "Estilizado atómico premium, fluido y adaptable" },
  { name: "TypeScript", category: "frontend", level: "expert", description: "Código fuertemente tipado para robustez absoluta" },
  { name: "Node.js / Express", category: "backend", level: "expert", description: "Backend robusto, APIs de alto rendimiento" },
  { name: "Python / FastAPI", category: "backend", level: "advanced", description: "Procesamiento lógico veloz y servicios de IA" },
  { name: "Gemini Models", category: "ai", level: "expert", description: "Sistemas cognitivos avanzados y asistentes contextuales" },
  { name: "OpenClaw Framework", category: "ai", level: "expert", description: "Orquestación de agentes interactivos autónomos para automatizaciones de escritorio y navegador" },
  { name: "Hermes Agent", category: "ai", level: "expert", description: "Modelos y agentes afinados para llamadas de herramientas avanzadas y lógica computacional" },
  { name: "LangChain", category: "ai", level: "advanced", description: "Orquestación de flujos de razonamiento RAG complejos" },
  { name: "PostgreSQL", category: "backend", level: "expert", description: "Bases de datos relacionales robustas y seguras" },
  { name: "Amazon Web Services (AWS)", category: "cloud", level: "expert", description: "Infraestructuras masivas de alta disponibilidad" },
  { name: "Google Cloud Platform", category: "cloud", level: "expert", description: "Procesamiento serverless y ecosistema nativo de IA" },
  { name: "Docker & Kubernetes", category: "cloud", level: "advanced", description: "Contenedores consistentes y orquestación dinámica" },
  { name: "Figma & Design Systems", category: "design", level: "expert", description: "Prototipado rápido y tokens visuales" }
];

export const testimonialsData: Testimonial[] = [
  {
    id: "t1",
    name: "Alejandra Ruiz",
    role: "CEO & Co-fundadora",
    company: "Savia Logistics",
    content: "NOVA group transformó completamente nuestra gestión operativa. Integraron un agente de IA que automatiza la asignación de rutas y responde consultas de clientes en tiempo real. Redujimos costos manuales en un 40% en solo dos meses.",
    rating: 5
  },
  {
    id: "t2",
    name: "Carlos Mendoza",
    role: "Director de Tecnología",
    company: "Vortex Retail",
    content: "Teníamos problemas serios de velocidad en nuestra tienda en línea. El equipo de NOVA group rediseñó el e-commerce desde cero usando Next.js. El tiempo de carga bajó a menos de 1 segundo y nuestras conversiones se duplicaron.",
    rating: 5
  },
  {
    id: "t3",
    name: "Silvia Hoffman",
    role: "VP de Producto",
    company: "FinTech Zenith",
    content: "La experiencia con el equipo de UI/UX y analítica de NOVA group fue impecable. No solo crearon una interfaz elegante y de nivel internacional para nuestro dashboard corporativo, sino que optimizaron las bases de datos para renderizar millones de registros en milisegundos.",
    rating: 5
  }
];

export const faqsData = [
  {
    question: "¿Cómo funciona el proceso de consultoría con NOVA group?",
    answer: "Iniciamos con una fase de diagnóstico gratuito para entender tus objetivos de negocio y limitaciones actuales. Luego, nuestro equipo técnico formula una propuesta detallada que incluye arquitectura recomendada, entregables secuenciales, cronograma exacto y presupuesto cerrado."
  },
  {
    question: "¿Qué nivel de soporte técnico ofrecen post-entrega?",
    answer: "Todos nuestros servicios incluyen una garantía técnica de 30 días contra cualquier error. Adicionalmente, ofrecemos planes de soporte continuo y optimización mensual (SLA) para monitorear el rendimiento de tus automatizaciones, bases de datos e infraestructura cloud."
  },
  {
    question: "Tengo un sistema antiguo, ¿pueden automatizarlo o conectarlo a una IA?",
    answer: "Sí, somos expertos en integraciones heredadas (legacy). Creamos capas de API intermedias o utilizamos herramientas avanzadas de automatización para conectar tus bases de datos o sistemas antiguos con la API de Gemini u otros servicios cloud modernos, sin interrumpir tu operación diaria."
  },
  {
    question: "¿Los presupuestos son fijos o variables?",
    answer: "Para la mayoría de proyectos definidos trabajamos bajo la modalidad de presupuesto fijo cerrado. Si el alcance es altamente experimental o cambiante, ofrecemos esquemas ágiles basados en sprints de desarrollo de dos semanas con entregables claros."
  }
];
