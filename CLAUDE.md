# CLAUDE.md — GrowStore POS Landing Page

## Project Overview

**GrowStore POS** คือเว็บไซต์ Marketing Landing Page สำหรับโปรแกรม POS (ระบบขายหน้าร้าน) ที่เจาะกลุ่ม SME ไทย  
เว็บนี้ทำหน้าที่แนะนำสินค้า เปรียบเทียบแพ็คเกจ และให้ผู้ใช้ทดลอง POS Demo ได้เลยในเบราว์เซอร์

> **Pure Frontend** — ไม่มี backend จริง ข้อมูลทั้งหมดอยู่ใน `src/data.ts`

---

## Tech Stack

| Layer | Library | Version |
|---|---|---|
| Framework | React + Vite | React 19, Vite 6 |
| Styling | Tailwind CSS | v4 (via `@tailwindcss/vite`) |
| Animation | motion/react (Framer) | v12 |
| Icons | lucide-react | latest |
| Language | TypeScript | ~5.8 |
| AI (optional) | @google/genai (Gemini) | v2 |

---

## Folder Structure

```
src/
├── components/           # หนึ่ง component ต่อหนึ่ง "หน้า"
│   ├── Navbar.tsx        # Top navigation + language toggle
│   ├── Footer.tsx        # Footer links
│   ├── HomeView.tsx      # Landing / Hero page
│   ├── ProductsView.tsx  # หน้าสินค้าและ business types
│   ├── PackagesView.tsx  # ตารางราคา + feature comparison
│   ├── GuidesView.tsx    # คู่มือ / FAQ
│   ├── ContactView.tsx   # แบบฟอร์มติดต่อ
│   ├── POSDemo.tsx       # POS simulator ลองใช้งาน
│   └── LoginModal.tsx    # Modal เลือก plan
├── data.ts               # ⭐ ข้อมูลทั้งหมด (แก้ที่นี่เพื่อเปลี่ยนเนื้อหา)
├── types.ts              # TypeScript interfaces
├── App.tsx               # Root: routing, toast, login state
├── main.tsx              # Entry point
└── index.css             # Global CSS + Tailwind import
```

---

## Page Routing Pattern

ใช้ `useState<ActivePage>` ใน `App.tsx` แทน React Router  
การเพิ่มหน้าใหม่ต้องทำ 3 จุด:

```typescript
// 1. types.ts — เพิ่ม union type
export type ActivePage = 'home' | 'products' | ... | 'new-page';

// 2. App.tsx — เพิ่ม AnimatePresence block
{currentPage === 'new-page' && (
  <motion.div key="new-page" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.25 }}>
    <NewPageView language={language} />
  </motion.div>
)}

// 3. Navbar.tsx — เพิ่ม nav item
```

---

## Bilingual Pattern (TH/EN)

ทุก component รับ `language: 'TH' | 'EN'` เป็น prop  
Pattern มาตรฐาน:

```typescript
const isTH = language === 'TH';
// ใช้ inline ternary
<h1>{isTH ? 'ยินดีต้อนรับ' : 'Welcome'}</h1>
```

**ไม่มี i18n library** — ข้อความทุกตัวเขียน inline ในไฟล์ component

---

## Data Layer

ข้อมูลทั้งหมดอยู่ที่ `src/data.ts` — แก้ไขที่นี่เพื่อเปลี่ยนเนื้อหาเว็บ:

| Export | ใช้ที่ | ทำอะไร |
|---|---|---|
| `BUSINESS_TYPES` | ProductsView | กลุ่มธุรกิจเป้าหมาย |
| `PRICING_PLANS` | PackagesView | ราคาและ feature ย่อ |
| `PACKAGE_CATEGORIES` | PackagesView | ตาราง feature comparison |
| `DEMO_PRODUCTS` | POSDemo | สินค้าตัวอย่างใน POS demo |
| `FAQS` | GuidesView | คำถามที่พบบ่อย |

---

## Pricing Plans

| ID | ชื่อ | ราคา |
|---|---|---|
| `free` | ฟรี | ฿0 |
| `s` | S | ฿99/เดือน |
| `m` | M (ยอดนิยม) | ฿390/เดือน |
| `l` | L | ฿590/เดือน |
| `pro` | Pro | ฿1,490/เดือน |

`demoPlan` state ใน `App.tsx` ควบคุมว่า POS Demo ปลดล็อก feature อะไร

---

## Component Props Pattern

Props ที่พบในทุก component:

```typescript
interface ViewProps {
  language: 'TH' | 'EN';
  setCurrentPage?: (page: ActivePage) => void;  // ถ้าต้องนำทาง
}
```

---

## Naming Conventions

- **Component files**: `PascalCase.tsx` (เช่น `HomeView.tsx`)
- **Pages**: ลงท้ายด้วย `View` (เช่น `ProductsView`)
- **Types**: `PascalCase` ใน `types.ts`
- **Data constants**: `SCREAMING_SNAKE_CASE` ใน `data.ts`
- **CSS**: Tailwind utility classes เท่านั้น — ไม่มี `.css` module แยก

---

## Dev Commands

```bash
npm run dev      # Start dev server at http://localhost:3000
npm run build    # Build ไว้ใน dist/
npm run lint     # TypeScript type check
npm run preview  # Preview production build
```

---

## Common Tasks for Junior Dev

### เพิ่มสินค้าใน POS Demo
แก้ไข array `DEMO_PRODUCTS` ใน [src/data.ts](src/data.ts)

### เพิ่ม FAQ
แก้ไข array `FAQS` ใน [src/data.ts](src/data.ts)

### เปลี่ยนราคา package
แก้ `price` ใน `PRICING_PLANS` และ `PACKAGE_CATEGORIES` ใน [src/data.ts](src/data.ts)

### เพิ่ม animation
ใช้ `<motion.div>` จาก `motion/react` — ดูตัวอย่างใน `App.tsx`

---

## Safety Rules

- ❌ ห้ามแก้ไข `package-lock.json` โดยตรง — ใช้ `npm install` เสมอ
- ❌ ห้าม hardcode URL รูปภาพในไฟล์ TS — เก็บไว้ใน `data.ts`
- ✅ เพิ่ม type ใหม่ทุกตัวลง `types.ts` ก่อนใช้
- ✅ ทดสอบทั้งภาษา TH และ EN เมื่อแก้ไข text
- ✅ ทุก component ใหม่ต้องรับ `language` prop

---

## When Done — Summary Format

```
✅ สิ่งที่เปลี่ยน:
- [ไฟล์ที่แก้]

🌐 Bilingual Check:
- ทดสอบ TH / EN แล้ว: [ใช่/ไม่]

🎯 เหตุผล:
- [ทำไมถึงเลือกแนวทางนี้]

⚠️ ต้องระวัง:
- [edge case หรือ dependency]
```
