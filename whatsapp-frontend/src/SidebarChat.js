import React, { useEffect, useState } from "react";
import "./SidebarChat.css";
import { Avatar } from "@material-ui/core";
import axios from "./axios";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { SocketIOEvents } from "./models/socketEvents.const";
import { SocketConnection } from "./config/config";
import { Api } from "./config/endpoints";

function SidebarChat({ id, room, addNewChat }) {
  const [lastMessage, setlastMessage] = useState("");
  const [{ user }] = useStateValue();

  /**
   * Effect to get a specific room's messages based on the roomId
   */
  useEffect(() => {
    const allMessages = room?.messages;
    if (allMessages?.length > 0) {
      setlastMessage(allMessages[allMessages.length - 1].message);
    }
  }, []);

  /**
   * Using a pusher to subscribe for the "channel" & listen to "updated" event
   * on MongoDB's "rooms" collection to get the latest message
   */
  useEffect(() => {
    // const pusher = new Pusher("84c179a2a0485dd4a4d6", {
    //   cluster: "ap2",
    // });

    // const channel = pusher.subscribe("message");
    // channel.bind("inserted", function (msgDetails) {
    //   if (id === msgDetails.roomId) {
    //     setlastMessage([msgDetails.newMessage.message]);
    //   }
    // });

    SocketConnection.on(SocketIOEvents.MessageInserted, (msgDetails) => {
      if (id === msgDetails.roomId) {
        setlastMessage([msgDetails.newMessage.message]);
      }
    });
  }, []);

  //Function to create a new room in the DB
  const createRoom = () => {
    const roomName = prompt("Enter the Room Name");
    if (roomName) {
      axios.post(Api.addRoom, {
        name: roomName,
        avatar: "",
        messages: [],
        userId: user.uid,
        userEmail: user.email,
        userName: user.displayName,
      });
    }
  };

  return !addNewChat ? (
    <Link to={`/rooms/${room._id}`}>
      <div className="sidebar_chat">
        <Avatar src={room.avatar} />
        <div className="sidebarChat_info">
          <h2>{room.name}</h2>
          <p>{lastMessage}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createRoom} className="sidebar_chat">
      <h2>Add New Chat</h2>
    </div>
  );
}

export default SidebarChat;
