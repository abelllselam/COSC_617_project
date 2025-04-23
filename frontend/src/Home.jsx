import React ,{ useState, useEffect } from "react";
import { getRequest } from './request.js'
import VideoTemplate from './VideoTemplate'
import Loading from './Loading';
import './Styles/Home.css'


const Home = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch videos from the server when the component mounts
    useEffect(() => {
        const fetchVideos = async () => {
            const endpointURL = '/video-all';
            try {
                const videosReturned = await getRequest(endpointURL);
                setVideos(videosReturned.data.video);  
                setLoading(false);  
            } catch (error) {
                console.error('Error fetching videos:', error);
                setLoading(false);  
            }
        };
        fetchVideos();
    }, []); 

    const videoMapped = videos.map((current) =>{
        return (
            
            <div className="variable-box">
                <VideoTemplate 
                    title={current.title} 
                    description={current.description}  
                    channelName={current.channelName}
                    imageLink = {current.imageLink}
                    videoId={current.videoId} 
                />
            </div>
        )
    })

    if (loading) {
        return <Loading />
    }
    return (
        <>
             <div className="video-container"> 
                    {videoMapped}
                </div>
        </>
    );
}
export default Home;
