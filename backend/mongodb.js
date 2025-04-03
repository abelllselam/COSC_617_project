import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

// Function to connect to MongoDB and insert a video document
export async function ConnectMongo() {

  // MongoDB connection string using Mongoose
  const uri = `mongodb+srv://mongoAdmin:${process.env.DB_PASSWORD}@videoapp.gnzz9ru.mongodb.net/VideoApp?retryWrites=true&w=majority`;
  
  mongoose.connect(uri).then(() => {
    console.log("Connected to MongoDB!");
  }).catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });
}


