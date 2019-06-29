import React, { useState } from "react";
import Playlist from "./components/Playlist/";
import Uploader from "./components/Uploader/";
import Login from "./components/Login/";
import { Provider as LoginstatusProvider } from "./Contexts/loginStatus";
import { Provider as SocketIOProvider } from "./Contexts/socketIO";

import "./App.css";

function App() {
  const [loginstatus, setloginstatus] = useState(false);
  return (
    <SocketIOProvider value={null}>
      <LoginstatusProvider value={loginstatus}>
        <Login setLogin={setloginstatus} />
        <Playlist />
        <Uploader />
      </LoginstatusProvider>
    </SocketIOProvider>
  );
}

export default App;
