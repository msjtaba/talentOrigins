'use client';

import React from 'react';

export default function NetworkStatic() {
  const cx = 200;
  const cy = 200;
  const dist = 125; // Sized nicely inside 400x400 viewBox

  const industries = [
    { id: 'healthcare', name: 'Healthcare' },
    { id: 'manufacturing', name: 'Manufacturing' },
    { id: 'retail', name: 'Retail & Sales' },
    { id: 'hospitality', name: 'Hospitality' },
    { id: 'finance', name: 'Finance & Accounting' },
    { id: 'construction', name: 'Construction' },
    { id: 'logistics', name: 'Logistics' },
    { id: 'supply_chain', name: 'Supply Chain' },
  ];

  const nodes = industries.map((ind, i) => {
    const angle = -Math.PI / 2 + (i * 2 * Math.PI) / 8;
    const x = cx + Math.cos(angle) * dist;
    const y = cy + Math.sin(angle) * dist;
    return { ...ind, x, y, angle };
  });

  return (
    <div className="w-full max-w-[450px] mx-auto aspect-square flex items-center justify-center relative">
      <svg
        viewBox="0 0 400 400"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#06714B" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#06714B" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#2E9C72" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#2E9C72" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06714B" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#2E9C72" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Connection Lines */}
        {nodes.map(node => (
          <line
            key={`line-${node.id}`}
            x1={cx}
            y1={cy}
            x2={node.x}
            y2={node.y}
            stroke="url(#lineGrad)"
            strokeWidth="2.5"
          />
        ))}

        {/* Ambient Center Glow */}
        <circle cx={cx} cy={cy} r="65" fill="url(#centerGlow)" />

        {/* Node Ambient Glows */}
        {nodes.map(node => (
          <circle
            key={`glow-${node.id}`}
            cx={node.x}
            cy={node.y}
            r="30"
            fill="url(#nodeGlow)"
          />
        ))}

        {/* Surrounding Nodes */}
        {nodes.map(node => {
          // Calculate text positioning offsets
          const textDist = 24; // distance from node center
          let tx = node.x + Math.cos(node.angle) * textDist;
          let ty = node.y + Math.sin(node.angle) * textDist;
          let textAnchor: 'middle' | 'start' | 'end' = 'middle';

          // If node is far left or far right, shift align horizontally
          if (Math.abs(Math.cos(node.angle)) > 0.3) {
            textAnchor = Math.cos(node.angle) > 0 ? 'start' : 'end';
            // Slight adjustment to vertical alignment when side-placed
            ty += 4; 
            // Add a small horizontal buffer
            tx += Math.sign(Math.cos(node.angle)) * 4;
          } else {
            // Top or bottom nodes
            if (Math.sin(node.angle) < 0) {
              // Top nodes (Healthcare)
              ty -= 4;
            } else {
              // Bottom nodes
              ty += 12;
            }
          }

          return (
            <g key={`node-group-${node.id}`}>
              <circle
                cx={node.x}
                cy={node.y}
                r="15"
                fill="#111814"
                stroke="#2E9C72"
                strokeWidth="2"
              />
              <text
                x={tx}
                y={ty}
                fill="#F0F5F2"
                fontSize="11"
                fontWeight="600"
                textAnchor={textAnchor}
                fontFamily="var(--font-display)"
              >
                {node.name}
              </text>
            </g>
          );
        })}

        {/* Central Node - Talent Origins */}
        <circle cx={cx} cy={cy} r="28" fill="#111814" stroke="#06714B" strokeWidth="3" />
        <text x={cx} y={cy - 4} fill="#F0F5F2" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="var(--font-display)">TALENT</text>
        <text x={cx} y={cy + 8} fill="#2E9C72" fontSize="10" fontWeight="700" textAnchor="middle" fontFamily="var(--font-display)">ORIGINS</text>
      </svg>
    </div>
  );
}
