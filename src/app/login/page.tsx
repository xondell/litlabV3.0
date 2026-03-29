'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';

export default function AuthPage() {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const router = useRouter();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    if (mode === 'register') {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { username, full_name: username },
        },
      });

      if (error) {
        setMessage(`Error: ${error.message}`);
      } else {
        setMessage('Registration successful! Check your email or sign in.');
        setMode('login');
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setMessage(`Error: ${error.message}`);
      } else {
        router.refresh();
        router.push('/add-content');
      }
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#C1FF00] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#C1FF00] border-[3px] border-black p-8 shadow-[8px_8px_0px_0px_#000000]">
        <h1 className="text-4xl font-black text-black uppercase mb-6 tracking-tight">
          {mode === 'login' ? 'Login' : 'Register'}
        </h1>

        {message && (
          <div className="mb-6 p-4 border-[3px] border-black bg-white text-black font-bold">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {mode === 'register' && (
            <div>
              <label className="block font-black text-black uppercase text-sm mb-2">
                Username
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 border-[3px] border-black bg-white text-black font-bold focus:outline-none focus:ring-0"
                placeholder="litlab_student"
              />
            </div>
          )}

          <div>
            <label className="block font-black text-black uppercase text-sm mb-2">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border-[3px] border-black bg-white text-black font-bold focus:outline-none focus:ring-0"
              placeholder="you@school.edu"
            />
          </div>

          <div>
            <label className="block font-black text-black uppercase text-sm mb-2">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border-[3px] border-black bg-white text-black font-bold focus:outline-none focus:ring-0"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 border-[3px] border-black bg-black text-[#C1FF00] font-black uppercase tracking-widest hover:invert transition-all duration-200 disabled:opacity-50"
          >
            {loading ? 'Processing...' : mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <button
          type="button"
          onClick={() => {
            setMode(mode === 'login' ? 'register' : 'login');
            setMessage('');
          }}
          className="mt-6 w-full text-center font-bold text-black uppercase text-sm hover:underline"
        >
          {mode === 'login' ? "Don't have an account? Register" : 'Already have an account? Login'}
        </button>
      </div>
    </div>
  );
}
