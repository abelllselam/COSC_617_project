import React from "react";
import { useNavigate } from "react-router-dom";

function VideoTemplate({title, description, channelName, imageLink, videoId,channelImage}) {

  const navigate = useNavigate()

  const handleClick = () =>{
    navigate(`/video/${videoId}`)
  } 
  return (
    <div
      className="card"
      style={{ width: "100%", cursor: "pointer" }}
      onClick={handleClick}
  >
    <img className="card-img-top" src={imageLink} alt={title} />
  
    <div className="card-body" style={{ display: "flex", alignItems: "flex-start", gap: "15px" }}>
      <img
        src={channelImage}
        alt={channelName}
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          objectFit: "cover",
          flexShrink: 0,
          marginTop: '4px'
        }}
      />
  
      <div style={{ flex: 1 }}>
        <h6 className="card-title" style={{ margin: 0 }}>{title}</h6>
        <p className="card-text" style={{ margin: "1px 0" }}>{channelName}</p>
      </div>
    </div>
  
    <div style={{ padding: "0 16px 16px 16px" }}>
    <p className="card-text" style={{ margin: 0 }}>
      {console.log(description.length)}
      {description.length > 50 ? `${description.slice(0, 50)}...` : description}
    </p>
    </div>
  </div>
  );
}

export default VideoTemplate;
