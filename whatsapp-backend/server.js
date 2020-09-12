import express from "express";
import mongoose from "mongoose";

import { DbConfig, dbConnection } from "./config/db.js";
import { apiRouter } from "./routes/router.js";
import cors from "cors";
import { watchCollection } from "./config/socketIO.js";
import SocketIo from "socket.io";

//app config
const app = express();
const port = process.env.PORT || 9000;

// const pusher = new Pusher(PusherConfig);

//middleware
app.use(express.json());
app.use(cors());
app.use("/", apiRouter);

//Connecting to Atlas DB using DB config
mongoose.connect(DbConfig.DB, DbConfig.Options);

const db = dbConnection;

db.once("open", () => {
  console.log("DB is connected");
  //Warch Rooms and Messages collection for any changes
  watchCollection(db, io);
});

//Start the server on PORT 9000
const expressServer = app.listen(port, () => {
  console.log(`App listening on PORT : ${port}`);
});

export const io = SocketIo(expressServer);
