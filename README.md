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

| ไฟล์                     | เนื้อหา                                           |
| ------------------------ | ------------------------------------------------- |
| `src/config/site.ts`     | ชื่อ, ตำแหน่ง, คำโปรย, อีเมล, social, เมนู        |
| `src/data/projects.ts`   | ผลงาน (งานแรกจะแสดงเป็นการ์ดใหญ่) ใส่ `image` ได้ |
| `src/data/skills.ts`     | Services, กลุ่ม skill, แถบ marquee                |
| `src/data/experience.ts` | ประสบการณ์, การศึกษา, รางวัล (section Experience) |
| `src/styles/tokens.css`  | สี, ฟอนต์, spacing, radius (ตั้งชื่อตามแนว ACSS)  |

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

### Environment variables

ดูรายการทั้งหมดได้ใน `.env.example` ตอน dev ให้คัดลอกไปเป็น `.env.local` ส่วนบน Vercel ให้ตั้งที่ **Settings → Environment Variables** โดยติ๊กทั้ง Production และ Preview

| ตัวแปร               | จำเป็น | ใช้ทำอะไร                                                                  |
| -------------------- | ------ | -------------------------------------------------------------------------- |
| `RESEND_API_KEY`     | ✅     | ให้ฟอร์มติดต่อส่งอีเมลได้ ถ้าไม่ตั้ง ฟอร์มจะบอกให้ผู้ใช้ส่งอีเมลมาตรงๆ แทน |
| `CONTACT_TO_EMAIL`   |        | อีเมลที่รับข้อความ (ค่าเริ่มต้นคืออีเมลใน `site.ts`)                       |
| `CONTACT_FROM_EMAIL` |        | อีเมลผู้ส่ง (ต้อง verify โดเมนใน Resend ก่อน)                              |

### ฟอร์มติดต่อ (Resend)

1. สมัคร https://resend.com **ด้วยอีเมลเดียวกับที่จะรับข้อความ** เพราะผู้ส่ง `onboarding@resend.dev` ส่งได้เฉพาะเข้าอีเมลเจ้าของบัญชี
2. สร้าง API key แบบ _Sending access_ แล้วใส่เป็น `RESEND_API_KEY` ใน Vercel
3. Redeploy

ฟอร์มกัน bot ด้วย honeypot และเวลากรอกขั้นต่ำ 3 วินาที และตรวจข้อมูลอีกรอบฝั่ง server

### Analytics

ใช้ Vercel Web Analytics และ Speed Insights ที่ฝังไว้ใน `layout.tsx` แล้ว ต้องเปิดใช้ใน Vercel dashboard ด้วย ที่โปรเจกต์ → แท็บ **Analytics** และ **Speed Insights** → **Enable** (ใช้ฟรีบนแพ็กเกจ Hobby) ถ้ายังไม่เปิด script จะตอบกลับเป็น 404

### Custom domain

1. ซื้อโดเมน เช่น `chanatip.dev` จาก Cloudflare Registrar, Porkbun หรือ Namecheap
2. ใน Vercel ไปที่ **Settings → Domains → Add** แล้วใส่โดเมน
3. ตั้ง DNS ตามที่ Vercel บอก: apex ใช้ `A` record ส่วน `www` ใช้ `CNAME` และตั้งให้ `www` redirect ไปที่ apex
4. ไม่ต้องแก้โค้ด เพราะ canonical, OG และ sitemap จะเปลี่ยนไปใช้โดเมนใหม่เองผ่าน `VERCEL_PROJECT_PRODUCTION_URL`
5. (แนะนำ) verify โดเมนใน Resend แล้วตั้ง `CONTACT_FROM_EMAIL=Portfolio <hello@your-domain>` อีเมลจะไม่เข้า spam

CI (`.github/workflows/ci.yml`) จะรัน lint, typecheck, format check และ build ทุกครั้งที่ push ขึ้น `main` หรือ `dev` และทุก PR

## Git workflow

```
feature/xxx ──PR (squash)──▶ dev ──PR (merge commit)──▶ main
                              │                          │
                        Staging (Preview)           Production
```

| Branch                          | ใช้ทำอะไร                                               | Deploy                                                         |
| ------------------------------- | ------------------------------------------------------- | -------------------------------------------------------------- |
| `main`                          | Production ห้าม push ตรง ต้องผ่าน PR จาก `dev` เท่านั้น | https://portfolio-new-book.vercel.app                          |
| `dev`                           | Staging ใช้รวมและทดสอบ feature ก่อนขึ้น production      | https://portfolio-git-dev-new-book.vercel.app (Vercel Preview) |
| `feature/*`, `fix/*`, `chore/*` | ใช้ทำงานทีละเรื่อง แตก branch ออกจาก `dev`              | ได้ลิงก์ Preview จาก Vercel ในแต่ละ PR                         |

**ขั้นตอน**

1. แตก branch ใหม่จาก `dev` เช่น `git checkout -b feature/contact-form origin/dev`
2. เปิด PR เข้า `dev` รอ CI ผ่าน แล้ว merge แบบ **squash**
3. ทดสอบบน staging URL ของ `dev`
4. พอทดสอบผ่านแล้ว เปิด PR จาก `dev` เข้า `main` แล้ว merge แบบ **merge commit** (ไม่ใช้ squash เพื่อให้ประวัติของ `dev` กับ `main` ไม่แยกกัน) จากนั้น Vercel จะ deploy ขึ้น production เอง
