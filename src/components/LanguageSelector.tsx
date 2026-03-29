'use client';

import { useState } from 'react';
import { SUPPORTED_LANGUAGES } from '@/lib/mockData';

interface LanguageSelectorProps {
  value: string;
  onChange: (lang: string) => void;
  className?: string;
  compact?: boolean;
}

export default function LanguageSelector({
  value,
  onChange,
  className = '',
  compact = false,
}: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selected = SUPPORTED_LANGUAGES.find((l) => l.code === value) || SUPPORTED_LANGUAGES[0];

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 font-bold rounded-full border-2 border-black transition-all duration-200 hover:bg-black hover:text-primary ${
          compact ? 'px-3 py-1.5 text-sm' : 'px-4 py-2 text-sm'
        }`}
        aria-label="Select language"
        aria-expanded={isOpen}
      >
        <span className="text-lg">{selected.flag}</span>
        {!compact && <span>{selected.code.toUpperCase()}</span>}
        <svg
          className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 top-full mt-2 z-50 bg-white rounded-xl shadow-xl border-2 border-black overflow-hidden min-w-[160px]">
            {SUPPORTED_LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                type="button"
                onClick={() => {
                  onChange(lang.code);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold transition-colors hover:bg-primary/30 ${
                  value === lang.code ? 'bg-primary/20' : ''
                }`}
              >
                <span className="text-lg">{lang.flag}</span>
                <span className="text-black">{lang.name}</span>
                {value === lang.code && (
                  <svg className="w-4 h-4 ml-auto text-black" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
