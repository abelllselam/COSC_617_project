import React, { useState } from 'react';

const Upload_Page = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

  return (
    <div className="container-fluid bg-secondary min-vh-100 d-flex align-items-center justify-content-center">
    <div className="row bg-secondary p-4 rounded w-100" style={{ maxWidth: '900px' }}>
      {/* Left Side */}
      <div className="col-md-6 mb-4">
        <h2 className="fw-bold mb-4">Details</h2>

        <div className="mb-3">
          <label className="form-label fw-semibold">Title (Required)</label>
          <input
            type="text"
            className="form-control border-dark"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Description (Required):</label>
          <textarea
            className="form-control border-dark"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Channel:</label>
          <p className="fs-5 fw-bold">Duck-Song-Channel</p>
        </div>
      </div>

      {/* Right Side */}
      <div className="col-md-6 text-center d-flex flex-column align-items-center justify-content-center">
        <img
          src="https://upload.wikimedia.org/wikipedia/en/thumb/3/3f/The_Duck_Song_-_YouTube_Thumbnail.png/220px-The_Duck_Song_-_YouTube_Thumbnail.png"
          alt="Thumbnail"
          className="img-thumbnail mb-3"
          style={{ maxWidth: '250px' }}
        />
        <p className="fw-semibold mb-0">File Name:</p>
        <p className="fs-6 fw-bold">video_name.mp4</p>
      </div>

      {/* Upload Button */}
      <div className="col-12 text-end mt-3">
        <button className="btn btn-light border border-dark rounded-pill px-4 py-2 fw-semibold">
          Upload
        </button>
      </div>
    </div>
  </div>
  );
}

export default Upload_Page;
