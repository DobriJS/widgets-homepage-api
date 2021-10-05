import http from 'http';
import express from 'express';
import cors from 'cors';
import logging from './config/logging';
import config from './config/config';
import userRoutes from './routes/user';
import mongoose from 'mongoose';

const NAMESPACE = 'Server';
const app = express();

mongoose
  .connect(config.mongo.url, config.mongo.options)
  .then(() => {
    logging.info(NAMESPACE, 'Mongo Connected');
  })
  .catch((error) => {
    logging.error(NAMESPACE, error.message, error);
  });

app.use((req, res, next) => {
  logging.info(
    NAMESPACE,
    `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`,
  );

  res.on('finish', () => {
    logging.info(
      NAMESPACE,
      `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`,
    );
  });

  next();
});

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use('/users', userRoutes);

app.use((req, res) => {
  const error = new Error('Not found');

  res.status(404).json({
    message: error.message,
  });
});

const httpServer = http.createServer(app);

httpServer.listen(config.server.port, () =>
  logging.info(
    NAMESPACE,
    `Server is running on Port: http://localhost:${config.server.port}`,
  ),
);
