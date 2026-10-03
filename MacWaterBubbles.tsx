import React, { useEffect, useRef } from 'react';

interface Bubble {
  x: number;
  y: number;
  radius: number;
  baseRadius: number;
  vx: number;
  vy: number;
  phase: number;
  speed: number;
  colorType: 'electric' | 'deep' | 'cyan' | 'gold';
}

export const MacWaterBubbles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    let mouse = { x: -1000, y: -1000, isHovering: false };
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.isHovering = true;
    });

    const bubbleCount = Math.min(20, Math.max(10, Math.floor(width / 90)));
    const bubbles: Bubble[] = [];
    const colorTypes: ('electric' | 'deep' | 'cyan' | 'gold')[] = ['electric', 'deep', 'cyan', 'gold'];

    for (let i = 0; i < bubbleCount; i++) {
      const radius = Math.random() * 55 + 30;
      bubbles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius,
        baseRadius: radius,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.02 + 0.01,
        colorType: colorTypes[i % colorTypes.length],
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      bubbles.forEach((b) => {
        b.phase += b.speed;
        b.x += b.vx + Math.sin(b.phase) * 0.4;
        b.y += b.vy + Math.cos(b.phase * 0.8) * 0.4;
        b.radius = b.baseRadius + Math.sin(b.phase * 2) * (b.baseRadius * 0.08);

        // Fluid mouse repelling
        if (mouse.isHovering) {
          const dx = b.x - mouse.x;
          const dy = b.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 200 && dist > 0) {
            const force = (200 - dist) / 200;
            b.x += (dx / dist) * force * 4.5;
            b.y += (dy / dist) * force * 4.5;
          }
        }

        // Color & glow setup
        const primaryColor = b.colorType === 'gold' ? 'rgba(245, 158, 11, ' : 'rgba(0, 102, 255, ';
        const glowGrad = ctx.createRadialGradient(b.x, b.y, b.radius * 0.4, b.x, b.y, b.radius * 1.6);
        glowGrad.addColorStop(0, primaryColor + '0.18)');
        glowGrad.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius * 1.6, 0, Math.PI * 2);
        ctx.fillStyle = glowGrad;
        ctx.fill();

        // Liquid body
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fillStyle = primaryColor + '0.12)';
        ctx.fill();
        ctx.strokeStyle = primaryColor + '0.45)';
        ctx.lineWidth = 1.4;
        ctx.stroke();

        // Mac Specular highlight arc
        ctx.save();
        ctx.translate(b.x - b.radius * 0.35, b.y - b.radius * 0.35);
        ctx.rotate(-Math.PI / 4);
        ctx.beginPath();
        ctx.ellipse(0, 0, b.radius * 0.28, b.radius * 0.16, 0, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
        ctx.fill();
        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-80" />;
};
