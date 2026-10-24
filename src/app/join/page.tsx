"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  HardHat, ShieldCheck, CheckCircle2, 
  Upload, ArrowRight, DollarSign, Phone, MapPin 
} from "lucide-react";
import { TRADE_CATEGORIES } from "@/lib/data";

export default function JoinAsProPage() {
  const [name, setName] = useState("Pak Wahyu Santoso");
  const [phone, setPhone] = useState("081289102938");
  const [city, setCity] = useState("Jakarta Selatan");
  const [district, setDistrict] = useState("Tebet");
  const [trade, setTrade] = useState("Tukang Bangunan");
  const [dailyRate, setDailyRate] = useState("175000");
  const [experience, setExperience] = useState("8");
  const [bio, setBio] = useState("Spesialis pasang bata ringan hebel, cor dak, dan plester aci rapi.");
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
          <HardHat className="w-3.5 h-3.5 text-brand-500" />
          <span>Worker Registration</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">List Your Trade on Kuli4Hire</h1>
        <p className="text-xs text-slate-500 mt-1">
          Set your daily rate, receive verified escrow bookings, and get paid directly to your bank account.
        </p>
      </div>

      {/* Benefits row */}
      <div className="grid grid-cols-3 gap-3 mb-8 text-center">
        <div className="bg-white p-3 rounded-xl border border-slate-200">
          <div className="text-sm font-black text-slate-900">90% Payout</div>
          <div className="text-[10px] text-slate-500 mt-0.5">Low 10% fee</div>
        </div>
        <div className="bg-white p-3 rounded-xl border border-slate-200">
          <div className="text-sm font-black text-emerald-600">Escrow Secured</div>
          <div className="text-[10px] text-slate-500 mt-0.5">Guaranteed funds</div>
        </div>
        <div className="bg-white p-3 rounded-xl border border-slate-200">
          <div className="text-sm font-black text-brand-600">WhatsApp Alert</div>
          <div className="text-[10px] text-slate-500 mt-0.5">Instant booking ping</div>
        </div>
      </div>

      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-5">
          {/* Section 1: Contact */}
          <div className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">1. Contact & Location</h2>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full text-xs font-medium text-slate-900 p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">WhatsApp Phone Number</label>
                <div className="relative">
                  <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    placeholder="08123456789"
                    className="w-full pl-8 pr-3 py-2.5 text-xs font-medium text-slate-900 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">City & District</label>
                <div className="relative">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={`${district}, ${city}`}
                    onChange={(e) => setDistrict(e.target.value)}
                    required
                    className="w-full pl-8 pr-3 py-2.5 text-xs font-medium text-slate-900 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Trade & Rate */}
          <div className="space-y-4 pt-3 border-t border-slate-100">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">2. Trade & Pricing</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Primary Trade</label>
                <select
                  value={trade}
                  onChange={(e) => setTrade(e.target.value)}
                  className="w-full text-xs font-medium text-slate-900 p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                >
                  {TRADE_CATEGORIES.map((c) => (
                    <option key={c.name} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Daily Labor Rate (Rp)</label>
                <input
                  type="number"
                  step="10000"
                  value={dailyRate}
                  onChange={(e) => setDailyRate(e.target.value)}
                  required
                  className="w-full text-xs font-medium text-slate-900 p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Brief Work Description</label>
              <textarea
                rows={2}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full text-xs font-medium text-slate-900 p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              />
            </div>
          </div>

          {/* Section 3: Verification */}
          <div className="space-y-4 pt-3 border-t border-slate-100">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">3. Identity Verification</h2>

            <div className="border border-dashed border-slate-200 rounded-xl p-4 text-center bg-slate-50 hover:border-brand-500 transition-colors cursor-pointer">
              <Upload className="w-5 h-5 text-slate-400 mx-auto mb-1" />
              <div className="text-xs font-semibold text-slate-700">Upload KTP Photo (Identity Card)</div>
              <div className="text-[10px] text-slate-400">Used for verification badge. Kept strictly confidential.</div>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-brand-500/25 transition-all flex items-center justify-center gap-2"
          >
            <span>Submit Worker Profile</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-4 shadow-sm animate-in fade-in">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900">Profile Submitted!</h2>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Welcome, <span className="font-semibold text-slate-800">{name}</span>. Your {trade} profile has been listed with a daily rate of Rp {Number(dailyRate).toLocaleString("id-ID")}. Verification will complete within 2 hours.
            </p>
          </div>
          <div className="flex justify-center gap-3 pt-2">
            <Link
              href="/workers"
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl"
            >
              View Public Directory
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
