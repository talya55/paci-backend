import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectTimeoutMS: 30000,
      socketTimeoutMS: 30000,
    });

    console.log('MongoDB connected');

    conn.connection.once('open', () => {
      try {
        global.gfs = new mongoose.mongo.GridFSBucket(conn.connection.db, {
          bucketName: 'uploads',
        });
        console.log('GridFSBucket initialized');
      } catch (error) {
        console.error('Failed to initialize GridFSBucket:', error);
      }
    });
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

mongoose.set('debug', true);

export default connectDB;
