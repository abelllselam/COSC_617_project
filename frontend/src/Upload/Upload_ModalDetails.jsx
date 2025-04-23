import React, { useState, useEffect, useRef } from 'react';
import { postRequest } from '../request.js'
import Loading from '../Loading';
import '../Styles/Upload_Modal.css';

const Upload_ModalDetails = ({ file, closeEverything }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [channelName] = useState('Duck Song Channel');
  const [message, setMessage] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [posterImage, setPosterImage] = useState(null);
  const [videoTooShort, setVideoTooShort] = useState(false);

  const videoRef = useRef(null);
  const videoURL = URL.createObjectURL(file); // Create object URL for uploaded video

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.onloadeddata = () => {
        console.log('Video loaded, checking duration and capturing frame...');
        checkVideoDuration();
      };
    }
  }, []);

  const captureFrameAtTime = (timeInSeconds) => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = timeInSeconds;

    video.onseeked = () => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      const frameUrl = canvas.toDataURL('image/jpeg');
      console.log(frameUrl)
      setPosterImage(frameUrl);
    };
  };

  const checkVideoDuration = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.duration < 20) {
      setVideoTooShort(true);
    } else {
      setVideoTooShort(false);
      captureFrameAtTime(20); // capture at 20 seconds
    }
  };

  const dataURLtoBlob = (dataurl) => {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
  
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
  
    return new Blob([u8arr], { type: mime });
  };

  const uploadVideo = async () => {
    if (!title || !description || !channelName) {
      setMessage("Fill out all required fields");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();

    const contents = {
      title,
      description,
      channelName,
      posterImage
    };

    formData.append('file', file);
    formData.append('contents', JSON.stringify(contents));

    // 🔥 Convert poster image (base64) to a blob and append it
    if (posterImage) {
      const imageBlob = dataURLtoBlob(posterImage);
      formData.append('poster', imageBlob, 'posterImage.jpg'); 
    }

    try {
      useEffect(() => {
        const setVideos = async () => {
          const endpointURL = '/store-video';
          const headers = { 'Content-Type': 'multipart/form-data' }
          const videosReturned = await postRequest(endpointURL, headers, formData);
          setVideos(videosReturned.data.video);  
          setLoading(false);  
          console.error('Error fetching videos:', error);
        };
        setVideos();
      }, []); 
      console.log('File uploaded successfully:', response.data);
      closeEverything();
    } catch (error) {
      console.error('Error uploading file:', error);
      setLoading(false); 
    } finally {
      setIsUploading(false);
    }
  };

  if (isUploading) {
    return <Loading />;
  }

  return (
    <div className="container">
      <div className="modal-content">
        {/* Hidden video element to capture frame */}
        <video
          ref={videoRef}
          src={videoURL}
          style={{ display: 'none' }}
          preload="auto"
        />

        {/* Left Side */}
        <div className="left-side">
          <h2 className="heading">Details</h2>

          <div className="input-group">
            <label className="input-label">Title (Required)</label>
            <input
              type="text"
              className="input-field"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label className="input-label">Description (Required):</label>
            <textarea
              className="input-field"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="channel-info">
            <label className="input-label">Channel:</label>
            <p className="channel-name">{channelName}</p>
          </div>
        </div>

        {/* Right Side */}
        <div className="right-side">
          {posterImage ? (
            <img src={posterImage} alt="Poster Frame" className="thumbnail" />
          ) : (
            <img
              src="https://upload.wikimedia.org/wikipedia/en/thumb/3/3f/The_Duck_Song_-_YouTube_Thumbnail.png/220px-The_Duck_Song_-_YouTube_Thumbnail.png"
              alt="Default Thumbnail"
              className="thumbnail"
            />
          )}
          <p className="file-info">File Name:</p>
          <p className="file-name">{file.name}</p>
          {videoTooShort && (
            <p style={{ color: 'red' }}>
              Video is too short (under 20s) — cannot capture frame.
            </p>
          )}
        </div>

        {message && <div className="error-message">{message}</div>}

        {/* Upload Button */}
        <div className="upload-btn">
          <button className="upload-button" onClick={uploadVideo}>Upload</button>
        </div>
      </div>
    </div>
  );
};

export default Upload_ModalDetails;
