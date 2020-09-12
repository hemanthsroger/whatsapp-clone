// export const PusherConfig = {
//   appId: "1067406",
//   key: "84c179a2a0485dd4a4d6",
//   secret: "06d3844734a479ff8ab7",
//   cluster: "ap2",
//   encrypted: true,
// };

export const watchCollection = (db, io) => {
  const roomCollection = db.collection("rooms");
  const changeStream = roomCollection.watch({ fullDocument: "updateLookup" });

  changeStream.on("change", (change) => {
    //If the new Room has been created
    if (change.operationType === "insert") {
      const roomDetails = change.fullDocument;
      io.emit("room_inserted", {
        name: roomDetails.name,
        messages: roomDetails.messages,
        avatar: roomDetails.avatar,
        _id: roomDetails._id,
      });
      // pusher.trigger("rooms", "inserted", {
      //   name: roomDetails.name,
      //   messages: roomDetails.messages,
      //   avatar: roomDetails.avatar,
      //   _id: roomDetails._id,
      // });
    }
    //If a new message has been pushed
    else if (change.operationType === "update") {
      const messages = change.fullDocument.messages;
      const messageDetails = messages[messages.length - 1];
      io.emit("message_inserted", {
        newMessage: {
          name: messageDetails.name,
          message: messageDetails.message,
          timestamp: messageDetails.timestamp,
          received: messageDetails.received,
          _id: messageDetails._id,
        },
        roomId: change.fullDocument._id,
      });
    }
  });
};
