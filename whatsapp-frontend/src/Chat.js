import React, { useState, useEffect } from "react";
import "./Chat.css";
import SearchIcon from "@material-ui/icons/Search";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Avatar, IconButton } from "@material-ui/core";
import Ticker from "react-ticker";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicNoneIcon from "@material-ui/icons/MicNone";
import axios from "./axios";
import { useParams } from "react-router-dom";

function Chat() {
  const [inputMessage, setinputMessage] = useState("");
  const { roomId } = useParams();
  const [room, setroom] = useState([]);

  useEffect(() => {
    axios.get(`/api/v1/getRoom?roomId=${roomId}`).then((response) => {
      setroom(response.data);
    });
  }, [roomId]);

  //Method to post a message
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
        <Avatar src={room.length > 0 && room[0].avatar} />
        <div className="chatHeader_info">
          <h2>{room.length > 0 && room[0].name}</h2>
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
        {room.length > 0 &&
          room[0].messages.map(
            ({ name, message, timestamp, received, _id }) => (
              <p
                key={_id}
                className={`chat_message ${!received && "chat_receiver"}`}
              >
                <span className="chat_name">{name}</span>
                {message}
                <span className="chat_timestamp">{`${new Date(
                  timestamp
                ).getHours()}:${new Date(timestamp).getMinutes()} ${
                  new Date(timestamp).getHours() > 12 ? "PM" : "AM"
                }`}</span>
              </p>
            )
          )}
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
