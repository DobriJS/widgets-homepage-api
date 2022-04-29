import express from 'express';
import cors from 'cors';
import config from './config/config';
import userRoutes from './routes/user';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: 'config.env' });

const app = express();

const connectDb = async () => {
  try {
    await mongoose.connect(config.mongo.url, config.mongo.options);
    console.info(`Connected to database`);
  } catch (error) {
    console.error(`Connection error: ${error.stack}`);
  }
};
connectDb();

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use('/user', userRoutes);
app.get('/', (req, res) => {
  res.send('Hello to Widgets');
});

app.use((req, res) => {
  const error = new Error('Not found');
  res.status(404).json({
    message: error.message
  });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () =>
  console.log(`Server Running on Port: http://localhost:${PORT}`)
);
