import { useRef, ComponentType, MouseEvent as ReactMouseEvent } from "react";
import { Service } from "../types";
import { Cpu, ShoppingBag, Cloud, BarChart3, Palette, ArrowRight, Check, Clock, DollarSign, TrendingUp, Megaphone, LucideProps } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

interface ServiceCardProps {
  service: Service;
  onSelect: (serviceId: string) => void;
  isSelectedForScope: boolean;
  onToggleScope: (e: ReactMouseEvent, serviceId: string) => void;
}

const iconMap: Record<string, ComponentType<LucideProps>> = {
  Cpu: Cpu,
  ShoppingBag: ShoppingBag,
  Cloud: Cloud,
  BarChart3: BarChart3,
  Palette: Palette,
  TrendingUp: TrendingUp,
  Megaphone: Megaphone,
};

export default function ServiceCard({
  service,
  onSelect,
  isSelectedForScope,
  onToggleScope,
}: ServiceCardProps) {
  const IconComponent = iconMap[service.iconName] || Cpu;

  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 120, damping: 18 });
  const mouseYSpring = useSpring(y, { stiffness: 120, damping: 18 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    if (window.matchMedia && !window.matchMedia("(pointer: fine)").matches) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="[perspective:1000px] h-full">
      <motion.div
        ref={cardRef}
        layoutId={`card-${service.id}`}
        id={`card-${service.id}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`liquid-glass-interactive relative flex flex-col justify-between overflow-hidden p-6 shadow-2xl h-full transition-shadow duration-300 ${
          isSelectedForScope
            ? "border-white/40 bg-gradient-to-br from-[#a855f7]/30 via-[#1c0a33]/80 to-[#140628]/95 shadow-[inset_0_1px_2px_rgba(255,255,255,0.4),0_0_35px_rgba(168,85,247,0.35)]"
            : ""
        }`}
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-60" />

        <div
          className="absolute top-0 left-6 h-[2px] w-12 bg-gradient-to-r from-white via-[#c084fc] to-[#a855f7] shadow-[0_0_12px_rgba(255,255,255,0.8)] rounded-full transition-all duration-300 z-10"
        />

        <div className="absolute -top-12 -right-12 -z-10 h-32 w-32 rounded-full bg-gradient-to-br from-[#a855f7]/20 to-transparent blur-2xl" />

        <div className="[transform:translateZ(20px)]">
          <div className="flex items-start justify-between mt-1">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#a855f7]/15 text-[#c084fc] border border-[#a855f7]/30 shadow-[0_0_15px_rgba(168,85,247,0.25)]">
              <IconComponent className="h-6 w-6" id={`icon-${service.id}`} />
            </div>

            <button
              id={`btn-scope-toggle-${service.id}`}
              onClick={(e) => onToggleScope(e, service.id)}
              className={`cursor-pointer flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-semibold transition-all ${
                isSelectedForScope
                  ? "bg-[#a855f7] text-white font-bold shadow-[0_0_16px_rgba(168,85,247,0.6)]"
                  : "bg-white/5 border border-white/10 text-gray-300 hover:border-[#a855f7]/50 hover:text-white"
              }`}
            >
              {isSelectedForScope ? (
                <>
                  <Check className="h-3 w-3 stroke-[3]" />
                  <span>En tu Plan</span>
                </>
              ) : (
                <>
                  <span className="text-sm font-bold">+</span>
                  <span>Agregar</span>
                </>
              )}
            </button>
          </div>

          <h3 className="mt-4 text-xl font-bold text-white tracking-tight font-display">
            {service.title}
          </h3>

          <p className="mt-2 text-xs text-gray-300 leading-relaxed line-clamp-3">
            {service.shortDescription}
          </p>

          <ul className="mt-4 space-y-2 text-xs text-gray-300">
            {service.features.slice(0, 3).map((feat, index) => (
              <li key={index} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#a855f7] shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                <span className="truncate">{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 pt-4 border-t border-white/10 [transform:translateZ(10px)]">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3 text-[#c084fc]" />
              <span>{service.timeline}</span>
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="h-3 w-3 text-[#c084fc]" />
              <span className="font-mono text-white font-semibold">Desde {service.startingPrice}</span>
            </div>
          </div>

          <button
            id={`btn-details-${service.id}`}
            onClick={() => onSelect(service.id)}
            className="cursor-pointer mt-4 flex w-full items-center justify-center gap-1.5 rounded-xl bg-white/5 py-2.5 text-xs font-semibold text-white border border-white/10 hover:bg-[#a855f7]/20 hover:border-[#a855f7]/50 transition-all shadow-sm"
          >
            <span>Ver Ficha Técnica</span>
            <ArrowRight className="h-3.5 w-3.5 text-[#c084fc]" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
