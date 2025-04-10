import React, { useState, useEffect, useRef } from 'react';
import Loading from '../loading'
import '../Styles/Upload_Modal.css';
import axios from 'axios'

const Upload_ModalDetails = ({ file, closeEverything }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [channelName, setChannelName] = useState('Duck Song Channel');
  const [message, setMessage] = useState('')
  const [isUploading, setIsUploading] = useState(false);

  const uploadVideo = async () => {
    if(!title || !description || !channelName){
      setMessage("Fill out all required fields")
    }
    else{
      setIsUploading(true);
      const formData = new FormData();
      const contents = {
        title: title,
        description: description,
        channelName: channelName
      }
      formData.append('file', file);
      formData.append('contents', JSON.stringify(contents));
      console.log("file", file)
      try {
        const response = await axios.post('http://localhost:8080/store-video', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        
        console.log('File uploaded successfully:', response.data);
        closeEverything()
      } catch (error) {
        console.error('Error uploading file:', error);
    }
    finally{
      setIsUploading(false);
    }
  }
}

if(isUploading){
  return (<Loading />)
}
else{
  return (
    <div className="container">
      <div className="modal-content">
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
          <img
            src="https://upload.wikimedia.org/wikipedia/en/thumb/3/3f/The_Duck_Song_-_YouTube_Thumbnail.png/220px-The_Duck_Song_-_YouTube_Thumbnail.png"
            alt="Thumbnail"
            className="thumbnail"
          />
          <p className="file-info">File Name:</p>
          <p className="file-name">{file.name}</p>
        </div>
        {message}
        {/* Upload Button */}
        <div className="upload-btn">
          <button className="upload-button" onClick={uploadVideo}>Upload</button>
        </div>
      </div>
    </div>
  );
}
 
};

export default Upload_ModalDetails;
