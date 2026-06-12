'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminRoot() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth');
        const data = await res.json();
        if (res.ok && data.authenticated) {
          router.replace('/admin/dashboard');
        } else {
          router.replace('/admin/login');
        }
      } catch (err) {
        router.replace('/admin/login');
      }
    };
    checkAuth();
  }, [router]);

  return (
    <div className="min-h-screen bg-[#030014] flex items-center justify-center text-white">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#00f5ff]"></div>
    </div>
  );
}
