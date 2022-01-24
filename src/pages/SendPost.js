import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
const API_BASE = process.env.REACT_APP_API_BASE;

function SendPost({ userId, selectedId }) {
  console.log(window.sessionStorage.getItem('selectedId'));
  const [alertOpen, setAlertOpen] = useState(false);

  const navigate = useNavigate();
  const senderInfo = {
    id : window.sessionStorage.getItem('userId'),
    phoneNumber : window.sessionStorage.getItem('phoneNumber'),
    photo : "rrr.jpg"
  };
  const addresseeInfo = {
    id : "abc"
  };

  const onSendMail = (e) => {
    e.preventDefault();
    axios.post(`${API_BASE}/post/send`, {
      'sender': window.sessionStorage.getItem('userId'),
      'reciever': window.sessionStorage.getItem('selectedId'),
      'content': e.target.message.value
    })
    .then(res => {
      console.log(res.data);
      setAlertOpen(true);
    })
    .catch(err =>{
      console.log(err);
    });
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
      <Dialog open={alertOpen}>
        <DialogTitle style={{ display: "flex", justifyContent: "center"}} >쪽지를 보냈습니다.</DialogTitle>
        <DialogActions>
          <Button onClick={() => {
            setAlertOpen(false);
            navigate('/lobby');
          }}>확인</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default SendPost;