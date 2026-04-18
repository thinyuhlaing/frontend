# Modular Next.js Application

A **modular Next.js application** built with the **App Router**, **RTK Query**, and a **feature-driven architecture**.

Each feature module is **self-contained**, including its:

- Pages
- API
- State
- Types
- Components

This makes the system **scalable**, **maintainable**, and **easy to extend**.

---

# 🏗️ Project Structure

```yaml
src:
  app:
    "[...segments]":
      page.tsx        # Catch-all route: dynamically loads module pages
    globals.css       # Global styles
    layout.tsx        # Root layout
    page.tsx          # Homepage (lists enabled modules)

  api:
    "[...segments]":
      route.ts        # Dynamic API routes

  lib:
    config:
      index.ts
    store:
      hook.ts
      index.ts
    permissions.ts    # Permission logic + usePermissions hook
    ReduxProvider.tsx
    register.ts
    tenant.tsx        # Tenant context + enabled modules

  modules:
    base:
      api:
        routes.ts
      components:
        TextField.tsx
      hooks:
        index.ts
      pages:
        Page.tsx
      store:
        services:
          baseApi.ts
        slices:
          baseSlice.ts
      styles:
        base.css
      types:
        base.ts
      utils:
        index.ts
      manifest.ts

  moduleRegistry.tsx  # Registers modules dynamically
  moduleTypes.ts      # Shared TypeScript types

package.json
next.config.ts
tsconfig.json
README.md
```

---

# ⚙️ TypeScript Path Aliases

Update your **`tsconfig.json`** with the following path aliases:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*", "./*"],
      "@/registry": ["./src/lib/registry"],
      "@/modules/*": ["./src/modules/*"]
    }
  }
}
```

These aliases allow cleaner imports such as:

```ts
import { usePermissions } from "@/registry";
import BaseComponent from "@/modules/base/components/TextField";
```

---

# 📦 Modules

The application currently includes the following modules:

```
modules
 ├── base
 └── website
```

Each module follows the same **modular architecture pattern**.

---

# 📦 Required Packages

Install the required dependencies:

```bash
npm install \
@fortawesome/fontawesome-svg-core \
@fortawesome/free-brands-svg-icons \
@fortawesome/free-regular-svg-icons \
@fortawesome/free-solid-svg-icons \
@fortawesome/react-fontawesome \
@reduxjs/toolkit \
react-redux \
lottie-react \
motion \
react-hook-form
```

---

# ⚡ Key Features

- **Modular Architecture**  
  Each feature module is self-contained with its own pages, API, state, and types.

- **Next.js App Router**  
  Dynamic catch-all routing loads module pages seamlessly.

- **RTK Query**  
  Handles API calls with c  dashboard,
aching and auto-generated hooks.

- **Tenant-aware System**  
  Modules and routes are filtered based on tenant context and permissions.

- **Dynamic Navigation**  
  Navigation menu is generated from module manifests.

---

# 🛠️ Tech Stack

- **Next.js 14+ (App Router)**
- **TypeScript**
- **Redux Toolkit + RTK Query**
- **React Hook Form**
- **Framer Motion**
- **Lottie Animations**
- **FontAwesome Icons**
- **CSS / Global Styles**

---

# 🚀 Getting Started

## 1. Clone the repository

```bash
git clone https://github.com/BEE-Data-Myanmar/framework.git
cd framework
```

---

## 2. Install dependencies

```bash
npm install
```

---

## 3. Create `.env` file

Create a `.env` file in the project root:

```env
NEXT_PUBLIC_APP_API_BASE_URL=http://localhost:3000/api
ODOO_BASE_URL=https://odoo.com
ODOO_DB=MyDatabase
```

---

## 4. Run the development server

```bash
npm run dev
```

---

## 5. Open the application

```
http://localhost:3000
```

---

# 📌 Notes

- All custom styles follow **CSS variables** for consistent theming.
- Modules are enabled/disabled through the **Tenant context**.
- Navigation and routes are dynamically generated from **module manifests**.
- API communication is handled using **RTK Query**.

---
