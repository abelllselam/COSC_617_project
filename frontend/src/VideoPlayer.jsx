import React from "react";
import { FaThumbsUp, FaThumbsDown, FaShare } from "react-icons/fa";

const YouTubePlayer = () => {
  return (
    <div className="container mt-4">
      {/* Video Player */}
      <div className="ratio ratio-16x9 bg-black">
        <iframe width="920" height="545" src="https://www.youtube.com/embed/MtN1YnoL46Q"></iframe>
        {/*<video className="w-100" controls src="https://www.youtube.com/watch?v=MtN1YnoL46Q" />*/}
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
