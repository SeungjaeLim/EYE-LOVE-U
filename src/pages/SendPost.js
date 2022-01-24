import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { useInput } from '@mui/base';
import { styled } from '@mui/system';
import "../style/Lobby.css";
const API_BASE = process.env.REACT_APP_API_BASE;

const blue = {
  200: '#80BFFF',
  400: '#3399FF',
};

const grey = {
  50: '#F3F6F9',
  100: '#E7EBF0',
  200: '#E0E3E7',
  300: '#CDD2D7',
  400: '#B2BAC2',
  500: '#A0AAB4',
  600: '#6F7E8C',
  700: '#3E5060',
  800: '#2D3843',
  900: '#1A2027',
};

const StyledInputElement = styled('input')(
  ({ theme }) => `
  width: 320px;
  font-size: 0.875rem;
  font-family: IBM Plex Sans, sans-serif;
  font-weight: 400;
  line-height: 1.5;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[300]};
  border-radius: 8px;
  padding: 12px 12px;
  transition: all 200ms ease;

  &:hover {
    background: ${theme.palette.mode === 'dark' ? null : grey[100]};
    border-color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
  }
`,
);

const CustomInput = React.forwardRef(function CustomInput(props, ref) {
  const { getRootProps, getInputProps } = useInput(props, ref);

  return (
    <div {...getRootProps()}>
      <StyledInputElement {...props} {...getInputProps()} />
    </div>
  );
});

function SendPost({ userId, selectedId }) {
  // console.log(window.sessionStorage.getItem('selectedId'));
  const [ alertOpen, setAlertOpen ] = useState(false);
  const [ myid, setMyId ] = useState(window.sessionStorage.getItem('userId'));
  const [ yourid, setYourId ] = useState(window.sessionStorage.getItem('selectedId'));
  const [ myimage, setMyImage ] = useState();
  const [ yourimage, setYourImage ] = useState(window.sessionStorage.getItem('selectedId'));

  const navigate = useNavigate();
  const senderInfo = {
    id : window.sessionStorage.getItem('userId'),
    phoneNumber : window.sessionStorage.getItem('phoneNumber'),
  };
  
  useEffect(()=>{
    axios.get((`${API_BASE}/api/download?user_id=${myid}`), { responseType: 'arraybuffer'}).then(res => {
      let blob = new Blob([res.data], { type: "image/*" });
      setMyImage(window.URL.createObjectURL(blob))
    })
    axios.get((`${API_BASE}/api/download?user_id=${yourid}`), { responseType: 'arraybuffer'}).then(res => {
      let blob = new Blob([res.data], { type: "image/*" });
      setYourImage(window.URL.createObjectURL(blob))
    })
  },[])

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
    <div className='Lobby'>
      <div className = 'backgroundwrap'>
        <div className='Background1'>

        <Avatar className = 'sendposttext'
          sx={{ width: 300, height: 300}}
          src={myimage}
          />
        <div className = 'sendposttext'> <span> 내 ID : </span>{senderInfo.id} </div>
        <div className = 'sendposttext'> <span> 내 전화번호 : </span> {senderInfo.phoneNumber}</div>
        </div>

        <div className='textbox'>
          <form onSubmit={onSendMail}>
            {/* <div><input name="message"></input></div> */}
            <div className='LoginButtonForm' ><CustomInput name="message" aria-label="Demo input" placeholder="Type something..." /></div>
            <div className='LoginButtonForm'><Button variant='outlined' type='submit'>쪽지 보내기</Button></div>
            {/* <div className='arrow'><img src={'newarrow.png'} /></div> */}
          </form>
        </div>
        
        <div className='Background2'>
        <Avatar
          sx={{ width: 300, height: 300}}
          src={yourimage}
          />
         <div className = 'sendposttext'> <span> 상대방 ID : </span> {yourid} </div>
        </div>
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