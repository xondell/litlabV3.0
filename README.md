# LitLab — Multimedia Literature Hub

LitLab is a full-stack, multi-lingual literature laboratory web application built with **Next.js**, **TypeScript**, and **Supabase**. It connects physical library books (via QR codes) to student-created multimedia content such as podcasts, games, infographics, and videos.

## 🚀 Features

- **Bold Brutalist UI**: High-contrast Lime Green (#C1FF00) and Black (#000000) design.
- **Universal Content Form**: A smart form for creating new books or adding media projects to existing ones.
- **Multi-lingual Support**: Full internationalization (i18n) for English, Russian, Romanian, and French.
- **Global Audio Player**: Persistent playback of student podcasts across the entire site.
- **Interactive Theater**: Media gallery with video embeds, PDFs, and character maps.
- **Robust Auth**: Protected routes for content creators.

## 🛠 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **Database/Auth**: Supabase (PostgreSQL)
- **State Management**: Zustand
- **Components**: Framer Motion, Lucide Icons

## 📦 Getting Started

1. Clone the repository.
2. Install dependencies: `npm install`
3. Set up your `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```
4. Run the development server: `npm run dev`

## 🧪 Database Setup

Run the SQL scripts located in `supabase/schema_v2.sql` in your Supabase SQL Editor.
Create two storage buckets: `covers` and `lab-materials` (both **Public**).

---
Created with ❤️ for students and literature lovers.
