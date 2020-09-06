import React from "react";
import "./SidebarChat.css";
import { Avatar } from "@material-ui/core";

function SidebarChat() {
  return (
    <div className="sidebar_chat">
      <Avatar />
      <div className="sidebarChat_info">
        <h2>Chikoo</h2>
        <p>This is the last message in the room</p>
      </div>
    </div>
  );
}

export default SidebarChat;
