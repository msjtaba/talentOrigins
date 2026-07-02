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
  driftPhase: number;
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

export default function NetworkFull() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const nodesRef = useRef<Node[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const pulsesRef = useRef<Pulse[]>([]);
  const animationFrameId = useRef<number | null>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 450;
    let h = 450;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      if (!canvas || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      w = rect.width || 450;
      h = rect.height || 450;
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
      { id: 'healthcare', name: 'Healthcare', angle: -Math.PI / 2, dist, x: 0, y: 0, r: 16, hovered: false, opacity: 1, driftPhase: 0 },
      { id: 'manufacturing', name: 'Manufacturing', angle: -Math.PI / 2 + (2 * Math.PI) / 8, dist, x: 0, y: 0, r: 16, hovered: false, opacity: 1, driftPhase: Math.PI / 8 },
      { id: 'retail', name: 'Retail & Sales', angle: -Math.PI / 2 + 2 * (2 * Math.PI) / 8, dist, x: 0, y: 0, r: 16, hovered: false, opacity: 1, driftPhase: 2 * Math.PI / 8 },
      { id: 'hospitality', name: 'Hospitality', angle: -Math.PI / 2 + 3 * (2 * Math.PI) / 8, dist, x: 0, y: 0, r: 16, hovered: false, opacity: 1, driftPhase: 3 * Math.PI / 8 },
      { id: 'finance', name: 'Finance & Accounting', angle: -Math.PI / 2 + 4 * (2 * Math.PI) / 8, dist, x: 0, y: 0, r: 16, hovered: false, opacity: 1, driftPhase: 4 * Math.PI / 8 },
      { id: 'construction', name: 'Construction', angle: -Math.PI / 2 + 5 * (2 * Math.PI) / 8, dist, x: 0, y: 0, r: 16, hovered: false, opacity: 1, driftPhase: 5 * Math.PI / 8 },
      { id: 'logistics', name: 'Logistics', angle: -Math.PI / 2 + 6 * (2 * Math.PI) / 8, dist, x: 0, y: 0, r: 16, hovered: false, opacity: 1, driftPhase: 6 * Math.PI / 8 },
      { id: 'supply_chain', name: 'Supply Chain', angle: -Math.PI / 2 + 7 * (2 * Math.PI) / 8, dist, x: 0, y: 0, r: 16, hovered: false, opacity: 1, driftPhase: 7 * Math.PI / 8 },
    ];

    // Seed Particles
    const newParticles: Particle[] = [];
    nodesRef.current.forEach(node => {
      // Seed 4 particles per node line
      for (let i = 0; i < 4; i++) {
        newParticles.push({
          nodeId: node.id,
          progress: Math.random(),
          speed: 0.003 + Math.random() * 0.004,
          direction: Math.random() > 0.15 ? 'out' : 'in',
          size: 1.5 + Math.random() * 1.5,
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

      // Check mouse collisions and update node states
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      let activeHoverId: string | null = null;

      // Update Node positions (with drift)
      nodesRef.current.forEach(node => {
        // Ambient drift
        const dxDrift = Math.cos(time * 1.2 + node.driftPhase) * 4;
        const dyDrift = Math.sin(time * 1.2 + node.driftPhase) * 4;

        node.x = cx + Math.cos(node.angle) * node.dist + dxDrift;
        node.y = cy + Math.sin(node.angle) * node.dist + dyDrift;

        // Collision check
        const distToMouse = Math.sqrt((mx - node.x) ** 2 + (my - node.y) ** 2);
        const isHovered = distToMouse <= node.r + 10;
        node.hovered = isHovered;
        if (isHovered) {
          activeHoverId = node.id;
        }
      });

      setHoveredNodeId(activeHoverId);

      // Smooth node properties transitions based on hover state
      nodesRef.current.forEach(node => {
        // If some node is hovered
        if (activeHoverId) {
          if (node.id === activeHoverId) {
            node.r = node.r + (22 - node.r) * 0.15;
            node.opacity = node.opacity + (1 - node.opacity) * 0.15;
          } else {
            node.r = node.r + (14 - node.r) * 0.15;
            node.opacity = node.opacity + (0.4 - node.opacity) * 0.15;
          }
        } else {
          node.r = node.r + (16 - node.r) * 0.15;
          node.opacity = node.opacity + (1 - node.opacity) * 0.15;
        }
      });

      // Clear Canvas
      ctx.clearRect(0, 0, w, h);

      // Draw Center Glow
      const centerGlow = ctx.createRadialGradient(cx, cy, 5, cx, cy, 75);
      centerGlow.addColorStop(0, 'rgba(86, 111, 240, 0.35)');
      centerGlow.addColorStop(1, 'rgba(86, 111, 240, 0)');
      ctx.fillStyle = centerGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, 75, 0, Math.PI * 2);
      ctx.fill();

      // Trigger new pulses
      const now = Date.now();
      if (now - lastPulseTime > 2500) {
        // Pick a random node
        const randomNode = nodesRef.current[Math.floor(Math.random() * nodesRef.current.length)];
        pulsesRef.current.push({
          nodeId: randomNode.id,
          progress: 0,
          speed: 0.012,
        });
        lastPulseTime = now;
      }

      // Update and Draw Connection Lines & Particles
      nodesRef.current.forEach(node => {
        const isThisNodeHovered = node.id === activeHoverId;
        const isAnyHovered = activeHoverId !== null;

        // Line color
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(node.x, node.y);

        let strokeOpacity = 0.25;
        if (isAnyHovered) {
          strokeOpacity = isThisNodeHovered ? 0.7 : 0.1;
        }
        ctx.strokeStyle = `rgba(86, 111, 240, ${strokeOpacity})`;
        ctx.lineWidth = isThisNodeHovered ? 3 : 1.5;
        ctx.stroke();

        // Draw node-specific glows on hover
        if (isThisNodeHovered) {
          const nodeGlow = ctx.createRadialGradient(node.x, node.y, 2, node.x, node.y, 45);
          nodeGlow.addColorStop(0, 'rgba(123, 143, 247, 0.45)');
          nodeGlow.addColorStop(1, 'rgba(123, 143, 247, 0)');
          ctx.fillStyle = nodeGlow;
          ctx.beginPath();
          ctx.arc(node.x, node.y, 45, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Update & Draw Particles
      particlesRef.current.forEach(p => {
        const node = nodesRef.current.find(n => n.id === p.nodeId);
        if (!node) return;

        const isThisNodeHovered = node.id === activeHoverId;
        const isAnyHovered = activeHoverId !== null;

        // Particle speed increases if hovered
        const speedMultiplier = isThisNodeHovered ? 2.2 : 1.0;
        p.progress += p.speed * speedMultiplier;
        if (p.progress > 1) {
          p.progress = 0;
          p.speed = 0.003 + Math.random() * 0.004;
          p.direction = Math.random() > 0.15 ? 'out' : 'in';
        }

        // Interpolate position
        const startX = p.direction === 'out' ? cx : node.x;
        const startY = p.direction === 'out' ? cy : node.y;
        const endX = p.direction === 'out' ? node.x : cx;
        const endY = p.direction === 'out' ? node.y : cy;

        const px = startX + (endX - startX) * p.progress;
        const py = startY + (endY - startY) * p.progress;

        let alpha = 0.5;
        if (isAnyHovered) {
          alpha = isThisNodeHovered ? 0.95 : 0.15;
        }

        ctx.fillStyle = `rgba(123, 143, 247, ${alpha})`;
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Update & Draw Pulses
      pulsesRef.current = pulsesRef.current.filter(p => {
        p.progress += p.speed;
        if (p.progress > 1) return false; // discard finished pulses

        const node = nodesRef.current.find(n => n.id === p.nodeId);
        if (!node) return false;

        const px = cx + (node.x - cx) * p.progress;
        const py = cy + (node.y - cy) * p.progress;

        // Draw pulse particle
        const pulseGradient = ctx.createRadialGradient(px, py, 1, px, py, 12);
        pulseGradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
        pulseGradient.addColorStop(0.3, 'rgba(123, 143, 247, 0.8)');
        pulseGradient.addColorStop(1, 'rgba(123, 143, 247, 0)');

        ctx.fillStyle = pulseGradient;
        ctx.beginPath();
        ctx.arc(px, py, 12, 0, Math.PI * 2);
        ctx.fill();
        return true;
      });

      // Draw Surrounding Nodes
      nodesRef.current.forEach(node => {
        ctx.save();
        ctx.globalAlpha = node.opacity;

        // Node circle background
        ctx.fillStyle = '#12121a';
        ctx.strokeStyle = hoveredNodeId === node.id ? '#7b8ff7' : '#566ff0';
        ctx.lineWidth = hoveredNodeId === node.id ? 2.5 : 1.5;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Node Inner Dot
        ctx.fillStyle = hoveredNodeId === node.id ? '#7b8ff7' : '#2a3580';
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r * 0.4, 0, Math.PI * 2);
        ctx.fill();

        // Text labels (Responsive adjustments)
        ctx.fillStyle = hoveredNodeId === node.id ? '#f0f0f5' : '#8888aa';
        ctx.font = `600 12px var(--font-display, "Space Grotesk", sans-serif)`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Offset text based on node angle
        const textDist = node.r + 14;
        let tx = node.x + Math.cos(node.angle) * textDist;
        let ty = node.y + Math.sin(node.angle) * textDist;

        // Adjust position so text sits nicely
        if (Math.abs(Math.cos(node.angle)) < 0.1) {
          // Top or Bottom
          ty += Math.sign(Math.sin(node.angle)) * 2;
        } else {
          // Left or Right
          tx += Math.sign(Math.cos(node.angle)) * 8;
          ctx.textAlign = Math.sign(Math.cos(node.angle)) > 0 ? 'left' : 'right';
        }

        ctx.fillText(node.name, tx, ty);
        ctx.restore();
      });

      // Draw Center Hub (Talent Origins)
      const hubRadius = activeHoverId ? 26 : 28;
      const hubOpacity = activeHoverId ? 0.6 : 1.0;

      ctx.save();
      ctx.globalAlpha = hubOpacity;

      // Draw outer rings
      ctx.strokeStyle = 'rgba(86, 111, 240, 0.4)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, hubRadius + 8 + Math.sin(time * 2.5) * 2, 0, Math.PI * 2);
      ctx.stroke();

      // Hub Fill
      ctx.fillStyle = '#12121a';
      ctx.strokeStyle = '#566ff0';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(cx, cy, hubRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Text labels for Hub
      ctx.fillStyle = '#f0f0f5';
      ctx.font = '700 11px var(--font-display, "Space Grotesk", sans-serif)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('TALENT', cx, cy - 6);

      ctx.fillStyle = '#7b8ff7';
      ctx.font = '700 9px var(--font-display, "Space Grotesk", sans-serif)';
      ctx.fillText('ORIGINS', cx, cy + 6);

      ctx.restore();

      animationFrameId.current = requestAnimationFrame(animate);
    }

    animate();

    function handleMouseMove(e: MouseEvent) {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    }

    function handleMouseLeave() {
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    }

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', resize);
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      if (canvas) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center relative min-h-[400px]">
      <canvas ref={canvasRef} className="z-10 block" />
    </div>
  );
}
