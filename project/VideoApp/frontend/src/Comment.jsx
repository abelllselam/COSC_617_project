import React, { useState, useEffect } from "react";
import axios from "axios";

const Comment = ({ videoId, user }) => {
  const [text, setText] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/video/${videoId}`
        );
        const existingComments = response.data.video.comments || [];
        setComments(existingComments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [videoId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (text.trim() === "") return;

    try {
      const res = await axios.post(
        `http://localhost:8080/video/${videoId}/comments`,
        {
          text: text,
          user: user,
        }
      );

      const newComment = res.data.comment;
      setComments([newComment, ...comments]);
      setText("");
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  return (
    <div className="comments-section">
      <h3 className="comments-heading">Comments</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="comment-input"
          placeholder="Add a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit" className="comment-submit-btn">
          Post
        </button>
      </form>

      <div className="comment-list">
        {comments.length === 0 ? (
          <p>No comments yet. Be the first to comment!</p>
        ) : (
          comments.map((comment, index) => (
            <div key={index} className="comment">
              <p className="comment-author">{comment.user}</p>
              <p className="comment-text">{comment.text}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Comment;
