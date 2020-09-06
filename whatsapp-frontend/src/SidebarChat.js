import React from "react";
import "./SidebarChat.css";
import { Avatar } from "@material-ui/core";
import axios from "./axios";
import { Link } from "react-router-dom";

function SidebarChat({ id, room, addNewChat }) {
  //Function to create a new room in the DB
  const createRoom = () => {
    const roomName = prompt("Enter the Room Name");
    if (roomName) {
      axios.post("/api/v1/rooms/new", {
        name: roomName,
        avatar: "",
        messages: [],
      });
    }
  };

  return !addNewChat ? (
    <Link to={`/rooms/${room._id}`}>
      <div className="sidebar_chat">
        <Avatar src={room.avatar} />
        <div className="sidebarChat_info">
          <h2>{room.name}</h2>
          <p>This is the last message in the room</p>
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
