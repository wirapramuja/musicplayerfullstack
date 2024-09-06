import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import songRouter from './src/routes/songRoute.js';
import connectDB from './src/config/mongodb.js';
import connectCloudinary from './src/config/cloudinary.js';
import albumRouter from './src/routes/albumRoute.js';

//app config

const app = express()
const port = process.env.PORT || 4000;
connectDB()
connectCloudinary()

const allowedOrigins = [
  'https://musicplayer-admin.vercel.app',
  'https://musicplayer-frontend.vercel.app'
];

//middleware
app.use(express.json());
app.use(
  cors({
    origin: function(origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true // Jika menggunakan cookies atau sesi
  })
);
app.use(cors());

// initializing routes

app.use('/api/song', songRouter);
app.use('/api/album', albumRouter);

app.get('/', (req, res) => res.send('API Working'));

app.options('*', cors());

app.listen(port, () =>console.log(`Server started on ${port}`))