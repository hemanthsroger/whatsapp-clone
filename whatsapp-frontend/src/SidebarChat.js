import React from "react";
import "./SidebarChat.css";
import { Avatar } from "@material-ui/core";

function SidebarChat({ id, detail }) {
  return (
    <div className="sidebar_chat">
      <Avatar src={detail.avatar} />
      <div className="sidebarChat_info">
        <h2>{detail.name}</h2>
        <p>This is the last message in the room</p>
      </div>
    </div>
  );
}

export default SidebarChat;
