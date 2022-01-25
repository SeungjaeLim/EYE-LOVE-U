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
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';

import "../style/Lobby.css";
import { Badge } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Card } from '@material-ui/core';
import { margin } from '@mui/system';

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
  const [ postSendList, setPostSendList ] = useState([]);
  const [ mailCount,setMailCount] = useState(0);
  const [ sentMailCount,setSentMailCount] = useState(0);
  const [ value,       setValue ] = useState(0);
  const [ userInfo, setUserInfo ] = useState({});
  const [ profileImg, setProfile] = useState();
  const [ listOpen, setListOpen ] = useState(false);
  const [ profileOpen, setProfileOpen ] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

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
      setUserInfo({
        id: res.data.id,
        sex: res.data.sex,
        phoneNumber: res.data.phoneNumber
      });
      window.sessionStorage.setItem('sex', res.data.sex)
      window.sessionStorage.setItem('phoneNumber', res.data.phoneNumber);
    })
    .catch(err => console.log(err)); 

    axios.get(`${API_BASE}/api/download?user_id=${window.sessionStorage.getItem('userId')}`,{ responseType: 'arraybuffer' }).then(result => {
      let blob = new Blob([result.data], { type: "image/jpeg" });
      const url = window.URL.createObjectURL(blob);
      setProfile(url);
    })
    
    setInbox();

  }, [userId]);

  const setInbox = async () => {
    let count=0;
    let sentCount = 0;
    let templist = [];
    setMailCount(0);
    setPostList([]);
    setSentMailCount(0)
    setPostSendList([])
    const res = await axios.get(`${API_BASE}/post/inbox?user_id=${window.sessionStorage.getItem('userId')}`)
    res.data.forEach(async (post) => {
      if(post.isread==0)count++;
      const url = await getProfile(post.sender)
      post.url=url;
      templist=[...templist, post]
      setPostList(templist)
      console.log(url);
      console.log(templist);
      console.log(postList);
      
    })
    console.log(templist)
    setMailCount(count);

    axios.get(`${API_BASE}/post/sent?user_id=${window.sessionStorage.getItem('userId')}`)
    .then(res => {
      setPostSendList(res.data)
      res.data.map(post=>{
        if(post.isread==0)sentCount++;
      })
    }).finally(()=>{
      setSentMailCount(sentCount);
    });
  }

  const onPostClick = (id, senderId) => {
    if(window.confirm(`${senderId}에게 답장하시겠습니까?`)) {
      //id 읽음처리
      axios.post(`${API_BASE}/post/send`, {
        'sender': userId,
        'recevier': senderId,
        'content': userInfo.phoneNumber
      })
      .then(res => {
        setAlertOpen(true);
      })
      .catch(err =>{
        console.log(err);
      });
    }
  }

  const getProfile = async (name) => {
    const result = await axios.get(`${API_BASE}/api/download?user_id=${name}`,{ responseType: 'arraybuffer' })
    let blob = new Blob([result.data], { type: "image/jpeg" });
    return window.URL.createObjectURL(blob);
  }

  const inboxContents = () => {
    if(mailCount != 0) {
      return postList.map(post =>{
        // console.log(post);
        return (
          <Box sx={{ minWidth: 275}}>
            <Card variant="outlined">
              <PostListItem
                onClick={onPostClick}
                id = {post.mail_id}
                senderId = {post.sender}
                recevierId = {post.reciever}
                content = {post.content}
                url = {post.url}
                />
            </Card>
          </Box>
          );
      });
    }
    return <div>누구에게도 선택받지 못했습니다</div>
  }
  const sentContents = () => {
    if(sentMailCount != 0) {
      return postSendList.map(post =>{
        return (
          <Box sx={{ minWidth: 275}}>
            <Card variant="outlined">
              <PostListItem
                id = {post.mail_id}
                senderId = {post.sender}
                recevierId = {post.reciever}
                content = {post.content}
                />
            </Card>
          </Box>
          );
      });
    }
    else {
      return <div>아직 보낸 메일이 없습니다.</div>
    }
  }

  const showList = () => {
    setListOpen(true);
  }

  return (
    <div className='Lobby'>
      <div className='Background'>
      <Avatar
        sx={{ width: 350, height: 350}}
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
      <div className='PostBox'>
        <StyledBadge 
            badgeContent={mailCount}
            color="secondary">
          <MailIcon
            style={{fill: "white"}}
            sx={{ width: 100, height: 100 }}
            onClick={() => showList()} />
        </StyledBadge>
      </div>

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
          {sentContents()}
        </TabPanel>
        
        {/* <List>{
          inboxContents()
        }</List> */}
      </Dialog>
      <div className='ButtonForm'>
        <div className='CalibrationForm'>
          <LocationSearchingIcon
                style={{fill: "grey"}}
                sx={{ width: 100, height: 100 }}
                onClick={(e) => {
                  e.preventDefault();
                  onClick("calibration"); 
                }} />
          <div className='CalText'>EYE</div>
        </div>
        <div className='MatchingForm'>
          <VolunteerActivismIcon 
                style={{fill: "grey"}}
                sx={{ width: 100, height: 100 }}
                onClick={(e) => {
                  e.preventDefault();
                  onClick("manmatching"); 
                }} />
          <div className='MatText'>Find Love</div>
        </div>
      </div>
      <Dialog open={alertOpen}>
        <DialogTitle style={{ display: "flex", justifyContent: "center"}} >답장을 보냈습니다.</DialogTitle>
        <DialogActions>
          <Button onClick={() => {
            setAlertOpen(false);
            navigate('/lobby');
          }}>확인</Button>
        </DialogActions>
      </Dialog>
      </div>
    </div>
  ); 
}

export default Lobby;