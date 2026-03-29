import Link from 'next/link';
import LitLabLogo from './LitLabLogo';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary border-t-2 border-black mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <LitLabLogo size={32} showText={true} />
            <p className="mt-3 text-sm font-medium text-black/70 max-w-xs">
              An interactive literary laboratory connecting books to student-created multimedia content.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-black text-sm uppercase tracking-wider mb-4 text-black">Quick Links</h3>
            <nav className="flex flex-col gap-2" aria-label="Footer navigation">
              <Link href="/" className="text-sm font-semibold text-black/80 hover:text-black transition-colors">
                Home
              </Link>
              <Link href="/catalog" className="text-sm font-semibold text-black/80 hover:text-black transition-colors">
                Catalog
              </Link>
              <Link href="/dashboard" className="text-sm font-semibold text-black/80 hover:text-black transition-colors">
                Dashboard
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-black text-sm uppercase tracking-wider mb-4 text-black">Contact</h3>
            <div className="flex flex-col gap-2 text-sm font-semibold text-black/80">
              <p>📧 contact@litlab.org</p>
              <p>📍 Library Innovation Hub</p>
              <div className="flex gap-3 mt-2">
                <a
                  href="#"
                  className="w-9 h-9 rounded-full border-2 border-black flex items-center justify-center hover:bg-black hover:text-primary transition-colors"
                  aria-label="Twitter"
                >
                  𝕏
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-full border-2 border-black flex items-center justify-center hover:bg-black hover:text-primary transition-colors text-xs font-black"
                  aria-label="Instagram"
                >
                  IG
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-black/20 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs font-bold text-black/60">
            © LitLab {year}. All rights reserved.
          </p>
          <p className="text-xs font-medium text-black/50">
            Built with 📚 by students, for students.
          </p>
        </div>
      </div>
    </footer>
  );
}
