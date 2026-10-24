export type TradeCategory = 
  | "Tukang Bangunan"
  | "Tukang Cat"
  | "Tukang Las"
  | "Tukang Ledeng"
  | "Tukang Listrik"
  | "Tukang Kayu"
  | "Tukang Keramik"
  | "Mandor"
  | "Kuli Angkut";

export interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
  jobType: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
}

export interface Worker {
  id: string;
  name: string;
  trade: TradeCategory;
  city: string;
  district: string;
  distanceKm: number;
  dailyRate: number;
  hourlyRate: number;
  rating: number;
  reviewCount: number;
  completedJobs: number;
  responseTime: string;
  isVerified: boolean;
  avatarUrl: string;
  badge?: string;
  bio: string;
  skills: string[];
  equipment: string[];
  portfolio: PortfolioItem[];
  reviews: Review[];
  lat: number;
  lng: number;
}

export interface Booking {
  id: string;
  workerId: string;
  workerName: string;
  workerTrade: TradeCategory;
  workerAvatar: string;
  clientName: string;
  startDate: string;
  days: number;
  dailyRate: number;
  totalGross: number;
  platformFee: number;
  netPayout: number;
  status: "escrow_secured" | "in_progress" | "pending_review" | "completed";
  jobAddress: string;
  paymentMethod: string;
}
