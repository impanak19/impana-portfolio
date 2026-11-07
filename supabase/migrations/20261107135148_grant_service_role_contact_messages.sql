/*
# Grant server-side insert on contact_messages

1. Modified Tables
- `contact_messages`: the send-contact-email server function now stores each delivered message.

2. Security
- Grants INSERT on `contact_messages` to `service_role` only, which is used by the server function.
- Public (anon) and signed-in access is unchanged: visitors still may only INSERT, and nobody can read messages through the API.

3. Notes
- Re-running this migration is safe; GRANT is idempotent.
*/

GRANT INSERT ON contact_messages TO service_role;
