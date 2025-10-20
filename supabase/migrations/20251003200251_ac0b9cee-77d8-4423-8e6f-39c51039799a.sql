-- Create table for pre-registrations/leads
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert leads (public form)
CREATE POLICY "Anyone can create leads"
ON public.leads
FOR INSERT
WITH CHECK (true);

-- Create policy to prevent public reading of leads (only authenticated users with proper permissions would read)
CREATE POLICY "Only authenticated users can view leads"
ON public.leads
FOR SELECT
USING (auth.role() = 'authenticated');