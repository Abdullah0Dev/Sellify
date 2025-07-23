## 📋 Table of Contents

1. 🤖 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. ⚡ [Folder Structure](#folder-structure)
5. 🤸 [Quick Start](#quick-start)
6. 🖼️ [Assets](#assets)
7. 🔗 [Links](#links)
8. 🧩 [Snippets](#snippets)

## 🚨 Tutorial

This repo is part of a full video tutorial on Dev Minds 🧠💻. Perfect for devs who love to learn by doing!

## <a name="introduction">🤖 Introduction</a>

This Full Stack E-Commerce App is built with a clean architecture & modern stack. It features:

* A responsive web-based admin panel 🧑‍💼
* A smooth mobile shopping experience 📱
* A powerful backend for managing products, orders & users 🔧

## <a name="tech-stack">⚙️ Tech Stack</a>

### 🖥️ Admin Panel

* React + Vite ⚡
* TailwindCSS 💨
* Framer Motion 🎞️

### 📱 Mobile App

* React Native + Expo 📦
* Redux Toolkit + React Navigation 🧭
* Moti + Tailwind CSS 🌈

### 🔙 Backend

* Node.js + Express.js 🚀
* MongoDB 🟢
* JWT Auth 🔐

## <a name="features">🔋 Features</a>

✅ Smooth animations and transitions (Moti / Framer Motion) <br />
✅ Admin dashboard with product, order, and user control  <br />
✅ Secure user auth (JWT) <br />
✅ Fully responsive UI (Web + Mobile) <br />
✅ Modern folder structure and clean code <br />
✅ Fast API responses with Express.js <br />
✅ Real-time feedback with clean UX/UI <br />

## <a name="folder-structure">⚡ Folder Structure</a>

```
root
├── admin     # Admin Panel (React + Vite)
├── frontend  # Mobile App (React Native + Expo)
├── backend   # Backend (Node + Express + MongoDB)
```

## <a name="quick-start">🤸 Quick Start</a>

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Abdullah0Dev/Sellify.git
cd Sellify
```

### 2️⃣ Install Admin Panel

```bash
cd admin
npm install
npm run dev
```

### 3️⃣ Install Backend

```bash
cd ../backend
npm install
npm start
```

Set up `.env` with your MongoDB URI.

### 4️⃣ Run React Native Expo App

```bash
cd ../frontend
npm install
npx expo start
```

Use Expo Go or simulator to preview the mobile app 📱

## <a name="assets">🖼️ Assets</a>

👉 [Google Drive Assets 📂](https://drive.google.com/drive/folders/1L1rxpyGG27UXTISyfPVtNuSHLIEc08FV?usp=sharing)

## <a name="links">🔗 Links</a>

* 🎨 [Figma Design](https://www.figma.com/design/r2oLfsjVOOHBRAmV9zxc8p/eCommerce-App-UI-Kit---Case-Study-Ecommerce-Mobile-App-UI-kit-%28Community%29?node-id=1-16990&t=aGKMq0fjCva2xjBh-1)
* 📺 [YouTube Channel](https://www.youtube.com/@Dev-Minds/videos)

## <a name="snippets">🧩 Snippets</a>

Here are some useful constants and shared config files used in the app 👇

### 📌 `frontend/src/constants/index.ts`

```ts
export const COLORS = {
  primary: '#007bff',
  secondary: '#6c757d',
  white: '#ffffff',
  black: '#000000',
};

export const SIZES = {
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,
};

export const FONTS = {
  regular: 'System',
  bold: 'System',
};
```

👉 [View on GitHub](https://github.com/Abdullah0Dev/Sellify-progress/blob/main/frontend/src/constants/index.ts)
