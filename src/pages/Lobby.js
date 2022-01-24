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
import MailIcon from '@mui/icons-material/Mail';
import IconButton from '@mui/material/IconButton';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


import "../style/Lobby.css";
import { Badge } from '@mui/material';
import { styled } from '@mui/material/styles';

const API_BASE = process.env.REACT_APP_API_BASE;

const Transition = React.forwardRef(function Transition(props, ref){
  return <Slide direction='left' ref={ref} {...props} />;
})

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 10px',
  },
}));
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function Lobby({ userId, setUserId }) {
  const navigate = useNavigate();
  const sex = "M";
  const [ postList, setPostList ] = useState([]);
  const [ mailCount,setMailCount] = useState(0);
  const [ value,       setValue ] = useState(0);
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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
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
    
    setInbox();

  }, [userId]);

  const setInbox = ()=> {
    let count=0;
    setMailCount(0)
    setPostList([])
    axios.get(`${API_BASE}/post/inbox?user_id=${window.sessionStorage.getItem('userId')}`)
    .then(res => {
      setPostList(res.data)
      res.data.map(post=>{
        if(post.isread==0)count++;
      })
    }).finally(()=>{
      console.log(count);
      setMailCount(count);
      console.log(mailCount)
    });
  }

  const onPostClick = (id) => {
    if(window.confirm(`${id}에게 답장하시겠습니까?`)) {
      //api request
    }
  }

  const inboxContents = () => {
    
    console.log(postList)
    if(mailCount != 0) {
      return postList.map(post =>{
        return (
          <ListItem key={post.id}>
            <PostListItem
              onClick={onPostClick}
              id = {post.mail_id}
              senderId = {post.sender}
              senderPhone = {post.senderPhone}/>
          </ListItem>);
      });
    }
    return <div>누구에게도 선택받지 못했습니다</div>
  }
  const sentContents = () => {
    
    console.log(postList)
    return postList.map(post =>{
      console.log(post)
      return (
        <ListItem key={post.id}>
          <PostListItem
            onClick={onPostClick}
            id = {post.mail_id}
            senderId = {post.sender}
            senderPhone = {post.senderPhone}/>
        </ListItem>);
    });
    return <div>누구에게도 선택받지 못했습니다</div>
  }

  const showList = () => {
    setListOpen(true);
  }

  return (
    <div className='Lobby'>
      <Avatar
        sx={{ width: 100, height: 100 }}
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
      <StyledBadge 
          badgeContent={mailCount}
          color="primary">
        <MailIcon
          sx={{ width: 100, height: 100 }}
          onClick={() => showList()} />
      </StyledBadge>
      <Dialog
        open={listOpen}
        TransitionComponent={Transition}
        onClose={() => setListOpen(false)}>
        <CloseIcon onClick={() => setListOpen(false)}/>
        
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="받은 편지함" {...a11yProps(0)} />
            <Tab label="보낸 편지함" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          {inboxContents()}
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        
        {/* <List>{
          inboxContents()
        }</List> */}
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