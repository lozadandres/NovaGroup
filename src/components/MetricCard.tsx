import { useEffect, useRef, useState } from "react";
import { motion, useInView, useSpring } from "motion/react";

interface MetricCardProps {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
  isPurple?: boolean;
}

export default function MetricCard({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  label,
  isPurple = false,
}: MetricCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [displayValue, setDisplayValue] = useState<string>(
    (0).toFixed(decimals)
  );

  // Spring physics for smooth counter
  const springValue = useSpring(0, {
    stiffness: 60,
    damping: 20,
    restDelta: 0.01,
  });

  useEffect(() => {
    if (isInView) {
      springValue.set(value);
    }
  }, [isInView, springValue, value]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      setDisplayValue(latest.toFixed(decimals));
    });
    return () => unsubscribe();
  }, [springValue, decimals]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="p-4 liquid-glass-interactive relative group overflow-hidden"
    >
      {/* Subtle liquid sheen highlight on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <span
        className={`block text-2xl sm:text-3xl font-bold font-display tracking-tight ${
          isPurple
            ? "text-[#c084fc] drop-shadow-[0_0_12px_rgba(192,132,252,0.4)]"
            : "text-white"
        }`}
      >
        {prefix}
        {displayValue}
        {suffix}
      </span>
      <span className="text-xs text-gray-400 font-medium mt-1 block">
        {label}
      </span>
    </motion.div>
  );
}
