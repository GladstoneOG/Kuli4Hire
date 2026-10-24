"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { 
  Star, MapPin, ShieldCheck, Clock, CheckCircle2, 
  ArrowLeft, ChevronRight, Briefcase, Wrench, Share2 
} from "lucide-react";
import { MOCK_WORKERS } from "@/lib/data";
import { BookingModal } from "@/components/BookingModal";
import { formatRupiah } from "@/lib/utils";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function WorkerDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const worker = MOCK_WORKERS.find((w) => w.id === resolvedParams.id);

  const [days, setDays] = useState(2);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!worker) {
    return notFound();
  }

  const subtotal = worker.dailyRate * days;
  const platformFee = Math.round(subtotal * 0.1);
  const totalDeposit = subtotal + platformFee;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Back Link */}
      <Link
        href="/workers"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Workers</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Worker Bio, Portfolio, Reviews */}
        <div className="lg:col-span-2 space-y-8">
          {/* Main Profile Header Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row items-start gap-5">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-200">
                <Image
                  src={worker.avatarUrl}
                  alt={worker.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-brand-50 text-brand-700 border border-brand-200">
                    {worker.trade}
                  </span>
                  {worker.badge && (
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-900 text-white">
                      {worker.badge}
                    </span>
                  )}
                  {worker.isVerified && (
                    <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      KTP Verified
                    </span>
                  )}
                </div>

                <h1 className="text-2xl sm:text-3xl font-black text-slate-900">{worker.name}</h1>

                <div className="flex items-center gap-4 text-xs text-slate-500 flex-wrap">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{worker.district}, {worker.city} ({worker.distanceKm} km away)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Responds in {worker.responseTime}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-3 py-4 border-y border-slate-100 text-center">
              <div>
                <div className="flex items-center justify-center gap-1 text-slate-900 font-bold text-base">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{worker.rating}</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">{worker.reviewCount} Reviews</div>
              </div>
              <div className="border-x border-slate-100">
                <div className="text-base font-bold text-slate-900">{worker.completedJobs}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Completed Jobs</div>
              </div>
              <div>
                <div className="text-base font-bold text-emerald-600">100%</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Escrow Success</div>
              </div>
            </div>

            {/* Bio */}
            <div>
              <h2 className="text-sm font-bold text-slate-900 mb-2">About & Experience</h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{worker.bio}</p>
            </div>

            {/* Skills */}
            <div>
              <h2 className="text-sm font-bold text-slate-900 mb-2.5">Skills & Specializations</h2>
              <div className="flex flex-wrap gap-2">
                {worker.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-semibold px-3 py-1 bg-slate-100 text-slate-700 rounded-lg"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Equipment */}
            <div>
              <h2 className="text-sm font-bold text-slate-900 mb-2.5">Equipment & Tools Provided</h2>
              <div className="flex flex-wrap gap-2">
                {worker.equipment.map((eq, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-medium px-2.5 py-1 bg-orange-50 text-orange-800 border border-orange-100 rounded-lg flex items-center gap-1.5"
                  >
                    <Wrench className="w-3 h-3 text-orange-600" />
                    {eq}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Portfolio Section */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Past Project Photos</h2>
              <p className="text-xs text-slate-500 mt-0.5">Documented site work verified by clients</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {worker.portfolio.map((item) => (
                <div
                  key={item.id}
                  className="group relative rounded-xl overflow-hidden border border-slate-200 bg-slate-100 aspect-video"
                >
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-3">
                    <span className="text-[10px] font-bold uppercase text-brand-300">{item.category}</span>
                    <span className="text-xs font-bold text-white truncate">{item.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews Section */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Verified Client Reviews</h2>
                <p className="text-xs text-slate-500 mt-0.5">Reviews submitted after completed escrow jobs</p>
              </div>
              <div className="flex items-center gap-1 text-slate-900 font-bold text-sm">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{worker.rating}</span>
                <span className="text-slate-400 font-normal text-xs">({worker.reviewCount})</span>
              </div>
            </div>

            <div className="space-y-4">
              {worker.reviews.map((rev) => (
                <div key={rev.id} className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="relative w-8 h-8 rounded-full overflow-hidden bg-slate-200">
                        <Image src={rev.avatar} alt={rev.author} fill className="object-cover" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">{rev.author}</div>
                        <div className="text-[10px] text-slate-400">{rev.jobType} • {rev.date}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-0.5">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">{rev.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Booking / Escrow Calculator */}
        <div className="lg:sticky lg:top-24 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xl shadow-slate-200/50 space-y-5">
            {/* Header Rates */}
            <div>
              <div className="text-xs text-slate-400 font-semibold uppercase">Daily Rate</div>
              <div className="text-2xl font-black text-slate-900 mt-0.5">
                {formatRupiah(worker.dailyRate)}
                <span className="text-xs font-normal text-slate-500"> / day (8 hours)</span>
              </div>
            </div>

            {/* Duration Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">Estimated Duration</label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setDays(Math.max(1, days - 1))}
                  className="w-10 h-10 rounded-xl border border-slate-200 font-bold text-slate-700 hover:bg-slate-50"
                >
                  -
                </button>
                <div className="flex-1 text-center font-black text-slate-900 text-base">
                  {days} <span className="text-xs font-normal text-slate-500">working days</span>
                </div>
                <button
                  type="button"
                  onClick={() => setDays(days + 1)}
                  className="w-10 h-10 rounded-xl border border-slate-200 font-bold text-slate-700 hover:bg-slate-50"
                >
                  +
                </button>
              </div>
            </div>

            {/* Escrow Financial Breakdown */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Labor Cost ({days} days)</span>
                <span className="font-semibold text-slate-800">{formatRupiah(subtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Platform Escrow Fee (10%)</span>
                <span className="font-semibold text-slate-800">{formatRupiah(platformFee)}</span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-bold text-slate-900">
                <span>Total Escrow Deposit</span>
                <span className="text-brand-600 font-black text-base">{formatRupiah(totalDeposit)}</span>
              </div>
            </div>

            {/* Escrow Guarantee Pill */}
            <div className="text-[11px] text-emerald-700 bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>Payment is held in escrow and released only after you verify the completed work.</span>
            </div>

            {/* Action CTA */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full py-3.5 bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm rounded-xl shadow-md shadow-brand-500/25 transition-all flex items-center justify-center gap-2"
            >
              <span>Book with Escrow Protection</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        worker={worker}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
