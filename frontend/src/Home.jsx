import React ,{ useState, useEffect } from "react";
import { getRequest } from './request.js'
import VideoTemplate from './VideoTemplate'
import VideoPlayer from './VideoPlayer'
import Loading from './Loading';
import './Styles/Home.css'


const Home = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [player, setVideoPlayer] = useState(false)
    const [videoId, setVideoId] = useState(null)

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

    const videoMapped = videos.map((current) =>{
        return (
            
            <div className="variable-box">
                <VideoTemplate 
                    title={current.title} 
                    description={current.description}  
                    channelName={current.channelName}
                    imageLink = {current.imageLink}
                    videoId={current.videoId} 
                    setVideoPlayer = {setVideoPlayer}
                    setVideoId = {setVideoId}
                />
            </div>
        )
    })

    const homeScreen = () => {
        if(player){
            return (
                <VideoPlayer videoId={videoId}/>
            )
        }else{
            return(
                <div className="video-container"> 
                    {videoMapped}
                </div>
            )
        }

    }

    if (loading) {
        return <Loading />
    }
    return (
        <>
            {homeScreen()}
        </>
    );
}
export default Home;
