import Link from 'next/link';
import BookCard from '@/components/BookCard';
import SearchBar from '@/components/SearchBar';
import { getLatestBooks } from '@/lib/actions';

const DIRECTIONS = [
  {
    icon: '🎧',
    title: 'Listen',
    description: 'Immerse yourself in student-created podcasts exploring literary worlds.',
  },
  {
    icon: '📺',
    title: 'Watch',
    description: 'Watch video reviews, animated summaries, and author interviews.',
  },
  {
    icon: '🎮',
    title: 'Play',
    description: 'Download printable board games and quizzes inspired by classic books.',
  },
  {
    icon: '🖼️',
    title: 'View',
    description: 'Explore infographics, character maps, and visual book summaries.',
  },
];

export default async function HomePage() {
  const latestBooks = await getLatestBooks(4);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <div className="text-center max-w-3xl mx-auto">
            {/* Decorative elements */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <svg
                  width="120"
                  height="100"
                  viewBox="0 0 100 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="animate-pulse"
                  aria-hidden="true"
                >
                  <rect x="47" y="10" width="6" height="38" rx="2" fill="black" transform="rotate(0, 50, 48)" />
                  <rect x="47" y="10" width="6" height="35" rx="2" fill="black" transform="rotate(-25, 50, 48)" />
                  <rect x="47" y="10" width="6" height="30" rx="2" fill="black" transform="rotate(-50, 50, 48)" />
                  <rect x="47" y="10" width="6" height="25" rx="2" fill="black" transform="rotate(-75, 50, 48)" />
                  <rect x="47" y="10" width="6" height="35" rx="2" fill="black" transform="rotate(25, 50, 48)" />
                  <rect x="47" y="10" width="6" height="30" rx="2" fill="black" transform="rotate(50, 50, 48)" />
                  <rect x="47" y="10" width="6" height="25" rx="2" fill="black" transform="rotate(75, 50, 48)" />
                  <rect x="8" y="46" width="84" height="7" rx="1" fill="black" />
                </svg>
              </div>
            </div>

            <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-black leading-none">
              Lit<span className="relative">Lab
                <span className="absolute -bottom-2 left-0 right-0 h-2 bg-[#C1FF00] rounded-full" aria-hidden="true"></span>
              </span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl font-semibold text-gray-500 max-w-2xl mx-auto">
              An interactive literary laboratory connecting books to student-created
              multimedia content. Scan, discover, and explore literature like never before.
            </p>

            {/* Search */}
            <div className="mt-10 max-w-lg mx-auto">
              <SearchBar placeholder="Search books, authors, or topics..." />
            </div>

            {/* CTA buttons */}
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/catalog"
                className="inline-flex items-center gap-2 bg-black text-white font-black text-sm px-8 py-4 rounded-full hover:bg-gray-800 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
              >
                Explore Catalog
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 bg-transparent border-2 border-black text-black font-black text-sm px-8 py-4 rounded-full hover:bg-black hover:text-white transition-all duration-300"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute top-10 left-10 w-20 h-20 border-4 border-gray-100 rounded-full"></div>
          <div className="absolute bottom-20 right-10 w-32 h-32 border-4 border-gray-100 rounded-full"></div>
          <div className="absolute top-1/3 right-1/4 w-8 h-8 bg-[#C1FF00]/20 rounded-full"></div>
          <div className="absolute bottom-1/4 left-1/3 w-12 h-12 border-2 border-gray-100 rounded-lg rotate-45"></div>
        </div>
      </section>

      {/* Four Directions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-black">Four Directions of Discovery</h2>
          <p className="mt-3 text-base font-medium text-gray-500 max-w-xl mx-auto">
            Every book in our lab comes alive through multiple formats created by students.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {DIRECTIONS.map((dir) => (
            <div
              key={dir.title}
              className="group bg-black text-white rounded-2xl p-6 hover:shadow-[0_0_30px_rgba(0,0,0,0.15)] hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {dir.icon}
              </div>
              <h3 className="text-xl font-black mb-2">{dir.title}</h3>
              <p className="text-sm font-medium text-white/70">{dir.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Latest Additions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl sm:text-4xl font-black text-black">Latest Additions</h2>
            <p className="mt-2 text-base font-medium text-gray-500">Freshly added to the laboratory</p>
          </div>
          <Link
            href="/catalog"
            className="hidden sm:inline-flex items-center gap-2 text-sm font-bold text-black border-2 border-black rounded-full px-5 py-2.5 hover:bg-black hover:text-white transition-all duration-300"
          >
            View All
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {latestBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>

        <div className="sm:hidden mt-6 text-center">
          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 text-sm font-bold text-black border-2 border-black rounded-full px-5 py-2.5 hover:bg-black hover:text-white transition-all duration-300"
          >
            View All Books →
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pb-24">
        <div className="bg-black rounded-3xl p-8 sm:p-12 text-white">
          <h2 className="text-3xl sm:text-4xl font-black mb-8 text-center">How It Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#C1FF00] text-black flex items-center justify-center text-2xl font-black mx-auto mb-4">
                1
              </div>
              <h3 className="font-bold text-lg mb-2">Scan the QR</h3>
              <p className="text-sm text-white/70">Find the QR code on a library book and scan it with your phone.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#C1FF00] text-black flex items-center justify-center text-2xl font-black mx-auto mb-4">
                2
              </div>
              <h3 className="font-bold text-lg mb-2">Explore Content</h3>
              <p className="text-sm text-white/70">Browse podcasts, videos, games, and infographics about the book.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#C1FF00] text-black flex items-center justify-center text-2xl font-black mx-auto mb-4">
                3
              </div>
              <h3 className="font-bold text-lg mb-2">Contribute</h3>
              <p className="text-sm text-white/70">Create and upload your own multimedia content for others to enjoy.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
