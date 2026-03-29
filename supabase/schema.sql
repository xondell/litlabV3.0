-- LitLab Database Schema
-- Run this in the Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- AUTHORS TABLE
-- ============================================
CREATE TABLE authors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  bio_en TEXT,
  bio_ru TEXT,
  bio_ro TEXT,
  bio_fr TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- BOOKS TABLE
-- ============================================
CREATE TABLE books (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  isbn TEXT UNIQUE,
  author_id UUID REFERENCES authors(id) ON DELETE CASCADE,
  cover_url TEXT,
  published_year INT,
  genre TEXT DEFAULT 'fiction',
  status TEXT DEFAULT 'active', -- active, archived, pending
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_books_author ON books(author_id);
CREATE INDEX idx_books_genre ON books(genre);

-- ============================================
-- BOOK CONTENT TABLE (multi-language)
-- ============================================
CREATE TABLE book_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  book_id UUID REFERENCES books(id) ON DELETE CASCADE,
  lang_code TEXT NOT NULL CHECK (lang_code IN ('en', 'ru', 'ro', 'fr')),
  title TEXT NOT NULL,
  description TEXT,
  plot_summary TEXT,
  characters JSONB DEFAULT '[]'::JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(book_id, lang_code)
);

CREATE INDEX idx_book_content_book ON book_content(book_id);
CREATE INDEX idx_book_content_lang ON book_content(lang_code);

-- ============================================
-- LIBRARY MEDIA TABLE
-- ============================================
CREATE TABLE library_media (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  book_id UUID REFERENCES books(id) ON DELETE CASCADE,
  file_type TEXT NOT NULL CHECK (file_type IN ('podcast', 'video', 'pdf_game', 'infographic')),
  lang_code TEXT NOT NULL CHECK (lang_code IN ('en', 'ru', 'ro', 'fr')),
  file_url TEXT NOT NULL,
  file_data JSONB DEFAULT '{}'::JSONB,
  -- file_data contains: { duration, student_author, title }
  is_approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_library_media_book ON library_media(book_id);
CREATE INDEX idx_library_media_type ON library_media(file_type);

-- ============================================
-- ROW LEVEL SECURITY POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE books ENABLE ROW LEVEL SECURITY;
ALTER TABLE book_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE library_media ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public can read authors" ON authors FOR SELECT USING (true);
CREATE POLICY "Public can read books" ON books FOR SELECT USING (true);
CREATE POLICY "Public can read book_content" ON book_content FOR SELECT USING (true);
CREATE POLICY "Public can read approved media" ON library_media FOR SELECT USING (is_approved = true);

-- Authenticated write access
CREATE POLICY "Authenticated can insert authors" ON authors FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can insert books" ON books FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can insert book_content" ON book_content FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can insert media" ON library_media FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Enable realtime for library_media (for the realtime example)
ALTER PUBLICATION supabase_realtime ADD TABLE library_media;

-- ============================================
-- STORAGE BUCKETS (run these separately or via Supabase UI)
-- ============================================
-- 1. Create a bucket named 'covers' (public) for book cover images
-- 2. Create a bucket named 'lab-materials' (public) for podcast mp3s, PDFs, etc.
--
-- In Supabase Dashboard:
--   Storage > New Bucket > Name: "covers" > Public: checked
--   Storage > New Bucket > Name: "lab-materials" > Public: checked
