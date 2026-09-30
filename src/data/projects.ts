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

/** งานแรกในรายการจะแสดงเป็นการ์ดใหญ่ (featured) บนจอกว้าง */
export const projects: Project[] = [
  {
    slug: 'real-time-patient-management',
    title: 'Real-Time Patient Management System',
    summary:
      'Patient registration form with a live staff dashboard. Updates sync instantly over the BroadcastChannel API with no polling, covering the full session lifecycle: lazy status activation, debounced syncing, inactivity detection and cleanup. Built as a front-end assignment for Agnos Health.',
    category: 'Healthcare',
    year: '2026',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'BroadcastChannel API'],
    accent: 'primary',
    repo: 'https://github.com/Sait009/Real-Time-Patient-Management-System',
  },
  {
    slug: 'wu-comfort-detector',
    title: 'WU Comfort Detector',
    summary:
      'Patient monitoring dashboard built at Walailak University (Innovation of Medical Informatics). Shows live vital-sign charts, comfort-level predictions and patient records, synced in real time from Firebase.',
    category: 'Medical Informatics',
    year: '2025',
    tags: ['Next.js', 'Firebase', 'Chart.js', 'TanStack Table'],
    accent: 'accent',
    repo: 'https://github.com/Sait009/I-New-Gen',
  },
  {
    slug: 'workpoint-tv-clone',
    title: 'Workpoint TV App (UI Clone)',
    summary:
      'Mobile app UI clone built for practice, with a featured carousel, live banner, news, replay, schedule and Top 10 screens using bottom-tab and stack navigation. Not affiliated with Workpoint.',
    category: 'Mobile App',
    year: '2026',
    tags: ['React Native', 'TypeScript', 'React Navigation'],
    accent: 'secondary',
    repo: 'https://github.com/Sait009/WorkPointTV',
  },
];
