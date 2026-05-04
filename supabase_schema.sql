-- CardChemy Database Schema for Supabase
-- Run this in Supabase SQL Editor after creating your project

-- Enable UUID extension (usually enabled by default)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Cards table
CREATE TABLE IF NOT EXISTS cards (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  uid UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Card type and theme
  user_type TEXT DEFAULT 'student' CHECK (user_type IN ('student', 'professional')),
  theme_id TEXT DEFAULT 'aurora',
  theme_color TEXT,
  accent_color TEXT,
  font_heading TEXT,
  font_body TEXT,

  -- Identity fields
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  title TEXT,
  bio TEXT,

  -- Professional fields
  company TEXT,
  company_sub TEXT,

  -- Academic fields
  university TEXT,
  education TEXT,
  education_degree TEXT,
  graduation_year TEXT,

  -- Skills and interests
  skills TEXT,
  interests TEXT,
  current_event TEXT,
  follow_up_templates TEXT[], -- Array of template strings

  -- Contact information
  mobile TEXT,
  email TEXT,
  website TEXT,
  location TEXT,

  -- Social links
  linkedin TEXT,
  facebook TEXT,
  instagram TEXT,
  github TEXT,
  x_social TEXT,

  -- Media
  photo_url TEXT,
  logo_url TEXT,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Usernames table for slug uniqueness
CREATE TABLE IF NOT EXISTS usernames (
  slug TEXT PRIMARY KEY,
  card_id UUID NOT NULL REFERENCES cards(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Card views analytics table (optional)
CREATE TABLE IF NOT EXISTS card_views (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  card_id UUID NOT NULL REFERENCES cards(id) ON DELETE CASCADE,
  viewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_agent TEXT,
  referrer TEXT,
  ip_address INET
);

-- Network/connections table (for "My Network" feature)
CREATE TABLE IF NOT EXISTS network_connections (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  connected_card_id UUID NOT NULL REFERENCES cards(id) ON DELETE CASCADE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, connected_card_id)
);

-- Enable Row Level Security
ALTER TABLE cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE usernames ENABLE ROW LEVEL SECURITY;
ALTER TABLE card_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE network_connections ENABLE ROW LEVEL SECURITY;

-- Policies for cards table
-- Policy: Users can create their own cards
CREATE POLICY "Users can insert own cards" ON cards
  FOR INSERT
  WITH CHECK (auth.uid() = uid);

-- Policy: Users can update their own cards
CREATE POLICY "Users can update own cards" ON cards
  FOR UPDATE
  USING (auth.uid() = uid);

-- Policy: Users can delete their own cards
CREATE POLICY "Users can delete own cards" ON cards
  FOR DELETE
  USING (auth.uid() = uid);

-- Policy: Anyone can view any card (public cards)
CREATE POLICY "Cards are publicly viewable" ON cards
  FOR SELECT
  USING (true);

-- Policies for usernames table
CREATE POLICY "Anyone can view usernames" ON usernames
  FOR SELECT
  USING (true);

CREATE POLICY "Users can create username entries" ON usernames
  FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM cards WHERE cards.id = card_id AND cards.uid = auth.uid()
  ));

-- Policies for card_views table
CREATE POLICY "Anyone can insert card views" ON card_views
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Card owners can view their analytics" ON card_views
  FOR SELECT
  USING (card_id IN (
    SELECT id FROM cards WHERE uid = auth.uid()
  ));

-- Policies for network_connections table
CREATE POLICY "Users can manage own network" ON network_connections
  FOR ALL
  USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_cards_uid ON cards(uid);
CREATE INDEX IF NOT EXISTS idx_cards_slug ON cards(slug);
CREATE INDEX IF NOT EXISTS idx_usernames_card_id ON usernames(card_id);
CREATE INDEX IF NOT EXISTS idx_card_views_card_id ON card_views(card_id);
CREATE INDEX IF NOT EXISTS idx_network_user_id ON network_connections(user_id);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to auto-update updated_at on cards
CREATE TRIGGER update_cards_updated_at
  BEFORE UPDATE ON cards
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Success message
DO $$
BEGIN
  RAISE NOTICE 'CardChemy database schema created successfully!';
  RAISE NOTICE 'Next steps:';
  RAISE NOTICE '1. Configure Google OAuth in Supabase Auth settings';
  RAISE NOTICE '2. Add your Supabase URL and anon key to environment variables';
  RAISE NOTICE '3. Deploy your application';
END $$;
