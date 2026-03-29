'use client';

import { useState, useEffect } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';
import SignOutButton from '@/components/SignOutButton';

export default function UniversalUploadForm() {
  const [mode, setMode] = useState<'book' | 'media'>('book');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [progress, setProgress] = useState(0);

  // Book Fields
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');
  const [descEn, setDescEn] = useState('');
  const [descRu, setDescRu] = useState('');
  const [descRo, setDescRo] = useState('');
  const [descFr, setDescFr] = useState('');
  const [coverFile, setCoverFile] = useState<File | null>(null);

  // Media Fields
  const [books, setBooks] = useState<{ id: string; title: string }[]>([]);
  const [selectedBook, setSelectedBook] = useState('');
  const [mediaType, setMediaType] = useState('podcast');
  const [langCode, setLangCode] = useState('en');
  const [studentName, setStudentName] = useState('');
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState('');

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const router = useRouter();

  useEffect(() => {
    // Fetch books for dropdown
    const fetchBooks = async () => {
      const { data } = await supabase.from('books').select('id, title');
      if (data) setBooks(data);
    };
    fetchBooks();
  }, [supabase]);

  const handleUploadFile = async (bucket: string, file: File) => {
    setProgress(10);
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;
    setProgress(40);

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file);

    setProgress(80);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
    return data.publicUrl;
  };

  const handleBookSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setProgress(0);

    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error('You must be logged in.');

      let coverUrl = null;
      if (coverFile) {
        coverUrl = await handleUploadFile('covers', coverFile);
      }
      setProgress(90);

      const { error } = await supabase.from('books').insert({
        title,
        author,
        published_year: year ? parseInt(year) : null,
        cover_url: coverUrl,
        desc_en: descEn,
        desc_ru: descRu,
        desc_ro: descRo,
        desc_fr: descFr,
        user_id: userData.user.id,
      });

      if (error) throw error;

      setProgress(100);
      setMessage('SUCCESS: Book created!');
      setTitle(''); setAuthor(''); setYear(''); setDescEn(''); setDescRu(''); setDescRo(''); setDescFr(''); setCoverFile(null);
    } catch (err: any) {
      setMessage(`ERROR: ${err.message}`);
    } finally {
      setLoading(false);
      setTimeout(() => setProgress(0), 3000);
    }
  };

  const handleMediaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setProgress(0);

    try {
      if (!selectedBook) throw new Error('Please select a book.');
      
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error('You must be logged in.');

      let finalUrl = videoUrl;

      if (mediaType !== 'video') {
        if (!mediaFile) throw new Error('Please select a file to upload.');
        finalUrl = await handleUploadFile('lab-materials', mediaFile);
      }
      setProgress(90);

      const { error } = await supabase.from('library_media').insert({
        book_id: selectedBook,
        user_id: userData.user.id,
        type: mediaType,
        lang_code: langCode,
        file_url: finalUrl,
        student_name: studentName,
      });

      if (error) throw error;

      setProgress(100);
      setMessage('SUCCESS: Media added!');
      setSelectedBook(''); setMediaType('podcast'); setStudentName(''); setMediaFile(null); setVideoUrl('');
    } catch (err: any) {
      setMessage(`ERROR: ${err.message}`);
    } finally {
      setLoading(false);
      setTimeout(() => setProgress(0), 3000);
    }
  };

  const inputClass = "w-full p-3 border-[3px] border-black bg-white text-black font-bold focus:outline-none focus:ring-0";
  const labelClass = "block font-black text-black uppercase text-sm mb-2";

  return (
    <div className="min-h-screen bg-[#C1FF00] p-4 sm:p-8">
      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        <div className="flex justify-between items-center bg-white border-[3px] border-black p-4 shadow-[8px_8px_0px_0px_#000000]">
          <h1 className="text-2xl font-black uppercase text-black">Lab Terminal</h1>
          <SignOutButton />
        </div>

        <div className="bg-white border-[3px] border-black p-8 shadow-[8px_8px_0px_0px_#000000]">
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setMode('book')}
              className={`flex-1 py-4 border-[3px] border-black font-black uppercase tracking-widest hover:invert transition-all duration-200 ${mode === 'book' ? 'bg-black text-[#C1FF00]' : 'bg-[#C1FF00] text-black'}`}
            >
              + Create Book
            </button>
            <button
              onClick={() => setMode('media')}
              className={`flex-1 py-4 border-[3px] border-black font-black uppercase tracking-widest hover:invert transition-all duration-200 ${mode === 'media' ? 'bg-black text-[#C1FF00]' : 'bg-[#C1FF00] text-black'}`}
            >
              + Add Media
            </button>
          </div>

          {progress > 0 && progress < 100 && (
            <div className="w-full h-4 border-[3px] border-black bg-white mb-6">
              <div className="h-full bg-black transition-all duration-300" style={{ width: `${progress}%` }}></div>
            </div>
          )}

          {message && (
            <div className={`mb-6 p-4 border-[3px] border-black font-black uppercase text-lg ${message.startsWith('SUCCESS') ? 'bg-[#C1FF00] text-black' : 'bg-red-500 text-white'}`}>
              {message}
            </div>
          )}

          {mode === 'book' ? (
            <form onSubmit={handleBookSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>Title</label>
                  <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Author</label>
                  <input type="text" required value={author} onChange={(e) => setAuthor(e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Published Year</label>
                  <input type="number" required value={year} onChange={(e) => setYear(e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Cover Image</label>
                  <input type="file" accept="image/*" onChange={(e) => setCoverFile(e.target.files?.[0] || null)} className={`${inputClass} !p-2`} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t-[3px] border-black">
                <div>
                  <label className={labelClass}>Description (EN)</label>
                  <textarea rows={3} value={descEn} onChange={(e) => setDescEn(e.target.value)} className={inputClass}></textarea>
                </div>
                <div>
                  <label className={labelClass}>Description (RU)</label>
                  <textarea rows={3} value={descRu} onChange={(e) => setDescRu(e.target.value)} className={inputClass}></textarea>
                </div>
                <div>
                  <label className={labelClass}>Description (RO)</label>
                  <textarea rows={3} value={descRo} onChange={(e) => setDescRo(e.target.value)} className={inputClass}></textarea>
                </div>
                <div>
                  <label className={labelClass}>Description (FR)</label>
                  <textarea rows={3} value={descFr} onChange={(e) => setDescFr(e.target.value)} className={inputClass}></textarea>
                </div>
              </div>

              <button type="submit" disabled={loading} className="w-full py-4 border-[3px] border-black bg-black text-[#C1FF00] font-black uppercase text-xl hover:invert transition-all duration-200 mt-8">
                {loading ? 'Processing...' : 'Submit Book'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleMediaSubmit} className="space-y-6">
              <div>
                <label className={labelClass}>Target Book</label>
                <select required value={selectedBook} onChange={(e) => setSelectedBook(e.target.value)} className={inputClass}>
                  <option value="">-- SELECT A BOOK --</option>
                  {books.map((b) => (
                    <option key={b.id} value={b.id}>{b.title}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>Media Type</label>
                  <select required value={mediaType} onChange={(e) => setMediaType(e.target.value)} className={inputClass}>
                    <option value="podcast">Podcast</option>
                    <option value="infographic">Infographic</option>
                    <option value="board_game">Board Game</option>
                    <option value="video">Video</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Language Code</label>
                  <select required value={langCode} onChange={(e) => setLangCode(e.target.value)} className={inputClass}>
                    <option value="en">English (EN)</option>
                    <option value="ru">Russian (RU)</option>
                    <option value="ro">Romanian (RO)</option>
                    <option value="fr">French (FR)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>Student Name</label>
                  <input type="text" required value={studentName} onChange={(e) => setStudentName(e.target.value)} className={inputClass} />
                </div>
                <div>
                  {mediaType === 'video' ? (
                    <>
                      <label className={labelClass}>Video URL (YouTube/Vimeo)</label>
                      <input type="url" required value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} className={inputClass} placeholder="https://youtube.com/..." />
                    </>
                  ) : (
                    <>
                      <label className={labelClass}>Upload File</label>
                      <input type="file" required onChange={(e) => setMediaFile(e.target.files?.[0] || null)} className={`${inputClass} !p-2`} />
                    </>
                  )}
                </div>
              </div>

              <button type="submit" disabled={loading} className="w-full py-4 border-[3px] border-black bg-black text-[#C1FF00] font-black uppercase text-xl hover:invert transition-all duration-200 mt-8">
                {loading ? 'Processing...' : 'Upload Media'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
