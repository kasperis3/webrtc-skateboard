import "./App.css";
import { Routes, Route } from "react-router-dom";
import WebRTCService from "./services/WebRTCServiceDropIn";
import ScreenShare from "./components/ScreenShare";
import HomeScreen from "./components/HomeScreen";
import CallScreen from "./components/CallScreen";
import { useState } from "react";

const connection = new WebRTCService();

function App() {
  const [isPeerConnected, setIsPeerConnected] = useState(false);
  connection.setIsPeerConnectedFn(setIsPeerConnected);

  return (
    <div className="App">
      <h1>Peer to Peer Video Chat</h1>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route
          path="/call/:roomId"
          element={<CallScreen connection={connection} />}
        />
      </Routes>
    </div>
  );
}

export default App;
