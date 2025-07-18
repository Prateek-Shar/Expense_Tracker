import mongoose from "mongoose";

const uri = "mongodb+srv://Prateek:OlRw9NVC1zG4rNOa@clusterone.jxcodtj.mongodb.net/?retryWrites=true&w=majority&appName=ClusterOne";

const connectDB = async () => {
  try {
    await mongoose.connect(uri); // ✅ only one argument here
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1); // Optional: Exit process if DB connection fails
  }
};

export default connectDB;
