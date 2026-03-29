'use client';

import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';

export default function SignOutButton() {
  const router = useRouter();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
    router.push('/');
  };

  return (
    <button
      onClick={handleSignOut}
      className="border-[3px] border-black bg-primary text-black font-black uppercase text-sm px-6 py-2 hover:invert transition-all duration-200"
    >
      Sign Out
    </button>
  );
}
