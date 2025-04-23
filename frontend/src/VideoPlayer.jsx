import React, { useState, useEffect, useRef } from 'react';
import { FaThumbsUp, FaThumbsDown, FaShare } from "react-icons/fa";
import { useParams } from 'react-router-dom';
import { getRequest } from './request.js'
import Loading from './Loading';
import './Styles/VideoPlayer.css'

const VideoPlayer = () => {
  const [data, setData] = useState({channelName: '', description: '', dislikes: '', imageLink: '', likes: '', streamingLink: '', title: ''});
  const [loading, setLoading] = useState(true);
  const { videoId } = useParams();
  // Make the GET request using axios
  useEffect(() => {
    const fetchVideosPlayer = async () => {
        const endpointURL = `/video/${videoId}`;
        try {
            const videoReturned = await getRequest(endpointURL);
            setData(videoReturned.data.video);  
            setLoading(false);  
        } catch (error) {
            console.error('Error fetching videos:', error);
            setLoading(false);  
        }
    };
    fetchVideosPlayer();
  }, []); 

  if (loading || !data) {
    return <Loading />;
  }

  const {channelName, description, dislikes, imageLink, likes, streamingLink, title} = data
  return (
    <div className="video-player-page">
        {/* Video Section */}
        <div className="video-wrapper">
          <video
            className="video-element"
            src={streamingLink}
            controls
            poster={imageLink}
          >
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Video Details */}
        <div className="video-details">
          <div className='video-details-text'>
            <h2 className="video-title">{title}</h2>
            <h2 className="video-channel">By {channelName}</h2>
          </div>
          <h2 className="video-description">Description: <p></p>{description}</h2>
          <div className="action-buttons">
            <button className="action-btn">
              <FaThumbsUp /> {likes}
            </button>
            <button className="action-btn">
              <FaThumbsDown /> {dislikes}
            </button>
          </div>
        </div>

        {/* Comments Section */}
        <div className="comments-section">
          <h3 className="comments-heading">Comments</h3>
          <input type="text" className="comment-input" placeholder="Add a comment..." />
          <div className="comment">
            <p className="comment-author">John Doe</p>
            <p className="comment-text">Great video! Learned a lot.</p>
          </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
