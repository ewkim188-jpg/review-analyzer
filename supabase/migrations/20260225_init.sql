-- Create reviews table if not exists
CREATE TABLE IF NOT EXISTS public.reviews (
    id BIGINT PRIMARY KEY,
    rating INTEGER,
    title TEXT,
    content TEXT,
    author TEXT,
    date DATE,
    helpful_votes INTEGER,
    verified_purchase BOOLEAN,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist to avoid "already exists" errors
DROP POLICY IF EXISTS "Allow public read access" ON public.reviews;
DROP POLICY IF EXISTS "Allow public insert access" ON public.reviews;
DROP POLICY IF EXISTS "Allow public update access" ON public.reviews;

-- Create policy to allow anyone to read reviews
CREATE POLICY "Allow public read access" ON public.reviews
    FOR SELECT USING (true);

-- Create policy to allow anyone to insert reviews (for indexing)
CREATE POLICY "Allow public insert access" ON public.reviews
    FOR INSERT WITH CHECK (true);

-- Create policy to allow anyone to update reviews (for upsert)
CREATE POLICY "Allow public update access" ON public.reviews
    FOR UPDATE USING (true) WITH CHECK (true);
