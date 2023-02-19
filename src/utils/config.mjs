import dotenv from 'dotenv';

dotenv.config();

export default {
  PORT: process.env.PORT || 3000,
  JWT_KEY: process.env.JWT_KEY || 'testjwtkey',
  MONGODB_URL: process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/bitfilmsdb',
};
