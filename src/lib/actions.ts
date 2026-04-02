'use server';

import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { writeFile } from 'fs/promises';
import { join } from 'path';

// ----- BOOK FETCHING -----

interface BookFilters {
  lang?: string;
  genre?: string;
  mediaType?: string;
  search?: string;
  page?: number;
  perPage?: number;
}

export interface CharacterData {
  id: string;
  name: string;
  role: string;
  description: string;
}

export interface MediaData {
  id: string;
  type: string;
  title: string;
  author: string;
  url: string;
  duration: string | null;
}

export interface PublicBook {
  id: string;
  title: string;
  author: string;
  publishedYear: number | null;
  coverUrl: string | null;
  description: string | null;
  plotSummary?: string | null;
  userName?: string | null;
  characters?: CharacterData[];
  media?: MediaData[];
}

export async function getBooks(filters: BookFilters = {}): Promise<{ books: PublicBook[]; total: number; page: number; totalPages: number }> {
  try {
    const page = filters.page || 1;
    const perPage = filters.perPage || 12;

    const whereClause: any = { isPublic: true };
    
    if (filters.search) {
      whereClause.OR = [
        { title: { contains: filters.search } },
        { author: { contains: filters.search } },
      ];
    }

    const [books, total] = await Promise.all([
      prisma.book.findMany({
        where: whereClause,
        include: { 
          user: { select: { name: true } },
          characters: true,
          media: true
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * perPage,
        take: perPage,
      }),
      prisma.book.count({ where: whereClause }),
    ]);

    const mapped = books.map((b: any) => ({
      id: b.id,
      title: b.title,
      author: b.author,
      publishedYear: b.publishedYear,
      coverUrl: b.coverUrl,
      description: b.descEn,
      plotSummary: b.plotSummary || null,
      userName: b.user?.name,
      characters: b.characters || [],
      media: b.media || [],
    }));

    return { books: mapped, total, page, totalPages: Math.ceil(total / perPage) };
  } catch (err) {
    console.error('getBooks error', err);
    return { books: [], total: 0, page: 1, totalPages: 1 };
  }
}

export async function getBookById(id: string): Promise<PublicBook | null> {
  const b = await prisma.book.findUnique({
    where: { id },
    include: { 
      user: { select: { name: true } },
      characters: true,
      media: true
    },
  });
  if (!b) return null;
  return {
    id: b.id,
    title: b.title,
    author: b.author,
    publishedYear: b.publishedYear,
    coverUrl: b.coverUrl,
    description: b.descEn,
    plotSummary: b.plotSummary,
    userName: b.user?.name,
    characters: b.characters,
    media: b.media,
  };
}

export async function getLatestBooks(limit: number = 4): Promise<PublicBook[]> {
  const books = await prisma.book.findMany({
    where: { isPublic: true },
    include: { 
      user: { select: { name: true } },
      characters: true,
      media: true
    },
    orderBy: { createdAt: 'desc' },
    take: limit,
  });
  return books.map((b) => ({
    id: b.id,
    title: b.title,
    author: b.author,
    publishedYear: b.publishedYear,
    coverUrl: b.coverUrl,
    description: b.descEn,
    plotSummary: b.plotSummary,
    userName: b.user?.name,
    characters: b.characters,
    media: b.media,
  }));
}

// ----- DASHBOARD: USER'S BOOKS -----

export interface UserBook {
  id: string;
  title: string;
  author: string;
  published_year: number | null;
  cover_url: string | null;
  desc_en: string | null;
  isPublic: boolean;
  created_at: string;
}

export async function getUserBooks(): Promise<{ books: UserBook[]; error: string | null }> {
  try {
    const session = await getServerSession(authOptions);
    const user = session?.user;

    if (!user) {
      return { books: [], error: 'Not authenticated' };
    }

    const data = await prisma.book.findMany({
      where: { userId: user.id },
      include: { characters: true, media: true },
      orderBy: { createdAt: 'desc' },
    });

    const formattedBooks = data.map((b: any) => ({
      id: b.id,
      title: b.title,
      author: b.author,
      published_year: b.publishedYear,
      cover_url: b.coverUrl,
      desc_en: b.descEn,
      isPublic: b.isPublic,
      created_at: b.createdAt.toISOString(),
    }));

    return { books: formattedBooks, error: null };
  } catch (err) {
    console.error('getUserBooks error:', err);
    return { books: [], error: 'Failed to load books' };
  }
}

// ----- DASHBOARD: ADD BOOK -----

export async function addBook(formData: FormData) {
  try {
    const session = await getServerSession(authOptions);
    const user = session?.user;

    if (!user?.id) {
      return { success: false, message: 'You must be logged in to add a book.' };
    }

    const title = formData.get('title') as string;
    const author = formData.get('author') as string;
    const published_year = formData.get('published_year') as string;

    // Upload cover locally if provided
    let cover_url: string | null = null;
    const coverFile = formData.get('cover') as File;
    if (coverFile && coverFile.size > 0) {
      const ext = coverFile.name.split('.').pop() || 'jpg';
      const filename = `${user.id}_${Date.now()}.${ext}`;
      const bytes = await coverFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const path = join(process.cwd(), 'public', 'uploads', filename);
      await writeFile(path, buffer);
      cover_url = `/litlab/uploads/${filename}`;
    }

    // Get descriptions and flags
    const desc_en = formData.get('description_en') as string || '';
    const plotSummary = formData.get('plotSummary') as string || null;
    const isPublic = formData.get('isPublic') === 'on';

    // Handle characters
    const charactersStr = formData.get('charactersJson') as string;
    let characters = [];
    try { if (charactersStr) characters = JSON.parse(charactersStr); } catch(e) {}

    // Handle media and files
    const mediaStr = formData.get('mediaJson') as string;
    let mediaItems = [];
    try { if (mediaStr) mediaItems = JSON.parse(mediaStr); } catch(e) {}

    for (let i = 0; i < mediaItems.length; i++) {
        const file = formData.get(`media_file_${i}`) as File;
        if (file && file.size > 0) {
            const ext = file.name.split('.').pop() || 'tmp';
            const filename = `media_${user.id}_${Date.now()}_${i}.${ext}`;
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const path = join(process.cwd(), 'public', 'uploads', filename);
            await writeFile(path, buffer);
            mediaItems[i].url = `/litlab/uploads/${filename}`;
        }
    }

    await prisma.book.create({
      data: {
        title,
        author,
        publishedYear: published_year ? parseInt(published_year) : null,
        coverUrl: cover_url,
        descEn: desc_en,
        plotSummary,
        isPublic,
        userId: user.id,
        characters: {
            create: characters.map((c: any) => ({
                name: c.name,
                role: c.role,
                description: c.description
            }))
        },
        media: {
            create: mediaItems.map((m: any) => ({
                type: m.type,
                title: m.title,
                author: m.author,
                url: m.url,
                duration: m.duration || null
            }))
        }
      },
    });

    return {
      success: true,
      message: `Book "${title}" by ${author} has been added successfully!`,
    };
  } catch (err) {
    console.error('addBook error:', err);
    return { success: false, message: 'Unexpected error occurred.' };
  }
}

// ----- DELETE BOOK -----

export async function deleteBook(bookId: string) {
  try {
    const session = await getServerSession(authOptions);
    const user = session?.user;

    if (!user?.id) {
      return { success: false, message: 'Not authenticated' };
    }

    const book = await prisma.book.findUnique({
      where: { id: bookId },
    });

    if (!book || book.userId !== user.id) {
      return { success: false, message: 'Book not found or unauthorized' };
    }

    await prisma.book.delete({
      where: { id: bookId },
    });

    return { success: true, message: 'Book deleted successfully.' };
  } catch (err: any) {
    console.error('deleteBook error:', err);
    return { success: false, message: err.message || 'Failed to delete book.' };
  }
}
