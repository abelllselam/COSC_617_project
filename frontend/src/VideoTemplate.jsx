import React from "react";
import { useNavigate } from "react-router-dom";

function VideoTemplate({title, description,channelName, imageLink, videoId}) {

  const navigate = useNavigate()

  const handleClick = () =>{
    navigate(`/video/${videoId}`)
  } 
  return (
    <div class="card" style={{width: "100%"}} onClick={handleClick}>
      <img class="card-img-top" src={imageLink} alt={title} />
      <div class="card-body">
        <h5 class="card-title">{title}</h5>
        <p class="card-text"> {description}</p>
        <p class="card-text"> {channelName}</p>
      </div>
    </div>
  );
}

export default VideoTemplate;
