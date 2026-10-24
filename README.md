# AwaNexus Portal — Setup and Deployment

A React + TypeScript + Vite website with Three.js visuals. This repository includes the source code and the required `public/assets` images/logos.

## 1. Requirements

- Install **Node.js LTS** from https://nodejs.org (npm is included).
- Install **Git** from https://git-scm.com/downloads.
- Extract this project folder to a normal location, e.g. `C:\Projects\awanexus-portal`.

## 2. Run locally on Windows

1. Open the extracted `awanexus-portal` folder in File Explorer.
2. Click the address bar, type `cmd`, and press Enter (or open it in VS Code and choose **Terminal → New Terminal**).
3. Run these commands one at a time:

```bash
npm install
npm run dev
```

4. Open the local address Vite prints, usually `http://localhost:5173/`.
5. Stop the server with **Ctrl+C** in the terminal.

If you want to test the production build:

```bash
npm run build
npm run preview
```

The build output is created in `dist/`. Do not edit `dist/` directly; edit files in `src/` and rebuild.

## 3. Upload the project to GitHub

1. Sign in to https://github.com and create a **New repository** (for example `awanexus-portal`).
2. For a private client/business project, choose **Private** unless you deliberately want the source public. Do not add a README, `.gitignore`, or license on GitHub because this project already contains them.
3. Open a terminal in the project root (the folder containing `package.json`) and run:

```bash
git init
git add .
git commit -m "Initial AwaNexus website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/awanexus-portal.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your GitHub username. GitHub will show the repository URL after you create it. If Git asks you to sign in, complete the browser authentication prompt. Do not put passwords or access tokens into the remote URL.

For later changes:

```bash
git add .
git commit -m "Describe your changes"
git push
```

## 4. Publish the website

**Recommended simple option: Vercel connected to GitHub.**

1. Push the repository to GitHub using the steps above.
2. Open https://vercel.com and sign in with GitHub.
3. Choose **Add New → Project**, import `awanexus-portal`.
4. Keep the detected framework as **Vite**. Build command: `npm run build`; output directory: `dist`.
5. Select **Deploy**. Vercel will provide a public URL and can redeploy after each push to `main`.

The included `vercel.json` configures SPA rewrites for Vercel. GitHub is where your code is stored; Vercel is the web host.

## 5. Important limitations before real customer use

This version currently saves orders, bookings, inquiries, and settings in the visitor's **browser localStorage**, not in a shared online database. Data entered by a visitor will not automatically appear on your own device or the admin dashboard on another device. Clearing browser storage can erase it. The demo administrator login is implemented in front-end code and is **not secure authentication**. Do not use this version to handle real customer/private data or treat it as a production order-management system until a secure backend and server-side authentication are added (for example, Supabase with row-level security and server-side admin checks).

The demo login credentials in `src/pages/LoginPage.tsx` are visible to anyone who can inspect the public JavaScript. Change/remove demo credentials before publishing, but note that changing them alone does not make client-side authentication secure.

## 6. Troubleshooting

- **`npm` is not recognized:** install Node.js LTS, close and reopen the terminal, then check `node -v` and `npm -v`.
- **Dependency/build errors:** from the project root run `npm install`, then `npm run build`. Make sure installation completes successfully before building.
- **Port 5173 is busy:** Vite will offer another local port; open the URL printed in the terminal.
- **Changes do not appear:** stop the server with Ctrl+C and run `npm run dev` again; hard-refresh the browser.

## Project commands

| Command | Purpose |
|---|---|
| `npm install` | Install dependencies |
| `npm run dev` | Start local development server |
| `npm run build` | Type-check and create production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run Oxlint |
