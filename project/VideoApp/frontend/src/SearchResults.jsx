import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import VideoTemplate from "./VideoTemplate";

function SearchResults() {
  const [videos, setVideos] = useState([]);
  const location = useLocation();

  const query = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/search?query=${query}`
        );
        setVideos(res.data.videos);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <div>
      <h2 style={{ color: "white" }}>Search Results for: "{query}"</h2>
      <div className="video-result-container">
        {videos.length > 0 ? (
          videos.map((video) => (
            <div className="variable-box" key={video.videoId}>
              <VideoTemplate
                key={video.videoId}
                title={video.title}
                description={video.description}
                channelName={video.channelName}
                imageLink={video.imageLink}
                videoId={video.videoId}
                channelImage={video.channelImage}
              />
            </div>
          ))
        ) : (
          <p style={{ color: "white" }}>No videos found.</p>
        )}
      </div>
    </div>
  );
}

export default SearchResults;
