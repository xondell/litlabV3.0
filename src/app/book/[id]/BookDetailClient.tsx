'use client';

import { QRCode } from 'react-qrcode-logo';
import { PublicBook } from '@/lib/actions';

interface BookDetailClientProps {
  book: PublicBook;
}

export default function BookDetailClient({ book }: BookDetailClientProps) {
  const pageUrl = typeof window !== 'undefined' ? window.location.href : `https://litlab.org/book/${book.id}`;

  const mediaByType = {
    podcast: book.media?.filter((m) => m.type === 'podcast') || [],
    video: book.media?.filter((m) => m.type === 'video') || [],
    pdf_game: book.media?.filter((m) => m.type === 'pdf_game') || [],
    infographic: book.media?.filter((m) => m.type === 'infographic') || [],
  };

  const hasMedia = Object.values(mediaByType).some((arr) => arr.length > 0);

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Left Panel: Cover + QR */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden aspect-[3/4] flex items-center justify-center relative">
              {book.coverUrl ? (
                <img src={book.coverUrl} alt="Cover" className="w-full h-full object-cover" />
              ) : (
                <div className="text-center p-6">
                  <div className="text-8xl mb-4">📖</div>
                  <p className="text-xs font-bold text-black/40 uppercase tracking-wider">Book Cover</p>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              <span className="text-sm font-bold text-black/60">Available in LitLab</span>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center">
              <h3 className="font-black text-sm uppercase tracking-wider text-black/60 mb-4">Scan QR Code</h3>
              <div className="inline-block rounded-xl overflow-hidden">
                <QRCode value={pageUrl} size={180} bgColor="#ffffff" fgColor="#000000" qrStyle="dots" eyeRadius={8} />
              </div>
              <p className="text-xs text-black/50 mt-3 font-medium">Point your camera to open this page</p>
            </div>
          </div>

          {/* Right Panel: Info & Extended Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-black/50">
                  {book.publishedYear} {book.userName && `· Added by ${book.userName}`}
                </p>
              </div>
            </div>

            <div>
              <h1 className="text-4xl sm:text-5xl font-black text-black leading-tight">{book.title}</h1>
              <p className="text-xl font-semibold text-black/70 mt-2">{book.author}</p>
            </div>

            {book.description && (
              <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <h2 className="font-black text-sm uppercase tracking-wider text-black/60 mb-3">Description</h2>
                <p className="text-base font-medium text-black/80 leading-relaxed whitespace-pre-wrap">{book.description}</p>
              </div>
            )}

            {book.plotSummary && (
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
                <h2 className="font-black text-sm uppercase tracking-wider text-black/60 mb-3">Plot Summary</h2>
                <p className="text-base font-medium text-black/80 leading-relaxed whitespace-pre-wrap">{book.plotSummary}</p>
              </div>
            )}

            {book.characters && book.characters.length > 0 && (
              <div className="pt-6">
                <h2 className="font-black text-lg text-black mb-4 uppercase tracking-wider">Characters</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {book.characters.map((char) => (
                    <div key={char.id} className="bg-white border border-gray-200 rounded-xl p-4 flex gap-4 hover:shadow-md transition-shadow">
                      <div className="w-12 h-12 bg-black text-white font-black text-xl rounded-full flex items-center justify-center shrink-0">
                        {char.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-black text-black text-base">{char.name}</h3>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{char.role}</p>
                        <p className="text-sm font-medium text-gray-600 leading-relaxed">{char.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {hasMedia && (
              <div className="pt-8 mt-8 border-t border-gray-100">
                <h2 className="font-black text-2xl text-black mb-6">Media Laboratory</h2>

                <div className="space-y-8">
                  {mediaByType.podcast.length > 0 && (
                    <div>
                      <h3 className="font-black text-sm uppercase tracking-wider text-gray-500 mb-4 flex items-center gap-2">
                        <span>🎧</span> Podcasts
                      </h3>
                      <div className="grid grid-cols-1 gap-4">
                        {mediaByType.podcast.map((m) => (
                          <div key={m.id} className="bg-black text-white rounded-xl p-4 flex items-center gap-4">
                            <a href={m.url} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-[#a3ff00] text-black rounded-full flex items-center justify-center shrink-0 hover:scale-105 transition-transform">
                              <span className="ml-1">▶</span>
                            </a>
                            <div className="flex-1">
                              <a href={m.url} target="_blank" rel="noopener noreferrer" className="font-black text-white hover:underline block">{m.title}</a>
                              <p className="text-xs text-gray-400 font-medium">by {m.author} {m.duration && `· ${m.duration}`}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {mediaByType.video.length > 0 && (
                    <div>
                      <h3 className="font-black text-sm uppercase tracking-wider text-gray-500 mb-4 flex items-center gap-2">
                        <span>📺</span> Videos
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {mediaByType.video.map((m) => (
                          <div key={m.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                            <div className="aspect-video bg-gray-100 relative group flex items-center justify-center">
                               {/* Very simple placeholder if it's not a direct embed */}
                               <div className="absolute inset-0 bg-black/5 flex items-center justify-center group-hover:bg-black/10 transition-colors">
                                 <a href={m.url} target="_blank" rel="noopener noreferrer" className="w-16 h-12 bg-[#ff0000] rounded-xl flex items-center justify-center hover:scale-105 transition-transform shadow-lg">
                                    <span className="text-white text-xl">▶</span>
                                 </a>
                               </div>
                            </div>
                            <div className="p-4">
                              <h4 className="font-black text-sm text-black mb-1 line-clamp-1">{m.title}</h4>
                              <p className="text-xs text-gray-500">by {m.author}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {mediaByType.pdf_game.length > 0 && (
                    <div>
                      <h3 className="font-black text-sm uppercase tracking-wider text-gray-500 mb-4 flex items-center gap-2">
                        <span>🎮</span> Board Games
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {mediaByType.pdf_game.map((m) => (
                          <div key={m.id} className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between hover:border-black transition-colors group">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-xl">🎲</div>
                              <div>
                                <h4 className="font-black text-sm text-black group-hover:underline">{m.title}</h4>
                                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-0.5">by {m.author}</p>
                              </div>
                            </div>
                            <a href={m.url} target="_blank" rel="noopener noreferrer" className="text-xs font-black text-gray-400 group-hover:text-black transition-colors pr-2">
                              PDF ↓
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {mediaByType.infographic.length > 0 && (
                    <div>
                      <h3 className="font-black text-sm uppercase tracking-wider text-gray-500 mb-4 flex items-center gap-2">
                        <span>🖼️</span> Infographics
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {mediaByType.infographic.map((m) => (
                          <a key={m.id} href={m.url} target="_blank" rel="noopener noreferrer" className="bg-white border border-gray-200 rounded-xl rounded-b-none overflow-hidden block group">
                            <div className="aspect-[4/3] bg-gray-50 flex flex-col items-center justify-center p-6 text-center border-b border-gray-100">
                                <span className="text-4xl mb-4">🖼️</span>
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider group-hover:text-black transition-colors">View Map</span>
                            </div>
                            <div className="p-4 bg-white border border-gray-200 group-hover:border-black transition-colors rounded-b-xl -mt-px relative z-10">
                              <h4 className="font-black text-sm text-black mb-1">{m.title}</h4>
                              <p className="text-xs text-gray-500">by {m.author}</p>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
}
