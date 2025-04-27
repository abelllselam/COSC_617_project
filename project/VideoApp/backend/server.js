import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { Schema, model } from "mongoose";
import { ConnectMongo } from "./mongodb.js";
import { dropboxUploadVideo, dropboxUploadImage } from "./dropboxUpload.js";

dotenv.config();
const app = express();

// Middleware set up
app.use(cors());
app.use(express.json());

// Connect to Mongo Database
ConnectMongo();

//Schema for Uploading Videos
const videoSchema = new Schema({
  title: String,
  description: String,
  likes: Number,
  dislikes: Number,
  channelName: String,
  channelImage: String,
  mimetype: String,
  streamingLink: String,
  videoId: String,
  imageLink: String,
  // image: {
  //   url: String,
  //   altText: String
  // }
  comments: [
    {
      text: String,
      user: String,
      timestamp: Number,
    },
  ],
});

// Create a Mongoose model for the "Video" collection using the defined schema
const Video = model("Video", videoSchema);

// Setup multer to store files in memory
const upload = multer({ storage: multer.memoryStorage() });

// Handle __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the React build
app.use(express.static(path.join(__dirname, "../frontend/dist")));
//----------------------------------API REQUEST------------------------------------------------
//----------------------POST-------------------------------

// Endpoint to save video details
app.post(
  "/store-video",
  upload.fields([
    { name: "file", maxCount: 1 },
    { name: "poster", maxCount: 1 },
  ]),
  async (req, res) => {
    const uploadImage = async (req) => {
      const { buffer, originalname } = req.files["poster"]?.[0];
      const { status, imageLink } = await dropboxUploadImage(
        originalname,
        buffer
      );
      return { status, imageLink };
    };

    const uploadVideo = async (req) => {
      const { mimetype, buffer, originalname } = req.files["file"]?.[0];
      const { videoId, message, error, streamingLink } =
        await dropboxUploadVideo(originalname, buffer);
      const { status, imageLink } = await uploadImage(req, originalname);
      return {
        status,
        videoId,
        message,
        error,
        streamingLink,
        imageLink,
        mimetype,
      };
    };
    try {
      const contents = JSON.parse(req.body.contents);
      const { title, description, channelName, channelImage } = contents;
      const likes = 0;
      const dislikes = 0;
      const { status, videoId, mimetype, streamingLink, imageLink } =
        await uploadVideo(req);
      if (status !== 200) {
        return res
          .status(500)
          .json({ error: "Error uploading poster to Dropbox" });
      }
      // Create a new video document Susing the Video model
      const newVideo = new Video({
        title,
        description,
        likes,
        dislikes,
        channelName,
        channelImage,
        mimetype,
        streamingLink,
        videoId,
        imageLink,
      });

      //If there are no errors save in database
      await newVideo.save();
      return res
        .status(201)
        .json({ message: "Video saved successfully", video: newVideo });
    } catch (error) {
      return res.status(500).json({ message: "Error saving video", error });
    }
  }
);
// Add a comment to a video
app.post("/video/:videoId/comments", async (req, res) => {
  const { videoId } = req.params;
  const { text, user } = req.body; // user can be hardcoded for now

  try {
    const video = await Video.findOne({ videoId });

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    const newComment = {
      text,
      user,
      timestamp: Date.now(),
    };

    video.comments.push(newComment);
    await video.save();

    return res
      .status(200)
      .json({ message: "Comment added successfully", comment: newComment });
  } catch (error) {
    return res.status(500).json({ message: "Error adding comment", error });
  }
});

//----------------------GET-------------------------------
// Endpoint to fetch video details by videoId
app.get("/video/:videoId", async (req, res) => {
  const { videoId } = req.params;

  try {
    // Find the video by videoId
    const video = await Video.findOne({ videoId });

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    return res.status(200).json({ video });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching video", error });
  }
});

// Fetch all the videos
app.get("/video-all/", async (req, res) => {
  try {
    // Find the video by videoId
    const video = await Video.find();

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    return res.status(200).json({ video });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching video", error });
  }
});

//API port
const port = process.env.PORT || 8080;
app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});
