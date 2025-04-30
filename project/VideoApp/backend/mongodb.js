import mongoose from "mongoose";

// Function to connect to MongoDB and insert a video document
export async function ConnectMongo() {
  // MongoDB connection string using Mongoose
  const uri = `mongodb+srv://mongoAdmin:${process.env.DB_PASSWORD}@videoapp.gnzz9ru.mongodb.net/VideoApp?retryWrites=true&w=majority`;

  //test
  console.log("ENV password loaded?", !!process.env.DB_PASSWORD);
  console.log("Connecting to:", uri.replace(process.env.DB_PASSWORD, "***"));

  mongoose
    .connect(uri)
    .then(() => {
      console.log("Connected to MongoDB!");
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB", err);
    });
}
