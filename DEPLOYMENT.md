# SMILEE Deployment

This repo is a monorepo with two deployable apps:

- `frontend`: Next.js app for Vercel
- `backend`: NestJS API with Prisma and PostgreSQL

## Frontend on Vercel

Create a Vercel project from the GitHub repo and set:

```txt
Root Directory: frontend
Framework Preset: Next.js
Build Command: npm run build
Install Command: npm install
```

Add this environment variable:

```env
NEXT_PUBLIC_API_URL="https://your-backend-url.vercel.app"
```

Redeploy the frontend after changing `NEXT_PUBLIC_API_URL`.

## Backend on Vercel

Create a second Vercel project from the same GitHub repo and set:

```txt
Root Directory: backend
Build Command: npm run vercel-build
Install Command: npm install
```

Add these environment variables in Vercel:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE?schema=public"
EMAIL_USER="your-email@gmail.com"
EMAIL_PASSWORD="your-gmail-app-password"
JWT_SECRET="use-a-long-random-production-secret"
ADMIN_EMAIL="admin@example.com"
```

The backend uses `backend/api/index.ts` as the Vercel serverless entrypoint.
`npm run vercel-build` runs Prisma generation, production migrations, and the
Nest build.

## Database

Use a hosted PostgreSQL database such as Supabase, Neon, Railway, Prisma
Postgres, or Vercel Postgres. Prefer a pooled connection URL for serverless
deployments.

To apply migrations manually:

```powershell
cd backend
$env:DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE?schema=public"
npx prisma migrate deploy
```

## Important

Do not commit real `.env` files. Add secrets only in the hosting provider's
environment variable settings.
