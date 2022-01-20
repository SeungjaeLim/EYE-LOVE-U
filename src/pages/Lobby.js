import React from 'react';
import { useNavigate } from 'react-router-dom';



function Lobby({ history, match, location }) {
  const navigate = useNavigate();
  const sex = "M";
  const onClick = (target) => {
    navigate(`/${target}`);
  }

  return (
    <div>
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
      
      <div onClick={(e) => {
        e.preventDefault();
        onClick("post");
      }}>
        Post
      </div>
    </div>
  ); 
}

export default Lobby;