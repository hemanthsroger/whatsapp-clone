import React, { useState } from "react";
import "./Sidebar.css";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Avatar, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import SidebarChat from "./SidebarChat";

function Sidebar() {
  const [chatDetails, setchatDetails] = useState([
    {
      name: "Chikoo",
      avatar:
        "https://lh3.googleusercontent.com/pw/ACtC-3fp7QCjdEYMTsUb08tNkztwGWSz6oRWTMk4pI2dwKy1VPj3urYhNzaxrB6uKmB5V_4tzstHkRu58QIUdPkXoS-ckB6m6Og6LmBdRsnigENKMbUeP5RID1rmB8hHkavmtGZ1vmbCoY1a8WDb7rX-e09g=w478-h637-no?authuser=0",
    },
    {
      name: "Matured Boys",
      avatar:
        "https://vip.nypost.com/wp-content/uploads/sites/2/2019/01/boy-bands-backstreet-1a.jpg?quality=90&strip=all",
    },
    {
      name: "Ramesh",
      avatar:
        "https://lh3.googleusercontent.com/pw/ACtC-3c9Ruz2dJzp9_JgpQUiP0Nhew-ehkrubiVoJQYlQxVxakrKFu8n0iXOyrrlgqD-b_nbjG2qj_8xUFHF1vI8jl88yaIERr7jzxq-Uji70f_Ue58vsgkQG92SGw0hdi-VBkK2mmg7TLOYmPyhbxWNQpiQ=w850-h637-no?authuser=0",
    },
    {
      name: "Shiv Nilankar",
      avatar:
        "https://lh3.googleusercontent.com/pw/ACtC-3fUPj8dhgZQea40TFLTm02I_2DFUj-9J6d-g9H7ChHv1J0gS4MI75HSvqx3B1JRfDtDyJ9DWMP1G2_zVmWL8mDh_VAWrjNWMozfjOYE39oXcKQRGOF4oxP-7k5pNbk7sCXmwKbPFVmuBgrEHWFWHFkD=w850-h637-no?authuser=0",
    },
    {
      name: "Workout Bros",
      avatar:
        "https://img.etimg.com/photo/msid-74747053,quality-100/for-miles-a-great-bodyweight-workout-would-include-squats-push-ups-walking-lunges-.jpg",
    },
    {
      name: "Ramya Ramani",
      avatar:
        "https://lh3.googleusercontent.com/pw/ACtC-3eAyegREMhfJIx9QwCaAM0dlCOfRdUXCNn_OP9vwwn34MfkGLfBbbFg3R-g_sb2J9O7Yq-8mMpNFQo0gp0GxdJqaZPpGf5htIBy3DVVzRasYLFSCJylurx2Fh0lnEBa0cPoJ8OBVClDNuvw6Qq9hXxs=w1133-h637-no?authuser=0",
    },
    {
      name: "Bharath",
      avatar:
        "https://lh3.googleusercontent.com/pw/ACtC-3eFwwXs12j6ieUrYOpwI4YfRUvLzkijBHA0VyaRhSZ2gV9OmGG1b6W2PcM_6Nd4T_ojNhWifQzC8AjjPbVC7a7UL3fl-smC3riLjLynsoXzUPZEA5Dzpwr35AeHctp5wRpYfgMN71W8Qgadaq5SEFfP=w850-h637-no?authuser=0",
    },
  ]);

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
        {chatDetails.map((chatDetail, index) => (
          <SidebarChat key={index} detail={chatDetail} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
