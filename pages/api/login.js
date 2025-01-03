import { compare } from 'bcryptjs';
import { MongoClient } from 'mongodb';

const MONGODB_URI = "mongodb+srv://jay:jayanththalla33@cluster0.qfpuofn.mongodb.net/maps?retryWrites=true&w=majority&appName=Cluster0";
const MONGODB_DB = "maps";

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

if (!MONGODB_DB) {
  throw new Error('Please define the MONGODB_DB environment variable');
}

let cachedClient = null;

async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient;
  }

  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    cachedClient = client; // Cache the client for reuse
    return client;
  } catch (error) {
    console.error("Failed to connect to database:", error);
    throw new Error("Failed to connect to database");
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Connect to database
    const client = await connectToDatabase();
    const db = client.db(MONGODB_DB);

    // Find user
    const user = await db.collection('users').findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Verify password
    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Create user session data
    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
    };

    return res.status(200).json({
      message: "Login successful",
      user: userData,
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: "Error during login" });
  }
}
