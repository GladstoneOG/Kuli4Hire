"use client";

import { useState } from "react";
import Image from "next/image";
import { MapPin, Navigation, Star, ShieldCheck, X } from "lucide-react";
import { Worker } from "@/lib/types";
import { formatRupiah } from "@/lib/utils";

interface MapMockProps {
  workers: Worker[];
  selectedWorkerId?: string | null;
  onSelectWorker?: (worker: Worker) => void;
}

export function MapMock({ workers, selectedWorkerId, onSelectWorker }: MapMockProps) {
  const [activePin, setActivePin] = useState<Worker | null>(
    workers.find((w) => w.id === selectedWorkerId) || null
  );

  return (
    <div className="relative w-full h-[520px] rounded-2xl overflow-hidden border border-slate-200 bg-[#e5e9ec] select-none">
      {/* Map styling grid & visual roads mockup */}
      <div className="absolute inset-0 opacity-40 pointer-events-none bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:20px_20px]" />
      
      {/* Decorative road lines */}
      <svg className="absolute inset-0 w-full h-full stroke-slate-300 pointer-events-none" fill="none">
        <path d="M-50,200 Q200,180 400,260 T800,220" strokeWidth="8" />
        <path d="M150,-20 Q180,220 220,550" strokeWidth="6" />
        <path d="M450,-50 Q430,300 480,550" strokeWidth="10" stroke="#cbd5e1" />
        <path d="M100,420 L750,380" strokeWidth="6" />
      </svg>

      {/* Center user location indicator (Kemang / South Jakarta) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center pointer-events-none">
        <div className="w-16 h-16 rounded-full bg-brand-500/15 border-2 border-dashed border-brand-500 animate-ping absolute" />
        <div className="w-8 h-8 rounded-full bg-brand-500 text-white flex items-center justify-center shadow-lg border-2 border-white">
          <Navigation className="w-4 h-4 fill-white" />
        </div>
        <span className="mt-1 text-[10px] font-bold bg-slate-900/90 text-white px-2 py-0.5 rounded shadow">
          Your Location (Jakarta Selatan)
        </span>
      </div>

      {/* Map overlay tags */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
        <div className="bg-white/95 backdrop-blur px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 shadow-sm flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-brand-500" />
          <span>Active Search Radius: 10 km</span>
        </div>
        <span className="bg-white/95 backdrop-blur px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-600 font-medium shadow-sm">
          {workers.length} Pros nearby
        </span>
      </div>

      {/* Worker Pins */}
      {workers.map((w, index) => {
        // distribute pins visually around center
        const offsets = [
          { top: "32%", left: "42%" },
          { top: "62%", left: "58%" },
          { top: "28%", left: "68%" },
          { top: "45%", left: "30%" },
          { top: "70%", left: "38%" },
          { top: "40%", left: "75%" },
        ];
        const pos = offsets[index % offsets.length];
        const isSelected = activePin?.id === w.id;

        return (
          <div
            key={w.id}
            style={{ top: pos.top, left: pos.left }}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
          >
            <button
              onClick={() => {
                setActivePin(w);
                if (onSelectWorker) onSelectWorker(w);
              }}
              className={`group flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-bold shadow-md transition-all ${
                isSelected
                  ? "bg-slate-900 text-white scale-110 ring-4 ring-brand-500/30"
                  : "bg-white text-slate-900 hover:bg-slate-900 hover:text-white"
              }`}
            >
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>{formatRupiah(w.dailyRate).replace(",00", "")}</span>
            </button>
          </div>
        );
      })}

      {/* Selected Worker Flyout Card */}
      {activePin && (
        <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 z-30 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 animate-in slide-in-from-bottom-2">
          <button
            onClick={() => setActivePin(null)}
            className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 p-1"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
              <Image src={activePin.avatarUrl} alt={activePin.name} fill className="object-cover" />
            </div>
            <div className="flex-1 min-w-0 pr-4">
              <div className="text-[11px] font-semibold text-brand-600 truncate">{activePin.trade}</div>
              <div className="font-bold text-slate-900 text-sm truncate">{activePin.name}</div>
              <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="font-semibold text-slate-800">{activePin.rating}</span>
                <span>• {activePin.distanceKm} km away</span>
              </div>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
            <div className="text-xs font-bold text-slate-900">
              {formatRupiah(activePin.dailyRate)} <span className="text-[10px] text-slate-400 font-normal">/ day</span>
            </div>
            <a
              href={`/workers/${activePin.id}`}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-colors"
            >
              View Profile
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
