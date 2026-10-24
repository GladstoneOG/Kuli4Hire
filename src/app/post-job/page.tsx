"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  HardHat, MapPin, Calendar, ShieldCheck, 
  CheckCircle2, ArrowRight, Upload, DollarSign 
} from "lucide-react";
import { TRADE_CATEGORIES } from "@/lib/data";

export default function PostJobPage() {
  const [trade, setTrade] = useState("Tukang Bangunan");
  const [title, setTitle] = useState("Renovasi Kamar Mandi & Pasang Keramik");
  const [location, setLocation] = useState("Tebet, Jakarta Selatan");
  const [duration, setDuration] = useState("3");
  const [dailyBudget, setDailyBudget] = useState("180000");
  const [notes, setNotes] = useState("Perlu bongkar keramik lama dan pasang granit 60x60 baru.");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold mb-3">
          <HardHat className="w-3.5 h-3.5" />
          <span>Broadcast Request</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Post a Job Request</h1>
        <p className="text-xs text-slate-500 mt-1">
          Receive direct quotes from verified tradespeople in your neighborhood.
        </p>
      </div>

      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-5">
          {/* Trade Category */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              Trade Required
            </label>
            <select
              value={trade}
              onChange={(e) => setTrade(e.target.value)}
              className="w-full text-xs font-semibold text-slate-900 p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            >
              {TRADE_CATEGORIES.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Job Title */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              Job Title / Brief Summary
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Pasang Bata Hebel 20m2"
              required
              className="w-full text-xs font-semibold text-slate-900 p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              Project Location / District
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="District, City (e.g. Kemang, Jakarta Selatan)"
                required
                className="w-full pl-9 pr-3 py-3 text-xs font-semibold text-slate-900 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              />
            </div>
          </div>

          {/* Grid: Duration + Budget */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Estimated Days
              </label>
              <input
                type="number"
                min="1"
                max="30"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full text-xs font-semibold text-slate-900 p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Daily Budget Offer (Rp)
              </label>
              <input
                type="number"
                step="10000"
                value={dailyBudget}
                onChange={(e) => setDailyBudget(e.target.value)}
                className="w-full text-xs font-semibold text-slate-900 p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              Specific Instructions
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Material availability, access hours, specific tools needed..."
              className="w-full text-xs font-medium text-slate-900 p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
          </div>

          {/* Photo upload mock */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              Photos of Work Area (Optional)
            </label>
            <div className="border-2 border-dashed border-slate-200 rounded-xl p-5 text-center hover:border-brand-500 transition-colors cursor-pointer bg-slate-50/50">
              <Upload className="w-5 h-5 text-slate-400 mx-auto mb-1.5" />
              <div className="text-xs font-semibold text-slate-700">Click to upload site photos</div>
              <div className="text-[10px] text-slate-400">JPG, PNG up to 10MB</div>
            </div>
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            className="w-full py-3.5 bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-brand-500/25 transition-all flex items-center justify-center gap-2"
          >
            <span>Broadcast to Nearby {trade}s</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-4 shadow-sm animate-in fade-in">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900">Job Broadcasted!</h2>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Your request for <span className="font-semibold text-slate-800">{title}</span> was sent to 14 verified {trade}s within 10 km. You will be notified when quotes arrive.
            </p>
          </div>
          <div className="flex justify-center gap-3 pt-2">
            <Link
              href="/workers"
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl"
            >
              Browse Active Pros
            </Link>
            <button
              onClick={() => setIsSubmitted(false)}
              className="px-4 py-2 border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold rounded-xl"
            >
              Post Another
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
