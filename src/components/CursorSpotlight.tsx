import { useEffect, useRef } from "react";

export default function CursorSpotlight() {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -1000, y: -1000 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia && !window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    const updatePosition = () => {
      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0)`;
      }
      rafRef.current = null;
    };

    const handleMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(updatePosition);
      }
    };

    const handleMouseLeave = () => {
      posRef.current = { x: -1000, y: -1000 };
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(updatePosition);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 mix-blend-screen overflow-hidden">
      <div
        ref={spotlightRef}
        className="absolute rounded-full transition-opacity duration-300 pointer-events-none will-change-transform"
        style={{
          left: 0,
          top: 0,
          width: "600px",
          height: "600px",
          marginLeft: "-300px",
          marginTop: "-300px",
          background: "radial-gradient(closest-side, rgba(168, 85, 247, 0.22), rgba(168, 85, 247, 0.08) 45%, rgba(168, 85, 247, 0) 80%)",
          transform: "translate3d(-1000px, -1000px, 0)",
        }}
      />
    </div>
  );
}
