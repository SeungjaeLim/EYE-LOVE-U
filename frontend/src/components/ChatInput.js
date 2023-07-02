import React, { useRef, useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import "./ChatInput.css";

const ChatInput = ({ userName, socket }) => {
  const [chatMessage, setChatMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("onSend", {
      userName: userName ? userName : localStorage.getItem("userName"),
      msg: chatMessage,
      timeStamp: new Date().toLocaleTimeString(),
    });
    setChatMessage("");
  };

  const onChatMessageChange = (e) => {
    setChatMessage(e.target.value);
  };

  return (
    <div className="ChatInput-container">
      <form className="ChatInput-form" onSubmit={handleSubmit}>
        <TextField style={{ fontFamily: "pretty", marginTop:"1rem", height:"1rem"}} value={chatMessage} onChange={onChatMessageChange} size="small" inputProps={{style: {fontFamily:'pretty'}}} InputLabelProps={{style: {fontFamily:'pretty'}}} color="secondary" />
        <Button style={{ fontFamily: "pretty", marginTop:"1rem", height:"3.5rem"}} color="secondary" variant='outlined' type='submit' >전송</Button>
      </form>
     </div>
  );
};

export default ChatInput;