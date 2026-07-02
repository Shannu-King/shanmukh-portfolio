import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
}

export function ParticleConstellation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = document.documentElement.scrollHeight;

    function resize() {
      width = window.innerWidth;
      height = document.documentElement.scrollHeight;
      canvas!.width = width;
      canvas!.height = height;
    }
    resize();

    // Create particles
    const count = Math.min(Math.floor((width * height) / 18000), 120);
    const particles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }
    particlesRef.current = particles;

    const connectionDistance = 120;
    const mouseRadius = 180;

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      const scrollY = window.scrollY;
      const viewTop = scrollY;
      const viewBottom = scrollY + window.innerHeight;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y + scrollY;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Only render particles near the viewport (with buffer)
        const buffer = 200;
        if (p.y < viewTop - buffer || p.y > viewBottom + buffer) continue;

        // Mouse interaction — gently push particles away
        const dxm = p.x - mx;
        const dym = p.y - my;
        const distMouse = Math.sqrt(dxm * dxm + dym * dym);
        if (distMouse < mouseRadius && distMouse > 0) {
          const force = (mouseRadius - distMouse) / mouseRadius;
          p.vx += (dxm / distMouse) * force * 0.02;
          p.vy += (dym / distMouse) * force * 0.02;
        }

        // Dampen velocity
        p.vx *= 0.999;
        p.vy *= 0.999;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(130, 200, 255, ${p.opacity})`;
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          if (q.y < viewTop - buffer || q.y > viewBottom + buffer) continue;
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance) * 0.15;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(130, 200, 255, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        // Connect to mouse if close enough
        if (distMouse < mouseRadius) {
          const alpha = (1 - distMouse / mouseRadius) * 0.25;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mx, my);
          ctx.strokeStyle = `rgba(100, 220, 255, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      animFrameRef.current = requestAnimationFrame(draw);
    }

    function handleMouseMove(e: MouseEvent) {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    }
    function handleMouseLeave() {
      mouseRef.current = { x: -1000, y: -1000 };
    }

    // Resize observer for dynamic height changes
    const resizeObserver = new ResizeObserver(() => resize());
    resizeObserver.observe(document.body);

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    animFrameRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      style={{ opacity: 0.6 }}
      aria-hidden="true"
    />
  );
}
