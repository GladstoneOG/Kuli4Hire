"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, MapPin, CheckCircle, Clock, ShieldCheck, ArrowRight } from "lucide-react";
import { Worker } from "@/lib/types";
import { formatRupiah } from "@/lib/utils";

interface WorkerCardProps {
  worker: Worker;
  onQuickBook?: (worker: Worker) => void;
}

export function WorkerCard({ worker, onQuickBook }: WorkerCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 hover:border-brand-500/50 hover:shadow-lg hover:shadow-brand-500/5 transition-all flex flex-col justify-between group">
      <div>
        {/* Top Header: Avatar + Info */}
        <div className="flex items-start gap-4">
          <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-200">
            <Image
              src={worker.avatarUrl}
              alt={worker.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-brand-50 text-brand-700 border border-brand-200">
                {worker.trade}
              </span>
              {worker.badge && (
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-900 text-white">
                  {worker.badge}
                </span>
              )}
            </div>

            <h3 className="font-bold text-slate-900 text-base mt-1 truncate flex items-center gap-1.5">
              <Link href={`/workers/${worker.id}`} className="hover:text-brand-600 transition-colors">
                {worker.name}
              </Link>
              {worker.isVerified && (
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              )}
            </h3>

            <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
              <div className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{worker.district}, {worker.city} ({worker.distanceKm} km)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Rating and Response */}
        <div className="flex items-center justify-between text-xs py-3 my-3 border-y border-slate-100">
          <div className="flex items-center gap-1 text-slate-800 font-semibold">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span>{worker.rating}</span>
            <span className="text-slate-400 font-normal">({worker.reviewCount} reviews)</span>
          </div>
          <div className="flex items-center gap-1 text-slate-500">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>Replies in {worker.responseTime}</span>
          </div>
        </div>

        {/* Skills Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {worker.skills.slice(0, 3).map((skill, idx) => (
            <span
              key={idx}
              className="text-[11px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom Pricing & CTA */}
      <div className="pt-2 flex items-center justify-between gap-3 border-t border-slate-100">
        <div>
          <div className="text-[11px] text-slate-400 uppercase font-semibold">Daily Rate</div>
          <div className="text-base font-extrabold text-slate-900">
            {formatRupiah(worker.dailyRate)}
            <span className="text-xs font-normal text-slate-500">/day</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={`/workers/${worker.id}`}
            className="px-3 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            Profile
          </Link>
          <button
            onClick={() => onQuickBook ? onQuickBook(worker) : null}
            className="px-3 py-2 text-xs font-semibold text-white bg-brand-500 hover:bg-brand-600 rounded-lg shadow-sm shadow-brand-500/20 transition-colors flex items-center gap-1"
          >
            <span>Book</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
