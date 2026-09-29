import Link from 'next/link';
import { LogoLink } from "@/components/logo";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-50 dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 p-4">
      <div className="mb-12">
        <LogoLink />
      </div>
      <h1 className="text-6xl font-black text-[#2E5D9F] dark:text-[#5B8DEF] mb-4">404</h1>
      <h2 className="text-2xl font-bold mb-6">Page Not Found</h2>
      <p className="text-zinc-500 mb-8">The page you are looking for doesn't exist or has been moved.</p>
      <Link 
        href="/" 
        className="px-6 py-3 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-lg font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
      >
        Return to Home
      </Link>
    </div>
  );
}
