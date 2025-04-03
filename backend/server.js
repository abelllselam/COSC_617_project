import express from 'express';
import { Schema, model } from 'mongoose';
import cors from 'cors';
import { ConnectMongo } from './mongodb.js'

const app = express();

// Middleware set up
app.use(cors()); 
app.use(express.json());

// Connect to Mongo Database
ConnectMongo()

//Schema for Uploading Videos
const videoSchema = new Schema({
    title: String,
    description: String,
    videoPath: String,
    videoId: String,
});

// Create a Mongoose model for the "Video" collection using the defined schema
const Video = model('Video', videoSchema);

//----------------------------------API REQUEST------------------------------------------------
//----------------------POST-------------------------------

// Endpoint to save video details
app.post('/upload-video', async (req, res) => {
    const { title, description, videoPath } = req.body;

    if (!title || !description || !videoPath) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    // Generate a random videoId string
    const videoId = Math.random().toString(36).substring(2, 15);

    try {
        // Create a new video document using the Video model
        const newVideo = new Video({
            title,
            description,
            videoPath,
            videoId,
        });
    
        //If there are no errors save in database
        await newVideo.save();
        return res.status(201).json({ message: 'Video saved successfully', video: newVideo });
    } 
    catch (error) {
        return res.status(500).json({ message: 'Error saving video', error });
    }
});

//----------------------GET-------------------------------
// Endpoint to fetch video details by videoId
app.get('/video/:videoId', async (req, res) => {
  const { videoId } = req.params;

  try {
    // Find the video by videoId
    const video = await Video.findOne({ videoId });

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    return res.status(200).json({ video });
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching video', error });
  }
});

//API port
const port = 8080;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
