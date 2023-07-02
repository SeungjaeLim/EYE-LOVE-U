import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { ChatLog } from "../components/ChatLog";
import ChatInput from "../components/ChatInput";

const CHAT_SERVER = process.env.REACT_APP_API_CHAT;

const Chat = ({ roomName, userName }) => {
  
  
  // let socket
  
  const myInfo = {
    roomName: roomName ? roomName : localStorage.getItem("roomName"),
    userName: userName ? userName : localStorage.getItem("userName"),
  };

  const [currentSocket, setCurrentSocket] = useState();
  
  useEffect(() => {
    setCurrentSocket(io(CHAT_SERVER))
  }, []);
  
  if (currentSocket) {
    currentSocket.off("connect");
    currentSocket.on("connect", () => {
      console.log('연결됨')
      currentSocket.emit("join", myInfo);
    });
  }

  console.log(myInfo);
  return (
    <div>
      {currentSocket ? (
        <div>
          <ChatLog socket={currentSocket}></ChatLog>
          <ChatInput userName={userName} socket={currentSocket}></ChatInput>
        </div>
      ) : (
        <div>로딩중</div>
      )}
    </div>
  );
};

export default Chat;