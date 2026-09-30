import type { StaticImageData } from 'next/image';

export type ProjectAccent = 'primary' | 'secondary' | 'accent' | 'tertiary';

export type Project = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  year: string;
  tags: string[];
  accent: ProjectAccent;
  /** ลิงก์เว็บจริง (ถ้ามี) */
  href?: string;
  /** ลิงก์ source code (ถ้ามี) */
  repo?: string;
  /** import รูปจาก src/assets แล้วใส่ตรงนี้ ถ้าไม่ใส่จะใช้ cover แบบ generative */
  image?: StaticImageData;
};

/**
 * ⚠️ ตัวอย่างผลงาน (placeholder) — แทนที่ด้วยผลงานจริงของคุณ
 */
export const projects: Project[] = [
  {
    slug: 'corporate-site-etch',
    title: 'Corporate Website Rebuild',
    summary:
      'Rebuilt a multi-language corporate site with Etch and ACSS — a reusable component system, fluid typography and a 95+ Lighthouse score.',
    category: 'WordPress',
    year: '2026',
    tags: ['WordPress', 'Etch', 'ACSS', 'BEM'],
    accent: 'primary',
  },
  {
    slug: 'product-3d-landing',
    title: '3D Product Landing Page',
    summary:
      'Interactive product showcase powered by Three.js with scroll-driven camera moves, custom shaders and a graceful non-WebGL fallback.',
    category: 'Creative Dev',
    year: '2026',
    tags: ['Three.js', 'GLSL', 'TypeScript'],
    accent: 'secondary',
  },
  {
    slug: 'woocommerce-store',
    title: 'WooCommerce Store',
    summary:
      'Custom WooCommerce theme with a streamlined checkout, dynamic product filters and Core Web Vitals tuned for mobile shoppers.',
    category: 'E-commerce',
    year: '2025',
    tags: ['WooCommerce', 'PHP', 'JavaScript'],
    accent: 'accent',
  },
  {
    slug: 'analytics-dashboard',
    title: 'Analytics Dashboard',
    summary:
      'Custom-built dashboard in Next.js and TypeScript consuming the WordPress REST API, with real-time charts and role-based access.',
    category: 'Custom Dev',
    year: '2025',
    tags: ['Next.js', 'TypeScript', 'REST API'],
    accent: 'tertiary',
  },
];
