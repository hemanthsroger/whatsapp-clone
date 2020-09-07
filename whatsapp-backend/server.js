import express from "express";
import mongoose from "mongoose";
import Messages from "./dbMessages.js";
import Rooms from "./dbRooms.js";
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
  useFindAndModify: false,
});

const db = mongoose.connection;

db.once("open", () => {
  console.log("DB is connected");

  const roomCollection = db.collection("rooms");
  const changeStream = roomCollection.watch({ fullDocument: "updateLookup" });

  changeStream.on("change", (change) => {
    //If the new Room has been created
    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;
      console.log(messageDetails);
      pusher.trigger("rooms", "inserted", {
        name: messageDetails.name,
        messages: messageDetails.messages,
        avatar: messageDetails.avatar,
        _id: messageDetails._id,
      });
    } else {
      console.log("Error triggering messages pusher");
    }

    //If a new message has been pushed
    if (change.operationType === "update") {
      const messages = change.fullDocument.messages;
      const messageDetails = messages[messages.length - 1];
      pusher.trigger("message", "inserted", {
        name: messageDetails.name,
        message: messageDetails.message,
        timestamp: messageDetails.timestamp,
        received: messageDetails.received,
        _id: messageDetails._id,
      });
    } else {
      console.log("Error triggering messages pusher");
    }
  });
});

//app endpoints
app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

//Endpoint to insert a new message into a room
app.post("/api/v1/messages/new", (req, res) => {
  const dbRoomId = req.body.roomId;
  const dbMessage = req.body;

  Rooms.findOneAndUpdate(
    { _id: dbRoomId },
    { $push: { messages: dbMessage }, new: true },
    (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).send(data);
      }
    }
  );
});

//Endpoint to fetch all the available rooms for the chat
app.get("/api/v1/rooms", (req, res) => {
  Rooms.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

//Endpoint to ger a single room based on the Id
app.get("/api/v1/getRoom", (req, res) => {
  const roomId = req.query.roomId;
  Rooms.find({ _id: roomId }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

//Endpoint to create a new Room
app.post("/api/v1/rooms/new", (req, res) => {
  const dbRoom = req.body;
  Rooms.create(dbRoom, (err, data) => {
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
