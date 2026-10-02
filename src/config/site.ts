/**
 * ข้อมูลส่วนตัวทั้งหมดของเว็บ — แก้ที่ไฟล์นี้ไฟล์เดียว
 * (ชื่อ, ตำแหน่ง, อีเมล, social, URL ที่ใช้ทำ SEO/OG)
 */
export const siteConfig = {
  name: 'Chanatip Pirom',
  handle: 'Chanatip',
  role: 'WordPress & Creative Web Developer',
  /** ข้อความที่วนแสดงใน Hero (scramble effect) */
  roles: [
    'WordPress Developer',
    'Etch & ACSS Specialist',
    'Creative Developer',
    'Three.js Explorer',
  ],
  tagline:
    'I craft fast, accessible and visually striking websites — from scalable WordPress builds with Etch & ACSS to custom interactive experiences.',
  description:
    'Portfolio of a WordPress & creative web developer specialising in Etch, Automatic CSS, modern JavaScript/TypeScript and interactive 3D on the web.',
  location: 'Thailand',
  email: 'chanatip.pirom@gmail.com',
  availableForWork: true,
  /**
   * URL หลักของเว็บ (canonical, OG image, sitemap)
   * ลำดับ: NEXT_PUBLIC_SITE_URL → production URL ที่ Vercel ให้อัตโนมัติ → localhost
   */
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : 'http://localhost:3000'),
  socials: [
    { label: 'GitHub', href: 'https://github.com/Sait009' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/chanatip-pirom' },
  ],
} as const;

export const navItems = [
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'stack', label: 'Stack' },
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
] as const;

export type SectionId = (typeof navItems)[number]['id'];
