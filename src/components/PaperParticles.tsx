import { useEffect, useRef } from "react";

interface PaperParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
  radiusX: number;
  radiusY: number;
  color: string;      // Template like "rgba(165, 243, 252, alpha)"
  glowColor: string;  // e.g. "#67e8f9"
  opacity: number;
  rotation: number;
  rotationSpeed: number;
  pitch: number;
  pitchSpeed: number;
  roll: number;
  rollSpeed: number;
  glowAmount: number; // 0 (no glow) to 1 (full glow)
}

export function PaperParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const scrollRef = useRef({ lastY: 0, deltaY: 0 });
  const particlesRef = useRef<PaperParticle[]>([]);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    function resize() {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    }
    resize();

    // Color definitions matching the theme palette
    const colors = [
      { color: "rgba(255, 255, 255, alpha)", glowColor: "rgba(255, 255, 255, 0.8)" },       // White
      { color: "rgba(165, 243, 252, alpha)", glowColor: "rgba(34, 211, 238, 0.8)" },       // Cyan
      { color: "rgba(216, 180, 254, alpha)", glowColor: "rgba(192, 132, 252, 0.8)" },      // Purple
      { color: "rgba(191, 219, 254, alpha)", glowColor: "rgba(96, 165, 250, 0.8)" },       // Blue
      { color: "rgba(254, 205, 211, alpha)", glowColor: "rgba(251, 113, 133, 0.8)" },      // Pink
    ];

    // Create paper particles
    // Densier on larger screens, capped at 45 particles for performance (reduced by 30% for cleaner look)
    const count = Math.min(Math.floor((width * height) / 31000), 45);
    const particles: PaperParticle[] = [];

    for (let i = 0; i < count; i++) {
      const baseSize = Math.random() * 4 + 4; // base size (half-width) 4 to 8px
      const isSquare = Math.random() > 0.5;
      const radiusX = baseSize;
      const radiusY = isSquare ? baseSize : baseSize * (Math.random() * 0.6 + 1.2); // rectangle is longer
      const baseVx = (Math.random() - 0.5) * 0.4;
      const baseVy = Math.random() * 0.5 + 0.3; // drift down
      const colorScheme = colors[Math.floor(Math.random() * colors.length)];

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: baseVx,
        vy: baseVy,
        baseVx,
        baseVy,
        radiusX,
        radiusY,
        color: colorScheme.color,
        glowColor: colorScheme.glowColor,
        opacity: Math.random() * 0.25 + 0.25, // 0.25 to 0.50 base opacity
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        pitch: Math.random() * Math.PI * 2,
        pitchSpeed: Math.random() * 0.03 + 0.01,
        roll: Math.random() * Math.PI * 2,
        rollSpeed: Math.random() * 0.03 + 0.01,
        glowAmount: 0,
      });
    }
    particlesRef.current = particles;

    const hoverRadius = 140;

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      // Handle scroll parallax force
      const scrollForce = scrollRef.current.deltaY * 0.15;
      // Decay scroll delta
      scrollRef.current.deltaY *= 0.9;

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Apply scroll drift
        p.y -= scrollForce;

        // Base physics updates
        p.x += p.vx;
        p.y += p.vy;

        // 3D tumbling rotation updates
        p.rotation += p.rotationSpeed;
        p.pitch += p.pitchSpeed;
        p.roll += p.rollSpeed;

        // Wrap around screen boundaries with safety margin
        const margin = 30;
        if (p.x < -margin) p.x = width + margin;
        if (p.x > width + margin) p.x = -margin;
        if (p.y < -margin) p.y = height + margin;
        if (p.y > height + margin) p.y = -margin;

        // Proximity calculation for hover glow
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < hoverRadius) {
          const ratio = (hoverRadius - dist) / hoverRadius; // 0 to 1
          // Smooth transition to glow
          p.glowAmount += (ratio - p.glowAmount) * 0.12;

          // Mouse influence: gently push away and add turbulence
          const pushForce = ratio * 0.35;
          p.vx += (dx / dist) * pushForce * 0.1;
          p.vy += (dy / dist) * pushForce * 0.1;
          p.rotationSpeed += (Math.random() - 0.5) * ratio * 0.01;
        } else {
          // Decelerate glow when not hovered
          p.glowAmount += (0 - p.glowAmount) * 0.06;

          // Restoring force to normal velocities
          p.vx += (p.baseVx - p.vx) * 0.03;
          p.vy += (p.baseVy - p.vy) * 0.03;
        }

        // Clip/damp velocities to prevent escape velocity
        const maxSpeed = 3;
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > maxSpeed) {
          p.vx = (p.vx / speed) * maxSpeed;
          p.vy = (p.vy / speed) * maxSpeed;
        }

        // Render logic
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        // 3D simulation by scaling the axes based on pitch & roll
        const scaleX = Math.cos(p.roll);
        const scaleY = Math.sin(p.pitch);
        // Avoid scaling to exactly zero to keep canvas happy
        const rx = Math.max(Math.abs(p.radiusX * scaleX), 0.5);
        const ry = Math.max(Math.abs(p.radiusY * scaleY), 0.5);

        // Determine opacity. Boost it when glowing.
        const currentOpacity = Math.min(p.opacity * (1 + p.glowAmount * 1.5), 0.95);

        // Set glow shadow styles ONLY if glowing to conserve GPU cycles
        if (p.glowAmount > 0.01) {
          ctx.shadowBlur = p.glowAmount * 16;
          ctx.shadowColor = p.glowColor;
        }

        // Draw the square/rectangular paper particle
        ctx.beginPath();
        ctx.rect(-rx, -ry, rx * 2, ry * 2);
        ctx.fillStyle = p.color.replace("alpha", currentOpacity.toFixed(3));
        ctx.fill();

        // 3D shading layer: if paper flips to its backside, draw a subtle shading overlay
        if (scaleX * scaleY < 0) {
          ctx.beginPath();
          ctx.rect(-rx, -ry, rx * 2, ry * 2);
          ctx.fillStyle = `rgba(0, 0, 0, ${0.12 * (1 - p.glowAmount * 0.5)})`; // Shading reduces when glowing
          ctx.fill();
        }

        // Draw a light center flare/sheen when glowing to look extra premium
        if (p.glowAmount > 0.1) {
          ctx.beginPath();
          ctx.rect(-rx * 0.4, -ry * 0.4, rx * 0.8, ry * 0.8);
          ctx.fillStyle = `rgba(255, 255, 255, ${p.glowAmount * 0.5})`;
          ctx.fill();
        }

        ctx.restore();
      }

      animFrameRef.current = requestAnimationFrame(draw);
    }

    function handleMouseMove(e: MouseEvent) {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    }

    function handleMouseLeave() {
      mouseRef.current = { x: -1000, y: -1000 };
    }

    function handleScroll() {
      const currentScrollY = window.scrollY;
      const diff = currentScrollY - scrollRef.current.lastY;
      scrollRef.current.deltaY += diff;
      scrollRef.current.lastY = currentScrollY;
    }

    // Set initial scroll value
    scrollRef.current.lastY = window.scrollY;

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("scroll", handleScroll, { passive: true });

    animFrameRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    />
  );
}
