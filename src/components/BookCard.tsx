import Link from 'next/link';
import { PublicBook } from '@/lib/actions';

interface BookCardProps {
  book: PublicBook;
}

export default function BookCard({ book }: BookCardProps) {
  return (
    <Link
      href={`/book/${book.id}`}
      className="group block bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
    >
      {/* Cover Image */}
      <div className="aspect-[3/4] bg-gray-50 relative overflow-hidden">
        {book.coverUrl ? (
          // Use standard img since next/image needs host configs
          <img src={book.coverUrl} alt="Cover" className="w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-50">
            <div className="text-center p-4">
              <div className="text-6xl mb-2">📖</div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Cover</p>
            </div>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-black text-lg text-black leading-tight group-hover:text-gray-700 transition-colors line-clamp-2">
          {book.title}
        </h3>
        <p className="text-sm font-semibold text-gray-500 mt-1">{book.author}</p>
        <p className="text-xs text-gray-400 mt-0.5">{book.publishedYear}</p>
        {book.userName && (
          <div className="mt-4 pt-3 border-t border-gray-100">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Added by {book.userName}</p>
          </div>
        )}
      </div>
    </Link>
  );
}
