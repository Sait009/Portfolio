import { ImageResponse } from 'next/og';

import { siteConfig } from '@/config/site';

export const alt = `${siteConfig.name} — ${siteConfig.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/** OG image สร้างอัตโนมัติจาก siteConfig ตอน build */
export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 72,
        color: '#e6edf7',
        backgroundColor: '#05070d',
        backgroundImage:
          'radial-gradient(circle at 82% 45%, rgba(139,92,246,0.55), transparent 32%), radial-gradient(circle at 78% 40%, rgba(34,211,238,0.45), transparent 26%), linear-gradient(rgba(148,163,184,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.08) 1px, transparent 1px)',
        backgroundSize: '100% 100%, 100% 100%, 48px 48px, 48px 48px',
      }}
    >
      <div style={{ display: 'flex', fontSize: 30, color: '#22d3ee' }}>
        {`<${siteConfig.handle} />`}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ fontSize: 96, fontWeight: 700, letterSpacing: -4, lineHeight: 1 }}>
          {siteConfig.name}
        </div>
        <div style={{ fontSize: 40, color: '#94a3b8' }}>{siteConfig.role}</div>
      </div>
      <div style={{ display: 'flex', gap: 16, fontSize: 24, color: '#64748b' }}>
        {['WordPress', 'Etch', 'ACSS', 'TypeScript', 'Three.js'].map((tag) => (
          <div
            key={tag}
            style={{
              display: 'flex',
              padding: '8px 18px',
              border: '1px solid rgba(148,163,184,0.25)',
              borderRadius: 999,
            }}
          >
            {tag}
          </div>
        ))}
      </div>
    </div>,
    size,
  );
}
