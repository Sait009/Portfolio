import type { LucideIcon } from 'lucide-react';
import { Box, CodeXml, Gauge, LayoutTemplate } from 'lucide-react';

export type Service = {
  title: string;
  description: string;
  icon: LucideIcon;
  points: string[];
};

export const services: Service[] = [
  {
    title: 'WordPress Development',
    description:
      'Scalable, editor-friendly WordPress sites built with Etch and Automatic CSS — clean markup, BEM naming and a real design system.',
    icon: LayoutTemplate,
    points: ['Etch & ACSS builds', 'Custom blocks & components', 'Figma → WordPress'],
  },
  {
    title: 'Custom Development',
    description:
      'When a builder is not enough: custom features, integrations and apps with modern JavaScript, TypeScript and frameworks.',
    icon: CodeXml,
    points: ['JavaScript / TypeScript', 'REST & headless WordPress', 'Next.js apps'],
  },
  {
    title: 'Creative & 3D Web',
    description:
      'Memorable interactive experiences with Three.js, WebGL shaders and motion — without sacrificing accessibility or performance.',
    icon: Box,
    points: ['Three.js / React Three Fiber', 'Custom GLSL shaders', 'Scroll-driven motion'],
  },
  {
    title: 'Performance & SEO',
    description:
      'Fast by default. Core Web Vitals, semantic HTML, structured data and accessibility audits that move real metrics.',
    icon: Gauge,
    points: ['Core Web Vitals tuning', 'Technical SEO', 'WCAG accessibility'],
  },
];

export type SkillGroup = {
  title: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: 'CMS & Builders',
    items: ['WordPress', 'Etch', 'Automatic CSS', 'WooCommerce', 'ACF', 'Gutenberg'],
  },
  {
    title: 'Frontend',
    items: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React', 'Next.js'],
  },
  {
    title: 'Creative',
    items: ['Three.js', 'React Three Fiber', 'GLSL', 'GSAP', 'Figma'],
  },
  {
    title: 'Tooling',
    items: ['Git', 'Vite', 'Node.js', 'PHP', 'REST API', 'Vercel'],
  },
];

/** แถบ marquee ใน section Stack */
export const marqueeItems = [
  'WordPress',
  'Etch',
  'ACSS',
  'HTML',
  'CSS',
  'JavaScript',
  'TypeScript',
  'Next.js',
  'Three.js',
  'GLSL',
  'Figma',
  'Git',
];
