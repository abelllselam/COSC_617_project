import React from "react";
import "./Styles/VideoTemplate.css";  // We will create the CSS file to style the container

function VideoTemplate({title, description,channelName, imageLink, videoId, setVideoPlayer, setVideoId}) {

  const handleClick = () =>{
    setVideoPlayer(true)
    setVideoId(videoId)
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
