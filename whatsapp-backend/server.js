import express from "express";
import mongoose from "mongoose";

import { DbConfig, dbConnection } from "./config/db.js";
import { apiRouter } from "./routes/router.js";
import Pusher from "pusher";
import cors from "cors";
import { PusherConfig, watchCollection } from "./config/pusher.js";

//app config
const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher(PusherConfig);

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
  watchCollection(db, pusher);
});

//Start the server on PORT 9000
app.listen(port, () => {
  console.log(`App listening on PORT : ${port}`);
});
