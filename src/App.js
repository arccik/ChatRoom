import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomeScreen from "./components/LoginScreen/WelcomeScreen";
import ChatPage from "./components/ChatPage/ChatPage";
import socketIO from "socket.io-client";
import SignUp from "./components/LoginScreen/SignUp/SignUp";

const socket = socketIO.connect("http://localhost:2022");

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<WelcomeScreen socket={socket} />}></Route>
          <Route path="/chat" element={<ChatPage socket={socket} />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
