# Add New Page to GrowStore POS

Add a new page/section to the landing site following the existing routing pattern.

## Required Argument

`$ARGUMENTS` — name of the new page in kebab-case (e.g. `about`, `case-studies`, `pricing-detail`)

## Steps

Follow these steps in order:

### 1. Add to ActivePage type — `src/types.ts`

```typescript
export type ActivePage = 'home' | 'products' | 'packages' | 'guides' | 'contact' | 'pos-demo' | '$ARGUMENTS';
```

### 2. Create the component — `src/components/<PascalCase>View.tsx`

```typescript
interface <PascalCase>ViewProps {
  language: 'TH' | 'EN';
  setCurrentPage?: (page: ActivePage) => void;
}

export default function <PascalCase>View({ language }: <PascalCase>ViewProps) {
  const isTH = language === 'TH';
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1>{isTH ? 'ชื่อหน้า TH' : 'Page Title EN'}</h1>
    </div>
  );
}
```

### 3. Add route in `src/App.tsx`

Import the component, then add inside `<AnimatePresence>`:

```tsx
{currentPage === '$ARGUMENTS' && (
  <motion.div
    key="$ARGUMENTS"
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -15 }}
    transition={{ duration: 0.25 }}
  >
    <NewView language={language} setCurrentPage={setCurrentPage} />
  </motion.div>
)}
```

### 4. Add nav link in `src/components/Navbar.tsx`

Find the nav items array and add:
```typescript
{ id: '$ARGUMENTS', labelTH: 'ชื่อเมนู', labelEN: 'Menu Name' }
```

## Checklist After Adding

- [ ] Page renders without TypeScript errors (`npm run lint`)
- [ ] Navigation link appears in Navbar
- [ ] Page transition animation works
- [ ] Both TH and EN text are present
- [ ] `setCurrentPage` wired if page has CTA buttons
