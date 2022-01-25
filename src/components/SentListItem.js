import { Avatar } from "@mui/material";

export default function SentListItem({ id, senderId, content, url }) {
  return (
    <div style={{display: "flex", flexDirection: "column", margin: "1rem"}}>
      <div style={{display: "flex"}}>
        <div style={{display: "flex", flexDirection: "column", width : 300}}>
          <div>
            <div style={{padding : "10px"}}>{content}</div>
          </div>
        </div>
        <div>
          <Avatar sx={{ width: 100, height: 100}} src={url}/>
          <div style={{textAlign : "center"}}>{senderId}</div>
        </div>
      </div>
    </div>
  );
}