import express from "express";
import { config } from 'dotenv';
import morgan from 'morgan';
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";

// build app
const app = express();
// prerequsite to read env;
config()

// middleware
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET))

// only for development, rmv in PROD;
app.use(morgan('dev'));
app.use('/api/v1', appRouter); //domin/api/v1

export default app;