# Run GrowStore POS Dev Server

Start the Vite development server and confirm it's running.

## Steps

1. Run `npm run dev` in the project root (`c:\Users\User\Downloads\growstore-pos`)
2. Wait for "ready" message — server starts at **http://localhost:3000**
3. Open the browser to verify the landing page loads
4. Check console for any TypeScript or build errors

## Expected Output

```
VITE v6.x.x  ready in XXX ms

➜  Local:   http://localhost:3000/
➜  Network: http://0.0.0.0:3000/
```

## If Port 3000 is Busy

```bash
# Kill whatever is using port 3000 first
npx kill-port 3000
npm run dev
```

## What to Verify After Start

- [ ] Home page renders (Hero section visible)
- [ ] Navbar language toggle (TH ↔ EN) works
- [ ] Packages page loads pricing table
- [ ] POS Demo page: can add items to cart
- [ ] No red errors in browser console
