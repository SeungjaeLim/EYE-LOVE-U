import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import PostListItem from "../components/PostListItem";
import CloseIcon from '@mui/icons-material/Close';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import Avatar from '@mui/material/Avatar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';

import "../style/Lobby.css";

const API_BASE = process.env.REACT_APP_API_BASE;

const Transition = React.forwardRef(function Transition(props, ref){
  return <Slide direction='left' ref={ref} {...props} />;
})

function Lobby({ userId, setUserId }) {
  const navigate = useNavigate();
  const sex = "M";
  const [ postList, setPostList ] = useState([]);
  const [ userInfo, setUserInfo ] = useState({});
  const [ profileImg, setProfile] = useState();
  const [ listOpen, setListOpen ] = useState(false);
  const [ profileOpen, setProfileOpen ] = useState(false);

  const onClick = (target) => {
    navigate(`/${target}`);
  }

  const onProfileClick = (e) => {
    e.preventDefault();
    setProfileOpen(true);
  }

  const onProfileClose = (e) => {
    e.preventDefault();
    setProfileOpen(false);
  }
  
  useEffect(() => {
    setUserId(window.sessionStorage.getItem('userId'));
    axios.get(`${API_BASE}/auth/info?user_id=${window.sessionStorage.getItem('userId')}`)
    .then(res => {
      console.log(res.data)
      setUserInfo({
        id: res.data.id,
        sex: res.data.sex,
        phoneNumber: res.data.phoneNumber
      });
    })
    .catch(err => console.log(err)); 

    axios.get(`${API_BASE}/api/download?user_id=${window.sessionStorage.getItem('userId')}`,{ responseType: 'arraybuffer' }).then(result => {
      console.log(result.data);
      let blob = new Blob([result.data], { type: "image/jpeg" });
      const url = window.URL.createObjectURL(blob);
      setProfile(url);
      console.log(url);
    })
    .then(res => {

    })
    
    setPostList([
      {
        id: 123,
        senderId: "abs",
        senderPhone: "01033333333",
        senderPhoto: "abc.png",
        reciverId: "efg"
      },
      {
        id: 456,
        senderId: "sdf",
        senderPhone: "01033333333",
        senderPhoto: "abc.png",
        reciverId: "zcv"
      },
      {
        id: 789,
        senderId: "gwe",
        senderPhone: "01033333333",
        senderPhoto: "abc.png",
        reciverId: "mlm"
      },
      {
        id: 789,
        senderId: "gwe",
        senderPhone: "01033333333",
        senderPhoto: "abc.png",
        reciverId: "mlm"
      },
      {
        id: 789,
        senderId: "gwe",
        senderPhone: "01033333333",
        senderPhoto: "abc.png",
        reciverId: "mlm"
      },
      {
        id: 789,
        senderId: "gwe",
        senderPhone: "01033333333",
        senderPhoto: "abc.png",
        reciverId: "mlm"
      },
      {
        id: 789,
        senderId: "gwe",
        senderPhone: "01033333333",
        senderPhoto: "abc.png",
        reciverId: "mlm"
      },
      {
        id: 789,
        senderId: "gwe",
        senderPhone: "01033333333",
        senderPhoto: "abc.png",
        reciverId: "mlm"
      },
      {
        id: 789,
        senderId: "gwe",
        senderPhone: "01033333333",
        senderPhoto: "abc.png",
        reciverId: "mlm"
      }
    ])
  }, [userId]);

  const onPostClick = (id) => {
    if(window.confirm(`${id}에게 답장하시겠습니까?`)) {
      //api request
    }
  }

  const makeListContent = () => {
    return postList.map(post => <ListItem key={post.id}>
      <PostListItem
        onClick={onPostClick}
        id = {post.id}
        senderId = {post.senderId}
        senderPhone = {post.senderPhone}/>
    </ListItem>);
  }

  const showList = () => {
    setListOpen(true);
  }

  return (
    <div className='Lobby'>
      <Avatar
        sx={{ fontSize: 80 }}
        className='LobbyProfileIcon'
        onClick={onProfileClick}
        src={profileImg}/>
      <Dialog
        open={profileOpen}
        onClose={onProfileClose}
        TransitionComponent={Transition}
        aria-describedby="alert-dialog-slide-description" >
        <div className='LobbyUserStatus'>
          <div className='LobbyUserStatusClose'>
            <CloseIcon onClick={onProfileClose}/>
          </div>
          <Avatar className="LobbyUserStatusImg" src={profileImg} sx={{ width: 100, height: 100 }}/>
          <div className="LobbyUserStatusId">{userInfo.id}</div>
          <div className="LobbyUserStatusOther">
            <div className="LobbyUserStatusOtherStat">
              <div>{userInfo.phoneNumber}</div>
            </div>
            <div className="LobbyUserStatusOtherStat">
              <div>{userInfo.sex+'성'}</div>
            </div>
          </div>
        </div>
      </Dialog>

      <LocalPostOfficeIcon
        sx={{ fontSize: 80 }}
        onClick={() => showList()} />
      <Dialog
        open={listOpen}
        TransitionComponent={Transition}
        onClose={() => setListOpen(false)}>
        <CloseIcon onClick={() => setListOpen(false)}/>
        <List>{
          makeListContent()
        }</List>
      </Dialog>
      <div onClick={(e) => {
        e.preventDefault();
        onClick("calibration"); 
      }}>
        Calibration
      </div>
        
      <div onClick={(e) => {
        e.preventDefault();
        if(sex === "M") {
          onClick("manmatching");
        }
        else {
          onClick("womanmatching")
        }
      }}>
        Matching
      </div>
      
    </div>
  ); 
}

export default Lobby;