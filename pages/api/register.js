import { hash } from 'bcryptjs';
import { MongoClient } from 'mongodb';

const MONGODB_URI = "mongodb+srv://jay:jayanththalla33@cluster0.qfpuofn.mongodb.net/maps?retryWrites=true&w=majority&appName=Cluster0"; // Replace with your MongoDB URI
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
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Connect to database
    const client = await connectToDatabase();
    const db = client.db(MONGODB_DB);

    // Check if user already exists
    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await hash(password, 12);

    // Create user
    const result = await db.collection('users').insertOne({
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    });

    return res.status(201).json({
      message: "User created successfully",
      user: {
        id: result.insertedId,
        name,
        email,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ message: "Error creating user" });
  }
}
