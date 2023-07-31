import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoute from './routes/auth.js';
import hotelRoute from './routes/hotel.js';
import userRoute from './routes/user.js';
import roomsRoute from './routes/rooms.js';
import cookieParser from 'cookie-parser';

const app = express();

dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connect to mongoDB');
  } catch (error) {
    throw error;
  }
};

// middleware
app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api/hotels', hotelRoute);
app.use('/api/user', userRoute);
app.use('/api/rooms', roomsRoute);

// example
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || 'Something went wrong';
  res.status(500).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

mongoose.connection.on('disconnected', () => {
  console.log('mongoDb disconnected');
});
mongoose.connection.on('Connected', () => {
  console.log('mongoDb connected');
});

app.listen(5000, () => {
  connect();
  console.log(`Connected to Backend`);
});
