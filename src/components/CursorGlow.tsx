import { useEffect, useRef } from "react";

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -200, y: -200 });
  const target = useRef({ x: -200, y: -200 });
  const frameRef = useRef<number>(0);

  useEffect(() => {
    function handleMouse(e: MouseEvent) {
      target.current = { x: e.clientX, y: e.clientY };
    }

    function animate() {
      // Smooth lerp for buttery follow
      pos.current.x += (target.current.x - pos.current.x) * 0.12;
      pos.current.y += (target.current.y - pos.current.y) * 0.12;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${pos.current.x - 200}px, ${pos.current.y - 200}px)`;
      }
      frameRef.current = requestAnimationFrame(animate);
    }

    window.addEventListener("mousemove", handleMouse);
    frameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouse);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed z-[1] hidden md:block"
      style={{
        width: 400,
        height: 400,
        borderRadius: "50%",
        background:
          "radial-gradient(circle, rgba(100,200,255,0.08) 0%, rgba(120,80,255,0.04) 40%, transparent 70%)",
        filter: "blur(2px)",
        willChange: "transform",
      }}
      aria-hidden="true"
    />
  );
}
