import express from "express";
import { config } from 'dotenv';
import morgan from 'morgan';
import appRouter from "./routes/index.js";

// build app
const app = express();
// prerequsite to read env;
config()

// middleware
app.use(express.json());
// only for development, rmv in PROD;
app.use(morgan('dev'));
app.use('/api/v1', appRouter); //domin/api/v1

export default app;