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
import Pusher from "pusher-js";
import { useStateValue } from "./StateProvider";

function Chat() {
  const [inputMessage, setinputMessage] = useState("");
  const { roomId } = useParams();
  const [room, setroom] = useState([]);
  const [messages, setmessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  /**
   * Effect to get a specific room's messages based on the roomId
   */
  useEffect(() => {
    const fetchRooms = async () => {
      const response = await axios.get(`/api/v1/getRoom?roomId=${roomId}`);
      setroom(response.data[0]);
      setmessages(response.data[0].messages);
    };

    fetchRooms();
  }, [roomId]);

  /**
   * Using a pusher to subscribe for the "channel" & listen to "updated" event
   * on MongoDB's "rooms" collection to get the latest message
   */
  useEffect(() => {
    const pusher = new Pusher("84c179a2a0485dd4a4d6", {
      cluster: "ap2",
    });

    const channel = pusher.subscribe("message");
    channel.bind("inserted", function (newMessage) {
      setmessages([...messages, newMessage]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  //Method to post a message
  const sendMessage = async (e) => {
    e.preventDefault();

    await axios.post("/api/v1/messages/new", {
      message: inputMessage,
      name: user.displayName,
      roomId: roomId,
      timestamp: new Date(),
      received: false,
    });

    setinputMessage("");
  };

  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar src={room.avatar} />
        <div className="chatHeader_info">
          <h2>{room.name}</h2>
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
        {messages &&
          messages.map(({ name, message, timestamp, received }, index) => (
            <p
              key={index}
              className={`chat_message ${
                name === user.displayName && "chat_receiver"
              }`}
            >
              <span className="chat_name">{name}</span>
              {message}
              <span className="chat_timestamp">{`${new Date(
                timestamp
              ).getHours()}:${new Date(timestamp).getMinutes()} ${
                new Date(timestamp).getHours() > 12 ? "PM" : "AM"
              }`}</span>
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
