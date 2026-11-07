/*
# Create contact_messages table

1. New Tables
- `contact_messages`
  - `id` (uuid, primary key)
  - `name` (text, required, max 120 characters)
  - `email` (text, required, max 254 characters)
  - `message` (text, required, max 4000 characters)
  - `created_at` (timestamptz, defaults to now)

2. Security
- Row level security is enabled on `contact_messages`.
- Visitors (anon and signed-in) may only INSERT rows, so the public contact form can submit messages.
- No SELECT, UPDATE or DELETE access is granted, so submitted messages stay private to the site owner, who reads them from the Supabase dashboard.

3. Notes
- Length and format checks are enforced in the database as a second line of defence against oversized or malformed submissions.
*/

CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 120),
  email text NOT NULL CHECK (char_length(email) BETWEEN 3 AND 254 AND email LIKE '%_@_%.__%'),
  message text NOT NULL CHECK (char_length(message) BETWEEN 1 AND 4000),
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

GRANT INSERT ON contact_messages TO anon, authenticated;

DROP POLICY IF EXISTS "anon_insert_contact_messages" ON contact_messages;
CREATE POLICY "anon_insert_contact_messages" ON contact_messages
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
