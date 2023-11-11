import connectToDB from "./db/connection.js";
import app from "./app.js";

// connection and listener;
const listen_port = process.env.PORT || 5002;
connectToDB().then(() => {
  app.listen(listen_port, () => { console.log('Listening on ', listen_port) })

}).catch((err) => console.log(err))