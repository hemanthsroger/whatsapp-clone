import express from "express";
import mongoose from "mongoose";
import Messages from "./dbMessages.js";
import Pusher from "pusher";
import cors from "cors";

//app config
const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
  appId: "1067406",
  key: "84c179a2a0485dd4a4d6",
  secret: "06d3844734a479ff8ab7",
  cluster: "ap2",
  encrypted: true,
});

//middleware
app.use(express.json());
app.use(cors());

//DB config
const connection_url =
  "mongodb+srv://admin:w9j0AQk70by4JtbC@cluster0.kldeb.mongodb.net/whatsappdb?retryWrites=true&w=majority";
mongoose.connect(connection_url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once("open", () => {
  console.log("DB is connected");

  const msgCollection = db.collection("whatsappmessages");
  const changeStream = msgCollection.watch();

  changeStream.on("change", (change) => {
    console.log("Change stream : ", change);

    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        name: messageDetails.name,
        message: messageDetails.message,
        timestamp: messageDetails.timestamp,
        received: messageDetails.received,
        _id: messageDetails._id,
      });
    } else {
      console.log("Error triggering pusher");
    }
  });
});

//app endpoints
app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

app.get("/api/v1/messages/sync", (req, res) => {
  Messages.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post("/api/v1/messages/new", (req, res) => {
  const dbMessage = req.body;

  Messages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

//Start the server on PORT 9000
app.listen(port, () => {
  console.log(`App listening on PORT : ${port}`);
});
