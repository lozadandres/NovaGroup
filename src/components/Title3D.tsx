import { useRef, ReactNode } from "react";
import { motion, useInView } from "motion/react";

interface Title3DProps {
  children: ReactNode;
  subtitle?: string;
  badge?: string;
  className?: string;
  align?: "left" | "center";
  id?: string;
}

export default function Title3D({
  children,
  subtitle,
  badge,
  className = "",
  align = "center",
  id,
}: Title3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  const alignStyles =
    align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <div
      ref={ref}
      id={id}
      className={`flex flex-col ${alignStyles} ${className} [perspective:1000px]`}
    >
      {badge && (
        <motion.div
          initial={{ opacity: 0, y: 20, rotateX: 30, scale: 0.9 }}
          animate={
            isInView
              ? { opacity: 1, y: 0, rotateX: 0, scale: 1 }
              : { opacity: 0, y: 20, rotateX: 30, scale: 0.9 }
          }
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 rounded-full liquid-glass-pill px-4 py-1.5 text-xs font-mono font-medium text-[#c084fc] shadow-[0_0_20px_rgba(168,85,247,0.3)] mb-3"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#c084fc] animate-ping" />
          <span>{badge}</span>
        </motion.div>
      )}

      {/* 3D Title Rotation Entry */}
      <motion.h2
        initial={{
          opacity: 0,
          y: 35,
          rotateX: 35,
          rotateY: align === "center" ? 0 : -5,
          scale: 0.95,
        }}
        animate={
          isInView
            ? { opacity: 1, y: 0, rotateX: 0, rotateY: 0, scale: 1 }
            : {
                opacity: 0,
                y: 35,
                rotateX: 35,
                rotateY: align === "center" ? 0 : -5,
                scale: 0.95,
              }
        }
        transition={{
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1],
          delay: 0.1,
        }}
        className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] [transform-style:preserve-3d]"
      >
        {children}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20, rotateX: 20 }}
          animate={
            isInView
              ? { opacity: 1, y: 0, rotateX: 0 }
              : { opacity: 0, y: 20, rotateX: 20 }
          }
          transition={{
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
            delay: 0.25,
          }}
          className="mt-3 text-sm sm:text-base text-gray-300 max-w-2xl leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
