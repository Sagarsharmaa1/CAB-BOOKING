
# 🚖 Cab Booking Application – MERN Stack

A full‑stack cab booking system built with the MERN stack (MongoDB, Express.js, React, Node.js). The application provides separate interfaces for users and administrators. Users can register, browse available cabs, book rides with fare calculation, and manage their bookings. Admins have a dedicated dashboard to manage cabs, users, and view all bookings.

**Live Demo:** https://cab-booking-bqls.onrender.com

## ✨ Features

### 👤 User Features
- User registration and login (JWT authentication)
- Browse all available cabs with details (driver, car model, type, price, image)
- Book a cab: enter pickup/drop locations, dates, times
- Calculate fare based on distance entered
- View personal bookings (past and upcoming)
- Cancel a booking

### 🔐 Admin Features
- Admin login (separate endpoint)
- Admin dashboard with quick navigation
- **Cab Management**: Add new cab (with image), view all cabs, edit cab details, delete cab
- **User Management**: View all registered users, view user details, edit user (name/email), delete user
- **Booking Overview**: View all bookings across all users

### 🛠️ Technical Features
- Responsive design (mobile‑friendly)
- JWT based authentication with role‑based access control
- File upload for cab images (stored locally with Multer)
- RESTful API with Express
- MongoDB database with Mongoose ODM
- React Context API for global state (authentication)
- Protected routes on both client and server

---

## 🧰 Tech Stack

| Layer          | Technology                         |
|----------------|------------------------------------|
| Frontend       | React (Vite), React Router, Context API, Axios, CSS (custom) |
| Backend        | Node.js, Express.js, JWT, bcrypt, Multer |
| Database       | MongoDB, Mongoose ODM              |
| Development    | Visual Studio Code, Git, Postman   |
| Deployment     | Vercel (frontend), Render (backend), MongoDB Atlas (database) |

---

## 📋 Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)
- [MongoDB](https://www.mongodb.com/) – local installation or [MongoDB Atlas](https://www.mongodb.com/atlas) account
- A code editor (VS Code recommended)
- Git (optional)

---

## 🔧 Installation & Setup

### 1. Clone the repository

git clone https://github.com/your-username/cab-booking-mern.git
cd cab-booking-mern

###2. Backend Setup

cd server   # or the folder containing backend code
npm install

###3. Frontend Setup

cd client   # or the folder containing frontend code
npm install

## Folder Structure
cab-booking-mern/
├── client/                     # React frontend
│   ├── public/
│   ├── src/
│   │   ├── assets/             # images, icons
│   │   ├── components/         # reusable components (ProtectedRoute, Admin/*)
│   │   ├── context/            # AuthContext (authentication state)
│   │   ├── pages/              # page components (Home, Login, Register, Cabs, etc.)
│   │   ├── services/           # API calls (api.js)
│   │   ├── styles/             # CSS files (theme.css, home.css)
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env
│   ├── package.json
│   └── vite.config.js
│
├── server/                     # Node.js backend
│   ├── controllers/            # request handlers (user, car, booking, admin)
│   ├── db/                     # database connection (config.js)
│   ├── lib/                    # environment config (env.js)
│   ├── middleware/             # authMiddleware, multer
│   ├── models/                 # Mongoose schemas (User, Car, Mybookings, Admin)
│   ├── routes/                 # Express routes
│   ├── uploads/                # uploaded cab images (created automatically)
│   ├── .env
│   ├── package.json
│   └── server.js
└── README.md
