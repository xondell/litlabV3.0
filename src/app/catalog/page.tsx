'use client';

import { useState, useEffect, useCallback } from 'react';
import BookCard from '@/components/BookCard';
import { getBooks } from '@/lib/actions';
import { MockBook, SUPPORTED_LANGUAGES, GENRES, MEDIA_TYPES } from '@/lib/mockData';

export default function CatalogPage() {
  const [books, setBooks] = useState<MockBook[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  // Filters
  const [langFilter, setLangFilter] = useState('');
  const [genreFilter, setGenreFilter] = useState('');
  const [mediaFilter, setMediaFilter] = useState('');
  const [search, setSearch] = useState('');

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    const result = await getBooks({
      lang: langFilter || undefined,
      genre: genreFilter || undefined,
      mediaType: mediaFilter || undefined,
      search: search || undefined,
      page,
      perPage: 12,
    });
    setBooks(result.books);
    setTotal(result.total);
    setTotalPages(result.totalPages);
    setLoading(false);
  }, [langFilter, genreFilter, mediaFilter, search, page]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const clearFilters = () => {
    setLangFilter('');
    setGenreFilter('');
    setMediaFilter('');
    setSearch('');
    setPage(1);
  };

  const hasFilters = langFilter || genreFilter || mediaFilter || search;

  return (
    <div className="bg-primary min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-black text-black">Book Catalog</h1>
          <p className="mt-2 text-base font-medium text-black/60">
            Browse {total} books in our literary laboratory
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white/50 backdrop-blur border-2 border-black/10 rounded-2xl p-4 sm:p-6 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <label htmlFor="catalog-search" className="block text-xs font-black uppercase tracking-wider text-black/60 mb-1.5">
                Search
              </label>
              <input
                id="catalog-search"
                type="text"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                placeholder="Title or author..."
                className="w-full px-4 py-2.5 bg-white border-2 border-black/20 rounded-xl text-sm font-medium text-black placeholder-black/40 outline-none focus:border-black transition-colors"
              />
            </div>

            {/* Language filter */}
            <div>
              <label htmlFor="filter-lang" className="block text-xs font-black uppercase tracking-wider text-black/60 mb-1.5">
                Language
              </label>
              <select
                id="filter-lang"
                value={langFilter}
                onChange={(e) => { setLangFilter(e.target.value); setPage(1); }}
                className="w-full px-4 py-2.5 bg-white border-2 border-black/20 rounded-xl text-sm font-medium text-black outline-none focus:border-black transition-colors appearance-none"
              >
                <option value="">All Languages</option>
                {SUPPORTED_LANGUAGES.map((l) => (
                  <option key={l.code} value={l.code}>
                    {l.flag} {l.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Genre filter */}
            <div>
              <label htmlFor="filter-genre" className="block text-xs font-black uppercase tracking-wider text-black/60 mb-1.5">
                Genre
              </label>
              <select
                id="filter-genre"
                value={genreFilter}
                onChange={(e) => { setGenreFilter(e.target.value); setPage(1); }}
                className="w-full px-4 py-2.5 bg-white border-2 border-black/20 rounded-xl text-sm font-medium text-black outline-none focus:border-black transition-colors appearance-none"
              >
                <option value="">All Genres</option>
                {GENRES.map((g) => (
                  <option key={g.value} value={g.value}>{g.label}</option>
                ))}
              </select>
            </div>

            {/* Media type filter */}
            <div>
              <label htmlFor="filter-media" className="block text-xs font-black uppercase tracking-wider text-black/60 mb-1.5">
                Media Type
              </label>
              <select
                id="filter-media"
                value={mediaFilter}
                onChange={(e) => { setMediaFilter(e.target.value); setPage(1); }}
                className="w-full px-4 py-2.5 bg-white border-2 border-black/20 rounded-xl text-sm font-medium text-black outline-none focus:border-black transition-colors appearance-none"
              >
                <option value="">All Types</option>
                {MEDIA_TYPES.map((m) => (
                  <option key={m.value} value={m.value}>{m.icon} {m.label}</option>
                ))}
              </select>
            </div>
          </div>

          {hasFilters && (
            <button
              onClick={clearFilters}
              className="mt-3 text-xs font-bold text-black/60 hover:text-black underline transition-colors"
            >
              Clear all filters
            </button>
          )}
        </div>

        {/* Results */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white/50 border-2 border-black/10 rounded-2xl overflow-hidden animate-pulse">
                <div className="aspect-[3/4] bg-black/10"></div>
                <div className="p-4 space-y-2">
                  <div className="h-5 bg-black/10 rounded w-3/4"></div>
                  <div className="h-4 bg-black/10 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : books.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {books.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-3 mt-10">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 rounded-xl border-2 border-black text-sm font-bold disabled:opacity-30 hover:bg-black hover:text-primary transition-all duration-200"
                >
                  ← Previous
                </button>
                <span className="text-sm font-bold text-black/60">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 rounded-xl border-2 border-black text-sm font-bold disabled:opacity-30 hover:bg-black hover:text-primary transition-all duration-200"
                >
                  Next →
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-black text-black">No books found</h3>
            <p className="text-sm font-medium text-black/60 mt-2">Try adjusting your filters.</p>
            <button
              onClick={clearFilters}
              className="mt-4 text-sm font-bold text-black border-2 border-black rounded-full px-5 py-2 hover:bg-black hover:text-primary transition-all duration-200"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
