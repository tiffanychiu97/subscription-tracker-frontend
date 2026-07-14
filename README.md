# Subscription Tracker

A full-stack web app for tracking recurring subscriptions, visualizing spending by category, and spotting opportunities to save money — built as a portfolio project to practice both frontend and backend development.

**Live demo:** https://subscription-tracker-frontend-xi.vercel.app/
_(Note: the backend is hosted on Render's free tier, which spins down after 15 minutes of inactivity. The first request after idle time may take 30–60 seconds to respond — subsequent requests are fast.)_

## Features

- Add, edit, and delete subscriptions with client- and server-side validation
- Dashboard with monthly/yearly spend totals and potential savings from underused subscriptions
- Interactive charts: spend by category (donut) and 6-month projected spend (bar)
- Upcoming renewals surfaced automatically from a server-computed stats endpoint
- Responsive layout, loading states, and empty states for a polished first-run experience

## Tech Stack

**Frontend**

- Vue 3 (Composition API) + TypeScript
- Pinia for state management
- Tailwind CSS
- Chart.js (via vue-chartjs)
- Vite

**Backend**

- Node.js + Express
- TypeScript, compiled to JavaScript for production
- SQLite (via better-sqlite3)

**Deployment**

- Frontend: Vercel
- Backend: Render

## Architecture

```
Vue 3 SPA (Vercel)
      │
      │  fetch() — REST API calls
      ▼
Express API (Render)
      │
      │  better-sqlite3
      ▼
SQLite database
```

The frontend never talks to the database directly — all reads/writes go through a REST API. A dedicated `/api/subscriptions/stats` endpoint performs aggregation (totals, category breakdown, upcoming renewals, potential savings) server-side, rather than shipping raw data to the client and computing it there.

## API Endpoints

| Method | Endpoint                   | Description               |
| ------ | -------------------------- | ------------------------- |
| GET    | `/api/subscriptions`       | List all subscriptions    |
| POST   | `/api/subscriptions`       | Create a subscription     |
| PUT    | `/api/subscriptions/:id`   | Update a subscription     |
| DELETE | `/api/subscriptions/:id`   | Delete a subscription     |
| GET    | `/api/subscriptions/stats` | Aggregated spending stats |

## Running Locally

**Backend**

```bash
cd subscription-tracker-backend
npm install
npm run dev
# runs on http://localhost:3001
```

**Frontend**

```bash
cd subscription-tracker-frontend
npm install
npm run dev
# runs on http://localhost:5173
```

## What I'd Improve Next

- User authentication, so subscriptions are tied to individual accounts

## Repositories

- Frontend: https://github.com/tiffanychiu97/subscription-tracker-frontend
- Backend: https://github.com/tiffanychiu97/subscription-tracker-backend
