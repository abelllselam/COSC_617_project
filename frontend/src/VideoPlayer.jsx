import React, { useState, useEffect, useRef } from 'react';
import { FaThumbsUp, FaThumbsDown, FaShare } from "react-icons/fa";
import axios from 'axios';

const YouTubePlayer = () => {
  const [data, setData] = useState(null);
  // const [posterImage, setPosterImage] = useState(null);
  // const [videoTooShort, setVideoTooShort] = useState(false);
  // const videoRef = useRef(null);

  // Make the GET request using axios
  useEffect(() => {
    axios.get('http://localhost:8080/video/w4syb8cphz')
      .then(response => {
        setData(response.data.video.videoPath);
      })
      .catch(err => {
        console.err(err);
      });
  }, []);

  // Capture a frame from the video when it's ready
  // useEffect(() => {
  //   if (videoRef.current) {
  //     videoRef.current.onloadeddata = () => {
  //       console.log('Video loaded, checking duration and capturing frame if valid');
  //       checkVideoDuration();
  //     };
  //   }
  // }, [data]);

  // Function to check the video duration is over 20 seconds. If so capture a frame of the video
  // const checkVideoDuration = () => {
  //   const video = videoRef.current;
  //   if (!video) return;

  //   // Check if the video duration is more than 20 seconds
  //   if (video.duration < 20) {
  //     setVideoTooShort(true); 
  //   } else {
  //     setVideoTooShort(false);
  //     captureFrameAtTime(20);  // Capture at 30 seconds if video is long enough
  //   }
  // };

  //This will probably be removed later. Doesn't really work
  //Capturing a frame to use as the default image.
  // const captureFrameAtTime = (timeInSeconds) => {
  //   const video = videoRef.current;
  //   if (!video) return;

  //   const currentTime = video.currentTime;
    
  //   // Pause the video temporarily to prevent it from playing while capturing
  //   video.pause();
    
  //   // Only seek to the time if we aren't already there
  //   if (currentTime !== timeInSeconds) {
  //     video.currentTime = timeInSeconds;
  //   }

  //   // Wait for the video to seek to the specific time
  //   video.onseeked = () => {

  //     const canvas = document.createElement('canvas');
  //     const context = canvas.getContext('2d');

  //     // Set canvas dimensions to video dimensions
  //     canvas.width = video.videoWidth;
  //     canvas.height = video.videoHeight;

  //     // Draw the current video frame at the current time (10 seconds) onto the canvas
  //     context.drawImage(video, 0, 0, canvas.width, canvas.height);

  //     // Get image URL from the canvas (as a JPEG image)
  //     const frameUrl = canvas.toDataURL('image/jpeg');

  //     // Set the captured frame as the poster image
  //     setPosterImage(frameUrl);

  //     video.currentTime = currentTime;

  //     // Play the video again from the original position
  //     video.play();

  //     // Remove the event listener to prevent it from being triggered again unnecessarily
  //     video.onseeked = null;
  //   };
  // };

  return (
    <div className="container mt-4">
      {/* Video Player */}
      <div className="ratio ratio-16x9 bg-black">
        <video
          width="100%"
          height="100%"
          src={data}
          controls
          poster={''}
        >
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Video Details */}
      <div className="mt-4">
        <h1 className="h4">Sample Video Title</h1>
        <div className="d-flex gap-3 mt-2">
          <button className="btn btn-outline-secondary d-flex align-items-center gap-1">
            <FaThumbsUp /> Like
          </button>
          <button className="btn btn-outline-secondary d-flex align-items-center gap-1">
            <FaThumbsDown /> Dislike
          </button>
          <button className="btn btn-outline-secondary d-flex align-items-center gap-1">
            <FaShare /> Share
          </button>
        </div>
      </div>

      {/* Comments Section */}
      <div className="card mt-4">
        <div className="card-body">
          <h2 className="h5">Comments</h2>
          <div className="mt-2">
            <input type="text" placeholder="Add a comment..." className="form-control" />
          </div>
          <div className="mt-4">
            <p className="fw-semibold mb-1">John Doe</p>
            <p className="text-muted">Great video! Learned a lot.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YouTubePlayer;
