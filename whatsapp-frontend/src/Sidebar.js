import React from "react";
import "./Sidebar.css";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Avatar, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import SidebarChat from "./SidebarChat";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <Avatar src="https://lh3.googleusercontent.com/pw/ACtC-3cPyV-BAqad8saFL2q8PQH2Vwa3lF-BVrErnWgwvgxvFJv1pXCZNlwEaIdtWHHOoY-pPNxdcDJSCdj2m9iKoLod-_SFvDOOodhhyEAXF-l94_TEkErACYPJOFgPMUnI9jlcmatkkSWfs0SGjQh1Zqzj=w478-h637-no?authuser=0" />
        <div className="sidebar_headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className="sidebar_search">
        <div className="sidebar_searchContainer">
          <SearchIcon />
          <input type="text" placeholder="Search chat" />
        </div>
      </div>

      <div className="sidebar_chats">
        <SidebarChat />
        <SidebarChat />
        <SidebarChat />
        <SidebarChat />
      </div>
    </div>
  );
}

export default Sidebar;
