import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { json } from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';

import { errors as celebrateErrorHandler } from 'celebrate';

import errorLog from './middlewares/errlog.middleware.mjs';
import errorHandler from './middlewares/error.middleware.mjs';
import requestLogger from './middlewares/reqlog.middleware.mjs';

import limiter from './middlewares/limiter.middleware.mjs';
import router from './routes/index.mjs';
import config from './utils/config.mjs';
import logger from './utils/logger.mjs';

const app = express();

const whitelist = ['http://localhost:4000'];
const corsOptions = {
  origin(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};

mongoose.set('strictQuery', false);
await mongoose.connect(config.MONGODB_URL);
logger.info('Success connection to database.');

app.use(requestLogger);
app.use(limiter);
app.use(helmet());
app.use(json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use('/', router);
app.use(errorLog);
app.use(celebrateErrorHandler());
app.use(errorHandler);

app.listen(config.PORT, () => {
  logger.info(`Server starts at port ${config.PORT}`);
});
