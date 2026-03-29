'use server';

import { MOCK_BOOKS, MockBook } from '@/lib/mockData';

// ----- BOOK FETCHING -----

interface BookFilters {
  lang?: string;
  genre?: string;
  mediaType?: string;
  search?: string;
  page?: number;
  perPage?: number;
}

interface PaginatedBooks {
  books: MockBook[];
  total: number;
  page: number;
  totalPages: number;
}

export async function getBooks(filters: BookFilters = {}): Promise<PaginatedBooks> {
  // In production, this would query Supabase.
  // For now, filter mock data.
  let result = [...MOCK_BOOKS];

  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter((book) => {
      const matchTitle = book.content.some((c) => c.title.toLowerCase().includes(q));
      const matchAuthor = book.author.name.toLowerCase().includes(q);
      return matchTitle || matchAuthor;
    });
  }

  if (filters.genre) {
    result = result.filter((b) => b.genre === filters.genre);
  }

  if (filters.lang) {
    result = result.filter((b) => b.content.some((c) => c.lang_code === filters.lang));
  }

  if (filters.mediaType) {
    result = result.filter((b) => b.media.some((m) => m.file_type === filters.mediaType));
  }

  const page = filters.page || 1;
  const perPage = filters.perPage || 12;
  const total = result.length;
  const totalPages = Math.ceil(total / perPage);
  const start = (page - 1) * perPage;
  const books = result.slice(start, start + perPage);

  return { books, total, page, totalPages };
}

export async function getBookById(id: string): Promise<MockBook | null> {
  // In production, this fetches from Supabase with joins:
  // SELECT b.*, a.name as author_name,
  //   json_agg(DISTINCT bc.*) as content,
  //   json_agg(DISTINCT lm.*) as media
  // FROM books b
  // JOIN authors a ON b.author_id = a.id
  // LEFT JOIN book_content bc ON bc.book_id = b.id
  // LEFT JOIN library_media lm ON lm.book_id = b.id
  // WHERE b.id = $1
  // GROUP BY b.id, a.name

  return MOCK_BOOKS.find((b) => b.id === id) || null;
}

export async function getLatestBooks(limit: number = 4): Promise<MockBook[]> {
  return MOCK_BOOKS.slice(0, limit);
}

// ----- DASHBOARD: ADD BOOK -----

export async function addBook(formData: FormData) {
  // In production:
  // 1. Upload cover to Supabase Storage 'covers' bucket
  // 2. Insert author into 'authors' table
  // 3. Insert book into 'books' table
  // 4. For each language, insert into 'book_content'
  // 5. Upload media files to 'lab-materials' bucket
  // 6. Insert media metadata into 'library_media'

  const title = formData.get('title') as string;
  const author = formData.get('author') as string;
  const genre = formData.get('genre') as string;

  console.log('Adding book:', { title, author, genre });

  // Simulate server action
  return {
    success: true,
    message: `Book "${title}" by ${author} has been submitted for review.`,
  };
}

// ----- AUTH (example wrapper) -----

export async function signIn(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  // In production, use Supabase Auth:
  // const supabase = await createClient();
  // const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  console.log('Sign in attempt:', email);

  return {
    success: true,
    message: 'Signed in successfully (mock)',
  };
}

export async function signUp(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  console.log('Sign up attempt:', email);

  return {
    success: true,
    message: 'Account created (mock). Check your email for verification.',
  };
}
