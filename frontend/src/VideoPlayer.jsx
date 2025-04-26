import React, { useState, useEffect } from 'react'; // removed useRef
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { useParams } from 'react-router-dom';
import { getRequest } from './request.js';
import Loading from './Loading';
import './Styles/VideoPlayer.css';
import VideoRecommended from './VideoRecommended.jsx';

const VideoPlayer = () => {
  const [data, setData] = useState({
    channelName: '', description: '', dislikes: '', imageLink: '',
    likes: '', streamingLink: '', title: '', channelImage: ''
  });

  const [videoDataLoaded, setVideoDataLoaded] = useState(false);
  const [allVideosLoaded, setAllVideosLoaded] = useState(false);
  const [videos, setVideos] = useState([]);
  const { videoId } = useParams();

  // Fetch single video
  useEffect(() => {
    const fetchVideosPlayer = async () => {
      const endpointURL = `/video/${videoId}`;
      try {
        const videoReturned = await getRequest(endpointURL);
        setData(videoReturned.data.video);
        setVideoDataLoaded(true);
      } catch (error) {
        console.error('Error fetching video:', error);
      }
    };
    fetchVideosPlayer();
  }, [videoId]);

  // Fetch all videos
  useEffect(() => {
    const fetchVideos = async () => {
      const endpointURL = '/video-all';
      try {
        const videosReturned = await getRequest(endpointURL);
        setVideos(videosReturned.data.video);
        setAllVideosLoaded(true);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };
    fetchVideos();
  }, []);

  if (!videoDataLoaded || !allVideosLoaded) {
    return <Loading />;
  }


  const { channelName, description, dislikes, imageLink, channelImage, likes, streamingLink, title } = data;

  const videoMapped = videos.map((current) => {
    if (current.videoId !== videoId) {
      return (
        <VideoRecommended
          key={current.videoId}
          title={current.title}
          channelName={current.channelName}
          imageLink={current.imageLink}
          videoId={current.videoId}
          likes={current.likes}
        />
      );
    } 
  });

  return (
    <div className="video-layout">
      <div className="video-player-page">
        <div className="video-wrapper">
          <video
            className="video-element"
            src={streamingLink}
            controls
            poster={imageLink}
            autoPlay='true'
          >
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="video-details">
          <div className="video-info-row">
            <div className="channelImage-div">
              <img className="video-channel-img" src={channelImage} alt={channelName} />
            </div>
            <div className='video-details-text'>
              <h2 className="video-title">{title}</h2>
              <h2 className="video-channel">By {channelName}</h2>
            </div>
          </div>
          <div className="action-buttons">
            <button className="action-btn">
              <FaThumbsUp /> {likes}
            </button>
            <button className="action-btn">
              <FaThumbsDown /> {dislikes}
            </button>
          </div>
          <div className="description-box">
            <h2 className="video-description-title">Description:</h2>
            <div className="video-description">{description}</div>
          </div>
        </div>

        <div className="comments-section">
          <h3 className="comments-heading">Comments</h3>
          <input type="text" className="comment-input" placeholder="Add a comment..." />
          <div className="comment">
            <p className="comment-author">John Doe</p>
            <p className="comment-text">Great video! Learned a lot.</p>
          </div>
        </div>
      </div>

      <div className="reccommendedVideos">
        <div style={{color: 'white', fontSize:'1.2em'}}>Recommended</div>
        {videoMapped}
      </div>
    </div>
  );
};

export default VideoPlayer;
