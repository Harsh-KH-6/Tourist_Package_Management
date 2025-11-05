## Tourism Package Management System 

Production-ready MERN app with JWT auth, admin management, and user bookings.

### Folders
- `server`: Express API, MongoDB models, JWT auth, seed script
- `client`: React (Vite) app with React Router, Tailwind UI

### Quick Start
1) Prerequisites: Node 18+, MongoDB running locally

2) Server
```
cd server
cp ENV_TEMPLATE.txt .env   # create your env from template
npm i
npm run seed   # creates admin and sample packages
npm run dev
```

3) Client
```
cd client
npm i
npm run dev
```
Client runs on `http://localhost:5173`, Server on `http://localhost:5000`.

### Environment (.env)
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/tourism_management
JWT_SECRET=replace_with_a_long_random_secret
CLIENT_URL=http://localhost:5173
```

### Seeded Admin
- Email: `admin@tourism.local`
- Password: `Admin@123`

### API Endpoints
- Auth: `POST /api/auth/register`, `POST /api/auth/login`
- Packages: `GET /api/packages`, `GET /api/packages/:id`, Admin `POST/PUT/DELETE /api/packages`
- Bookings: User `POST /api/bookings`, `GET /api/bookings/me`, Admin `GET /api/bookings`, `PUT /api/bookings/:id`

Postman collection: `server/POSTMAN_COLLECTION.json`

### Tech
- Backend: Express, Mongoose, JWT, bcrypt, CORS, morgan
- Frontend: React + Vite, React Router, Axios, Tailwind, react-hot-toast

### Notes
- JWT stored in `localStorage`.
- Admin routes protected in both API and UI.
- Error responses are JSON with `{ success, message }`.


