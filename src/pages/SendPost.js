import React from 'react';
import { useNavigate } from 'react-router-dom';

function SendPost() {
  const navigate = useNavigate();
  const senderInfo = {
    id : "abc",
    phoneNumber : "01012345678",
    photo : "rrr.jpg"
  };
  const addresseeInfo = {
    id : "abc"
  };

  const onSendMail = (e) => {
    e.preventDefault();
    console.log(e.target.message.value);
    navigate('/lobby');
  }

  return (
    <div>
      <div>
        보내질 정보
        <br></br>
        {senderInfo.id}
        <br></br>
        {senderInfo.phoneNumber}
        <br></br>
        {senderInfo.photo}
        <form onSubmit={onSendMail}>
          <input name="message"></input>
          <input type="submit"></input>
        </form>
      </div>
    </div>
  );
}

export default SendPost;