"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Search, MapPin, ShieldCheck, Star, Users, Hammer, 
  Paintbrush, Zap, Wrench, Grid, HardHat, ArrowRight, CheckCircle2 
} from "lucide-react";
import { TRADE_CATEGORIES, MOCK_WORKERS } from "@/lib/data";
import { WorkerCard } from "@/components/WorkerCard";
import { BookingModal } from "@/components/BookingModal";
import { Worker } from "@/lib/types";

export default function Home() {
  const router = useRouter();
  const [selectedTrade, setSelectedTrade] = useState("All Trades");
  const [location, setLocation] = useState("Jakarta Selatan");
  const [activeBookingWorker, setActiveBookingWorker] = useState<Worker | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (selectedTrade !== "All Trades") params.set("trade", selectedTrade);
    if (location) params.set("location", location);
    router.push(`/workers?${params.toString()}`);
  };

  return (
    <div className="space-y-16 pb-12">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-white via-orange-50/20 to-slate-50 border-b border-slate-200 pt-16 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Trust pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold mb-6">
            <ShieldCheck className="w-4 h-4 text-brand-500" />
            <span>100% ID Verified & Escrow Protected</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
            Hire Verified Tradespeople & Builders
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal">
            Find nearby builders, handymen, painters, and electricians. Compare transparent daily rates and pay securely with escrow.
          </p>

          {/* Superprof-style Search Widget */}
          <div className="mt-8 max-w-3xl mx-auto">
            <form
              onSubmit={handleSearch}
              className="bg-white p-2.5 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200 flex flex-col md:flex-row gap-2"
            >
              {/* Trade Select */}
              <div className="flex-1 flex items-center gap-2.5 px-3 py-2 border-b md:border-b-0 md:border-r border-slate-100">
                <Hammer className="w-5 h-5 text-brand-500 flex-shrink-0" />
                <div className="text-left w-full">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Trade or Skill</div>
                  <select
                    value={selectedTrade}
                    onChange={(e) => setSelectedTrade(e.target.value)}
                    className="w-full text-sm font-semibold text-slate-900 bg-transparent focus:outline-none cursor-pointer"
                  >
                    <option value="All Trades">All Trades</option>
                    {TRADE_CATEGORIES.map((c) => (
                      <option key={c.name} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Location Select */}
              <div className="flex-1 flex items-center gap-2.5 px-3 py-2">
                <MapPin className="w-5 h-5 text-slate-400 flex-shrink-0" />
                <div className="text-left w-full">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Location</div>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="City or neighborhood"
                    className="w-full text-sm font-semibold text-slate-900 bg-transparent focus:outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="px-6 py-3.5 bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm rounded-xl shadow-md shadow-brand-500/25 transition-all flex items-center justify-center gap-2 flex-shrink-0"
              >
                <Search className="w-4 h-4" />
                <span>Search Workers</span>
              </button>
            </form>

            {/* Quick Location Pills */}
            <div className="mt-3 flex items-center justify-center gap-2 text-xs text-slate-500 flex-wrap">
              <span className="font-medium">Popular:</span>
              {["Jakarta Selatan", "Tebet", "Kemang", "Serpong", "Bandung"].map((loc) => (
                <button
                  key={loc}
                  type="button"
                  onClick={() => setLocation(loc)}
                  className="px-2 py-0.5 rounded-md bg-white border border-slate-200 hover:border-slate-400 text-slate-700 transition-colors"
                >
                  {loc}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Explore by Trade</h2>
            <p className="text-xs text-slate-500 mt-0.5">Specialized trades ready for booking</p>
          </div>
          <Link href="/workers" className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1">
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {TRADE_CATEGORIES.slice(0, 5).map((category) => (
            <Link
              key={category.name}
              href={`/workers?trade=${encodeURIComponent(category.name)}`}
              className="p-4 rounded-xl bg-white border border-slate-200 hover:border-brand-500 hover:shadow-sm transition-all group"
            >
              <div className="w-9 h-9 rounded-lg bg-orange-50 text-brand-600 flex items-center justify-center group-hover:bg-brand-500 group-hover:text-white transition-colors mb-2.5">
                <Hammer className="w-4 h-4" />
              </div>
              <div className="font-bold text-slate-900 text-xs truncate">{category.name}</div>
              <div className="text-[11px] text-slate-400 mt-0.5">{category.count} available</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured / Nearby Pros */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-slate-900">Top Rated Nearby Workers</h2>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                Available Now
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">Verified identity, reviews, and completed projects</p>
          </div>
          <Link
            href="/workers"
            className="text-xs font-semibold text-slate-700 hover:text-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-colors"
          >
            All 50+ Pros
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {MOCK_WORKERS.slice(0, 3).map((worker) => (
            <WorkerCard
              key={worker.id}
              worker={worker}
              onQuickBook={(w) => setActiveBookingWorker(w)}
            />
          ))}
        </div>
      </section>

      {/* How it Works - 3 Concise Steps */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10">
          <div className="text-center max-w-lg mx-auto mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">How Kuli4Hire Works</h2>
            <p className="text-xs text-slate-500 mt-1">Simple, transparent, and protected from start to finish.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                1
              </div>
              <h3 className="font-bold text-sm text-slate-900">Find & Compare</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Filter by trade, distance radius, and daily price. Review past work photos and ratings.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-brand-500 text-white flex items-center justify-center font-bold text-xs">
                2
              </div>
              <h3 className="font-bold text-sm text-slate-900">Secure Escrow</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Deposit funds via QRIS or Bank Transfer. The money stays locked in escrow while the worker works.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                3
              </div>
              <h3 className="font-bold text-sm text-slate-900">Approve & Release</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Inspect the completed work. Confirm release to pay the worker directly to their bank account.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tradesperson Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-semibold text-brand-400 uppercase tracking-wider">Are you a skilled worker?</span>
            <h2 className="text-2xl font-bold">List your skills and get direct daily bookings</h2>
            <p className="text-xs text-slate-300 max-w-md">
              Set your own daily rate, receive guaranteed payments via escrow, and build your local reputation.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/join"
              className="px-5 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 font-bold text-sm text-white shadow-md shadow-brand-500/20 transition-all flex items-center gap-1.5"
            >
              <span>Register as Tradesperson</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal
        worker={activeBookingWorker}
        isOpen={!!activeBookingWorker}
        onClose={() => setActiveBookingWorker(null)}
        onSuccess={() => {
          setActiveBookingWorker(null);
          router.push("/dashboard");
        }}
      />
    </div>
  );
}
