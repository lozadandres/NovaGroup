import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { servicesData, testimonialsData, faqsData } from "./data";
import { Service } from "./types";
import ServiceCard from "./components/ServiceCard";
import AIAssistantDrawer from "./components/AIAssistantDrawer";
import TechStackExplorer from "./components/TechStackExplorer";
import MobileBottomNav from "./components/MobileBottomNav";
import CursorSpotlight from "./components/CursorSpotlight";
import PageBeam from "./components/PageBeam";
import MarqueeBanner from "./components/MarqueeBanner";
import { 
  Sparkles, 
  ArrowRight, 
  Check, 
  ChevronDown, 
  Star, 
  Terminal,
  Info,
  X
} from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from "motion/react";
import MetricCard from "./components/MetricCard";
import Title3D from "./components/Title3D";
import Planet3D from "./components/Planet3D";

export default function App() {
  // State for AI Advisor drawer toggle
  const [isAdvisorOpen, setIsAdvisorOpen] = useState(false);
  
  // State for header compact scroll trigger (>50px)
  const [isScrolled, setIsScrolled] = useState(false);
  
  // State for service detail modal
  const [selectedServiceDetail, setSelectedServiceDetail] = useState<Service | null>(null);

  // State for project planner
  const [selectedServices, setSelectedServices] = useState<string[]>([
    "ai-automation",
    "ecommerce",
  ]);
  const [projectScale, setProjectScale] = useState<"startup" | "growth" | "enterprise">("growth");
  const [projectTimeline, setProjectTimeline] = useState<"standard" | "urgent" | "flexible">("standard");

  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const scrollRafRef = useRef<number | null>(null);
  const lastScrollStateRef = useRef(false);

  const budget = useMemo(() => {
    let baseMin = 0;
    let baseMax = 0;
    let baseWeeksMin = 0;
    let baseWeeksMax = 0;

    for (let i = 0; i < selectedServices.length; i++) {
      const svcId = selectedServices[i];
      const svc = servicesData.find((s) => s.id === svcId);
      if (svc) {
        const numPrice = parseInt(svc.startingPrice.replace(/[^0-9]/g, "")) || 1000;
        baseMin += numPrice;
        baseMax += Math.round(numPrice * 1.8);
        const weeks = parseInt(svc.timeline) || 2;
        baseWeeksMin += weeks;
        baseWeeksMax += weeks + 1;
      }
    }

    let scaleMult = 1.0;
    if (projectScale === "growth") scaleMult = 1.6;
    if (projectScale === "enterprise") scaleMult = 3.2;

    let timeMult = 1.0;
    if (projectTimeline === "urgent") timeMult = 1.25;
    if (projectTimeline === "flexible") timeMult = 0.9;

    const finalMin = Math.round(baseMin * scaleMult * timeMult);
    const finalMax = Math.round(baseMax * scaleMult * timeMult);

    return {
      priceMin: `$${finalMin.toLocaleString()}`,
      priceMax: `$${finalMax.toLocaleString()}`,
      weeksMin: Math.max(1, Math.round(baseWeeksMin * (projectTimeline === "urgent" ? 0.75 : 1))),
      weeksMax: Math.max(2, Math.round(baseWeeksMax * (projectTimeline === "urgent" ? 0.8 : 1))),
    };
  }, [selectedServices, projectScale, projectTimeline]);

  const { priceMin, priceMax, weeksMin, weeksMax } = budget;

  const handleToggleServiceInPlanner = useCallback((serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  }, []);

  const handleToggleScopeFromCard = useCallback((e: React.MouseEvent, serviceId: string) => {
    e.stopPropagation();
    handleToggleServiceInPlanner(serviceId);
  }, [handleToggleServiceInPlanner]);

  const { scrollY, scrollYProgress } = useScroll();
  const spotlight1Y = useTransform(scrollY, [0, 1500], [0, 350]);
  const spotlight2Y = useTransform(scrollY, [0, 2000], [0, 480]);
  const heroSpotlightY = useTransform(scrollY, [0, 800], [0, 160]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const newState = latest > 50;
    if (newState !== lastScrollStateRef.current) {
      if (scrollRafRef.current) cancelAnimationFrame(scrollRafRef.current);
      scrollRafRef.current = requestAnimationFrame(() => {
        lastScrollStateRef.current = newState;
        setIsScrolled(newState);
        scrollRafRef.current = null;
      });
    }
  });

  useEffect(() => {
    return () => {
      if (scrollRafRef.current) cancelAnimationFrame(scrollRafRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0d031b] text-[#ffffff] font-sans selection:bg-[#a855f7]/40 selection:text-white relative">

      {/* =========================================================== */}
      {/* GLOBAL FIXED LAYERS (fuera de cualquier overflow-x-clip    */}
      {/* para que position: fixed funcione respecto al viewport)    */}
      {/* =========================================================== */}

      {/* Tactile Noise/Film Grain Texture */}
      <div className="page-grain" />

      {/* Interactive Cursor Spotlight */}
      <CursorSpotlight />

      {/* Page Central Beam / Pulsing Rail */}
      <PageBeam />

      {/* Floating Desktop Advisor Button */}
      <button
        id="btn-floating-advisor"
        onClick={() => setIsAdvisorOpen(true)}
        className="cursor-pointer fixed bottom-6 right-6 z-50 hidden md:flex items-center gap-2.5 rounded-full liquid-glass-pill text-white px-5 py-3 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_10px_30px_rgba(0,0,0,0.6)] hover:scale-[1.05] active:scale-95 transition-all group hover:border-white/50"
        title="Consultor IA NOVA group"
      >
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#a855f7] text-white shadow-[0_0_10px_rgba(168,85,247,0.8)]">
          <Sparkles className="h-3.5 w-3.5 animate-pulse" />
        </div>
        <span className="text-xs font-bold font-mono tracking-wider uppercase text-gray-200 group-hover:text-white transition-colors">
          ¿PODEMOS AYUDARTE?
        </span>
      </button>

      {/* Mobile Bottom Navigation Bar - Apple Liquid Glass Style */}
      <MobileBottomNav onOpenAdvisor={() => setIsAdvisorOpen(true)} isHidden={isAdvisorOpen} />

      {/* AI Advisor Sliding Panel/Drawer */}
      <AIAssistantDrawer
        isOpen={isAdvisorOpen}
        onClose={() => setIsAdvisorOpen(false)}
        selectedServices={selectedServices}
        projectScale={projectScale}
      />

      {/* Service Detail Modal/Drawer */}
      <AnimatePresence>
        {selectedServiceDetail && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-xl liquid-glass p-6 shadow-[0_0_60px_rgba(0,0,0,0.8)] text-left border-white/20"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2 text-xs font-mono text-[#c084fc] uppercase font-bold">
                  <Info className="h-4 w-4" />
                  <span>Ficha Técnica Detallada</span>
                </div>
                <button
                  id="btn-close-service-modal"
                  onClick={() => setSelectedServiceDetail(null)}
                  className="cursor-pointer text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-4 space-y-4">
                <div>
                  <h3 className="text-2xl font-bold text-white font-display">
                    {selectedServiceDetail.title}
                  </h3>
                  <p className="text-xs text-gray-300 mt-2 leading-relaxed">
                    {selectedServiceDetail.longDescription}
                  </p>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-semibold text-gray-300 uppercase tracking-wider block">
                    Capacidades & Alcance Incluido:
                  </span>
                  <ul className="space-y-2">
                    {selectedServiceDetail.features.map((feat, index) => (
                      <li key={index} className="flex items-start gap-2 text-xs text-gray-300">
                        <Check className="h-3.5 w-3.5 text-[#c084fc] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-semibold text-gray-300 uppercase tracking-wider block">
                    Entregables de Código & Plataforma:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedServiceDetail.deliverables.map((item, idx) => (
                      <div key={idx} className="rounded-lg bg-black/40 border border-white/10 p-2 text-[11px] text-gray-300">
                        • {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="block text-[10px] text-gray-400 uppercase">Tiempo estimado:</span>
                    <span className="text-xs font-bold text-white font-mono">{selectedServiceDetail.timeline}</span>
                  </div>
                  <div className="text-right">
                    <span className="block text-[10px] text-gray-400 uppercase">Desde:</span>
                    <span className="text-xs font-bold text-[#c084fc] font-mono">{selectedServiceDetail.startingPrice}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  id="modal-btn-toggle-scope"
                  onClick={() => {
                    if (selectedServices.includes(selectedServiceDetail.id)) {
                      handleToggleServiceInPlanner(selectedServiceDetail.id);
                    } else {
                      setSelectedServices((prev) => [...prev, selectedServiceDetail.id]);
                    }
                    setSelectedServiceDetail(null);
                  }}
                  className="cursor-pointer flex-1 rounded-xl bg-[#a855f7] py-2.5 text-xs font-bold text-white hover:bg-[#a855f7]/90 transition-all shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                >
                  {selectedServices.includes(selectedServiceDetail.id) ? "Ya está en tu Plan" : "Agregar a mi Plan"}
                </button>
                <button
                  id="modal-btn-ask-ai"
                  onClick={() => {
                    setSelectedServiceDetail(null);
                    setIsAdvisorOpen(true);
                  }}
                  className="cursor-pointer flex-1 rounded-xl bg-white/5 border border-white/10 py-2.5 text-xs font-bold text-white hover:bg-white/10 transition-all"
                >
                  Consultar con IA
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =========================================================== */}
      {/* CONTENIDO PRINCIPAL (scrollable) — aquí sí overflow-x-clip  */}
      {/* =========================================================== */}
      <div className="relative overflow-x-clip">
        
        {/* Dynamic Parallax Background Gradients */}
        <motion.div 
          style={{ y: spotlight1Y }}
          className="absolute top-0 left-1/4 -z-20 h-[600px] w-[600px] rounded-full bg-[#a855f7]/15 opacity-60 blur-[100px] pointer-events-none transform-gpu" 
        />
        <motion.div 
          style={{ y: spotlight2Y }}
          className="absolute top-[1200px] right-1/4 -z-20 h-[650px] w-[650px] rounded-full bg-[#a855f7]/10 opacity-40 blur-[110px] pointer-events-none transform-gpu" 
        />
        <div className="absolute bottom-0 left-10 -z-20 h-[500px] w-[500px] rounded-full bg-[#a855f7]/10 opacity-30 blur-[90px] pointer-events-none" />

      {/* Sticky Liquid Glass Header / Navbar with Scroll-Triggered Compact Mode */}
      <header className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? "border-b border-white/30 bg-[#0d031b]/85 backdrop-blur-3xl shadow-[inset_0_-1px_1.5px_rgba(255,255,255,0.35),0_20px_45px_rgba(0,0,0,0.9),0_0_30px_rgba(168,85,247,0.35)]"
          : "border-b border-white/20 bg-[#0d031b]/70 backdrop-blur-2xl shadow-[inset_0_-1px_1px_rgba(255,255,255,0.15),0_10px_35px_rgba(0,0,0,0.8),0_0_20px_rgba(168,85,247,0.15)]"
      }`}>
        {/* Top Liquid Specular Light Line */}
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/60 to-transparent pointer-events-none" />

        {/* Scroll Progress Bar (Bioluminescent Light Line) */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#a855f7] via-[#c084fc] to-[#f472b6] shadow-[0_0_12px_rgba(192,132,252,0.9)] z-50 origin-left"
          style={{ scaleX: scrollYProgress }}
        />

        <div className={`mx-auto flex max-w-[1180px] items-center justify-between px-4 sm:px-6 transition-all duration-300 ${
          isScrolled ? "py-2 sm:py-2.5" : "py-3.5 sm:py-4"
        }`}>
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className={`flex items-center justify-center rounded-xl bg-gradient-to-br from-[#a855f7] to-[#7e22ce] shadow-[inset_0_1px_1px_rgba(255,255,255,0.6),0_0_20px_rgba(168,85,247,0.6)] border border-white/30 transition-all duration-300 ${
              isScrolled ? "h-8 w-8 text-lg" : "h-10 w-10 text-xl"
            }`}>
              <span className="font-display font-black text-white tracking-tight">N</span>
            </div>
            <div>
              <span className={`font-display font-bold tracking-tight text-white transition-all duration-300 ${
                isScrolled ? "text-lg sm:text-xl" : "text-xl sm:text-2xl"
              }`}>NOVA group</span>
              <span className={`block text-[#c084fc] tracking-widest uppercase font-mono font-bold mt-[-2px] transition-all duration-300 ${
                isScrolled ? "text-[7px] sm:text-[8px]" : "text-[8px] sm:text-[9px]"
              }`}>
                AI & TECHNOLOGY
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-3.5 lg:gap-7 text-xs lg:text-sm font-medium text-gray-300">
            <a href="#services-section" className="whitespace-nowrap hover:text-[#c084fc] transition-colors">Servicios</a>
            <a href="#planner-section" className="whitespace-nowrap hover:text-[#c084fc] transition-colors">Planificador</a>
            <a href="#tech-section" className="whitespace-nowrap hover:text-[#c084fc] transition-colors">
              <span className="lg:hidden">Stack Tech</span>
              <span className="hidden lg:inline">Stack Tecnológico</span>
            </a>
            <a href="#testimonials-section" className="whitespace-nowrap hover:text-[#c084fc] transition-colors">
              <span className="lg:hidden">Casos de Éxito</span>
              <span className="hidden lg:inline">Casos de Éxito</span>
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              id="btn-nav-advisor"
              onClick={() => setIsAdvisorOpen(true)}
              className={`cursor-pointer flex items-center gap-2 rounded-xl liquid-glass-pill hover:border-white/50 text-xs font-bold text-white transition-all shadow-[0_0_15px_rgba(168,85,247,0.3)] active:scale-95 whitespace-nowrap ${
                isScrolled ? "px-2.5 py-1.5 lg:px-3.5" : "px-3 py-2 lg:px-4"
              }`}
            >
              <Sparkles className="h-4 w-4 animate-pulse text-[#c084fc] shrink-0" />
              <span className="hidden sm:inline lg:hidden">Consultar IA</span>
              <span className="hidden lg:inline">Consultar IA NOVA group</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="mx-auto max-w-[1180px] px-6 py-12 space-y-24 relative z-10">
        
        {/* Hero Section */}
        <section className="relative text-center max-w-4xl mx-auto space-y-6 pt-4 md:pt-8" id="hero-section">
          
          {/* Huge typographic background watermark */}
          <div className="absolute inset-x-0 -top-12 -z-10 flex justify-center select-none pointer-events-none">
            <span className="font-display font-black text-[24vw] leading-none uppercase tracking-tighter text-white/[0.03]">
              NOVA GROUP
            </span>
          </div>
          
          {/* Parallax soft purple spotlight glow */}
          <motion.div 
            style={{ y: heroSpotlightY }}
            className="absolute -top-16 left-1/2 -translate-x-1/2 -z-20 h-[350px] w-[350px] rounded-full bg-[#a855f7]/20 blur-[90px] pointer-events-none" 
          />

          {/* Tagline Badge - Apple Liquid Glass Style */}
          <div className="inline-flex items-center gap-2.5 rounded-full liquid-glass-pill px-5 py-2 text-xs text-[#c084fc] font-mono shadow-[0_0_25px_rgba(168,85,247,0.3)]">
            <span className="h-2 w-2 rounded-full bg-[#a855f7] animate-ping" />
            <span className="font-semibold uppercase tracking-wider text-white">Agentes Autónomos OpenClaw & Hermes Agent</span>
          </div>

          <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight text-white font-display leading-[1.08]">
            Diseñamos el Futuro Digital con <span className="bg-gradient-to-r from-white via-[#c084fc] to-[#a855f7] bg-clip-text text-transparent">Agentes de IA & Software</span>
          </h1>

          <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            NOVA group es una firma consultora y agencia boutique de software. Orquestamos sistemas de agentes cognitivos autónomos con <strong className="text-white">OpenClaw</strong> y <strong className="text-[#c084fc]">Hermes Agent</strong>, desarrollamos plataformas e-commerce de alto rendimiento y automatizamos flujos de trabajo elásticos.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              id="btn-hero-planner"
              href="#planner-section"
              className="w-full sm:w-auto text-center cursor-pointer flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#a855f7] to-[#7e22ce] hover:from-[#b866ff] hover:to-[#8e2ce0] px-8 py-4 text-sm font-extrabold text-white transition-all shadow-[inset_0_1px_1px_rgba(255,255,255,0.6),0_0_30px_rgba(168,85,247,0.5)] border border-white/30 hover:scale-[1.02] active:scale-95"
            >
              <span>Configurar tu Plan Digital</span>
              <ArrowRight className="h-4 w-4" />
            </a>

            <button
              id="btn-hero-chat"
              onClick={() => setIsAdvisorOpen(true)}
              className="w-full sm:w-auto cursor-pointer flex items-center justify-center gap-2 rounded-full liquid-glass-pill hover:border-white/50 px-8 py-4 text-sm font-bold text-white transition-all hover:bg-white/10 active:scale-95"
            >
              <Sparkles className="h-4 w-4 text-[#c084fc]" />
              <span>Platicar con NOVA group Advisor AI</span>
            </button>
          </div>

          {/* Quick Animated Metrics - In-View Counters */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12 max-w-3xl mx-auto text-left border-t border-white/10 mt-16">
            <MetricCard
              value={99.9}
              suffix="%"
              decimals={1}
              label="Uptime Garantizado"
            />
            <MetricCard
              value={1.2}
              prefix="<"
              suffix="s"
              decimals={1}
              label="Carga Promedio Web"
              isPurple
            />
            <MetricCard
              value={10}
              prefix="+"
              suffix="k hr"
              decimals={0}
              label="Procesos Automatizados"
            />
            <MetricCard
              value={100}
              suffix="%"
              decimals={0}
              label="Agentes OpenClaw / Hermes"
              isPurple
            />
          </div>
        </section>

        {/* Continuous Animated Marquee Banner */}
        <MarqueeBanner />

        {/* Services Showcase */}
        <section className="space-y-8" id="services-section">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <Title3D
              align="left"
              badge="Nuestros Servicios Principales"
              subtitle="Selecciona el botón + Agregar al Plan en cada tarjeta para sumar o quitar componentes en tu presupuesto en tiempo real."
            >
              Servicios Tecnológicos de Alto Nivel
            </Title3D>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesData.map((svc) => (
              <ServiceCard
                key={svc.id}
                service={svc}
                onSelect={(id) => setSelectedServiceDetail(svc)}
                isSelectedForScope={selectedServices.includes(svc.id)}
                onToggleScope={handleToggleScopeFromCard}
              />
            ))}
          </div>
        </section>

        {/* Dynamic Project Planner Section */}
        <section 
          id="planner-section"
          className="liquid-glass p-6 md:p-10 relative overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.8)]"
        >
          {/* Visual Grid Deco */}
          <div className="absolute top-0 right-0 -z-10 h-72 w-72 bg-[#a855f7]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Planner Left: Options Selector */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-mono text-[#c084fc] uppercase tracking-widest font-bold block">Configurador Inteligente</span>
                <h3 className="text-2xl font-bold text-white font-display mt-1">Planifica tu Arquitectura</h3>
                <p className="text-xs text-gray-300 mt-1">Ajusta los parámetros para obtener un estimado dinámico del alcance de tu proyecto.</p>
              </div>

              {/* Step 1: Services Selection */}
              <div className="space-y-3">
                <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider block">
                  Paso 1: Selecciona las áreas a integrar ({selectedServices.length} seleccionadas)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {servicesData.map((svc) => {
                    const isSelected = selectedServices.includes(svc.id);
                    return (
                      <button
                        key={svc.id}
                        id={`planner-svc-toggle-${svc.id}`}
                        onClick={() => handleToggleServiceInPlanner(svc.id)}
                        className={`cursor-pointer flex items-center justify-between rounded-xl border p-3.5 text-left transition-all ${
                          isSelected
                            ? "bg-gradient-to-r from-[#a855f7]/30 to-[#7e22ce]/20 border-white/40 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_0_15px_rgba(168,85,247,0.3)]"
                            : "liquid-glass-pill text-gray-300 hover:border-white/30 hover:text-white"
                        }`}
                      >
                        <span className="text-xs font-semibold truncate pr-2">{svc.title}</span>
                        <div className={`h-5 w-5 shrink-0 rounded-full border flex items-center justify-center transition-all ${
                          isSelected ? "bg-[#a855f7] border-white text-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" : "border-gray-500 bg-transparent"
                        }`}>
                          {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Project Scale */}
              <div className="space-y-3">
                <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider block">
                  Paso 2: Define la escala de tu organización
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {(["startup", "growth", "enterprise"] as const).map((scale) => (
                    <button
                      key={scale}
                      id={`planner-scale-${scale}`}
                      onClick={() => setProjectScale(scale)}
                      className={`cursor-pointer rounded-xl border py-3 text-center transition-all ${
                        projectScale === scale
                          ? "bg-gradient-to-r from-[#a855f7] to-[#7e22ce] border-white/50 text-white font-bold shadow-[inset_0_1px_1px_rgba(255,255,255,0.6),0_0_20px_rgba(168,85,247,0.5)]"
                          : "liquid-glass-pill text-gray-400 hover:border-white/30 hover:text-white"
                      }`}
                    >
                      <span className="block text-xs uppercase tracking-wider">{scale}</span>
                      <span className="text-[9px] block opacity-80 mt-0.5">
                        {scale === "startup" ? "MVP / Inicial" : scale === "growth" ? "Escala Media" : "Corporativo"}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Delivery Speed */}
              <div className="space-y-3">
                <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider block">
                  Paso 3: Plazo y Prioridad de Entrega
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {(["urgent", "standard", "flexible"] as const).map((timeline) => (
                    <button
                      key={timeline}
                      id={`planner-timeline-${timeline}`}
                      onClick={() => setProjectTimeline(timeline)}
                      className={`cursor-pointer rounded-xl border py-3 text-center transition-all ${
                        projectTimeline === timeline
                          ? "bg-[#a855f7]/30 border-white/40 text-[#c084fc] font-bold shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]"
                          : "liquid-glass-pill text-gray-400 hover:border-white/30 hover:text-white"
                      }`}
                    >
                      <span className="block text-xs uppercase tracking-wider">{timeline === "urgent" ? "Urgente" : timeline === "standard" ? "Estándar" : "Flexible"}</span>
                      <span className="text-[9px] block text-gray-400 mt-0.5">
                        {timeline === "urgent" ? "+25% Sello Fast" : timeline === "standard" ? "Plazo Normal" : "-10% Flex-Fee"}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Planner Right: Dynamic Invoice Estimate */}
            <div className="lg:col-span-5 liquid-glass p-6 flex flex-col justify-between space-y-6 border-white/20">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-gray-300">PROPUESTA DE ESTIMACIÓN</span>
                  <Terminal className="h-4 w-4 text-[#c084fc]" />
                </div>
                <h4 className="text-lg font-bold text-white mt-1">Presupuesto Referencial</h4>
                <p className="text-xs text-gray-300">Basado en tu configuración de servicios NOVA group seleccionados.</p>
              </div>

              {/* Dynamic Prices */}
              <div className="space-y-4">
                <div className="bg-[#0d031b]/90 rounded-xl p-4 border border-[#a855f7]/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]">
                  <div className="text-xs text-gray-400 font-medium">Rango Estimado Inversión:</div>
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 mt-1.5">
                    <span className="text-2xl sm:text-3xl font-bold text-[#c084fc] font-mono tracking-tight drop-shadow-[0_0_10px_rgba(168,85,247,0.5)] whitespace-nowrap">
                      {priceMin}
                    </span>
                    <span className="text-xs text-gray-400 font-mono">a</span>
                    <span className="text-xl sm:text-2xl font-semibold text-gray-100 font-mono whitespace-nowrap">
                      {priceMax}
                    </span>
                    <span className="text-[10px] text-gray-400 uppercase font-mono tracking-wider">USD</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#0d031b]/80 rounded-xl p-3 border border-white/10">
                    <span className="block text-[10px] text-gray-400">Plazo Recomendado:</span>
                    <span className="text-sm font-semibold text-white font-mono mt-0.5 block">
                      {weeksMin} a {weeksMax} Semanas
                    </span>
                  </div>
                  <div className="bg-[#0d031b]/80 rounded-xl p-3 border border-white/10">
                    <span className="block text-[10px] text-gray-400">Garantía Incluida:</span>
                    <span className="text-sm font-semibold text-white mt-0.5 block">
                      30 Días Completos
                    </span>
                  </div>
                </div>
              </div>

              {/* Mini Itemizer summary */}
              <div className="space-y-2">
                <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest block">Ítems Planificados:</span>
                <div className="space-y-1 max-h-24 overflow-y-auto pr-1">
                  {selectedServices.map((id) => {
                    const svc = servicesData.find((s) => s.id === id);
                    return (
                      <div key={id} className="flex items-center justify-between text-xs text-gray-300 py-1 border-b border-white/5">
                        <span className="truncate pr-4">• {svc?.title}</span>
                        <span className="font-mono text-white shrink-0">{svc?.startingPrice}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Synergize with AI button */}
              <button
                id="btn-planner-synergize"
                onClick={() => setIsAdvisorOpen(true)}
                className="cursor-pointer w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#a855f7] to-[#7e22ce] hover:from-[#b866ff] hover:to-[#8e2ce0] text-white py-3.5 text-xs font-extrabold transition-all shadow-[inset_0_1px_1px_rgba(255,255,255,0.6),0_0_20px_rgba(168,85,247,0.5)] border border-white/30 active:scale-95"
              >
                <Sparkles className="h-4 w-4" />
                <span>Analizar Estructura con NOVA group Advisor</span>
              </button>
            </div>

          </div>
        </section>

        {/* AI & Digital Ecosystem Section (Planet 3D Showcase) */}
        <section className="relative overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-[#1b0736]/90 via-[#120427]/95 to-[#0b0118]/95 p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.2)]" id="ecosystem-section">
          <div className="absolute top-0 right-1/4 -z-10 h-72 w-72 rounded-full bg-[#a855f7]/20 blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-10 -z-10 h-64 w-64 rounded-full bg-[#38bdf8]/15 blur-[90px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Narrative & Key Highlights */}
            <div className="lg:col-span-7 space-y-6">
              <Title3D
                align="left"
                badge="Núcleo de Inteligencia Autónomo"
                subtitle="Interconectamos agentes cognitivos, e-commerce elástico y flujos cloud en un ecosistema centralizado capaz de operar 24/7 sin interrupciones."
              >
                Ecosistema Tecnológico Unificado
              </Title3D>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#c084fc] font-mono mb-1">
                    <span className="h-2 w-2 rounded-full bg-[#c084fc] animate-pulse" />
                    <span>OpenClaw Core</span>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Motor multimodular de procesamiento inteligente para automatizaciones de misión crítica.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#38bdf8] font-mono mb-1">
                    <span className="h-2 w-2 rounded-full bg-[#38bdf8] animate-pulse" />
                    <span>Hermes Agent</span>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Agente de ejecución orquestada con capacidades de integración API en tiempo real.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  id="btn-ecosystem-advisor"
                  onClick={() => setIsAdvisorOpen(true)}
                  className="cursor-pointer flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#a855f7] to-[#7e22ce] hover:from-[#b866ff] hover:to-[#8e2ce0] text-white px-5 py-3 text-xs font-extrabold transition-all shadow-[inset_0_1px_1px_rgba(255,255,255,0.6),0_0_25px_rgba(168,85,247,0.5)] border border-white/30 active:scale-95"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Consultar Integración de Ecosistema</span>
                </button>
              </div>
            </div>

            {/* Right Column: Interactive 3D Holographic Planet */}
            <div className="lg:col-span-5 flex justify-center items-center relative py-4 lg:py-0">
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="transform-gpu"
              >
                <Planet3D size={320} />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Tech Stack Segment */}
        <section className="space-y-6" id="tech-section">
          <Title3D
            badge="Infraestructura & Lenguajes"
            subtitle="Sistemas elásticos, integración nativa con OpenClaw y Hermes Agent de alta eficiencia."
          >
            Estándares Técnicos Modernos
          </Title3D>

          <TechStackExplorer />
        </section>

        {/* Client Success Testimonials */}
        <section className="space-y-8" id="testimonials-section">
          <Title3D
            badge="Casos de Uso Reales"
            subtitle="Clientes líderes de la industria que aceleraron su digitalización."
          >
            Confían en NOVA group
          </Title3D>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 [perspective:1000px]">
            {testimonialsData.map((test, idx) => (
              <motion.div 
                key={test.id}
                id={`testimonial-${test.id}`}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: "easeOut" }}
                className="liquid-glass-interactive rounded-2xl p-6 flex flex-col justify-between space-y-4 border-white/20"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-[#c084fc] text-[#c084fc]" />
                    ))}
                  </div>
                  <p className="text-xs text-gray-200 italic leading-relaxed">
                    "{test.content}"
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-[#a855f7]/20 border border-[#a855f7]/30 flex items-center justify-center font-bold text-xs text-[#c084fc]">
                    {test.name.charAt(0)}
                  </div>
                  <div>
                    <h5 className="text-xs font-semibold text-white">{test.name}</h5>
                    <p className="text-[10px] text-gray-400">{test.role}, <span className="text-[#c084fc]">{test.company}</span></p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="space-y-8 max-w-3xl mx-auto" id="faqs-section">
          <Title3D
            badge="Respuestas Técnicas"
          >
            Preguntas Frecuentes
          </Title3D>

          <div className="space-y-3">
            {faqsData.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div 
                  key={index} 
                  id={`faq-item-${index}`}
                  className="rounded-xl border border-white/10 bg-[#140628]/80 overflow-hidden transition-all"
                >
                  <button
                    id={`faq-btn-${index}`}
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="cursor-pointer w-full flex items-center justify-between p-4 text-left text-xs md:text-sm font-semibold text-white hover:bg-white/5 transition-all"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180 text-[#c084fc]" : ""}`} />
                  </button>
                  
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="p-4 pt-0 text-xs text-gray-300 border-t border-white/5 leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="relative border-t border-white/10 bg-[#0d031b] pt-24 pb-28 md:pb-12 overflow-hidden mt-24">
        {/* Huge typographic background watermark */}
        <div className="absolute left-6 md:left-12 top-4 md:top-8 -z-10 flex select-none pointer-events-none">
          <span className="font-display font-black text-[18vw] leading-none uppercase tracking-tighter text-white/[0.03]">
            NOVA GROUP
          </span>
        </div>
        {/* Soft elegant purple spotlight glow */}
        <div className="absolute top-0 left-12 md:left-24 -z-20 h-[350px] w-[350px] rounded-full bg-[#a855f7]/15 blur-[90px] pointer-events-none opacity-80" />

        <div className="mx-auto max-w-[1180px] px-6 relative">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 text-left">
            
            {/* Column 1: Logo & Tagline */}
            <div className="md:col-span-5 space-y-6">
              <div className="flex items-center gap-2.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#a855f7] shadow-[0_0_20px_rgba(168,85,247,0.5)]">
                  <span className="font-display text-xl font-black text-white tracking-tight">N</span>
                </div>
                <div>
                  <span className="font-display text-2xl font-bold tracking-tight text-white">NOVA group</span>
                  <span className="block text-[9px] text-[#c084fc] tracking-widest uppercase font-mono font-bold mt-[-2px]">
                    AI & TECHNOLOGY
                  </span>
                </div>
              </div>
              <p className="text-gray-400 text-sm max-w-sm leading-relaxed">
                Ingeniería digital de alto impacto. Creamos experiencias web y agentes de inteligencia artificial que posicionan marcas en otro nivel.
              </p>
            </div>

            {/* Column 2: Explorar links */}
            <div className="md:col-span-3 space-y-4">
              <h4 className="text-xs font-mono text-[#c084fc] uppercase tracking-wider font-bold">
                Explorar
              </h4>
              <ul className="space-y-2.5 text-sm text-gray-400">
                <li><a href="#services-section" className="hover:text-white transition-colors">Inicio</a></li>
                <li><a href="#testimonials-section" className="hover:text-white transition-colors">Nosotros</a></li>
                <li><a href="#planner-section" className="hover:text-white transition-colors">Servicios</a></li>
                <li><a href="#tech-section" className="hover:text-white transition-colors">Stack Tecnológico</a></li>
              </ul>
            </div>

            {/* Column 3: Hablemos contact info */}
            <div className="md:col-span-4 space-y-4">
              <h4 className="text-xs font-mono text-[#c084fc] uppercase tracking-wider font-bold">
                Hablemos
              </h4>
              <div className="text-xl md:text-2xl font-bold text-white tracking-tight font-display hover:text-[#c084fc] transition-colors cursor-pointer">
                +57 320 629 2231
              </div>
              <div className="flex gap-4 text-xs font-mono text-gray-400">
                <a href="#" className="hover:text-[#c084fc] transition-colors">FACEBOOK</a>
                <a href="#" className="hover:text-[#c084fc] transition-colors">INSTAGRAM</a>
              </div>
            </div>

          </div>

          {/* Bottom Copyright & Credits info */}
          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-400 font-mono">
            <div>
              © {new Date().getFullYear()} NOVA group. Todos los derechos reservados.
            </div>
            <div className="flex gap-4">
              <span>Diseño Baliza Style</span>
              <span>•</span>
              <span>OpenClaw & Hermes Agent</span>
              <span>•</span>
              <span>SEO</span>
            </div>
          </div>
        </div>
      </footer>

      </div>  {/* Cierre de <div className="relative overflow-x-clip"> de contenido principal */}
    </div>
  );
}
