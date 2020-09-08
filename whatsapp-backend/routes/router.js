import express from "express";
import Rooms from "../models/dbRooms.js";
import Users from "../models/dbUsers.js";

const router = express.Router();

//Health check
router.get("/", (req, res) => {
  res.status(200).send("hello world");
});

///Endpoint to insert a new message into a room
router.post("/api/v1/messages/new", (req, res) => {
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
router.get("/api/v1/rooms", (req, res) => {
  const userId = req.query.userId;
  const rooms = [];
  Users.find({ userEmail: userId }, { rooms: 1, _id: 0 }, (error, allRooms) => {
    if (allRooms[0].length > 0) {
      rooms = allRooms[0].rooms.map((room) => {
        return room.roomId;
      });
    }
    Rooms.find({ _id: { $in: rooms } }, (error, filteredRooms) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.status(200).send(filteredRooms);
      }
    });
  });
});

//Endpoint to get a single room based on the Id
router.get("/api/v1/getRoom", (req, res) => {
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
router.post("/api/v1/rooms/new", (req, res) => {
  const dbRoom = req.body;
  Rooms.create(dbRoom, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

//Endpoint to Add a user
router.post("/api/v1/user/new", (req, res) => {
  const dbUser = req.body;
  Users.create(dbUser, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

export const apiRouter = router;
