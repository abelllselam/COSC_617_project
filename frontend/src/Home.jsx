import React ,{ useState, useEffect } from "react";
import { getRequest } from './request.js'
import VideoTemplate from './VideoTemplate'


const Home = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch videos from the server when the component mounts
    useEffect(() => {
        const fetchVideos = async () => {
            const endpoint = 'http://localhost:8080/video-all';
            const headers = {
                'Content-Type': 'application/json',
            };
            try {
                const videosReturned = await getRequest(endpoint, headers);
                setVideos(videosReturned.video);  
                setLoading(false);  
            } catch (error) {
                console.error('Error fetching videos:', error);
                setLoading(false);  
            }
        };
        fetchVideos();
    }, []); 

    if (loading) {
        return <p>Loading...</p>;  // Show a loading message while waiting for the data
    }

    const videoMapped = videos.map((current) =>{
        return (
            <VideoTemplate 
                title={current.title} 
                description={current.description} 
                streamingLink={current.streamingLink} 
                key={current.videoId}  
            />
        )
    })
    return (
        <>
            {videoMapped}
        </>
        // <div className="video-container">
        //   {/* Video Player */}
        //   <div className="video-player">
        //     <iframe
        //       width="100%"
        //       height="500"
        //       src="https://www.youtube.com/embed/dQw4w9WgXcQ" // Example video (you can replace this with a dynamic URL)
        //       title="YouTube video player"
        //       frameBorder="0"
        //       allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        //       allowFullScreen
        //     ></iframe>
        //   </div>

        //   {/* Video Details */}
        //   <div className="video-details">
        //     <h2 className="video-title">Video Title Goes Here</h2>
        //     <p className="video-description">
        //       This is a sample video description. You can add details about the video content here.
        //     </p>
        //     <div className="channel-info">
        //       <img
        //         src="https://www.example.com/path-to-channel-avatar.jpg" // Replace with actual channel image
        //         alt="Channel Avatar"
        //         className="channel-avatar"
        //       />
        //       <div className="channel-details">
        //         <h3 className="channel-name">Channel Name</h3>
        //         <p className="subscribers">1.5M Subscribers</p>
        //       </div>
        //     </div>
        //   </div>
        // </div>
    );
}
export default Home;
