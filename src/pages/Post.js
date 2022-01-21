import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios"

function Post() {
  const userInfo = {
    id : "test",
    nickName : "MrHong"
  }

  var postBox = [];
  const [data, setData] = useState(0);

  useEffect(() => {
    postBox.push("1");
    setData(postBox.length);
  });

  return (
    <div>
      <div>
        <span>{userInfo.nickName} 님의 보관함입니다.</span>
      </div>
    </div>
  );
}

export default Post;