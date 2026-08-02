import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Home, Grid, Sliders, Cpu, Sparkles } from "lucide-react";

interface MobileBottomNavProps {
  onOpenAdvisor: () => void;
  isHidden?: boolean;
}

export default function MobileBottomNav({ onOpenAdvisor, isHidden = false }: MobileBottomNavProps) {
  const [activeTab, setActiveTab] = useState<string>("hero");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero-section", "services-section", "planner-section", "tech-section"];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveTab(sectionId.replace("-section", ""));
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "hero", label: "Inicio", href: "#hero-section", icon: Home },
    { id: "services", label: "Servicios", href: "#services-section", icon: Grid },
    { id: "planner", label: "Planificador", href: "#planner-section", icon: Sliders },
    { id: "tech", label: "Stack", href: "#tech-section", icon: Cpu },
  ];

  const navContent = (
    <div className={`fixed bottom-3 inset-x-0 z-50 px-3 md:hidden pointer-events-none transition-all duration-300 ${isHidden ? "translate-y-[120%] opacity-0" : "translate-y-0 opacity-100"}`}>
      <div className="mx-auto max-w-sm pointer-events-auto">
        <nav 
          className="relative flex items-center justify-between p-1.5 rounded-2xl bg-[#0d031b]/75 backdrop-blur-3xl border border-white/20 shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.45),inset_0_-1px_2px_rgba(0,0,0,0.6),0_20px_50px_rgba(0,0,0,0.85),0_0_30px_rgba(168,85,247,0.25)] overflow-hidden"
          aria-label="Navegación Móvil Bottom Nav"
        >
          {/* Top Liquid Specular Light Reflection Line */}
          <div className="absolute top-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-white/70 to-transparent pointer-events-none z-10" />

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setActiveTab(item.id)}
                className={`relative flex-1 flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all duration-300 active:scale-90 ${
                  isActive
                    ? "text-white font-bold"
                    : "text-gray-400 hover:text-gray-200"
                }`}
              >
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-[#a855f7]/20 to-[#140628]/80 rounded-xl border border-white/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.5),0_0_12px_rgba(168,85,247,0.4)] -z-10" />
                )}
                <Icon className={`h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 ${isActive ? "scale-110 text-[#c084fc]" : ""}`} />
                <span className="text-[10px] tracking-tight mt-1 font-mono font-medium whitespace-nowrap truncate max-w-full">
                  {item.label}
                </span>
              </a>
            );
          })}

          {/* AI Advisor Trigger Button */}
          <button
            id="btn-mobile-nav-advisor"
            onClick={onOpenAdvisor}
            className="cursor-pointer flex-1 flex flex-col items-center justify-center py-1.5 px-1 rounded-xl bg-gradient-to-br from-[#a855f7] via-[#9333ea] to-[#6b21a8] text-white border border-white/50 shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.7),0_0_20px_rgba(168,85,247,0.7)] active:scale-95 transition-all"
            title="Consultar IA NOVA group"
          >
            <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 animate-pulse text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.8)]" />
            <span className="text-[10px] tracking-tight mt-1 font-mono font-bold whitespace-nowrap truncate max-w-full text-white">
              IA Advisor
            </span>
          </button>
        </nav>
      </div>
    </div>
  );

  if (typeof document === "undefined") return null;
  return createPortal(navContent, document.body);
}
