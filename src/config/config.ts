import dotenv from 'dotenv';

dotenv.config({ path: 'config.env' });

const MONGO_OPTIONS = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  socketTimeoutMS: 30000,
  keepAlive: true,
  poolSize: 50,
  autoIndex: false,
  retryWrites: true,
};

const MONGO_USERNAME = process.env.MONGO_USERNAME;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;

const MONGO = {
  password: MONGO_PASSWORD,
  username: MONGO_USERNAME,
  options: MONGO_OPTIONS,
  url: `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0-shard-00-00.uzivy.mongodb.net:27017,cluster0-shard-00-01.uzivy.mongodb.net:27017,cluster0-shard-00-02.uzivy.mongodb.net:27017/WidgetsApp?ssl=true&replicaSet=atlas-nvmpe9-shard-0&authSource=admin&retryWrites=true&w=majority`,
};

const SERVER_TOKEN_EXPIRETIME = process.env.SERVER_TOKEN_EXPIRETIME || 3600;
const SERVER_TOKEN_ISSUER = process.env.SERVER_TOKEN_ISSUER || 'alibaba';
const SERVER_TOKEN_SECRET = process.env.SERVER_TOKEN_SECRET || 'supercryptedalibaba';

const SERVER = {
  token: {
    expireTime: SERVER_TOKEN_EXPIRETIME,
    issuer: SERVER_TOKEN_ISSUER,
    secret: SERVER_TOKEN_SECRET,
  },
};

const config = {
  mongo: MONGO,
  server: SERVER,
};

export default config;
