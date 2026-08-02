import { useRef, ComponentType } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { Cpu, Bot, Sparkles, Cloud, Zap, LucideProps } from "lucide-react";

interface Planet3DProps {
  size?: number;
  className?: string;
}

interface Satellite {
  label: string;
  icon: ComponentType<LucideProps>;
  angle: number;
  delay: number;
  color: string;
}

export default function Planet3D({ size = 320, className = "" }: Planet3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 90, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 90, damping: 20 });

  const rotateX = useTransform(springY, [-0.5, 0.5], ["18deg", "-18deg"]);
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-18deg", "18deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    if (window.matchMedia && !window.matchMedia("(pointer: fine)").matches) return;

    const rect = containerRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const satellites: Satellite[] = [
    { label: "OpenClaw AI", icon: Bot, angle: 0, delay: 0, color: "from-[#a855f7] to-[#c084fc]" },
    { label: "Hermes Agent", icon: Cpu, angle: 72, delay: 0.5, color: "from-[#38bdf8] to-[#818cf8]" },
    { label: "IA Cognitiva", icon: Sparkles, angle: 144, delay: 1, color: "from-[#f472b6] to-[#a855f7]" },
    { label: "Cloud Scale", icon: Cloud, angle: 216, delay: 1.5, color: "from-[#34d399] to-[#38bdf8]" },
    { label: "Automatización", icon: Zap, angle: 288, delay: 2, color: "from-[#fbbf24] to-[#f472b6]" },
  ];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative flex items-center justify-center [perspective:1200px] select-none ${className}`}
      style={{ width: size, height: size }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative flex items-center justify-center w-full h-full transform-gpu"
      >
        {/* Outer Glow Halo */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#a855f7]/30 via-[#c084fc]/15 to-transparent blur-[50px] animate-pulse-glow" />

        {/* Outer Orbital Ring 1 (Tilted X) */}
        <div className="absolute inset-[-40px] rounded-full border border-[#c084fc]/30 border-dashed animate-[spin_25s_linear_infinite] [transform:rotateX(70deg)_rotateY(-15deg)] pointer-events-none shadow-[0_0_20px_rgba(168,85,247,0.2)]" />

        {/* Outer Orbital Ring 2 (Tilted Opposite with glowing light dot) */}
        <div className="absolute inset-[-20px] rounded-full border border-white/20 [transform:rotateX(65deg)_rotateY(25deg)] pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-3 w-3 rounded-full bg-gradient-to-r from-white to-[#c084fc] shadow-[0_0_15px_#c084fc] animate-ping" />
        </div>

        {/* Planet Globe Sphere */}
        <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden shadow-[inset_-25px_-25px_50px_rgba(13,3,27,0.95),inset_10px_10px_30px_rgba(255,255,255,0.4),0_0_50px_rgba(168,85,247,0.5)] border border-white/30 bg-gradient-to-br from-[#2a084e] via-[#14052b] to-[#090114] flex items-center justify-center group [transform-style:preserve-3d]">
          
          {/* Holographic Texture Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(192,132,252,0.35),transparent_60%)] pointer-events-none" />

          {/* Animated SVG Grid Latitude/Longitude Lines */}
          <svg
            className="absolute inset-0 w-full h-full opacity-40 animate-[spin_30s_linear_infinite] mix-blend-screen"
            viewBox="0 0 200 200"
          >
            <defs>
              <linearGradient id="gridGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#a855f7" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#c084fc" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            {/* Latitude Circles */}
            <circle cx="100" cy="100" r="90" fill="none" stroke="url(#gridGrad)" strokeWidth="0.8" strokeDasharray="3 3" />
            <circle cx="100" cy="100" r="70" fill="none" stroke="url(#gridGrad)" strokeWidth="0.7" strokeDasharray="2 2" />
            <circle cx="100" cy="100" r="45" fill="none" stroke="url(#gridGrad)" strokeWidth="0.6" />
            {/* Longitude Ellipses */}
            <ellipse cx="100" cy="100" rx="90" ry="35" fill="none" stroke="url(#gridGrad)" strokeWidth="0.8" />
            <ellipse cx="100" cy="100" rx="35" ry="90" fill="none" stroke="url(#gridGrad)" strokeWidth="0.8" />
            <line x1="10" y1="100" x2="190" y2="100" stroke="url(#gridGrad)" strokeWidth="0.6" />
            <line x1="100" y1="10" x2="100" y2="190" stroke="url(#gridGrad)" strokeWidth="0.6" />
          </svg>

          {/* Core Glowing Emblem / Logo in Center of Planet */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center p-4 [transform:translateZ(30px)]">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#a855f7] to-[#7e22ce] shadow-[inset_0_1px_2px_rgba(255,255,255,0.8),0_0_25px_rgba(168,85,247,0.8)] border border-white/40 mb-1">
              <span className="font-display text-2xl font-black text-white tracking-tight">N</span>
            </div>
            <span className="font-display font-black text-xs tracking-wider text-white uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              NOVA PLANET
            </span>
            <span className="text-[8px] font-mono text-[#c084fc] font-semibold tracking-widest uppercase">
              AI CORE V3.0
            </span>
          </div>

          {/* Specular Liquid Light Flare */}
          <div className="absolute top-2 left-4 w-20 h-10 rounded-full bg-white/20 blur-sm rotate-[-30deg] pointer-events-none" />
        </div>

        {/* Orbiting Satellite Tech Badges */}
        {satellites.map((sat, i) => (
          <motion.div
            key={i}
            className="absolute z-20"
            animate={{
              rotate: [sat.angle, sat.angle + 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 [transform:translateZ(40px)]"
            >
              <motion.div
                animate={{
                  rotate: [-sat.angle, -(sat.angle + 360)],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className={`flex items-center gap-1.5 rounded-full bg-gradient-to-r ${sat.color} px-3 py-1 text-[10px] font-bold text-white shadow-[0_0_18px_rgba(168,85,247,0.5)] border border-white/30 backdrop-blur-md whitespace-nowrap`}
              >
                {(() => {
                  const SatIcon = sat.icon;
                  return <SatIcon className="h-3 w-3 stroke-[2.5]" />;
                })()}
                <span>{sat.label}</span>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
