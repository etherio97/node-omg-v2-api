export const PG_DATABASE_URL = process.env.PG_DATABASE_URL;

if (!PG_DATABASE_URL) {
  console.warn('[WARN] env: %s does not exists', 'PG_DATABASE_URL');
}
