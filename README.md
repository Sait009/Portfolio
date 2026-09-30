# Portfolio

เว็บ portfolio แนว tech แบบ landing page มีฉากหลัง 3D แบบ interactive ที่ทำด้วย Three.js

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · React Three Fiber (Three.js) · CSS Modules + design tokens แบบ ACSS

## เริ่มต้นใช้งาน

```bash
npm install
npm run dev        # http://localhost:3000
```

| Script              | ใช้ทำอะไร                |
| ------------------- | ------------------------ |
| `npm run dev`       | dev server               |
| `npm run build`     | build สำหรับ production  |
| `npm run start`     | รัน production build     |
| `npm run lint`      | ESLint                   |
| `npm run typecheck` | ตรวจ TypeScript          |
| `npm run format`    | จัด format ด้วย Prettier |

## แก้เนื้อหา

เนื้อหาทั้งหมดแยกไว้เป็น data แล้ว **ไม่ต้องแก้ใน component**

| ไฟล์                    | เนื้อหา                                                              |
| ----------------------- | -------------------------------------------------------------------- |
| `src/config/site.ts`    | ชื่อ, ตำแหน่ง, คำโปรย, อีเมล, social, สถิติ, เมนู                    |
| `src/data/projects.ts`  | ผลงาน (ตอนนี้เป็น **ตัวอย่าง** ต้องแทนด้วยผลงานจริง) ใส่ `image` ได้ |
| `src/data/skills.ts`    | Services, กลุ่ม skill, แถบ marquee                                   |
| `src/styles/tokens.css` | สี, ฟอนต์, spacing, radius (ตั้งชื่อตามแนว ACSS)                     |

การใส่รูปผลงาน ให้วางไฟล์ไว้ใน `src/assets/` แล้ว import มาใส่ใน `projects.ts`:

```ts
import corporate from '@/assets/projects/corporate.jpg';
// ...
{ slug: 'corporate-site-etch', image: corporate, ... }
```

## โครงสร้าง

```
src/
├── app/                  # routes, layout, metadata (OG image, sitemap, robots, icon)
├── components/
│   ├── layout/           # Header, Footer
│   ├── sections/         # Hero, About, Services, Stack, Projects, Contact
│   ├── three/            # 3D scene (R3F): orb shader, wireframe, rings, particles
│   └── ui/               # Button, SectionHeading, SpotlightCard, ScrambleText, ...
├── config/site.ts
├── data/
├── hooks/
└── styles/tokens.css
```

### 3D scene

- เป็นพื้นหลังแบบ `fixed` อยู่ใน root layout จึงแสดงต่อเนื่องทุกหน้า
- **Lazy-load** หลังหน้าเว็บพร้อมใช้งาน (`requestIdleCallback` + `next/dynamic`, `ssr: false`) จึงไม่บล็อก LCP
- ตำแหน่งวัตถุเปลี่ยนตาม section ที่ scroll ผ่าน กำหนดด้วย attribute `data-scene="hero | left | right | center"` บน `<section>` ส่วนค่า preset อยู่ใน `src/components/three/sceneStops.ts`
- ปรับตามอุปกรณ์: เครื่องแรงน้อยหรือจอเล็กจะลด geometry และ particle, ถ้า FPS ตกจะลด DPR อัตโนมัติ, ถ้าเปิด Save-Data จะไม่โหลด 3D
- รองรับ `prefers-reduced-motion`: หยุด animation และ render แค่เฟรมเดียว
- ถ้า WebGL ใช้ไม่ได้ ระบบจะซ่อน 3D ไป เหลือพื้นหลัง grid + gradient ที่ทำด้วย CSS

### การเพิ่มหน้าใหม่

สร้างไฟล์ `src/app/<route>/page.tsx` เช่น `src/app/work/[slug]/page.tsx` สำหรับหน้า case study
Header, Footer และฉาก 3D จะติดมาให้เองจาก layout อย่าลืมเพิ่ม route ใน `src/app/sitemap.ts`

## Deploy

Production: https://portfolio-new-book.vercel.app

ใช้ **Vercel** ที่ต่อกับ repo นี้ไว้ ทุกครั้งที่ push ขึ้น `main` จะ deploy ให้อัตโนมัติ

URL ที่ใช้ใน canonical, OG image และ sitemap มาจาก `siteConfig.url` เลือกตามลำดับนี้:

1. `NEXT_PUBLIC_SITE_URL` ถ้าตั้งไว้ (ใช้เมื่อต้องการบังคับเป็นโดเมนใดโดเมนหนึ่ง)
2. `VERCEL_PROJECT_PRODUCTION_URL` ที่ Vercel ส่งมาให้เอง (เลือก custom domain ก่อน ถ้าไม่มีจึงใช้ `*.vercel.app`)
3. `http://localhost:3000` ตอน dev

ถ้า deploy ที่อื่นที่ไม่ใช่ Vercel ให้ตั้ง `NEXT_PUBLIC_SITE_URL` เอง

CI (`.github/workflows/ci.yml`) จะรัน lint, typecheck, format check และ build ทุกครั้งที่ push หรือเปิด PR
