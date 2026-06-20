# SMILEE

SMILEE is a dental clinic management project. The repository contains:

- `frontend/`: Next.js frontend app
- `backend/`: NestJS API with Prisma
- `html/`, `css/`, `js/`, `pic/`: legacy static version/assets

## Requirements

- Node.js
- npm
- PostgreSQL

## Backend

```bash
cd backend
npm install
copy .env.example .env
npm run start:dev
```

Update `backend/.env` with your local database and email configuration before running the API.

## Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend runs at `http://localhost:3000` by default.

## Git Notes

Do not commit `node_modules`, build folders, or real `.env` files. Use `.env.example` as the template for required environment variables.
