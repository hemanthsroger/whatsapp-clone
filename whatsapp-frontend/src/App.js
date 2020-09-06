import React, { useEffect, useState } from "react";
import "./App.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import Pusher from "pusher-js";
import axios from "./axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const [messages, setmessages] = useState([]);

  /**
   * Fetch all the messages first time when the page loads
   */
  // useEffect(() => {
  //   axios.get("/api/v1/messages/sync").then((response) => {
  //     setmessages(response.data);
  //   });
  // }, []);

  /**
   * Using a pusher to subscribe for the "channel" & listen to "inserted" event
   * on MongoDB's "whatsappMessages" collection
   */
  useEffect(() => {
    const pusher = new Pusher("84c179a2a0485dd4a4d6", {
      cluster: "ap2",
    });

    const channel = pusher.subscribe("messages");
    channel.bind("inserted", function (newMessage) {
      setmessages([...messages, newMessage]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  // console.log("Messages", messages);

  return (
    <div className="app">
      <div className="app_body">
        <Router>
          <Sidebar />
          <Switch>
            <Route path="/rooms/:roomId">
              <Chat />
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
