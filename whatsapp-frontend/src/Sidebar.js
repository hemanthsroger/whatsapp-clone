import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Avatar, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import SidebarChat from "./SidebarChat";
import axios from "./axios";
import { useStateValue } from "./StateProvider";
import { SocketIOEvents } from "./models/socketEvents.const";
import { SocketConnection } from "./config/config";
import { Api } from "./config/endpoints";

function Sidebar() {
  const [rooms, setrooms] = useState([]);
  const [{ user }] = useStateValue();
  const [searchValue, setsearchValue] = useState("");

  //Fetching all the available rooms for the User
  useEffect(() => {
    const fetchRooms = async () => {
      axios.get(`${Api.getRoomsForUser}${user.email}`).then((response) => {
        setrooms(response.data);
      });
    };

    fetchRooms();
  }, [user.email]);

  /**
   * Using a pusher to subscribe for the "channel" & listen to "inserted" event
   * on MongoDB's "rooms" collection
   */
  // useEffect(() => {
  //   const pusher = new Pusher("84c179a2a0485dd4a4d6", {
  //     cluster: "ap2",
  //   });

  //   const channel = pusher.subscribe("rooms");
  //   channel.bind("inserted", function (newRoom) {
  //     setrooms([...rooms, newRoom]);
  //   });

  //   return () => {
  //     channel.unbind_all();
  //     channel.unsubscribe();
  //   };
  // }, [rooms]);

  /**
   * Using Socket.io to subscribe for the "inserted" event
   * on MongoDB's "rooms" collection
   */
  useEffect(() => {
    SocketConnection.on(SocketIOEvents.RoomInserted, (newRoom) => {
      setrooms([...rooms, newRoom]);
    });

    return () => {
      SocketConnection.off(SocketIOEvents.RoomInserted);
    };
  }, [rooms]);

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
          <input
            type="search"
            placeholder="Search chat"
            value={searchValue}
            onChange={(e) => setsearchValue(e.target.value)}
          />
        </div>
      </div>

      <div className="sidebar_chats">
        <SidebarChat addNewChat setRooms={setrooms} />
        {rooms
          .filter((room) => {
            return room.name
              .toLowerCase()
              .includes(searchValue.toLocaleLowerCase());
          })
          .map((room) => (
            <SidebarChat key={room._id} id={room._id} room={room} />
          ))}
      </div>
    </div>
  );
}

export default Sidebar;
