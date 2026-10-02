export type TimelineEntry = {
  title: string;
  org: string;
  /** เว็บไซต์ขององค์กร (ถ้ามี) */
  orgUrl?: string;
  period: string;
  /** งานปัจจุบัน — แสดงป้าย "Present" */
  current?: boolean;
  /** ใช้กับ <time dateTime> — รูปแบบ YYYY-MM */
  start?: string;
  end?: string;
  description?: string;
  highlights?: string[];
  tags?: string[];
  meta?: string;
};

/** ข้อมูลจาก Resume — เรียงจากใหม่ไปเก่า */
export const experience: TimelineEntry[] = [
  {
    title: 'Web Developer',
    org: 'Care Digital',
    orgUrl: 'https://caredigital.co.th/',
    period: 'Jul 2026 –',
    start: '2026-07',
    current: true,
    highlights: [
      'Help gather and clarify project requirements',
      'Write project specifications',
      'Develop websites with WordPress, Next.js and Astro + Payload CMS',
    ],
    tags: ['WordPress', 'Next.js', 'Astro', 'Payload CMS'],
  },
  {
    title: 'Trainee Developer',
    org: 'Greenline Synergy Co., Ltd.',
    period: 'Apr 2025 – Nov 2025',
    start: '2025-04',
    end: '2025-11',
    description:
      'Architected a cross-platform internal chat app end-to-end: system design, API contracts and database schema.',
    highlights: [
      'End-to-end encryption with RSA + AES key exchange, unreadable in transit, at rest and to the server',
      'Real-time messaging with Socket.IO and RabbitMQ as a message broker to prevent message loss under load',
      'Dual-database architecture (PostgreSQL + MongoDB via Prisma ORM)',
      'Integrated an AI conversational agent into legacy internal systems to automate support workflows',
    ],
    tags: ['NestJS', 'React Native', 'Socket.IO', 'RabbitMQ', 'PostgreSQL', 'MongoDB', 'Prisma'],
  },
];

export const education: TimelineEntry[] = [
  {
    title: 'B.Sc. Innovation of Medical Informatics',
    org: 'Walailak University',
    period: '2022 – 2025',
    start: '2022',
    end: '2025-12',
    meta: 'GPA 3.70 / 4.00',
  },
];

export const awards: TimelineEntry[] = [
  {
    title: 'I-New Gen Award',
    org: 'BITEC, Bangkok',
    period: 'Nov 2024',
    start: '2024-11',
    description:
      'Machine-learning model for respiratory disease classification using smart wearable data.',
  },
  {
    title: 'Research To Market',
    org: 'WUSTP',
    period: 'Sep 2024',
    start: '2024-09',
    description: 'Presented research on physiological signal-based pain detection.',
  },
  {
    title: 'GLS Internship Program Certificate',
    org: 'Greenline Synergy Co., Ltd.',
    period: 'Apr – Nov 2025',
    start: '2025-04',
    end: '2025-11',
  },
];
