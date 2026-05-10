import mongoose from 'mongoose'

export default async function connectDB() {
  const mongoUri = process.env.MONGODB_URI

  if (!mongoUri) {
    throw new Error('MONGODB_URI is not defined in environment variables')
  }

  try {
    const connection = await mongoose.connect(mongoUri)
    console.log(`MongoDB connected: ${connection.connection.host}`)
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`)
    process.exit(1)
  }
}
