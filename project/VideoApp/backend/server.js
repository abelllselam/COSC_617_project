import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { Schema, model } from "mongoose";
import { ConnectMongo } from "./mongodb.js";
import { dropboxUploadVideo, dropboxUploadImage } from "./dropboxUpload.js";
import User from "./User.js";

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
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
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

//When the user logs in via firebase, the frontend sends their info to /user-sync and it creates the mongoDB user record(if missing), to avoid duplicate user creation it checks by uid.
app.post("/user-sync", async (req, res) => {
  const { uid, email, displayName, photoURL } = req.body;

  if (!uid || !email) {
    return res.status(400).json({ message: "UID and email are required" });
  }

  try {
    // Check if user already exists
    let user = await User.findOne({ uid });

    if (!user) {
      // Create user if they don't exist
      user = new User({
        uid,
        email,
        displayName,
        photoURL,
        likedVideos: [],
        dislikedVideos: [],
      });
      await user.save();
    }

    return res.status(200).json({ message: "User synced", user });
  } catch (error) {
    return res.status(500).json({ message: "Error syncing user", error });
  }
});

//like a video
app.post("/video/:videoId/like", async (req, res) => {
  const { videoId } = req.params;
  const { uid } = req.body;
  console.log("LIKE route hit", videoId, req.body);

  try {
    const user = await User.findOne({ uid });
    console.log("Fetched user:", user);
    const video = await Video.findOne({ videoId });
    console.log("Fetched video:", video);

    if (!user) return res.status(404).json({ message: "User not found" });
    if (!video) return res.status(404).json({ message: "Video not found" });

    const alreadyLiked = user.likedVideos.includes(videoId);
    const alreadyDisliked = user.dislikedVideos.includes(videoId);

    if (!alreadyLiked) {
      user.likedVideos.push(videoId);
      video.likes += 1;
    }

    if (alreadyDisliked) {
      user.dislikedVideos = user.dislikedVideos.filter((id) => id !== videoId);
      video.dislikes -= 1;
    }

    console.log("Before save (LIKE):");
    console.log("video.likes =", video.likes);
    console.log("video.dislikes =", video.dislikes);
    console.log("user.likedVideos =", user.likedVideos);
    console.log("user.dislikedVideos =", user.dislikedVideos);

    await user.save();
    await video.save();

    console.log(
      "AFTER SAVE video.likes:",
      video.likes,
      "video.dislikes:",
      video.dislikes
    );

    return res.status(200).json({
      message: "Video liked",
      likes: video.likes,
      dislikes: video.dislikes,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error liking video", error });
  }
});

//Dislike videos
app.post("/video/:videoId/dislike", async (req, res) => {
  const { videoId } = req.params;
  const { uid } = req.body;
  console.log("DISLIKE route hit", videoId, req.body);

  try {
    const user = await User.findOne({ uid });
    const video = await Video.findOne({ videoId });

    if (!user) return res.status(404).json({ message: "User not found" });
    if (!video) return res.status(404).json({ message: "Video not found" });

    const alreadyDisliked = user.dislikedVideos.includes(videoId);
    const alreadyLiked = user.likedVideos.includes(videoId);

    if (!alreadyDisliked) {
      console.log("👍 This video was not already liked — adding like");
      user.dislikedVideos.push(videoId);
      video.dislikes += 1;
    }

    if (alreadyLiked) {
      user.likedVideos = user.likedVideos.filter((id) => id !== videoId);
      video.likes -= 1;
    }

    await user.save();
    await video.save();
    console.log("Saved video.likes =", video.likes);
    return res
      .status(200)
      .json({
        message: "Video disliked",
        dislikes: video.dislikes,
        likes: video.likes,
      });
  } catch (error) {
    return res.status(500).json({ message: "Error disliking video", error });
  }
});

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
  const { text, user } = req.body;

  try {
    const video = await Video.findOne({ videoId });

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    const newComment = {
      text,
      user: user.displayName || user.email || "Anonymous",
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

//Search get endpoint
app.get("/search", async (req, res) => {
  const { query } = req.query;

  try {
    const videos = await Video.find({
      title: { $regex: query, $options: "i" },
    });

    return res.status(200).json({ videos });
  } catch (error) {
    return res.status(500).json({ message: "Error searching videos", error });
  }
});

//API port
const port = process.env.PORT || 8080;
app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});
