import React, { useEffect, useState } from "react";
import "./ChatInput.css";

export const ChatLog = ({ socket }) => {

  const [msgList, setMsgList] = useState([]);

  useEffect(() => {
    // messsgeItem : {msg: String, name: String, timeStamp: String}
    socket.on("onReceive", (messageItem) => {
      setMsgList((msgList) => [...msgList, messageItem]);
      console.log(messageItem);
    });
    socket.on("onConnect", (systemMessage) => {
      setMsgList((msgList) => [...msgList, { msg: systemMessage }]);
    });
    socket.on("onDisconnect", (systemMessage) => {
      setMsgList((msgList) => [...msgList, { msg: systemMessage }]);
    });
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <div className="chatlogbox">
      {msgList.map((msg, idx) => (
        <div key={idx} className="chatlogbox">
          <div className="usernamechat"> {msg.userName}</div>
          <div>{msg.msg}</div>
        </div>
      ))}
    </div>
  );
};
// export default ChatLog;