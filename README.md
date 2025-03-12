# Draw-App 🎨  

An **Excalidraw-like** collaborative drawing app built using **Next.js, WebSockets, and Turborepo**. This project enables real-time drawing with shared sessions, making it great for brainstorming and visual collaboration.  

## 🚀 Features  
- 📌 **Real-time collaboration** using WebSockets  
- 🖍️ **Draw and manipulate shapes** on the canvas  
- 🎨 **Support for multiple shapes** (rectangle, circle, etc.)  
- ⚡ **Fast performance** with Turborepo and caching  
- 🛠️ **Built with Next.js & TypeScript**  

## 📂 Project Structure  
- `apps/web` → Next.js frontend  
- `apps/backend` → WebSocket & API backend  
- `packages/ui` → Shared UI components  
- `packages/config` → TypeScript & ESLint configs  

## 🛠️ Installation  

```bash
git clone https://github.com/AkhilKumar1601/draw-app.git
cd draw-app
pnpm install
pnpm dev
