-- Role: Senior Full-Stack Developer
-- Task: Authentication system and a Universal Content Creation Form
-- Supabase SQL Script

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- PROFILES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT,
  full_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- BOOKS TABLE
-- ============================================
-- Including year and multi-lang descriptions as requested in Mode 1
CREATE TABLE IF NOT EXISTS books (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  published_year INT,
  cover_url TEXT,
  desc_en TEXT,
  desc_ru TEXT,
  desc_ro TEXT,
  desc_fr TEXT,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- LIBRARY MEDIA TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS library_media (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  book_id UUID REFERENCES books(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('podcast', 'infographic', 'board_game', 'video')),
  lang_code TEXT NOT NULL CHECK (lang_code IN ('en', 'ru', 'ro', 'fr')),
  file_url TEXT NOT NULL,
  student_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ROW LEVEL SECURITY POLICIES
-- ============================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE books ENABLE ROW LEVEL SECURITY;
ALTER TABLE library_media ENABLE ROW LEVEL SECURITY;

-- 1. Profiles
CREATE POLICY "Public profiles are viewable by everyone." ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile." ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile." ON profiles FOR UPDATE USING (auth.uid() = id);

-- 2. Books
CREATE POLICY "Books are viewable by everyone." ON books FOR SELECT USING (true);
CREATE POLICY "Users can insert their own books." ON books FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own books." ON books FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own books." ON books FOR DELETE USING (auth.uid() = user_id);

-- 3. Library Media
CREATE POLICY "Media is viewable by everyone." ON library_media FOR SELECT USING (true);
CREATE POLICY "Users can insert their own media." ON library_media FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own media." ON library_media FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own media." ON library_media FOR DELETE USING (auth.uid() = user_id);

-- ============================================
-- TRIGGER: Create profile on signup
-- ============================================
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, full_name)
  VALUES (new.id, new.raw_user_meta_data->>'username', new.raw_user_meta_data->>'full_name');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- ============================================
-- STORAGE INSTRUCTIONS (Run as superuser, or via UI)
-- ============================================
-- INSERT INTO storage.buckets (id, name, public) VALUES ('covers', 'covers', true);
-- INSERT INTO storage.buckets (id, name, public) VALUES ('lab-materials', 'lab-materials', true);
