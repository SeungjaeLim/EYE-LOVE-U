export default function PostListItem({ senderId, content, onClick }) {

  return (
    <div onClick={() => onClick(senderId)} style={{display: "flex", flexDirection: "column", margin: "1rem"}}>
      <div style={{display: "flex"}}>
        <img style={{ objectFit :"cover", width: "7rem", height: "7rem"}} />
        <div style={{display: "flex", flexDirection: "column"}}>
          <div>
            <div>{senderId}</div>
            <br></br>
            <div>{content}</div>
          </div>
          <div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}