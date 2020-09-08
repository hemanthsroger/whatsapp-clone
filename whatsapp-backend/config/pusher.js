export const PusherConfig = {
  appId: "1067406",
  key: "84c179a2a0485dd4a4d6",
  secret: "06d3844734a479ff8ab7",
  cluster: "ap2",
  encrypted: true,
};

export const watchCollection = (db, pusher) => {
  const roomCollection = db.collection("rooms");
  const changeStream = roomCollection.watch({ fullDocument: "updateLookup" });

  changeStream.on("change", (change) => {
    //If the new Room has been created
    console.log("Change Stream : ", change);
    if (change.operationType === "insert") {
      const roomDetails = change.fullDocument;
      console.log(roomDetails);
      pusher.trigger("rooms", "inserted", {
        name: roomDetails.name,
        messages: roomDetails.messages,
        avatar: roomDetails.avatar,
        _id: roomDetails._id,
      });
    } else {
      console.log("Error triggering messages pusher");
    }

    //If a new message has been pushed
    if (change.operationType === "update") {
      const messages = change.fullDocument.messages;
      const messageDetails = messages[messages.length - 1];
      pusher.trigger("message", "inserted", {
        newMessage: {
          name: messageDetails.name,
          message: messageDetails.message,
          timestamp: messageDetails.timestamp,
          received: messageDetails.received,
          _id: messageDetails._id,
        },
        roomId: change.fullDocument._id,
      });
    } else {
      console.log("Error triggering messages pusher");
    }
  });
};
