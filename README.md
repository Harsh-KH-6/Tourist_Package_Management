# Tourism Package Management System

Production-ready MERN (MongoDB, Express, React, Node.js) application for tourism package booking and management. Features secure JWT authentication, full admin control, and a modern React user interface with protected routes.

## Features

- **User**: Browse curated travel packages, detailed itineraries, and vibrant images. Register/login, book packages, track bookings.
- **Admin**: Add, edit, delete packages; manage bookings and users from a dashboard.
- **Authentication**: Secure JWT-based user and admin login.
- **API**: REST endpoints for packages, bookings, and authentication.

## Tech Stack

- **Backend:** Node.js, Express, MongoDB (Mongoose), JWT, bcrypt, CORS, morgan  
- **Frontend:** React (Vite), React Router, Axios, TailwindCSS, react-hot-toast
- **Security:** Admin/user API & UI routes protected by JWT and custom guards.

## Quick Start

### Prerequisites

- Node.js v18+
- MongoDB running locally

### Setup Instructions

#### 1. Server

```bash
cd server
cp ENV_TEMPLATE.txt .env   # create your .env from the template below
npm install
npm run seed               # seeds sample packages & admin (see below)
npm run dev
```

#### 2. Client

```bash
cd client
npm install
npm run dev
```

- Client runs at `http://localhost:5173`
- Server runs at `http://localhost:5000`

### Environment (.env)

Example configuration for `/server/.env`:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/tourism_management
JWT_SECRET=replace_with_a_long_random_secret
CLIENT_URL=http://localhost:5173
```

### Seeded Admin Account

- **Email:** `admin@tourism.local`
- **Password:** `Admin@123`

Use this for initial login to access the admin dashboard.

## API Endpoints

- **Auth:** `POST /api/auth/register`, `POST /api/auth/login`
- **Packages:** `GET /api/packages`, `GET /api/packages/:id`, **Admin:** `POST/PUT/DELETE /api/packages`
- **Bookings:** **User:** `POST /api/bookings`, `GET /api/bookings/me`  
  **Admin:** `GET /api/bookings`, `PUT /api/bookings/:id`

> Find example API requests in Postman collection: [`server/POSTMAN_COLLECTION.json`](server/POSTMAN_COLLECTION.json)

## Folder Structure

- `server/` - Express backend, JWT, MongoDB models, seed script
- `client/` - React (Vite) frontend, Tailwind UI, routing, protected pages

## Example Travel Packages (Seeded)

- Jaipur Heritage Tour
- Andaman Island Escape
- Ladakh Adventure Expedition
- Goa Beach Escape
- Kashmir Paradise Retreat

Each comes with destination details, price, duration, images, and a multi-day itinerary.

## Usage Notes

- JWT access tokens are stored in `localStorage` (recommended for demo; use httpOnly cookies for production).
- Admin/protected routes enforced both server-side and in UI.
- API error responses are JSON: `{ success, message }`.


For questions or contributions, please open an issue or pull request.
