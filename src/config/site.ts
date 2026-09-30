/**
 * ข้อมูลส่วนตัวทั้งหมดของเว็บ — แก้ที่ไฟล์นี้ไฟล์เดียว
 * (ชื่อ, ตำแหน่ง, อีเมล, social, URL ที่ใช้ทำ SEO/OG)
 */
export const siteConfig = {
  name: 'Your Name',
  handle: 'sait009',
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
  email: 'hello@example.com',
  availableForWork: true,
  /** ตั้งค่าผ่าน env ตอน deploy เช่น NEXT_PUBLIC_SITE_URL=https://yourdomain.com */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  socials: [
    { label: 'GitHub', href: 'https://github.com/sait009' },
    // { label: 'LinkedIn', href: 'https://www.linkedin.com/in/your-profile' },
    // { label: 'Facebook', href: 'https://www.facebook.com/your-profile' },
  ],
  stats: [
    { value: '5+', label: 'Years experience' },
    { value: '40+', label: 'Projects shipped' },
    { value: '100', label: 'Lighthouse target' },
  ],
} as const;

export const navItems = [
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'stack', label: 'Stack' },
  { id: 'work', label: 'Work' },
  { id: 'contact', label: 'Contact' },
] as const;

export type SectionId = (typeof navItems)[number]['id'];
