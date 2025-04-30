import React, { useState, useEffect } from "react"; // removed useRef
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { getRequest } from "./request.js";
import Loading from "./Loading";
import "./Styles/VideoPlayer.css";
import VideoRecommended from "./VideoRecommended.jsx";
import Comment from "./Comment.jsx";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { postRequest } from "./request.js";

const VideoPlayer = () => {
  const [data, setData] = useState({
    channelName: "",
    description: "",
    dislikes: 0,
    imageLink: "",
    likes: 0,
    streamingLink: "",
    title: "",
    channelImage: "",
  });

  const [videoDataLoaded, setVideoDataLoaded] = useState(false);
  const [allVideosLoaded, setAllVideosLoaded] = useState(false);
  const [videos, setVideos] = useState([]);
  const { videoId } = useParams();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user || null);

      if (user) {
        try {
          const res = await postRequest(
            "/user-sync",
            { headers: { "Content-Type": "application/json" } },
            {
              uid: user.uid,
              email: user.email,
              name: user.displayName || "Anonymous", // Optional
              image: user.photoURL || "", // Optional
            }
          );

          console.log("User synced with backend:", res.data);
        } catch (err) {
          console.error("Failed to sync user with backend:", err.message);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // Fetch single video
  useEffect(() => {
    const fetchVideosPlayer = async () => {
      const endpointURL = `/video/${videoId}`;
      try {
        const videoReturned = await getRequest(endpointURL);
        setData(videoReturned.data.video);
        setVideoDataLoaded(true);
      } catch (error) {
        console.error("Error fetching video:", error);
      }
    };
    fetchVideosPlayer();
  }, [videoId]);

  // Fetch all videos
  useEffect(() => {
    const fetchVideos = async () => {
      const endpointURL = "/video-all";
      try {
        const videosReturned = await getRequest(endpointURL);
        setVideos(videosReturned.data.video);
        setAllVideosLoaded(true);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };
    fetchVideos();
  }, []);

  if (!videoDataLoaded || !allVideosLoaded) {
    return <Loading />;
  }

  const {
    channelName,
    description,
    dislikes,
    imageLink,
    channelImage,
    likes,
    streamingLink,
    title,
  } = data;

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
            autoPlay="true"
          >
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="video-details">
          <div className="video-info-row">
            <div className="channelImage-div">
              <img
                className="video-channel-img"
                src={channelImage}
                alt={channelName}
              />
            </div>
            <div className="video-details-text">
              <h2 className="video-title">{title}</h2>
              <h2 className="video-channel">By {channelName}</h2>
            </div>
          </div>
          <div className="action-buttons">
            <button
              className="action-btn"
              onClick={async () => {
                if (!currentUser) {
                  alert("Please sign in to like this video.");
                  return;
                }

                try {
                  console.log("Sending uid:", currentUser?.uid);

                  const res = await postRequest(
                    `/video/${videoId}/like`,
                    { headers: { "Content-Type": "application/json" } },
                    { uid: currentUser.uid }
                  );
                  console.log("LIKE response from backend:", res.data);
                  setData((prevData) => ({
                    ...prevData,
                    likes: res.data.likes,
                    dislikes: res.data.dislikes,
                  }));
                } catch (error) {
                  console.error("Error liking video:", error);
                }
              }}
            >
              <FaThumbsUp /> {data.likes}
            </button>
            <button
              className="action-btn"
              onClick={async () => {
                if (!currentUser) {
                  alert("Please sign in to dislike this video.");
                  return;
                }

                try {
                  const res = await postRequest(
                    `/video/${videoId}/dislike`,
                    { headers: { "Content-Type": "application/json" } },
                    { uid: currentUser.uid }
                  );
                  console.log("DISLIKE response from backend:", res.data);
                  setData((prevData) => ({
                    ...prevData,
                    dislikes: res.data.dislikes,
                    likes: res.data.likes,
                  }));
                } catch (error) {
                  console.error("Error disliking video:", error);
                }
              }}
            >
              <FaThumbsDown /> {data.dislikes}
            </button>
          </div>
          <div className="description-box">
            <h2 className="video-description-title">Description:</h2>
            <div className="video-description">{description}</div>
          </div>
        </div>
        <Comment videoId={videoId} user={currentUser} />

        {/* <div className="comments-section">
          <h3 className="comments-heading">Comments</h3>
          <input type="text" className="comment-input" placeholder="Add a comment..." />
          <div className="comment">
            <p className="comment-author">John Doe</p>
            <p className="comment-text">Great video! Learned a lot.</p>
          </div>
        </div> */}
      </div>

      <div className="reccommendedVideos">
        <div style={{ color: "white", fontSize: "1.2em" }}>Recommended</div>
        {videoMapped}
      </div>
    </div>
  );
};

export default VideoPlayer;
