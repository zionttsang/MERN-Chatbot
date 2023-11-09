import express from "express";
import { config } from 'dotenv';
import connectToDB from "./db/connection.js";

// build app
config()
const app = express();
// set params
const listen_port = 5001;

// middleware
app.use(express.json());

// app.post('/hello/:userid', (req, res, next) => {
//   console.log(req.params.userid);
//   res.send('yes hello.')
// })

// connection and listener;
connectToDB().then(() => {
  app.listen(listen_port, () => { console.log('listen on ', listen_port) })

})