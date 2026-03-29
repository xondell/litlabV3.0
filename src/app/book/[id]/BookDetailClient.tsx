'use client';

import { useState } from 'react';
import { QRCode } from 'react-qrcode-logo';
import LanguageSelector from '@/components/LanguageSelector';
import { useAudioStore, AudioTrack } from '@/stores/audioStore';
import { MockBook, MEDIA_TYPES } from '@/lib/mockData';

interface BookDetailClientProps {
  book: MockBook;
}

export default function BookDetailClient({ book }: BookDetailClientProps) {
  const [lang, setLang] = useState('en');
  const { setTrack, currentTrack, isPlaying, togglePlay } = useAudioStore();

  const content = book.content.find((c) => c.lang_code === lang) || book.content[0];
  const allMedia = book.media;
  const filteredMedia = allMedia.filter((m) => m.lang_code === lang || !m.lang_code);
  const mediaToShow = filteredMedia.length > 0 ? filteredMedia : allMedia;

  const podcasts = mediaToShow.filter((m) => m.file_type === 'podcast');
  const videos = mediaToShow.filter((m) => m.file_type === 'video');
  const games = mediaToShow.filter((m) => m.file_type === 'pdf_game');
  const infographics = mediaToShow.filter((m) => m.file_type === 'infographic');

  const pageUrl = typeof window !== 'undefined' ? window.location.href : `https://litlab.org/book/${book.id}`;

  const handlePlayPodcast = (media: typeof allMedia[0]) => {
    const track: AudioTrack = {
      id: media.id,
      title: media.file_data.title || 'Untitled Podcast',
      url: media.file_url,
      bookTitle: content.title,
      duration: media.file_data.duration,
    };

    if (currentTrack?.id === media.id) {
      togglePlay();
    } else {
      setTrack(track);
    }
  };

  return (
    <div className="bg-primary min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Top section: two columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Left Panel: Cover + QR */}
          <div className="lg:col-span-1 space-y-6">
            {/* Cover */}
            <div className="bg-white border-2 border-black rounded-2xl overflow-hidden aspect-[3/4] flex items-center justify-center">
              <div className="text-center p-6">
                <div className="text-8xl mb-4">📖</div>
                <p className="text-xs font-bold text-black/40 uppercase tracking-wider">Book Cover</p>
              </div>
            </div>

            {/* Status */}
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              <span className="text-sm font-bold text-black/60">Available in Library</span>
            </div>

            {/* QR Code */}
            <div className="bg-white border-2 border-black rounded-2xl p-6 text-center">
              <h3 className="font-black text-sm uppercase tracking-wider text-black/60 mb-4">Scan QR Code</h3>
              <div className="inline-block rounded-xl overflow-hidden">
                <QRCode
                  value={pageUrl}
                  size={180}
                  bgColor="#C1FF00"
                  fgColor="#000000"
                  qrStyle="dots"
                  eyeRadius={8}
                />
              </div>
              <p className="text-xs text-black/50 mt-3 font-medium">
                Point your camera to open this page
              </p>
            </div>
          </div>

          {/* Right Panel: Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Language selector */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-black/50 uppercase tracking-wider">{book.genre}</p>
                <p className="text-sm font-semibold text-black/50">{book.published_year} · ISBN: {book.isbn}</p>
              </div>
              <LanguageSelector value={lang} onChange={setLang} />
            </div>

            {/* Title & Author */}
            <div>
              <h1 className="text-4xl sm:text-5xl font-black text-black leading-tight">{content.title}</h1>
              <p className="text-xl font-semibold text-black/70 mt-2">{book.author.name}</p>
            </div>

            {/* Description */}
            <div className="bg-white/50 border-2 border-black/10 rounded-2xl p-6">
              <h2 className="font-black text-sm uppercase tracking-wider text-black/60 mb-3">Description</h2>
              <p className="text-base font-medium text-black/80 leading-relaxed">{content.description}</p>
            </div>

            {/* Plot Summary */}
            <div className="bg-white/50 border-2 border-black/10 rounded-2xl p-6">
              <h2 className="font-black text-sm uppercase tracking-wider text-black/60 mb-3">Plot Summary</h2>
              <p className="text-base font-medium text-black/80 leading-relaxed">{content.plot_summary}</p>
            </div>

            {/* Characters */}
            {content.characters && content.characters.length > 0 && (
              <div>
                <h2 className="font-black text-sm uppercase tracking-wider text-black/60 mb-4">Characters</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {content.characters.map((char, idx) => (
                    <div
                      key={idx}
                      className="bg-white border-2 border-black rounded-2xl p-5 hover:shadow-[4px_4px_0px_0px_#000000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-200"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-black text-primary rounded-full flex items-center justify-center font-black text-lg flex-shrink-0">
                          {char.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-black text-black">{char.name}</h3>
                          <p className="text-xs font-bold text-black/50 uppercase tracking-wider">{char.role}</p>
                          <p className="text-sm font-medium text-black/70 mt-1">{char.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Panel: Media Gallery */}
        <div className="border-t-2 border-black/10 pt-10">
          <h2 className="text-3xl font-black text-black mb-8">Media Laboratory</h2>

          <div className="space-y-10">
            {/* Podcasts */}
            {podcasts.length > 0 && (
              <div>
                <h3 className="flex items-center gap-2 font-black text-lg text-black mb-4">
                  <span className="text-2xl">🎧</span> Podcasts
                </h3>
                <div className="space-y-3">
                  {podcasts.map((media) => (
                    <div
                      key={media.id}
                      className="bg-black rounded-2xl p-4 flex items-center gap-4 hover:shadow-lg transition-shadow"
                    >
                      <button
                        onClick={() => handlePlayPodcast(media)}
                        className="w-12 h-12 bg-primary text-black rounded-full flex items-center justify-center flex-shrink-0 hover:bg-primary-dark transition-colors"
                        aria-label={currentTrack?.id === media.id && isPlaying ? 'Pause' : 'Play'}
                      >
                        {currentTrack?.id === media.id && isPlaying ? (
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <rect x="6" y="4" width="4" height="16" rx="1" />
                            <rect x="14" y="4" width="4" height="16" rx="1" />
                          </svg>
                        ) : (
                          <svg className="w-6 h-6 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        )}
                      </button>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-primary truncate">
                          {media.file_data.title || 'Untitled'}
                        </p>
                        <p className="text-xs text-primary/60">
                          {media.file_data.student_author} · {media.file_data.duration}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Videos */}
            {videos.length > 0 && (
              <div>
                <h3 className="flex items-center gap-2 font-black text-lg text-black mb-4">
                  <span className="text-2xl">📺</span> Videos
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {videos.map((media) => (
                    <div key={media.id} className="bg-white border-2 border-black rounded-2xl overflow-hidden">
                      <div className="aspect-video bg-black/10 flex items-center justify-center">
                        {media.file_url.includes('youtube') ? (
                          <iframe
                            src={media.file_url}
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title={media.file_data.title || 'Video'}
                          />
                        ) : (
                          <div className="text-center p-4">
                            <div className="text-4xl">📺</div>
                            <p className="text-xs text-black/50 mt-1">Video Player</p>
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <p className="font-bold text-sm text-black">{media.file_data.title}</p>
                        <p className="text-xs text-black/60">by {media.file_data.student_author}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Board Games */}
            {games.length > 0 && (
              <div>
                <h3 className="flex items-center gap-2 font-black text-lg text-black mb-4">
                  <span className="text-2xl">🎮</span> Board Games
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {games.map((media) => (
                    <a
                      key={media.id}
                      href={media.file_url}
                      download
                      className="flex items-center gap-4 bg-white border-2 border-black rounded-2xl p-4 hover:shadow-[4px_4px_0px_0px_#000000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-200"
                    >
                      <div className="w-14 h-14 bg-black text-primary rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                        🎲
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-sm text-black truncate">{media.file_data.title}</p>
                        <p className="text-xs text-black/60">by {media.file_data.student_author}</p>
                      </div>
                      <span className="text-xs font-black text-black/50 uppercase">PDF ↓</span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Infographics */}
            {infographics.length > 0 && (
              <div>
                <h3 className="flex items-center gap-2 font-black text-lg text-black mb-4">
                  <span className="text-2xl">🖼️</span> Infographics
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {infographics.map((media) => (
                    <div
                      key={media.id}
                      className="bg-white border-2 border-black rounded-2xl overflow-hidden"
                    >
                      <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                        <div className="text-center p-4">
                          <div className="text-5xl">🖼️</div>
                          <p className="text-xs text-black/50 mt-2">{media.file_data.title}</p>
                        </div>
                      </div>
                      <div className="p-4">
                        <p className="font-bold text-sm text-black">{media.file_data.title}</p>
                        <p className="text-xs text-black/60">by {media.file_data.student_author}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {mediaToShow.length === 0 && (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">🔬</div>
                <h3 className="text-lg font-black text-black">No media yet</h3>
                <p className="text-sm text-black/60 mt-1">Be the first to contribute content for this book!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
