export default function PostListItem({ id,senderId, senderPhone, onClick }) {

  return (
    <div onClick={() => onClick(id)} style={{display: "flex", flexDirection: "column", margin: "1rem"}}>
      <div style={{display: "flex"}}>
        <img style={{ objectFit :"cover", width: "7rem", height: "7rem"}} />
        <div style={{display: "flex", flexDirection: "column"}}>
          <div>
            <div>{id}</div>
            <br></br>
          </div>
          <div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}