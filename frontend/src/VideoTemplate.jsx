import React from "react";
import "./Styles/VideoTemplate.css";  // We will create the CSS file to style the container

function VideoTemplate({title, description, streamingLink, key}) {
  return (
    <div className="video-container">
      {/* Video Player */}
      <div className="video-player">
        <iframe
          width="60%"
          height="300"
          src={streamingLink}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      {/* Video Details */}
      <div className="video-details">
        <h2 className="video-title">{title}</h2>
        <p className="video-description">
          {description}
        </p>
      </div>
    </div>
  );
}

export default VideoTemplate;
