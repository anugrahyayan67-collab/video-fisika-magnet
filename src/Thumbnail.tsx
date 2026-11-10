import React from 'react';
import {AbsoluteFill} from 'remotion';
import {BRAND} from './brand';
import {C, FONT} from './theme';

// Magnet batang: kutub U (kiri, merah) dan S (kanan, biru). Di luar magnet garis medan keluar dari U, masuk ke S.
const CX = 2030;
const CY = 690;
const HALF = 270; // setengah panjang magnet
const TH = 70; // setengah tebal magnet
const NX = CX - HALF;
const SX = CX + HALF;

const Arrowhead: React.FC<{x: number; y: number; ang: number; color: string}> = ({x, y, ang, color}) => (
  <path d="M -20 -13 L 6 0 L -20 13 Z" fill={color} transform={`translate(${x} ${y}) rotate(${ang})`} />
);

/** Loop garis medan dari ujung U ke ujung S, di atas (s=-1) atau di bawah (s=1). */
const loop = (s: number, dy: number, reach: number, spread: number) => {
  const y0 = CY + s * dy;
  return `M ${NX} ${y0} C ${NX - spread} ${y0 + s * reach} ${SX + spread} ${y0 + s * reach} ${SX} ${y0}`;
};

/** Gambar mini 2K untuk YouTube/LMS. */
export const Thumbnail: React.FC = () => {
  const loops = [
    {dy: 66, reach: 250, spread: 50},
    {dy: 40, reach: 430, spread: 170},
    {dy: 14, reach: 600, spread: 310},
  ];
  return (
    <AbsoluteFill style={{background: `radial-gradient(ellipse 80% 70% at 30% 40%, #20305e 0%, ${C.bg} 70%)`, fontFamily: FONT.head}}>
      <svg width={2560} height={1440} style={{position: 'absolute', inset: 0}}>
        <circle cx={CX} cy={CY} r={430} fill={C.spr} opacity={0.08} />
        {/* garis medan B */}
        {[-1, 1].map((s) =>
          loops.map((l, i) => {
            // puncak kurva Bezier (t = 0,5): y = y0 + 0,75·s·reach
            const yTop = CY + s * l.dy + 0.75 * s * l.reach;
            return (
              <g key={`${s}-${i}`}>
                <path d={loop(s, l.dy, l.reach, l.spread)} fill="none" stroke={C.spr} strokeWidth={6} opacity={0.9 - i * 0.18} />
                <Arrowhead x={CX} y={yTop} ang={0} color={C.spr} />
              </g>
            );
          }),
        )}
        {/* garis lurus keluar dari U ke kiri dan masuk ke S dari kanan */}
        <line x1={NX - 260} y1={CY} x2={NX} y2={CY} stroke={C.spr} strokeWidth={6} opacity={0.75} />
        <Arrowhead x={NX - 150} y={CY} ang={180} color={C.spr} />
        <line x1={SX} y1={CY} x2={SX + 260} y2={CY} stroke={C.spr} strokeWidth={6} opacity={0.75} />
        <Arrowhead x={SX + 130} y={CY} ang={180} color={C.spr} />
        {/* magnet batang */}
        <rect x={NX} y={CY - TH} width={HALF} height={TH * 2} rx={10} fill={C.heat} />
        <rect x={CX} y={CY - TH} width={HALF} height={TH * 2} rx={10} fill={C.pot} />
        <rect x={NX} y={CY - TH} width={HALF * 2} height={TH * 2} rx={10} fill="none" stroke="#ffffff" strokeOpacity={0.5} strokeWidth={5} />
        <rect x={NX + 14} y={CY - TH + 12} width={HALF * 2 - 28} height={16} rx={8} fill="#ffffff" opacity={0.18} />
        <text x={NX + HALF / 2} y={CY + 36} textAnchor="middle" fontFamily={FONT.head} fontWeight={700} fontSize={100} fill="#ffffff">
          U
        </text>
        <text x={CX + HALF / 2} y={CY + 36} textAnchor="middle" fontFamily={FONT.head} fontWeight={700} fontSize={100} fill="#ffffff">
          S
        </text>
        <text x={CX + 400} y={CY - 420} textAnchor="middle" fontFamily={FONT.serif} fontStyle="italic" fontWeight={700} fontSize={90} fill={C.spr}>
          B
        </text>
      </svg>
      <div style={{position: 'absolute', left: 140, top: 180, color: C.gold, fontSize: 54, letterSpacing: 10, fontWeight: 600}}>{BRAND.series.toUpperCase()}</div>
      <div style={{position: 'absolute', left: 130, top: 280, color: C.ink, fontSize: 190, fontWeight: 700, lineHeight: 0.98, letterSpacing: -6}}>
        Listrik yang
        <br />
        <span style={{color: C.spr}}>Bergerak</span>
      </div>
      <div style={{position: 'absolute', left: 140, top: 760, color: C.muted, fontSize: 70, fontWeight: 500}}>{BRAND.subtitle}</div>
      <div style={{position: 'absolute', left: 140, bottom: 140, color: C.ink, fontSize: 44, letterSpacing: 8, fontWeight: 600}}>
        {BRAND.channel} <span style={{color: C.muted, letterSpacing: 2, fontWeight: 400}}>· {BRAND.tagline}</span>
      </div>
    </AbsoluteFill>
  );
};
