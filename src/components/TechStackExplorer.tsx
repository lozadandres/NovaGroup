import { useState } from "react";
import { techStackData } from "../data";
import { TechStackItem } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { Cpu, Server, Layout, Cloud, ShieldAlert, Award } from "lucide-react";

export default function TechStackExplorer() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", name: "Todos" },
    { id: "ai", name: "IA & Agentes" },
    { id: "backend", name: "Backend & DB" },
    { id: "frontend", name: "Frontend" },
    { id: "cloud", name: "Cloud & Ops" },
  ];

  const filteredItems = selectedCategory === "all"
    ? techStackData
    : techStackData.filter(item => item.category === selectedCategory);

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case "ai": return <Cpu className="h-4 w-4" />;
      case "backend": return <Server className="h-4 w-4" />;
      case "frontend": return <Layout className="h-4 w-4" />;
      case "cloud": return <Cloud className="h-4 w-4" />;
      default: return <Award className="h-4 w-4" />;
    }
  };

  return (
    <div className="w-full liquid-glass p-6 md:p-8 relative overflow-hidden shadow-2xl border-white/20" id="tech-explorer">
      {/* Top accent beam */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/70 to-transparent shadow-[0_0_12px_rgba(255,255,255,0.6)]" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h3 className="text-xl font-bold text-white font-display">Stack Tecnológico & Agentes NOVA group</h3>
          <p className="text-xs text-gray-300 mt-1">Ecosistema técnico integrado de alta disponibilidad, OpenClaw y Hermes Agent.</p>
        </div>
        
        {/* Horizontal Navigation Filter */}
        <div className="flex flex-wrap gap-1.5 rounded-xl bg-black/40 p-1.5 border border-white/15 backdrop-blur-md">
          {categories.map((cat) => (
            <button
              key={cat.id}
              id={`tab-tech-${cat.id}`}
              onClick={() => setSelectedCategory(cat.id)}
              className={`cursor-pointer rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                selectedCategory === cat.id
                  ? "bg-gradient-to-r from-[#a855f7] to-[#7e22ce] text-white font-bold shadow-[inset_0_1px_1px_rgba(255,255,255,0.6),0_0_12px_rgba(168,85,247,0.5)] border border-white/30"
                  : "text-gray-300 hover:text-white hover:bg-white/5"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Tech Items */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item: TechStackItem) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              key={item.name}
              id={`tech-card-${item.name.replace(/\s+/g, '-').toLowerCase()}`}
              className="liquid-glass-interactive flex items-start gap-3 p-4 border-white/15 hover:border-white/40"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#a855f7]/30 to-[#7e22ce]/20 text-white border border-white/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]">
                {getCategoryIcon(item.category)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold text-sm text-gray-100 truncate">{item.name}</span>
                  <span className={`shrink-0 rounded-full px-2 py-0.5 text-[9px] font-mono tracking-wider uppercase font-bold ${
                    item.level === "expert"
                      ? "liquid-glass-pill text-[#c084fc]"
                      : "bg-purple-500/10 text-purple-300 border border-purple-500/20"
                  }`}>
                    {item.level}
                  </span>
                </div>
                <p className="text-xs text-gray-300 mt-1 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-6 flex items-center gap-2 rounded-xl liquid-glass-pill p-4 text-xs text-gray-200">
        <ShieldAlert className="h-4 w-4 text-[#c084fc] shrink-0" />
        <span>Garantizamos total adherencia a estándares de seguridad (OWASP Top 10), aislamiento sandbox para agentes OpenClaw / Hermes Agent y compliance industrial.</span>
      </div>
    </div>
  );
}
