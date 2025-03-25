import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import navbarRoutes from './routes/navbar.routes.js';
import circularRoutes from './routes/circular.routes.js';
import paciNewsRoutes from './routes/paciNews.routes.js'
import paciServicesRoutes from './routes/paciServices.routes.js'
import dailyNewsRoutes from './routes/dailyNews.routes.js'
import authRoutes from './routes/authRoutes.js'
import paciWebRoutes from './routes/paciWeb.routes.js'


import mongoose from 'mongoose';



import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Enable CORS with specific origin

app.use(
  cors({
    origin: '*', // Allow all origins (for development only)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  })
);


  

app.use(express.json());



app.use('/api/auth', authRoutes);
app.use('/api/navbar', navbarRoutes);
app.use('/api/paci-news', paciNewsRoutes);
app.use('/api/paci-services', paciServicesRoutes);
app.use('/api/daily-news', dailyNewsRoutes);
app.use('/api/paci-web', paciWebRoutes);



app.use('/api/circulars', circularRoutes);

connectDB();

const conn = mongoose.connection;

let gfs;

conn.once('open', () => {
  console.log('MongoDB connected');

  // Initialize GridFSBucket after connection is established
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: 'uploads',
  });

  console.log('GridFSBucket initialized');
});

export { gfs };

export default app;
