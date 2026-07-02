import { useEffect, useRef } from "react";

/**
 * Aurora Borealis — flowing ribbons of light that shimmer across the background.
 * Reacts subtly to the mouse cursor position, shifting the wave origin.
 * Renders on a fixed canvas behind all content.
 */
export function AuroraBorealis() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 }); // normalised 0-1
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas!.width = width;
      canvas!.height = height;
    }
    resize();

    function handleMouse(e: MouseEvent) {
      mouseRef.current = {
        x: e.clientX / width,
        y: e.clientY / height,
      };
    }

    // ---------- Aurora ribbon config ----------
    interface Ribbon {
      baseY: number;       // vertical centre (0-1)
      amplitude: number;   // wave height
      frequency: number;   // wave tightness
      speed: number;       // animation speed
      thickness: number;   // ribbon thickness
      hue1: number;        // start hue
      hue2: number;        // end hue
      alpha: number;       // max opacity
      phase: number;       // phase offset
    }

    const ribbons: Ribbon[] = [
      { baseY: 0.22, amplitude: 60, frequency: 0.0025, speed: 0.0004, thickness: 180, hue1: 200, hue2: 260, alpha: 0.12, phase: 0 },
      { baseY: 0.35, amplitude: 80, frequency: 0.0018, speed: 0.0003, thickness: 220, hue1: 170, hue2: 220, alpha: 0.09, phase: 1.2 },
      { baseY: 0.28, amplitude: 50, frequency: 0.003,  speed: 0.0005, thickness: 140, hue1: 280, hue2: 320, alpha: 0.08, phase: 2.5 },
      { baseY: 0.45, amplitude: 70, frequency: 0.002,  speed: 0.00035, thickness: 200, hue1: 140, hue2: 190, alpha: 0.10, phase: 3.8 },
      { baseY: 0.18, amplitude: 40, frequency: 0.0035, speed: 0.00045, thickness: 120, hue1: 220, hue2: 300, alpha: 0.07, phase: 5.1 },
    ];

    let time = 0;

    function drawRibbon(r: Ribbon, t: number) {
      if (!ctx) return;

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Mouse influence: subtly shift the ribbon
      const mouseOffsetY = (my - 0.5) * 30;
      const mouseOffsetPhase = (mx - 0.5) * 0.5;

      const steps = Math.ceil(width / 3); // draw every 3px for smoothness

      // Create gradient along the ribbon
      const grad = ctx.createLinearGradient(0, 0, width, 0);
      grad.addColorStop(0, `hsla(${r.hue1}, 80%, 65%, 0)`);
      grad.addColorStop(0.15, `hsla(${r.hue1}, 80%, 65%, ${r.alpha})`);
      grad.addColorStop(0.5, `hsla(${(r.hue1 + r.hue2) / 2}, 85%, 70%, ${r.alpha * 1.3})`);
      grad.addColorStop(0.85, `hsla(${r.hue2}, 80%, 65%, ${r.alpha})`);
      grad.addColorStop(1, `hsla(${r.hue2}, 80%, 65%, 0)`);

      // Draw the ribbon as a filled shape between two wave paths
      ctx.beginPath();

      // Top edge of ribbon
      for (let i = 0; i <= steps; i++) {
        const x = (i / steps) * width;
        const normalX = x * r.frequency;
        const wave =
          Math.sin(normalX + t * r.speed * 1000 + r.phase + mouseOffsetPhase) *
          r.amplitude *
          (0.6 + 0.4 * Math.sin(normalX * 0.3 + t * r.speed * 400));
        const y = r.baseY * height + wave + mouseOffsetY - r.thickness / 2;

        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      // Bottom edge of ribbon (reverse direction)
      for (let i = steps; i >= 0; i--) {
        const x = (i / steps) * width;
        const normalX = x * r.frequency;
        const wave =
          Math.sin(normalX + t * r.speed * 1000 + r.phase + mouseOffsetPhase + 0.5) *
          r.amplitude *
          (0.6 + 0.4 * Math.sin(normalX * 0.3 + t * r.speed * 400 + 1));
        const y = r.baseY * height + wave + mouseOffsetY + r.thickness / 2;

        ctx.lineTo(x, y);
      }

      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();
    }

    // Add shimmer / vertical light rays
    function drawShimmer(t: number) {
      if (!ctx) return;
      const rayCount = 8;
      for (let i = 0; i < rayCount; i++) {
        const phase = i * (Math.PI * 2 / rayCount);
        const x = width * (0.1 + 0.8 * ((Math.sin(t * 0.0002 + phase) + 1) / 2));
        const alpha = 0.03 + 0.02 * Math.sin(t * 0.0005 + phase * 2);
        const rayWidth = 60 + 40 * Math.sin(t * 0.0003 + phase);

        const grad = ctx.createLinearGradient(x - rayWidth, 0, x + rayWidth, 0);
        grad.addColorStop(0, `rgba(100, 200, 255, 0)`);
        grad.addColorStop(0.5, `rgba(100, 200, 255, ${alpha})`);
        grad.addColorStop(1, `rgba(100, 200, 255, 0)`);

        ctx.fillStyle = grad;
        ctx.fillRect(x - rayWidth, 0, rayWidth * 2, height);
      }
    }

    function draw(timestamp: number) {
      time = timestamp;
      ctx!.clearRect(0, 0, width, height);

      // Draw shimmer rays first (behind ribbons)
      drawShimmer(time);

      // Draw each aurora ribbon
      for (const ribbon of ribbons) {
        drawRibbon(ribbon, time);
      }

      frameRef.current = requestAnimationFrame(draw);
    }

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouse);
    frameRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      style={{ opacity: 0.85 }}
      aria-hidden="true"
    />
  );
}
