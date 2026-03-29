import Link from 'next/link';
import { MockBook, MEDIA_TYPES, SUPPORTED_LANGUAGES } from '@/lib/mockData';

interface BookCardProps {
  book: MockBook;
  lang?: string;
}

export default function BookCard({ book, lang = 'en' }: BookCardProps) {
  const content = book.content.find((c) => c.lang_code === lang) || book.content[0];
  const availableLangs = book.content.map((c) => c.lang_code);
  const availableMediaTypes = [...new Set(book.media.map((m) => m.file_type))];

  return (
    <Link
      href={`/book/${book.id}`}
      className="group block bg-white border-2 border-black rounded-2xl overflow-hidden hover:shadow-[8px_8px_0px_0px_#000000] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-300"
    >
      {/* Cover Image */}
      <div className="aspect-[3/4] bg-black/5 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/30 to-primary/10">
          <div className="text-center p-4">
            <div className="text-6xl mb-2">📖</div>
            <p className="text-xs font-bold text-black/40 uppercase tracking-wider">Cover</p>
          </div>
        </div>
        {/* Genre badge */}
        <div className="absolute top-3 right-3 bg-black text-primary text-xs font-black px-3 py-1 rounded-full uppercase">
          {book.genre}
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-black text-lg text-black leading-tight group-hover:text-black/80 transition-colors line-clamp-2">
          {content.title}
        </h3>
        <p className="text-sm font-semibold text-black/60 mt-1">{book.author.name}</p>
        <p className="text-xs text-black/50 mt-0.5">{book.published_year}</p>

        {/* Language & Media badges */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-black/10">
          {/* Languages */}
          <div className="flex gap-1" aria-label="Available languages">
            {availableLangs.map((lc) => {
              const langInfo = SUPPORTED_LANGUAGES.find((l) => l.code === lc);
              return (
                <span key={lc} className="text-sm" title={langInfo?.name}>
                  {langInfo?.flag}
                </span>
              );
            })}
          </div>
          {/* Media types */}
          <div className="flex gap-1" aria-label="Available media">
            {availableMediaTypes.map((mt) => {
              const mediaInfo = MEDIA_TYPES.find((m) => m.value === mt);
              return (
                <span key={mt} className="text-sm" title={mediaInfo?.label}>
                  {mediaInfo?.icon}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </Link>
  );
}
