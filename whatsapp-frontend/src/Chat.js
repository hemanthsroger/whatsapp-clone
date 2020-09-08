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
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import AddUserDialog from "./AddUserDialog";

function Chat() {
  const [inputMessage, setinputMessage] = useState("");
  const { roomId } = useParams();
  const [room, setroom] = useState([]);
  const [messages, setmessages] = useState([]);
  const [{ user }] = useStateValue();
  const [lastSeen, setlastSeen] = useState("");
  const [open, setOpen] = useState(false);
  const [addedUser, setAddedUser] = React.useState("");
  /**
   * Effect to get a specific room's messages based on the roomId
   */
  useEffect(() => {
    const fetchRooms = async () => {
      await axios.get(`/api/v1/getRoom?roomId=${roomId}`).then((response) => {
        const allMessages = response.data[0].messages;
        setroom(response.data[0]);
        setmessages(allMessages);
        if (allMessages.length > 0) {
          setlastSeen(
            new Date(
              allMessages[allMessages.length - 1].timestamp
            ).toUTCString()
          );
        }
      });
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
    channel.bind("inserted", function (message) {
      setmessages([...messages, message.newMessage]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  /**
   * Effect to add a user to the chatroom
   */
  useEffect(() => {
    const addUserToChatroom = async () => {
      await axios.post(`/api/v1/user/new`, {
        userId: null,
        userName: null,
        userEmail: addedUser,
        rooms: [{ roomId: roomId, roomName: room.name }],
      });
    };

    if (addedUser) {
      addUserToChatroom();
    }
  }, [addedUser]);

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

  const addUserToChatRoom = (user) => {
    setOpen(false);
    setAddedUser(user);
  };

  const handleClickOpen = () => {
    setOpen(true);
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
                <p>{`Last Seen : ${new Date(lastSeen).getHours()}:${new Date(
                  lastSeen
                ).getMinutes()} ${
                  new Date(lastSeen).getHours() > 12 ? "PM" : "AM"
                }`}</p>
              </>
            )}
          </Ticker>
        </div>
        <div className="chatHeader_right">
          {/* <IconButton>
            <SearchIcon />
          </IconButton> */}
          <IconButton onClick={handleClickOpen}>
            <PersonAddIcon />
          </IconButton>
          <AddUserDialog open={open} onClose={addUserToChatRoom} />
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
