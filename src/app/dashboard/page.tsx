"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ShieldCheck, CheckCircle2, Clock, AlertCircle, 
  MessageCircle, Star, ArrowUpRight, Check, X 
} from "lucide-react";
import { MOCK_BOOKINGS } from "@/lib/data";
import { Booking } from "@/lib/types";
import { formatRupiah } from "@/lib/utils";

export default function DashboardPage() {
  const [bookings, setBookings] = useState<Booking[]>(MOCK_BOOKINGS);
  const [selectedBookingForRelease, setSelectedBookingForRelease] = useState<Booking | null>(null);
  const [reviewedBookingId, setReviewedBookingId] = useState<string | null>(null);

  const handleReleaseEscrow = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: "completed" } : b))
    );
    setSelectedBookingForRelease(null);
  };

  const activeBookingsCount = bookings.filter((b) => b.status === "in_progress" || b.status === "escrow_secured").length;
  const activeEscrowAmount = bookings
    .filter((b) => b.status === "in_progress" || b.status === "escrow_secured")
    .reduce((sum, b) => sum + b.totalGross, 0);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Dashboard Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900">Escrow & Bookings Dashboard</h1>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
              Live Demo
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">Manage active tradespeople, track escrow deposits, and release payments upon completion.</p>
        </div>

        <Link
          href="/workers"
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
        >
          + Hire Another Pro
        </Link>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-1">
          <div className="text-xs font-semibold text-slate-400 uppercase">Active Escrow Funds</div>
          <div className="text-2xl font-black text-slate-900">{formatRupiah(activeEscrowAmount)}</div>
          <div className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            Safely locked in Escrow
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-1">
          <div className="text-xs font-semibold text-slate-400 uppercase">Active Bookings</div>
          <div className="text-2xl font-black text-slate-900">{activeBookingsCount} Ongoing</div>
          <div className="text-[11px] text-slate-500">Scheduled on-site jobs</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-1">
          <div className="text-xs font-semibold text-slate-400 uppercase">Platform Fee Policy</div>
          <div className="text-2xl font-black text-brand-600">10% Platform Cut</div>
          <div className="text-[11px] text-slate-500">90% net disbursed to worker</div>
        </div>
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-slate-900">Your Service Bookings</h2>

        <div className="space-y-3">
          {bookings.map((booking) => {
            const isCompleted = booking.status === "completed";

            return (
              <div
                key={booking.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 hover:border-slate-300 transition-all"
              >
                {/* Left: Worker Info & Dates */}
                <div className="flex items-start gap-4">
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-200">
                    <Image
                      src={booking.workerAvatar}
                      alt={booking.workerName}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-brand-50 text-brand-700 border border-brand-200">
                        {booking.workerTrade}
                      </span>
                      <span className="text-xs font-mono text-slate-400">{booking.id}</span>
                      {isCompleted ? (
                        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          Job Completed & Paid
                        </span>
                      ) : (
                        <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Escrow Secured • In Progress
                        </span>
                      )}
                    </div>

                    <h3 className="font-bold text-slate-900 text-base">{booking.workerName}</h3>
                    <div className="text-xs text-slate-500">
                      {booking.jobAddress} • {booking.startDate} ({booking.days} days)
                    </div>
                  </div>
                </div>

                {/* Middle: Financials */}
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 text-xs space-y-1 w-full md:w-56">
                  <div className="flex justify-between text-slate-500">
                    <span>Total Deposit:</span>
                    <span className="font-bold text-slate-900">{formatRupiah(booking.totalGross)}</span>
                  </div>
                  <div className="flex justify-between text-slate-400 text-[11px]">
                    <span>Worker Payout (90%):</span>
                    <span>{formatRupiah(booking.netPayout)}</span>
                  </div>
                  <div className="flex justify-between text-slate-400 text-[11px]">
                    <span>Platform Fee (10%):</span>
                    <span>{formatRupiah(booking.platformFee)}</span>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                  {!isCompleted ? (
                    <button
                      onClick={() => setSelectedBookingForRelease(booking)}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm transition-colors flex items-center gap-1.5"
                    >
                      <Check className="w-4 h-4" />
                      <span>Release Escrow Payout</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => setReviewedBookingId(booking.id)}
                      className="px-3.5 py-2 border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-xs rounded-xl flex items-center gap-1"
                    >
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span>{reviewedBookingId === booking.id ? "Review Posted" : "Leave Review"}</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Escrow Release Confirmation Modal */}
      {selectedBookingForRelease && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base">Release Escrow Payout</h3>
              <button
                onClick={() => setSelectedBookingForRelease(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 space-y-2 text-xs">
              <div className="text-slate-600">Worker: <span className="font-bold text-slate-900">{selectedBookingForRelease.workerName}</span></div>
              <div className="text-slate-600">Gross Deposit: <span className="font-bold text-slate-900">{formatRupiah(selectedBookingForRelease.totalGross)}</span></div>
              <div className="text-slate-600">Platform Commission (10%): <span className="font-bold text-brand-600">-{formatRupiah(selectedBookingForRelease.platformFee)}</span></div>
              <div className="pt-2 border-t border-slate-200 text-sm font-black text-emerald-700 flex justify-between">
                <span>Net Disbursement:</span>
                <span>{formatRupiah(selectedBookingForRelease.netPayout)}</span>
              </div>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              By confirming, you verify that the work has been satisfactorily completed. The net payout will be disbursed to {selectedBookingForRelease.workerName}&apos;s verified bank account immediately.
            </p>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setSelectedBookingForRelease(null)}
                className="w-1/3 py-2.5 border border-slate-200 text-slate-600 rounded-xl text-xs font-semibold hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleReleaseEscrow(selectedBookingForRelease.id)}
                className="w-2/3 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm transition-colors"
              >
                Confirm & Release Payout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
