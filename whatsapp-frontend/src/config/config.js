import socketIOClient from "socket.io-client";

export const ServerConfig = {
  serverUrl: "https://whatsapp-clone-hemi.herokuapp.com",
  // serverUrl: "http://localhost:9000",
};

export const SocketConnection = socketIOClient.connect(ServerConfig.serverUrl, {
  transports: ["websocket"],
});
