import mongoose from "mongoose";

async function connectToDB(): Promise<void> {
  const MONGO_URI = process.env.MONGODB_URI;

  if (!MONGO_URI) {
    throw new Error("MongoDB URI is not set in environment variables.");
  }

  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected successfully.");
  } catch (error) {
    console.error(
      "Error connecting to MongoDB or initializing application:",
      error
    );
    process.exit(1);
  }
}

export default connectToDB;
