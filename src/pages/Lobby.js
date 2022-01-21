import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import PostListItem from "../components/PostListItem";
import CloseIcon from '@mui/icons-material/Close';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Transition = React.forwardRef(function Transition(props, ref){
  return <Slide direction='up' ref={ref} {...props} />;
})

const TransitionMypage = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

function Lobby() {
  const navigate = useNavigate();
  const sex = "M";
  const [ postList, setPostList ] = useState([]);
  const [ userInfo, setUserInfo ] = useState({});
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
    setUserInfo(
      {
        id : "seungjae",
        phoneNumber : "01033333333",
        photo : "abc.jpg",
        sex : "M"
      }
    )
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
  }, []);

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
    <div>
      <AccountCircleIcon
        sx={{ fontSize: 80 }}
        onClick={onProfileClick} />
      <Dialog
        open={profileOpen}
        onClose={onProfileClose}
        TransitionComponent={TransitionMypage}
        aria-describedby="alert-dialog-slide-description" >
        <div>
          <div>
            <CloseIcon onClick={onProfileClose}/>
          </div>
          <div className="HomeUserStatusNick">{userInfo.id}</div>
          <div className="HomeUserStatusOther">
            <div className="HomeUserStatusOtherStat">
              <div>{userInfo.phoneNumber}</div>
            </div>
            <div className="HomeUserStatusOtherStat">
              <div>{userInfo.sex}</div>
            </div>
          </div>
        </div>
      </Dialog>

      <div>
        <div onClick={() => showList()}>
          postList
        </div>
      </div>
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