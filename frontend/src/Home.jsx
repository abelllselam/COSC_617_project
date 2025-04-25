import React ,{ useState, useEffect } from "react";
import { getRequest } from './request.js'
import VideoTemplate from './VideoTemplate'
import Loading from './Loading';
import './Styles/Home.css'
import { FaRegStar } from "react-icons/fa";


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
                    channelImage={current.channelImage}
                />
            </div>
        )
    })

    if (loading) {
        return <Loading />
    }
    return (
        <>
            <div className="popularText"><FaRegStar style={{marginTop: '-10px', padding: '3px', marginRight: '4px'}}/>Popular</div>
             <div className="video-container"> 
                    {videoMapped}
                </div>
        </>
    );
}
export default Home;
