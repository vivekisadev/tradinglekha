import Link from 'next/link';

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#09090b] flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white dark:bg-[#111111] p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xl">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">Checkout</h1>
        <div className="bg-zinc-50 dark:bg-[#09090b] p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 mb-6">
          <div className="flex justify-between items-center font-bold mb-2">
            <span>Tradinglekha Pro</span>
            <span>$29.00</span>
          </div>
          <p className="text-sm text-zinc-500">Billed monthly</p>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-widest mb-1.5">Card Number</label>
            <input type="text" placeholder="0000 0000 0000 0000" className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-[#09090b] border border-zinc-200 dark:border-zinc-800 rounded-lg focus:ring-2 focus:ring-[#2E5D9F] outline-none transition-all" />
          </div>
          <button className="w-full py-3 bg-[#2E5D9F] text-white rounded-lg font-bold hover:bg-[#5B8DEF] transition-all mt-4">
            Pay $29.00
          </button>
        </div>
      </div>
    </div>
  );
}
