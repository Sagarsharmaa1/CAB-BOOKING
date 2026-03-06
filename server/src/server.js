import express from 'express';
import cors from 'cors';
import connectDB from './db/config.js';
import carRoutes from './routes/carRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import userRoutes from './routes/userRoutes.js';
import path from 'path';
import { ENV } from "./lib/env.js";


const app = express();
app.use(express.json());
// Static folder for uploads
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

const __dirname = path.resolve()



const allowedOrigins = [
  ENV.CLIENT_URL,           // https://cab-booking-bqls.onrender.com
  'http://localhost:5173',  // Vite default
  'http://localhost:3000'   // if you ever use another port
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.get('/',(req,res)=>{
    res.send("server is working")
})


// Routes
app.use('/', adminRoutes);
app.use('/', bookingRoutes);
app.use('/', userRoutes);
app.use('/', carRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

const port = ENV.PORT;


// Connect DB and start server
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to DB:', err);
  });


// make our app ready for deployment
if (ENV.NODE_ENV === "production") {
   
    app.use(express.static(path.join(__dirname, "../client/dist")));

    app.use((req, res) => {
        res.sendFile(path.join(__dirname, "../client/dist/index.html"));
    });
}
