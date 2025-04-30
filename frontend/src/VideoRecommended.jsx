import React from 'react';
import './Styles/VideoRecommended.css'
import { useNavigate } from "react-router-dom";

const VideoRecommended = ({title, channelName, imageLink, videoId, likes}) => {
  const navigate = useNavigate()

  const handleClick = () =>{
    navigate(`/video/${videoId}`)
  } 

  return (
    <>
      <div class="video-card" onClick={handleClick}>
        <img src={imageLink} alt="Channel Thumbnail" class="thumbnail" />
        <div class="video-info">
          <h4 class="video-title">{title}</h4>
          <span class="channel-name-video">{channelName}</span>
          <h6 class="channel-name-video">{likes} Likes</h6>
        </div>
      </div>

    </>
  );
};

export default VideoRecommended;
