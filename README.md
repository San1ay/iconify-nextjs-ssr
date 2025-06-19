# 🖼️ iconify-nextjs-ssr

A utility to render **[Iconify](https://iconify.design)** icons **server-side** in **Next.js** — with no flickering, no hydration mismatch, and optional dimension stripping.

---

## ✨ Features

- ✅ Fully server-side rendering (SSR) compatible. Can be used inside client component in nextjs as well.
- ✅ Eliminates client-side flicker
- ✅ Optionally remove `width` and `height` attributes
- ✅ Supports custom Iconify hosts
- ✅ Lightweight

---

## 📦 Installation

```bash
pnpm add iconify-nextjs-ssr
# or
npm install iconify-nextjs-ssr
# or
yarn add iconify-nextjs-ssr
```

---

## 🧠 Usage

### In a Server Component (App Router)

```tsx
import StaticIconifyIcon from "iconify-nextjs-ssr";

export default async function Page() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Rendered on the Server</h1>
      <StaticIconifyIcon
        icon="logos:react"
        className="w-12 h-12 text-blue-500"
        removeDimensions
      />
    </div>
  );
}
```

---

### In a Client Component (App Router)

```tsx
"use client";
import StaticIconifyIcon from "iconify-nextjs-ssr";

export default function Page() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Rendered on the Client</h1>
      <StaticIconifyIcon // this will be rendered on server
        icon="logos:react"
        className="w-12 h-12 text-blue-500"
        removeDimensions
      />
    </div>
  );
}
```

## 🧾 Props

| Prop               | Type      | Default                      | Description                                            |
| ------------------ | --------- | ---------------------------- | ------------------------------------------------------ |
| `icon`             | `string`  | – _(required)_               | Icon name in `prefix:name` format (e.g. `logos:react`) |
| `className`        | `string`  | `undefined`                  | CSS classes applied to the `<svg>`                     |
| `removeDimensions` | `boolean` | `false`                      | If true, strips `width` and `height` from the SVG      |
| `host`             | `string`  | `https://api.iconify.design` | Iconify API host to fetch from                         |

---

## 🛡️ SSR Safe

This component is **`async`**, making it perfect for **Next.js 13+ App Router** and **React Server Components**.

---

## 🧪 Example (with multiple icons)

```tsx
import StaticIconifyIcon from "iconify-nextjs-ssr";

const icons = ["logos:react", "logos:java", "mdi:account"];

export default async function IconsRow() {
  return (
    <div className="flex gap-4">
      {await Promise.all(
        icons.map((icon) => (
          <StaticIconifyIcon key={icon} icon={icon} className="w-6 h-6" />
        ))
      )}
    </div>
  );
}
```

---

## 🚀 Why Not `@iconify/react`?

| Feature                 | `@iconify/react` | `iconify-nextjs-ssr` |
| ----------------------- | ---------------- | -------------------- |
| Client-side flicker     | ❌ Yes           | ✅ No                |
| SSR support             | ❌ Partial       | ✅ Full              |
| Async server rendering  | ❌ No            | ✅ Yes               |
| Fully static compatible | ✅ Yes           | ✅ Yes               |
| Lightweight             | ❌ No            | ✅ Yes               |

---

## 📂 Output Directory

This package is bundled using [tsup](https://tsup.egoist.dev/) into:

- **CommonJS:** `dist/main.cjs`
- **ES Module:** `dist/main.js`
- **Types:** `dist/main.d.ts`
