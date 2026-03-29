'use client';

import { useState } from 'react';
import { addBook } from '@/lib/actions';
import { SUPPORTED_LANGUAGES, GENRES, MEDIA_TYPES } from '@/lib/mockData';
import Link from 'next/link';

export default function DashboardPage() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const formData = new FormData(e.currentTarget);
    const result = await addBook(formData);
    setMessage(result.message);
    setLoading(false);

    if (result.success) {
      (e.target as HTMLFormElement).reset();
    }
  };

  return (
    <div className="bg-primary min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-black text-black">Dashboard</h1>
            <p className="text-base font-medium text-black/60 mt-1">Add new books and media to the lab</p>
          </div>
          <Link
            href="/catalog"
            className="text-sm font-bold text-black border-2 border-black rounded-full px-4 py-2 hover:bg-black hover:text-primary transition-all duration-200"
          >
            View Catalog
          </Link>
        </div>

        {/* Success / Error message */}
        {message && (
          <div className="mb-6 p-4 rounded-xl bg-white border-2 border-black text-sm font-semibold text-black flex items-center gap-3">
            <span className="text-xl">✅</span>
            {message}
          </div>
        )}

        {/* Book submission form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Info */}
          <section className="bg-white border-2 border-black rounded-2xl p-6 sm:p-8">
            <h2 className="font-black text-lg text-black mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-black text-primary rounded-full flex items-center justify-center text-sm">1</span>
              Book Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="sm:col-span-2">
                <label htmlFor="title" className="block text-xs font-black uppercase tracking-wider text-black/60 mb-1.5">
                  Book Title *
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  required
                  className="w-full px-4 py-3 border-2 border-black/20 rounded-xl text-sm font-medium text-black outline-none focus:border-black transition-colors"
                  placeholder="Enter the book title"
                />
              </div>

              <div>
                <label htmlFor="author" className="block text-xs font-black uppercase tracking-wider text-black/60 mb-1.5">
                  Author *
                </label>
                <input
                  id="author"
                  name="author"
                  type="text"
                  required
                  className="w-full px-4 py-3 border-2 border-black/20 rounded-xl text-sm font-medium text-black outline-none focus:border-black transition-colors"
                  placeholder="Author name"
                />
              </div>

              <div>
                <label htmlFor="isbn" className="block text-xs font-black uppercase tracking-wider text-black/60 mb-1.5">
                  ISBN
                </label>
                <input
                  id="isbn"
                  name="isbn"
                  type="text"
                  className="w-full px-4 py-3 border-2 border-black/20 rounded-xl text-sm font-medium text-black outline-none focus:border-black transition-colors"
                  placeholder="978-..."
                />
              </div>

              <div>
                <label htmlFor="genre" className="block text-xs font-black uppercase tracking-wider text-black/60 mb-1.5">
                  Genre *
                </label>
                <select
                  id="genre"
                  name="genre"
                  required
                  className="w-full px-4 py-3 border-2 border-black/20 rounded-xl text-sm font-medium text-black outline-none focus:border-black transition-colors appearance-none"
                >
                  <option value="">Select genre</option>
                  {GENRES.map((g) => (
                    <option key={g.value} value={g.value}>{g.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="published_year" className="block text-xs font-black uppercase tracking-wider text-black/60 mb-1.5">
                  Published Year
                </label>
                <input
                  id="published_year"
                  name="published_year"
                  type="number"
                  min="1000"
                  max="2100"
                  className="w-full px-4 py-3 border-2 border-black/20 rounded-xl text-sm font-medium text-black outline-none focus:border-black transition-colors"
                  placeholder="2024"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="cover" className="block text-xs font-black uppercase tracking-wider text-black/60 mb-1.5">
                  Cover Image
                </label>
                <input
                  id="cover"
                  name="cover"
                  type="file"
                  accept="image/*"
                  className="w-full px-4 py-3 border-2 border-black/20 rounded-xl text-sm font-medium text-black outline-none focus:border-black transition-colors file:mr-3 file:px-3 file:py-1 file:bg-black file:text-primary file:border-0 file:rounded-lg file:text-xs file:font-bold file:cursor-pointer"
                />
              </div>
            </div>
          </section>

          {/* Content by Language */}
          <section className="bg-white border-2 border-black rounded-2xl p-6 sm:p-8">
            <h2 className="font-black text-lg text-black mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-black text-primary rounded-full flex items-center justify-center text-sm">2</span>
              Content by Language
            </h2>

            <div className="space-y-6">
              {SUPPORTED_LANGUAGES.map((lang) => (
                <div key={lang.code} className="border-2 border-black/10 rounded-xl p-5">
                  <h3 className="font-bold text-sm text-black mb-4 flex items-center gap-2">
                    <span className="text-lg">{lang.flag}</span> {lang.name}
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor={`title_${lang.code}`}
                        className="block text-xs font-black uppercase tracking-wider text-black/50 mb-1"
                      >
                        Title ({lang.code.toUpperCase()})
                      </label>
                      <input
                        id={`title_${lang.code}`}
                        name={`title_${lang.code}`}
                        type="text"
                        className="w-full px-4 py-2.5 border-2 border-black/15 rounded-xl text-sm font-medium text-black outline-none focus:border-black transition-colors"
                        placeholder={`Title in ${lang.name}`}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor={`description_${lang.code}`}
                        className="block text-xs font-black uppercase tracking-wider text-black/50 mb-1"
                      >
                        Description ({lang.code.toUpperCase()})
                      </label>
                      <textarea
                        id={`description_${lang.code}`}
                        name={`description_${lang.code}`}
                        rows={3}
                        className="w-full px-4 py-2.5 border-2 border-black/15 rounded-xl text-sm font-medium text-black outline-none focus:border-black transition-colors resize-none"
                        placeholder={`Book description in ${lang.name}`}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Media Upload */}
          <section className="bg-white border-2 border-black rounded-2xl p-6 sm:p-8">
            <h2 className="font-black text-lg text-black mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-black text-primary rounded-full flex items-center justify-center text-sm">3</span>
              Media Upload
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="media_type" className="block text-xs font-black uppercase tracking-wider text-black/60 mb-1.5">
                  Media Type
                </label>
                <select
                  id="media_type"
                  name="media_type"
                  className="w-full px-4 py-3 border-2 border-black/20 rounded-xl text-sm font-medium text-black outline-none focus:border-black transition-colors appearance-none"
                >
                  <option value="">Select type</option>
                  {MEDIA_TYPES.map((m) => (
                    <option key={m.value} value={m.value}>{m.icon} {m.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="media_lang" className="block text-xs font-black uppercase tracking-wider text-black/60 mb-1.5">
                  Media Language
                </label>
                <select
                  id="media_lang"
                  name="media_lang"
                  className="w-full px-4 py-3 border-2 border-black/20 rounded-xl text-sm font-medium text-black outline-none focus:border-black transition-colors appearance-none"
                >
                  {SUPPORTED_LANGUAGES.map((l) => (
                    <option key={l.code} value={l.code}>{l.flag} {l.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="student_author" className="block text-xs font-black uppercase tracking-wider text-black/60 mb-1.5">
                  Student Author
                </label>
                <input
                  id="student_author"
                  name="student_author"
                  type="text"
                  className="w-full px-4 py-3 border-2 border-black/20 rounded-xl text-sm font-medium text-black outline-none focus:border-black transition-colors"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="media_file" className="block text-xs font-black uppercase tracking-wider text-black/60 mb-1.5">
                  File Upload
                </label>
                <input
                  id="media_file"
                  name="media_file"
                  type="file"
                  className="w-full px-4 py-3 border-2 border-black/20 rounded-xl text-sm font-medium text-black outline-none focus:border-black transition-colors file:mr-3 file:px-3 file:py-1 file:bg-black file:text-primary file:border-0 file:rounded-lg file:text-xs file:font-bold file:cursor-pointer"
                />
              </div>
            </div>
          </section>

          {/* Submit */}
          <div className="flex justify-end gap-4">
            <button
              type="reset"
              className="px-6 py-3 border-2 border-black rounded-xl text-sm font-bold text-black hover:bg-black/5 transition-colors"
            >
              Reset Form
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-black text-primary font-black text-sm rounded-xl hover:bg-gray-800 disabled:opacity-50 transition-all duration-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)]"
            >
              {loading ? 'Submitting...' : 'Submit for Review'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
