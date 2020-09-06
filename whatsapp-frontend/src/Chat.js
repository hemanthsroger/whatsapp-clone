import React, { useState } from "react";
import "./Chat.css";
import SearchIcon from "@material-ui/icons/Search";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Avatar, IconButton } from "@material-ui/core";
import Ticker from "react-ticker";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicNoneIcon from "@material-ui/icons/MicNone";
import axios from "./axios";

function Chat({ messages }) {
  const [inputMessage, setinputMessage] = useState("");
  const sendMessage = async (e) => {
    e.preventDefault();

    await axios.post("/api/v1/messages/new", {
      message: inputMessage,
      name: "Hemi",
      timestamp: new Date(),
      received: false,
    });

    setinputMessage("");
  };

  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar src="https://lh3.googleusercontent.com/pw/ACtC-3fp7QCjdEYMTsUb08tNkztwGWSz6oRWTMk4pI2dwKy1VPj3urYhNzaxrB6uKmB5V_4tzstHkRu58QIUdPkXoS-ckB6m6Og6LmBdRsnigENKMbUeP5RID1rmB8hHkavmtGZ1vmbCoY1a8WDb7rX-e09g=w478-h637-no?authuser=0" />
        <div className="chatHeader_info">
          <h2>Chikoo</h2>
          <Ticker mode="smooth">
            {({ index }) => (
              <>
                <p>{"Last Seen : 5th September 10 a.m"}</p>
              </>
            )}
          </Ticker>
        </div>
        <div className="chatHeader_right">
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className="chat_body">
        {messages.map(({ name, message, timestamp, received, _id }) => (
          <p
            key={_id}
            className={`chat_message ${!received && "chat_receiver"}`}
          >
            <span className="chat_name">{name}</span>
            {message}
            <span className="chat_timestamp">{`${new Date(
              timestamp
            ).getHours()}:${new Date(timestamp).getMinutes()}`}</span>
          </p>
        ))}
      </div>

      <div className="chat_footer">
        <IconButton>
          <InsertEmoticonIcon />
        </IconButton>

        <form>
          <input
            value={inputMessage}
            onChange={(e) => {
              setinputMessage(e.target.value);
            }}
            type="text"
            placeholder="Type your message"
          />
          <button onClick={sendMessage} type="submit">
            Submit message
          </button>
        </form>

        <IconButton>
          <MicNoneIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default Chat;
