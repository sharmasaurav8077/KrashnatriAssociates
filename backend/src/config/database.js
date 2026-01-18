import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.warn('⚠️  MONGODB_URI not found in environment variables');
}

export const connectDatabase = async () => {
  try {
    if (!MONGODB_URI) {
      console.log('📝 Database connection skipped (MONGODB_URI not configured)');
      return;
    }

    // Performance: Optimize MongoDB connection with connection pooling
    const mongooseOptions = {
      maxPoolSize: 10, // Maintain up to 10 socket connections
      minPoolSize: 2, // Maintain at least 2 socket connections
      serverSelectionTimeoutMS: 5000, // How long to try selecting a server
      socketTimeoutMS: 45000, // How long a send or receive on a socket can take before timeout
      family: 4, // Use IPv4, skip trying IPv6
      bufferCommands: false, // Disable mongoose buffering
      bufferMaxEntries: 0, // Disable mongoose buffering
    };

    await mongoose.connect(MONGODB_URI, mongooseOptions);
    console.log('✅ MongoDB connected successfully');
    
    // Performance: Set mongoose to use lean queries by default (faster, less memory)
    mongoose.set('lean', false); // Keep false for now, but can enable for read-heavy operations
    
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};
