'use client';

import { useState, useEffect, useCallback } from 'react';
import BookCard from '@/components/BookCard';
import { PublicBook, getBooks } from '@/lib/actions';

export default function CatalogPage() {
  const [books, setBooks] = useState<PublicBook[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState('');

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    const result = await getBooks({
      search: search || undefined,
      page,
      perPage: 12,
    });
    setBooks(result.books);
    setTotal(result.total);
    setTotalPages(result.totalPages);
    setLoading(false);
  }, [search, page]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const clearFilters = () => {
    setSearch('');
    setPage(1);
  };

  const hasFilters = search;

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-black text-black">Book Catalog</h1>
          <p className="mt-2 text-base font-medium text-gray-500">
            Browse {total} books in our literary laboratory
          </p>
        </div>

        {/* Filters */}
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 sm:p-6 mb-8">
          <div className="max-w-xl">
            {/* Search */}
            <div>
              <label htmlFor="catalog-search" className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-1.5">
                Search
              </label>
              <input
                id="catalog-search"
                type="text"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                placeholder="Title or author..."
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-black placeholder-gray-400 outline-none focus:border-black transition-colors"
              />
            </div>
          </div>

          {hasFilters && (
            <button
              onClick={clearFilters}
              className="mt-3 text-xs font-bold text-gray-500 hover:text-black underline transition-colors"
            >
              Clear all filters
            </button>
          )}
        </div>

        {/* Results */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-gray-50 border border-gray-200 rounded-2xl overflow-hidden animate-pulse">
                <div className="aspect-[3/4] bg-gray-100"></div>
                <div className="p-4 space-y-2">
                  <div className="h-5 bg-gray-100 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-100 rounded w-1/2"></div>
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
                  className="px-4 py-2 rounded-xl border-2 border-black text-sm font-bold disabled:opacity-30 hover:bg-black hover:text-white transition-all duration-200"
                >
                  ← Previous
                </button>
                <span className="text-sm font-bold text-gray-500">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 rounded-xl border-2 border-black text-sm font-bold disabled:opacity-30 hover:bg-black hover:text-white transition-all duration-200"
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
            <p className="text-sm font-medium text-gray-500 mt-2">Try adjusting your filters.</p>
            <button
              onClick={clearFilters}
              className="mt-4 text-sm font-bold text-black border-2 border-black rounded-full px-5 py-2 hover:bg-black hover:text-white transition-all duration-200"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
