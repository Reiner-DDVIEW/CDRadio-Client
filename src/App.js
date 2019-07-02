import React, { useState } from "react";
import Playlist from "./components/Playlist/";
import Uploader from "./components/Uploader/";
import Login from "./components/Login/";
import socketIO from "socket.io-client";
import { Provider as LoginstatusProvider } from "./Contexts/loginStatus";
import { Provider as SocketIOProvider } from "./Contexts/socketIO";

import "./App.css";

const socket = socketIO();

function App() {
  const [loginstatus, setloginstatus] = useState({
    authkey: localStorage.getItem("authkey"),
    visible: false
  });
  return (
    <SocketIOProvider value={socket}>
      <LoginstatusProvider value={loginstatus}>
        <Login setLogin={setloginstatus} />
        <Playlist />
        <Uploader />
      </LoginstatusProvider>
    </SocketIOProvider>
  );
}

export default App;
