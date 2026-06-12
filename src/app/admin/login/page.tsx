'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, User, Key, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if admin is already authenticated
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch('/api/auth');
        const data = await res.json();
        if (res.ok && data.authenticated) {
          router.push('/admin/dashboard');
        }
      } catch (err) {
        console.error('Session check failed', err);
      } finally {
        setCheckingSession(false);
      }
    };
    checkSession();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      router.push('/admin/dashboard');
    } catch (err: any) {
      setError(err.message || 'Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  if (checkingSession) {
    return (
      <div className="min-h-screen bg-[#030014] flex items-center justify-center text-white">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#00f5ff]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030014] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background neon blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00f5ff]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#14b8a6]/10 rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-md">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-6 group transition-colors"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Portfolio
        </Link>

        {/* Login Card */}
        <div className="glass-card p-8 border border-white/10 shadow-[0_0_30px_rgba(0,245,255,0.05)]">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="p-3.5 bg-[#00f5ff]/10 rounded-2xl border border-[#00f5ff]/35 text-[#00f5ff] mb-4 shadow-[0_0_15px_rgba(0,245,255,0.2)]">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-extrabold text-white">Admin Portal</h1>
            <p className="text-xs text-gray-400 mt-1">Authorized access only. Sign in to update your portfolio.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs rounded-xl font-medium">
                {error}
              </div>
            )}

            <div className="space-y-1.5">
              <label htmlFor="username" className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3.5 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder="admin"
                  className="w-full bg-white/2 border border-white/10 hover:border-white/20 focus:border-[#00f5ff] rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-600 focus:outline-none transition-all text-sm"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="password" className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <Key className="absolute left-3 top-3.5 w-4 h-4 text-gray-500" />
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full bg-white/2 border border-white/10 hover:border-white/20 focus:border-[#00f5ff] rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-600 focus:outline-none transition-all text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 text-sm mt-3"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
