"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { 
  Filter, Map, LayoutGrid, Search, MapPin, 
  Star, ShieldCheck, SlidersHorizontal, RotateCcw 
} from "lucide-react";
import { MOCK_WORKERS, TRADE_CATEGORIES } from "@/lib/data";
import { WorkerCard } from "@/components/WorkerCard";
import { MapMock } from "@/components/MapMock";
import { BookingModal } from "@/components/BookingModal";
import { Worker, TradeCategory } from "@/lib/types";
import { formatRupiah } from "@/lib/utils";

function WorkersContent() {
  const searchParams = useSearchParams();
  const initialTrade = searchParams.get("trade") || "All";
  const initialLocation = searchParams.get("location") || "";

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTrade, setSelectedTrade] = useState<string>(initialTrade);
  const [maxRate, setMaxRate] = useState<number>(300000);
  const [maxDistance, setMaxDistance] = useState<number>(15);
  const [minRating, setMinRating] = useState<number>(0);
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
  const [activeBookingWorker, setActiveBookingWorker] = useState<Worker | null>(null);

  // Filter workers based on criteria
  const filteredWorkers = useMemo(() => {
    return MOCK_WORKERS.filter((worker) => {
      // Trade filter
      if (selectedTrade !== "All" && worker.trade !== selectedTrade) {
        return false;
      }
      // Rate filter
      if (worker.dailyRate > maxRate) {
        return false;
      }
      // Distance filter
      if (worker.distanceKm > maxDistance) {
        return false;
      }
      // Rating filter
      if (minRating > 0 && worker.rating < minRating) {
        return false;
      }
      // Verified filter
      if (verifiedOnly && !worker.isVerified) {
        return false;
      }
      // Query text
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = worker.name.toLowerCase().includes(q);
        const matchSkill = worker.skills.some((s) => s.toLowerCase().includes(q));
        const matchDistrict = worker.district.toLowerCase().includes(q);
        if (!matchName && !matchSkill && !matchDistrict) return false;
      }
      return true;
    });
  }, [selectedTrade, maxRate, maxDistance, minRating, verifiedOnly, searchQuery]);

  const resetFilters = () => {
    setSelectedTrade("All");
    setMaxRate(300000);
    setMaxDistance(15);
    setMinRating(0);
    setVerifiedOnly(false);
    setSearchQuery("");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Search & View Toggle Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by worker name, skill, or district..."
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
          />
        </div>

        {/* View Mode & Location indicator */}
        <div className="flex items-center justify-between w-full md:w-auto gap-4">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <MapPin className="w-3.5 h-3.5 text-brand-500" />
            <span>Search Area: Jakarta Selatan</span>
          </div>

          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === "grid"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Grid</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("map")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === "map"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Map className="w-3.5 h-3.5" />
              <span>Map View</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Layout: Filters + Results */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Filter Sidebar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-slate-700" />
              <h2 className="text-sm font-bold text-slate-900">Filters</h2>
            </div>
            <button
              onClick={resetFilters}
              className="text-xs text-brand-600 hover:text-brand-700 font-medium flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>
          </div>

          {/* Trade Category */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Trade Category
            </label>
            <select
              value={selectedTrade}
              onChange={(e) => setSelectedTrade(e.target.value)}
              className="w-full text-xs font-medium text-slate-800 p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            >
              <option value="All">All Categories</option>
              {TRADE_CATEGORIES.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Distance Radius */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-700">Distance Radius</span>
              <span className="text-brand-600 font-bold">{maxDistance} km</span>
            </div>
            <input
              type="range"
              min="2"
              max="25"
              step="1"
              value={maxDistance}
              onChange={(e) => setMaxDistance(Number(e.target.value))}
              className="w-full accent-brand-500"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>2 km</span>
              <span>10 km</span>
              <span>25 km</span>
            </div>
          </div>

          {/* Max Daily Rate */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-700">Max Daily Rate</span>
              <span className="text-brand-600 font-bold">{formatRupiah(maxRate)}</span>
            </div>
            <input
              type="range"
              min="100000"
              max="350000"
              step="25000"
              value={maxRate}
              onChange={(e) => setMaxRate(Number(e.target.value))}
              className="w-full accent-brand-500"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>Rp 100k</span>
              <span>Rp 200k</span>
              <span>Rp 350k</span>
            </div>
          </div>

          {/* Min Rating */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Minimum Rating
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "Any", val: 0 },
                { label: "4.5+", val: 4.5 },
                { label: "4.8+", val: 4.8 },
              ].map((r) => (
                <button
                  key={r.val}
                  type="button"
                  onClick={() => setMinRating(r.val)}
                  className={`py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                    minRating === r.val
                      ? "border-brand-500 bg-brand-50 text-brand-700 font-bold"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* Verified Toggle */}
          <div className="pt-2 border-t border-slate-100">
            <label className="flex items-center justify-between cursor-pointer">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-semibold text-slate-800">KTP Verified Only</span>
              </div>
              <input
                type="checkbox"
                checked={verifiedOnly}
                onChange={(e) => setVerifiedOnly(e.target.checked)}
                className="w-4 h-4 accent-brand-500 rounded"
              />
            </label>
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-xs text-slate-500">
              Found <span className="font-bold text-slate-900">{filteredWorkers.length}</span> verified workers
            </div>
          </div>

          {viewMode === "grid" ? (
            filteredWorkers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredWorkers.map((worker) => (
                  <WorkerCard
                    key={worker.id}
                    worker={worker}
                    onQuickBook={(w) => setActiveBookingWorker(w)}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
                <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900">No Workers Match Your Filters</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Try adjusting your distance radius, trade selection, or maximum daily price.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold"
                >
                  Clear Filters
                </button>
              </div>
            )
          ) : (
            <MapMock
              workers={filteredWorkers}
              onSelectWorker={(w) => setActiveBookingWorker(w)}
            />
          )}
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        worker={activeBookingWorker}
        isOpen={!!activeBookingWorker}
        onClose={() => setActiveBookingWorker(null)}
      />
    </div>
  );
}

export default function WorkersPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-slate-500">Loading catalog...</div>}>
      <WorkersContent />
    </Suspense>
  );
}
