import { MongoClient, ServerApiVersion } from "mongodb";

export async function connectDB() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error("MONGO_URI is undefined. Check your .env file!");
  }

  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  try {
    await client.connect();
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");
    return client.db("agroDB");
  } catch (err) {
    // console.error("MongoDB connection failed:", err);
    process.exit(1);
  }
}
