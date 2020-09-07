import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Avatar, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import SidebarChat from "./SidebarChat";
import axios from "./axios";
import Pusher from "pusher-js";
import { useStateValue } from "./StateProvider";

function Sidebar() {
  const [rooms, setrooms] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  //Fetching all the available rooms for the chat
  useEffect(() => {
    axios.get("/api/v1/rooms").then((response) => {
      setrooms(response.data);
    });
  }, []);

  /**
   * Using a pusher to subscribe for the "channel" & listen to "inserted" event
   * on MongoDB's "rooms" collection
   */
  useEffect(() => {
    const pusher = new Pusher("84c179a2a0485dd4a4d6", {
      cluster: "ap2",
    });

    const channel = pusher.subscribe("rooms");
    channel.bind("inserted", function (newRoom) {
      setrooms([...rooms, newRoom]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [rooms]);

  console.log("Rooms : ", rooms);

  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <Avatar src={user.photoURL} />
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
        <SidebarChat addNewChat setRooms={setrooms} />
        {rooms.map((room) => (
          <SidebarChat key={room._id} id={room._id} room={room} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
