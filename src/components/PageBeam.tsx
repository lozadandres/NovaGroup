

export default function PageBeam() {
  return (
    <div className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-[300px] h-full z-0 mix-blend-screen overflow-hidden opacity-80">
      {/* Background rail line */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[1.5px] h-full bg-gradient-to-b from-transparent via-[#a855f7]/20 to-transparent" />

      {/* Travelling comet down the central rail */}
      <div className="absolute left-1/2 -translate-x-1/2 w-[240px] h-[340px] animate-comet">
        {/* Glow halo */}
        <div 
          className="absolute inset-0 rounded-full filter blur-xl animate-balPulse"
          style={{
            background: "radial-gradient(46% 40% at 50% 50%, rgba(168, 85, 247, 0.35), rgba(168, 85, 247, 0.08) 52%, rgba(168, 85, 247, 0) 74%)"
          }}
        />

        {/* Core beam vertical streak */}
        <div 
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[2.5px] h-[170px] rounded-full"
          style={{
            background: "linear-gradient(180deg, rgba(168, 85, 247, 0), rgba(255, 255, 255, 0.95) 42%, rgba(192, 132, 252, 0.9) 60%, rgba(168, 85, 247, 0))",
            boxShadow: "0 0 22px 5px rgba(168, 85, 247, 0.6)"
          }}
        />

        {/* Glowing intense core dot */}
        <div 
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white"
          style={{
            boxShadow: "0 0 28px 8px rgba(168, 85, 247, 0.9)"
          }}
        />
      </div>
    </div>
  );
}
