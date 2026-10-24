"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ShieldCheck, Calendar, MapPin, CheckCircle2, QrCode, CreditCard, ChevronRight } from "lucide-react";
import { Worker } from "@/lib/types";
import { formatRupiah } from "@/lib/utils";

interface BookingModalProps {
  worker: Worker | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function BookingModal({ worker, isOpen, onClose, onSuccess }: BookingModalProps) {
  const [days, setDays] = useState(2);
  const [startDate, setStartDate] = useState("2026-10-26");
  const [address, setAddress] = useState("Jl. Tebet Barat Dalam No. 12, Jakarta Selatan");
  const [paymentStep, setPaymentStep] = useState<"details" | "payment" | "success">("details");
  const [paymentMethod, setPaymentMethod] = useState<"qris" | "bca_va" | "mandiri_va">("qris");

  if (!isOpen || !worker) return null;

  const subtotal = worker.dailyRate * days;
  const platformFee = Math.round(subtotal * 0.1); // 10% platform fee
  const totalDeposit = subtotal + platformFee;

  const handleConfirmPayment = () => {
    setPaymentStep("success");
    setTimeout(() => {
      if (onSuccess) onSuccess();
    }, 2000);
  };

  const resetAndClose = () => {
    setPaymentStep("details");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <h2 className="text-base font-bold text-slate-900">
              {paymentStep === "details" && "Book with Escrow Protection"}
              {paymentStep === "payment" && "Simulated Escrow Payment"}
              {paymentStep === "success" && "Booking Secured!"}
            </h2>
          </div>
          <button
            onClick={resetAndClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step 1: Booking Details */}
        {paymentStep === "details" && (
          <div className="p-6 space-y-5">
            {/* Worker Snippet */}
            <div className="flex items-center gap-3.5 p-3 rounded-xl bg-slate-50 border border-slate-200/60">
              <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-slate-200">
                <Image src={worker.avatarUrl} alt={worker.name} fill className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-brand-600">{worker.trade}</div>
                <div className="font-bold text-slate-900 truncate">{worker.name}</div>
                <div className="text-xs text-slate-500">{formatRupiah(worker.dailyRate)} / day</div>
              </div>
            </div>

            {/* Inputs */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Number of Working Days
                </label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setDays(Math.max(1, days - 1))}
                    className="w-10 h-10 rounded-lg border border-slate-200 flex items-center justify-center font-bold text-slate-700 hover:bg-slate-50"
                  >
                    -
                  </button>
                  <span className="text-lg font-bold text-slate-900 w-12 text-center">{days}</span>
                  <button
                    type="button"
                    onClick={() => setDays(days + 1)}
                    className="w-10 h-10 rounded-lg border border-slate-200 flex items-center justify-center font-bold text-slate-700 hover:bg-slate-50"
                  >
                    +
                  </button>
                  <span className="text-xs text-slate-500 font-medium">({days} working days)</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Start Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Project Address
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Address or location details"
                  className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                />
              </div>
            </div>

            {/* Cost Breakdown */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Labor Cost ({days} days × {formatRupiah(worker.dailyRate)})</span>
                <span className="font-semibold text-slate-800">{formatRupiah(subtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Platform Escrow Fee (10%)</span>
                <span className="font-semibold text-slate-800">{formatRupiah(platformFee)}</span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-bold text-slate-900">
                <span>Total Escrow Deposit</span>
                <span className="text-brand-600 text-base">{formatRupiah(totalDeposit)}</span>
              </div>
            </div>

            {/* Action */}
            <button
              onClick={() => setPaymentStep("payment")}
              className="w-full py-3 bg-brand-500 hover:bg-brand-600 text-white font-semibold text-sm rounded-xl shadow-sm shadow-brand-500/30 transition-colors flex items-center justify-center gap-2"
            >
              <span>Continue to Escrow Payment</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 2: Simulated Payment */}
        {paymentStep === "payment" && (
          <div className="p-6 space-y-5">
            <div className="text-center">
              <div className="text-xs text-slate-500 font-medium">Deposit Amount</div>
              <div className="text-2xl font-black text-slate-900 mt-1">{formatRupiah(totalDeposit)}</div>
              <div className="text-[11px] text-emerald-700 font-medium mt-1 inline-flex items-center gap-1 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5" />
                Held safely in escrow until you approve the work
              </div>
            </div>

            {/* Payment options */}
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setPaymentMethod("qris")}
                className={`w-full p-3 rounded-xl border flex items-center justify-between text-left transition-all ${
                  paymentMethod === "qris"
                    ? "border-brand-500 bg-brand-50/40 ring-1 ring-brand-500"
                    : "border-slate-200 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-slate-900 text-white flex items-center justify-center">
                    <QrCode className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">QRIS Instant</div>
                    <div className="text-xs text-slate-500">GoPay, OVO, BCA, Dana, ShopeePay</div>
                  </div>
                </div>
                <div className={`w-4 h-4 rounded-full border ${paymentMethod === "qris" ? "border-brand-500 bg-brand-500" : "border-slate-300"}`} />
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("bca_va")}
                className={`w-full p-3 rounded-xl border flex items-center justify-between text-left transition-all ${
                  paymentMethod === "bca_va"
                    ? "border-brand-500 bg-brand-50/40 ring-1 ring-brand-500"
                    : "border-slate-200 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center font-black text-xs">
                    BCA
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">BCA Virtual Account</div>
                    <div className="text-xs text-slate-500">Instant automatic verification</div>
                  </div>
                </div>
                <div className={`w-4 h-4 rounded-full border ${paymentMethod === "bca_va" ? "border-brand-500 bg-brand-500" : "border-slate-300"}`} />
              </button>
            </div>

            {/* Mock QR visual */}
            {paymentMethod === "qris" && (
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col items-center">
                <div className="w-36 h-36 bg-white p-2 rounded-lg border border-slate-300 flex items-center justify-center">
                  <div className="text-center space-y-1">
                    <QrCode className="w-24 h-24 mx-auto text-slate-800" />
                    <div className="text-[10px] font-mono text-slate-400">SCAN DUMMY QRIS</div>
                  </div>
                </div>
                <span className="text-xs text-slate-500 mt-2">Mock QR Code for Sandbox Testing</span>
              </div>
            )}

            {/* Simulate Button */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setPaymentStep("details")}
                className="w-1/3 py-2.5 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl text-xs font-semibold"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleConfirmPayment}
                className="w-2/3 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow-sm transition-colors flex items-center justify-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Confirm Escrow Deposit</span>
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Success Screen */}
        {paymentStep === "success" && (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Payment Secured in Escrow!</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                {worker.name} has been notified on WhatsApp. Work starts on {startDate}. Funds will only be paid after your final approval.
              </p>
            </div>
            <div className="pt-2">
              <button
                onClick={resetAndClose}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl"
              >
                Close & View Booking
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
