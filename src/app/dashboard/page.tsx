'use client';

import { useState, useEffect, useCallback } from 'react';
import { addBook, getUserBooks, deleteBook, UserBook } from '@/lib/actions';
import SignOutButton from '@/components/SignOutButton';
import Link from 'next/link';

type Tab = 'my-books' | 'add-book';

const MEDIA_TYPES = [
  { value: 'podcast', label: 'Podcast', icon: '🎧' },
  { value: 'video', label: 'Video', icon: '📺' },
  { value: 'pdf_game', label: 'Board Game (PDF)', icon: '🎮' },
  { value: 'infographic', label: 'Infographic', icon: '🖼️' },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<Tab>('my-books');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');

  // Structured Content States
  const [characters, setCharacters] = useState<{name:string, role:string, description:string}[]>([]);
  const [mediaItems, setMediaItems] = useState<{type:string, title:string, author:string, url:string, duration:string}[]>([]);

  // My Books state
  const [myBooks, setMyBooks] = useState<UserBook[]>([]);
  const [booksLoading, setBooksLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetch('/litlab/api/auth/session')
      .then((res) => res.json())
      .then((session) => {
        if (session?.user) {
          setUserEmail(session.user.email || '');
          setUserName(session.user.name || session.user.email || '');
        }
      })
      .catch((err) => console.error('Failed to get session', err));
  }, []);

  const loadBooks = useCallback(async () => {
    setBooksLoading(true);
    const result = await getUserBooks();
    if (!result.error) {
      setMyBooks(result.books);
    }
    setBooksLoading(false);
  }, []);

  useEffect(() => {
    loadBooks();
  }, [loadBooks]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const formData = new FormData(e.currentTarget);
    formData.append('charactersJson', JSON.stringify(characters));
    formData.append('mediaJson', JSON.stringify(mediaItems));
    
    const result = await addBook(formData);
    setMessage(result.message);
    setLoading(false);

    if (result.success) {
      (e.target as HTMLFormElement).reset();
      setCharacters([]);
      setMediaItems([]);
      await loadBooks();
      setActiveTab('my-books');
      window.scrollTo(0,0);
    }
  };

  const handleDelete = async (bookId: string) => {
    if (!confirm('Are you sure you want to delete this book?')) return;
    setDeletingId(bookId);
    const result = await deleteBook(bookId);
    if (result.success) {
      setMyBooks((prev) => prev.filter((b) => b.id !== bookId));
    } else {
      setMessage(result.message);
    }
    setDeletingId(null);
  };

  // Helpers for dynamic arrays
  const addCharacter = () => setCharacters([...characters, { name: '', role: '', description: '' }]);
  const updateCharacter = (idx: number, field: string, val: string) => {
    const newArr = [...characters];
    newArr[idx] = { ...newArr[idx], [field]: val };
    setCharacters(newArr);
  };
  const removeCharacter = (idx: number) => setCharacters(characters.filter((_, i) => i !== idx));

  const addMedia = () => setMediaItems([...mediaItems, { type: 'podcast', title: '', author: '', url: '', duration: '' }]);
  const updateMedia = (idx: number, field: string, val: string) => {
    const newArr = [...mediaItems];
    newArr[idx] = { ...newArr[idx], [field]: val };
    setMediaItems(newArr);
  };
  const removeMedia = (idx: number) => setMediaItems(mediaItems.filter((_, i) => i !== idx));

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-black">Reader&apos;s Cabinet</h1>
            <p className="text-sm font-medium text-gray-500 mt-1">
              {userName ? `Welcome, ${userName}` : userEmail}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/catalog" className="hidden sm:inline-flex text-sm font-bold text-gray-600 border border-gray-300 px-4 py-2 rounded-lg hover:bg-white transition-colors">
              Catalog
            </Link>
            <SignOutButton />
          </div>
        </div>

        <div className="flex gap-1 bg-white border border-gray-200 rounded-xl p-1 mb-8">
          <button onClick={() => setActiveTab('my-books')} className={`flex-1 py-3 px-4 rounded-lg text-sm font-bold transition-all duration-200 ${ activeTab === 'my-books' ? 'bg-black text-white shadow-sm' : 'text-gray-500 hover:text-black hover:bg-gray-50' }`}>
            📚 My Books
            {myBooks.length > 0 && <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${ activeTab === 'my-books' ? 'bg-white/20' : 'bg-gray-100' }`}>{myBooks.length}</span>}
          </button>
          <button onClick={() => setActiveTab('add-book')} className={`flex-1 py-3 px-4 rounded-lg text-sm font-bold transition-all duration-200 ${ activeTab === 'add-book' ? 'bg-black text-white shadow-sm' : 'text-gray-500 hover:text-black hover:bg-gray-50' }`}>
            ➕ Add Book
          </button>
        </div>

        {message && (
          <div className={`mb-6 p-4 rounded-xl text-sm font-semibold flex items-center gap-3 ${ message.startsWith('Error') || message.startsWith('Failed') ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-green-50 text-green-700 border border-green-200' }`}>
            <span className="text-xl">{message.startsWith('Error') ? '⚠️' : '✅'}</span>
            {message}
            <button onClick={() => setMessage('')} className="ml-auto text-lg opacity-50 hover:opacity-100">×</button>
          </div>
        )}

        {activeTab === 'my-books' && (
          <div>
            {booksLoading ? (
              <div className="text-center py-10"><p className="text-sm font-bold text-gray-400">Loading your collection...</p></div>
            ) : myBooks.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">📖</div>
                <h3 className="text-xl font-black text-black">No books yet</h3>
                <p className="text-sm font-medium text-gray-500 mt-2 mb-6">Start building your reading collection</p>
                <button onClick={() => setActiveTab('add-book')} className="inline-flex items-center gap-2 bg-black text-white font-bold text-sm px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors">➕ Add Your First Book</button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {myBooks.map((book) => (
                  <div key={book.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-md transition-all duration-200">
                    {book.cover_url ? (
                      <div className="aspect-[3/2] bg-gray-50 overflow-hidden">
                        <img src={book.cover_url} alt={book.title} className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="aspect-[3/2] bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center">
                        <span className="text-4xl">📖</span>
                      </div>
                    )}
                    <div className="p-5">
                      <h3 className="font-black text-lg text-black leading-tight line-clamp-2">{book.title}</h3>
                      <p className="text-sm font-semibold text-gray-500 mt-1">{book.author}</p>
                      <div className="mt-3">
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${book.isPublic ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                          {book.isPublic ? '🌐 Public' : '🔒 Private'}
                        </span>
                      </div>
                      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                        <Link href={`/book/${book.id}`} className="text-xs font-bold text-black hover:underline">View Book</Link>
                        <button onClick={() => handleDelete(book.id)} disabled={deletingId === book.id} className="text-xs font-bold text-red-400 hover:text-red-600 transition-colors">
                          {deletingId === book.id ? 'Deleting...' : 'Delete'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'add-book' && (
          <form onSubmit={handleSubmit} className="space-y-8">
            <section className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8">
              <h2 className="font-black text-lg text-black mb-6">1. Core Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-1.5">Book Title *</label>
                  <input name="title" type="text" required className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-medium text-black outline-none focus:border-black transition-colors" placeholder="Enter the book title" />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-1.5">Author *</label>
                  <input name="author" type="text" required className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-medium text-black outline-none focus:border-black transition-colors" placeholder="Author name" />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-1.5">Published Year</label>
                  <input name="published_year" type="number" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-medium text-black outline-none focus:border-black transition-colors" placeholder="e.g. 1967" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-1.5">Description (Short)</label>
                  <textarea name="description_en" rows={2} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-medium text-black outline-none focus:border-black transition-colors resize-none" placeholder="A brief tease about the book..." />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-1.5">Plot Summary (Detailed)</label>
                  <textarea name="plotSummary" rows={4} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-medium text-black outline-none focus:border-black transition-colors resize-none" placeholder="When the Devil arrives in Moscow disguised as Professor Woland..." />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-1.5">Cover Image</label>
                  <input name="cover" type="file" accept="image/*" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-medium text-black outline-none focus:border-black transition-colors file:mr-3 file:px-3 file:py-1 file:bg-black file:text-white file:border-0 file:rounded-lg file:text-xs file:font-bold file:cursor-pointer" />
                </div>
                <div className="sm:col-span-2 flex items-center gap-3 bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <input type="checkbox" id="isPublic" name="isPublic" className="w-5 h-5 rounded border-gray-300 text-black focus:ring-black cursor-pointer" />
                  <div>
                    <label htmlFor="isPublic" className="font-bold text-sm text-black block cursor-pointer">Publish to Public Catalog</label>
                    <p className="text-xs text-gray-500">If checked, this book will be visible to everyone on the main catalog page.</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-black text-lg text-black">2. Characters</h2>
                <button type="button" onClick={addCharacter} className="text-xs font-bold bg-gray-100 px-3 py-1.5 rounded-lg text-black hover:bg-gray-200 transition-colors">+ Add Character</button>
              </div>
              <div className="space-y-4">
                {characters.length === 0 && <p className="text-sm font-medium text-gray-400 italic">No characters added yet. Click above to add one.</p>}
                {characters.map((char, idx) => (
                  <div key={idx} className="bg-gray-50 border border-gray-200 p-4 rounded-xl flex flex-col sm:flex-row gap-4 relative">
                    <button type="button" onClick={() => removeCharacter(idx)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500 scale-150">×</button>
                    <div className="flex-1 space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-black uppercase text-gray-500 mb-1">Name</label>
                          <input type="text" value={char.name} onChange={(e) => updateCharacter(idx, 'name', e.target.value)} placeholder="e.g. Woland" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" required />
                        </div>
                        <div>
                          <label className="block text-[10px] font-black uppercase text-gray-500 mb-1">Role</label>
                          <input type="text" value={char.role} onChange={(e) => updateCharacter(idx, 'role', e.target.value)} placeholder="e.g. Antagonist / Devil" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" required />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-black uppercase text-gray-500 mb-1">Description</label>
                        <textarea value={char.description} onChange={(e) => updateCharacter(idx, 'description', e.target.value)} rows={2} placeholder="A mysterious foreign professor who..." className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm resize-none" required />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-black text-lg text-black">3. Media Laboratory</h2>
                <button type="button" onClick={addMedia} className="text-xs font-bold bg-gray-100 px-3 py-1.5 rounded-lg text-black hover:bg-gray-200 transition-colors">+ Add Media</button>
              </div>
              <div className="space-y-4">
                {mediaItems.length === 0 && <p className="text-sm font-medium text-gray-400 italic">No media items added yet. Click above to add one.</p>}
                {mediaItems.map((media, idx) => (
                  <div key={idx} className="bg-gray-50 border border-gray-200 p-4 rounded-xl flex flex-col sm:flex-row gap-4 relative">
                    <button type="button" onClick={() => removeMedia(idx)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500 scale-150">×</button>
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-black uppercase text-gray-500 mb-1">Type</label>
                        <select value={media.type} onChange={(e) => updateMedia(idx, 'type', e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm appearance-none">
                          {MEDIA_TYPES.map(m => <option key={m.value} value={m.value}>{m.icon} {m.label}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-black uppercase text-gray-500 mb-1">Title</label>
                        <input type="text" value={media.title} onChange={(e) => updateMedia(idx, 'title', e.target.value)} placeholder="Media Title" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" required />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black uppercase text-gray-500 mb-1">Student Author</label>
                        <input type="text" value={media.author} onChange={(e) => updateMedia(idx, 'author', e.target.value)} placeholder="Author alias" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" required />
                      </div>
                      {media.type === 'podcast' && (
                        <div>
                          <label className="block text-[10px] font-black uppercase text-gray-500 mb-1">Duration</label>
                          <input type="text" value={media.duration} onChange={(e) => updateMedia(idx, 'duration', e.target.value)} placeholder="e.g. 45:30" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                        </div>
                      )}
                      <div className="sm:col-span-2">
                        <label className="block text-[10px] font-black uppercase text-gray-500 mb-1">Source (Local Upload OR External Link)</label>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <input type="file" name={`media_file_${idx}`} className="flex-1 px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-medium text-black outline-none bg-white file:mr-2 file:px-2 file:py-1 file:bg-gray-100 file:text-black file:border-0 file:rounded file:text-[10px] file:font-bold file:cursor-pointer" />
                          <span className="text-xs text-gray-400 font-bold self-center">OR</span>
                          <input type="text" value={media.url} onChange={(e) => updateMedia(idx, 'url', e.target.value)} placeholder="https://youtube.com/..." className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <div className="flex justify-end gap-4">
              <button type="reset" onClick={() => { setCharacters([]); setMediaItems([]); }} className="px-6 py-3 border border-gray-300 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors">Reset Form</button>
              <button type="submit" disabled={loading} className="px-8 py-3 bg-black text-white font-black text-sm rounded-xl hover:bg-gray-800 disabled:opacity-50 transition-all duration-200">
                {loading ? 'Submitting...' : 'Add Book & Content'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
