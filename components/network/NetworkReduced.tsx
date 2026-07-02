'use client';

import React, { useEffect, useRef, useState } from 'react';

interface Node {
  id: string;
  name: string;
  angle: number;
  dist: number;
  x: number;
  y: number;
  r: number;
  hovered: boolean;
  opacity: number;
}

interface Particle {
  nodeId: string;
  progress: number;
  speed: number;
  direction: 'out' | 'in';
  size: number;
}

interface Pulse {
  nodeId: string;
  progress: number;
  speed: number;
}

export default function NetworkReduced() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const nodesRef = useRef<Node[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const pulsesRef = useRef<Pulse[]>([]);
  const animationFrameId = useRef<number | null>(null);
  const [activeTapId, setActiveTapId] = useState<string | null>(null);
  const activeTapIdRef = useRef<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 400;
    let h = 400;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      if (!canvas || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      w = rect.width || 400;
      h = rect.height || 400;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resize();
    window.addEventListener('resize', resize);

    // Initialize Nodes (8 industries)
    const dist = Math.min(w, h) * 0.32;
    nodesRef.current = [
      { id: 'healthcare', name: 'Healthcare', angle: -Math.PI / 2, dist, x: 0, y: 0, r: 15, hovered: false, opacity: 1 },
      { id: 'manufacturing', name: 'Manufacturing', angle: -Math.PI / 2 + (2 * Math.PI) / 8, dist, x: 0, y: 0, r: 15, hovered: false, opacity: 1 },
      { id: 'retail', name: 'Retail & Sales', angle: -Math.PI / 2 + 2 * (2 * Math.PI) / 8, dist, x: 0, y: 0, r: 15, hovered: false, opacity: 1 },
      { id: 'hospitality', name: 'Hospitality', angle: -Math.PI / 2 + 3 * (2 * Math.PI) / 8, dist, x: 0, y: 0, r: 15, hovered: false, opacity: 1 },
      { id: 'finance', name: 'Finance & Accounting', angle: -Math.PI / 2 + 4 * (2 * Math.PI) / 8, dist, x: 0, y: 0, r: 15, hovered: false, opacity: 1 },
      { id: 'construction', name: 'Construction', angle: -Math.PI / 2 + 5 * (2 * Math.PI) / 8, dist, x: 0, y: 0, r: 15, hovered: false, opacity: 1 },
      { id: 'logistics', name: 'Logistics', angle: -Math.PI / 2 + 6 * (2 * Math.PI) / 8, dist, x: 0, y: 0, r: 15, hovered: false, opacity: 1 },
      { id: 'supply_chain', name: 'Supply Chain', angle: -Math.PI / 2 + 7 * (2 * Math.PI) / 8, dist, x: 0, y: 0, r: 15, hovered: false, opacity: 1 },
    ];

    // Seed Particles (50% density compared to desktop -> 2 per node line)
    const newParticles: Particle[] = [];
    nodesRef.current.forEach(node => {
      for (let i = 0; i < 2; i++) {
        newParticles.push({
          nodeId: node.id,
          progress: Math.random(),
          speed: 0.003 + Math.random() * 0.004,
          direction: Math.random() > 0.15 ? 'out' : 'in',
          size: 1.5 + Math.random() * 1.0,
        });
      }
    });
    particlesRef.current = newParticles;

    let lastPulseTime = 0;
    let time = 0;

    function animate() {
      if (!canvas || !ctx) return;
      time += 0.015;

      const cx = w / 2;
      const cy = h / 2;

      const currentActiveId = activeTapIdRef.current;

      // Update Node positions (Fixed, no ambient drift)
      nodesRef.current.forEach(node => {
        node.x = cx + Math.cos(node.angle) * node.dist;
        node.y = cy + Math.sin(node.angle) * node.dist;
      });

      // Smooth node transitions based on tap state
      nodesRef.current.forEach(node => {
        if (currentActiveId) {
          if (node.id === currentActiveId) {
            node.r = node.r + (20 - node.r) * 0.15;
            node.opacity = node.opacity + (1 - node.opacity) * 0.15;
          } else {
            node.r = node.r + (13 - node.r) * 0.15;
            node.opacity = node.opacity + (0.4 - node.opacity) * 0.15;
          }
        } else {
          node.r = node.r + (15 - node.r) * 0.15;
          node.opacity = node.opacity + (1 - node.opacity) * 0.15;
        }
      });

      // Clear Canvas
      ctx.clearRect(0, 0, w, h);

      // Draw Center Glow
      const centerGlow = ctx.createRadialGradient(cx, cy, 5, cx, cy, 65);
      centerGlow.addColorStop(0, 'rgba(86, 111, 240, 0.25)');
      centerGlow.addColorStop(1, 'rgba(86, 111, 240, 0)');
      ctx.fillStyle = centerGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, 65, 0, Math.PI * 2);
      ctx.fill();

      // Trigger new pulses (less frequent on tablet)
      const now = Date.now();
      if (now - lastPulseTime > 3500) {
        const randomNode = nodesRef.current[Math.floor(Math.random() * nodesRef.current.length)];
        pulsesRef.current.push({
          nodeId: randomNode.id,
          progress: 0,
          speed: 0.012,
        });
        lastPulseTime = now;
      }

      // Draw Connection Lines
      nodesRef.current.forEach(node => {
        const isThisNodeActive = node.id === currentActiveId;
        const isAnyActive = currentActiveId !== null;

        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(node.x, node.y);

        let strokeOpacity = 0.2;
        if (isAnyActive) {
          strokeOpacity = isThisNodeActive ? 0.6 : 0.08;
        }
        ctx.strokeStyle = `rgba(86, 111, 240, ${strokeOpacity})`;
        ctx.lineWidth = isThisNodeActive ? 2.5 : 1.2;
        ctx.stroke();

        // Node specific tap glow
        if (isThisNodeActive) {
          const nodeGlow = ctx.createRadialGradient(node.x, node.y, 2, node.x, node.y, 35);
          nodeGlow.addColorStop(0, 'rgba(123, 143, 247, 0.35)');
          nodeGlow.addColorStop(1, 'rgba(123, 143, 247, 0)');
          ctx.fillStyle = nodeGlow;
          ctx.beginPath();
          ctx.arc(node.x, node.y, 35, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Update & Draw Particles
      particlesRef.current.forEach(p => {
        const node = nodesRef.current.find(n => n.id === p.nodeId);
        if (!node) return;

        const isThisNodeActive = node.id === currentActiveId;
        const isAnyActive = currentActiveId !== null;

        const speedMultiplier = isThisNodeActive ? 2.0 : 1.0;
        p.progress += p.speed * speedMultiplier;
        if (p.progress > 1) {
          p.progress = 0;
          p.speed = 0.003 + Math.random() * 0.004;
          p.direction = Math.random() > 0.15 ? 'out' : 'in';
        }

        const startX = p.direction === 'out' ? cx : node.x;
        const startY = p.direction === 'out' ? cy : node.y;
        const endX = p.direction === 'out' ? node.x : cx;
        const endY = p.direction === 'out' ? node.y : cy;

        const px = startX + (endX - startX) * p.progress;
        const py = startY + (endY - startY) * p.progress;

        let alpha = 0.45;
        if (isAnyActive) {
          alpha = isThisNodeActive ? 0.9 : 0.12;
        }

        ctx.fillStyle = `rgba(123, 143, 247, ${alpha})`;
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Update & Draw Pulses
      pulsesRef.current = pulsesRef.current.filter(p => {
        p.progress += p.speed;
        if (p.progress > 1) return false;

        const node = nodesRef.current.find(n => n.id === p.nodeId);
        if (!node) return false;

        const px = cx + (node.x - cx) * p.progress;
        const py = cy + (node.y - cy) * p.progress;

        const pulseGradient = ctx.createRadialGradient(px, py, 1, px, py, 10);
        pulseGradient.addColorStop(0, 'rgba(255, 255, 255, 0.85)');
        pulseGradient.addColorStop(0.3, 'rgba(123, 143, 247, 0.7)');
        pulseGradient.addColorStop(1, 'rgba(123, 143, 247, 0)');

        ctx.fillStyle = pulseGradient;
        ctx.beginPath();
        ctx.arc(px, py, 10, 0, Math.PI * 2);
        ctx.fill();
        return true;
      });

      // Draw Surrounding Nodes
      nodesRef.current.forEach(node => {
        ctx.save();
        ctx.globalAlpha = node.opacity;

        ctx.fillStyle = '#12121a';
        ctx.strokeStyle = currentActiveId === node.id ? '#7b8ff7' : '#566ff0';
        ctx.lineWidth = currentActiveId === node.id ? 2.2 : 1.2;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Node Inner Dot
        ctx.fillStyle = currentActiveId === node.id ? '#7b8ff7' : '#2a3580';
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r * 0.4, 0, Math.PI * 2);
        ctx.fill();

        // Text labels
        ctx.fillStyle = currentActiveId === node.id ? '#f0f0f5' : '#8888aa';
        ctx.font = `600 11px var(--font-display, "Space Grotesk", sans-serif)`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const textDist = node.r + 12;
        let tx = node.x + Math.cos(node.angle) * textDist;
        let ty = node.y + Math.sin(node.angle) * textDist;

        if (Math.abs(Math.cos(node.angle)) < 0.1) {
          ty += Math.sign(Math.sin(node.angle)) * 2;
        } else {
          tx += Math.sign(Math.cos(node.angle)) * 6;
          ctx.textAlign = Math.sign(Math.cos(node.angle)) > 0 ? 'left' : 'right';
        }

        ctx.fillText(node.name, tx, ty);
        ctx.restore();
      });

      // Draw Center Hub (Talent Origins)
      const hubRadius = 26;

      ctx.save();

      // Outer ring
      ctx.strokeStyle = 'rgba(86, 111, 240, 0.35)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, hubRadius + 6 + Math.sin(time * 2.0) * 1.5, 0, Math.PI * 2);
      ctx.stroke();

      // Hub Fill
      ctx.fillStyle = '#12121a';
      ctx.strokeStyle = '#566ff0';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(cx, cy, hubRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Text labels
      ctx.fillStyle = '#f0f0f5';
      ctx.font = '700 10px var(--font-display, "Space Grotesk", sans-serif)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('TALENT', cx, cy - 5);

      ctx.fillStyle = '#7b8ff7';
      ctx.font = '700 8px var(--font-display, "Space Grotesk", sans-serif)';
      ctx.fillText('ORIGINS', cx, cy + 5);

      ctx.restore();

      animationFrameId.current = requestAnimationFrame(animate);
    }

    animate();

    function handlePointerDown(e: PointerEvent) {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      let clickedNodeId: string | null = null;

      // Check click proximity to surrounding nodes
      nodesRef.current.forEach(node => {
        const d = Math.sqrt((clickX - node.x) ** 2 + (clickY - node.y) ** 2);
        // radius + padding touch target
        if (d <= node.r + 20) {
          clickedNodeId = node.id;
        }
      });

      if (clickedNodeId) {
        // Toggle or set
        const nextId = activeTapIdRef.current === clickedNodeId ? null : clickedNodeId;
        setActiveTapId(nextId);
        activeTapIdRef.current = nextId;
      } else {
        // Clear if clicked elsewhere
        setActiveTapId(null);
        activeTapIdRef.current = null;
      }
    }

    canvas.addEventListener('pointerdown', handlePointerDown);

    return () => {
      window.removeEventListener('resize', resize);
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      if (canvas) {
        canvas.removeEventListener('pointerdown', handlePointerDown);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center relative min-h-[350px]">
      <canvas ref={canvasRef} className="z-10 block" />
    </div>
  );
}
