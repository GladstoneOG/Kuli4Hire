import Link from "next/link";
import { HardHat, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center text-white">
              <HardHat className="w-4 h-4" />
            </div>
            <span className="font-bold text-slate-900">kuli4hire</span>
            <span className="text-xs text-slate-500">© 2026 Kuli4Hire. All rights reserved.</span>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-600">
            <Link href="/workers" className="hover:text-slate-900">Browse Trades</Link>
            <Link href="/post-job" className="hover:text-slate-900">Post Job</Link>
            <Link href="/join" className="hover:text-slate-900">Join as Pro</Link>
            <Link href="/dashboard" className="hover:text-slate-900">Escrow Dashboard</Link>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Escrow Protected Platform</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
