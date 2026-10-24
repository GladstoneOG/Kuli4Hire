-- Supabase PostgreSQL + PostGIS Setup for Kuli4Hire
-- Run this in the Supabase SQL Editor

-- 1. Enable PostGIS Extension for Distance & Radius Searches
CREATE EXTENSION IF NOT EXISTS postgis;

-- 2. Profiles Table (Users: Clients & Tradespeople)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  role TEXT NOT NULL CHECK (role IN ('client', 'worker', 'admin')),
  full_name TEXT NOT NULL,
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Worker Profiles (Detailed Skill & Location Data)
CREATE TABLE IF NOT EXISTS public.worker_profiles (
  id UUID REFERENCES public.profiles(id) ON DELETE CASCADE PRIMARY KEY,
  trade_category TEXT NOT NULL,
  city TEXT NOT NULL,
  district TEXT NOT NULL,
  location GEOGRAPHY(Point, 4326), -- Longitude, Latitude
  daily_rate NUMERIC NOT NULL,
  hourly_rate NUMERIC,
  bio TEXT,
  skills TEXT[],
  equipment TEXT[],
  is_verified BOOLEAN DEFAULT FALSE,
  rating NUMERIC(3,2) DEFAULT 5.0,
  review_count INT DEFAULT 0,
  completed_jobs INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Spatial Index for Fast Radius Searches (e.g. Find workers within 10 km)
CREATE INDEX IF NOT EXISTS worker_geo_idx ON public.worker_profiles USING GIST (location);

-- 4. Bookings & Escrow Ledger Table
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES public.profiles(id),
  worker_id UUID REFERENCES public.profiles(id),
  trade_category TEXT NOT NULL,
  start_date DATE NOT NULL,
  days INT NOT NULL DEFAULT 1,
  daily_rate NUMERIC NOT NULL,
  total_gross NUMERIC NOT NULL,
  platform_fee NUMERIC NOT NULL,
  net_payout NUMERIC NOT NULL,
  status TEXT NOT NULL DEFAULT 'escrow_secured' CHECK (status IN ('pending', 'escrow_secured', 'in_progress', 'pending_review', 'completed', 'disputed')),
  job_address TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. PostGIS Function: Find Nearby Workers by Category & Radius
CREATE OR REPLACE FUNCTION get_nearby_workers(
  p_lng DOUBLE PRECISION,
  p_lat DOUBLE PRECISION,
  p_max_distance_meters INT DEFAULT 20000,
  p_category TEXT DEFAULT NULL
)
RETURNS TABLE (
  worker_id UUID,
  full_name TEXT,
  trade_category TEXT,
  daily_rate NUMERIC,
  rating NUMERIC,
  distance_km DOUBLE PRECISION
)
LANGUAGE sql STABLE
AS $$
  SELECT 
    w.id AS worker_id,
    p.full_name,
    w.trade_category,
    w.daily_rate,
    w.rating,
    ROUND((ST_Distance(w.location, ST_SetSRID(ST_MakePoint(p_lng, p_lat), 4326)::geography) / 1000)::numeric, 1)::double precision AS distance_km
  FROM public.worker_profiles w
  JOIN public.profiles p ON p.id = w.id
  WHERE 
    (p_category IS NULL OR w.trade_category = p_category)
    AND ST_DWithin(w.location, ST_SetSRID(ST_MakePoint(p_lng, p_lat), 4326)::geography, p_max_distance_meters)
  ORDER BY distance_km ASC;
$$;
