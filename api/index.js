import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
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
