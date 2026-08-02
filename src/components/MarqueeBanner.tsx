

const items = [
  "SISTEMAS AUTÓNOMOS IA",
  "OPENCLAW FRAMEWORK",
  "HERMES AGENT",
  "DESARROLLO WEB PRO",
  "SEO PROGRAMÁTICO",
  "AUTOMATIZACIONES DE ÉLITE",
  "ARQUITECTURA CLOUD",
  "RAG & MODELOS LLM",
];

export default function MarqueeBanner() {
  const repeatedItems = [...items, ...items, ...items, ...items];

  return (
    <div className="relative overflow-hidden py-6 border-y border-white/10 bg-gradient-to-r from-[#1c0a33]/40 via-[#140628]/60 to-[#1c0a33]/40 backdrop-blur-sm select-none my-12">
      {/* Top subtle glow line */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#a855f7]/60 to-transparent shadow-[0_0_12px_rgba(168,85,247,0.5)]" />

      <div className="flex w-max animate-marquee">
        {repeatedItems.map((item, idx) => (
          <div key={idx} className="flex items-center gap-6 px-4">
            <span
              className={`font-display text-2xl md:text-4xl font-bold tracking-tight whitespace-nowrap ${
                idx % 2 === 0
                  ? "text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.7)]"
                  : "text-[#c084fc] drop-shadow-[0_0_12px_rgba(168,85,247,0.5)]"
              }`}
            >
              {item}
            </span>
            <span className="h-2.5 w-2.5 rounded-full bg-[#a855f7] shadow-[0_0_14px_2px_rgba(168,85,247,0.8)] animate-pulse shrink-0" />
          </div>
        ))}
      </div>

      {/* Bottom subtle glow line */}
      <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#a855f7]/30 to-transparent" />
    </div>
  );
}
