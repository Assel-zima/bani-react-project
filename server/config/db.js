import mongoose from 'mongoose'
import dns from 'node:dns'

export default async function connectDB() {
  const mongoUri = process.env.MONGODB_URI

  if (!mongoUri) {
    throw new Error('MONGODB_URI is not defined in environment variables')
  }

  try {
    dns.setServers((process.env.DNS_SERVERS || '8.8.8.8,1.1.1.1').split(','))
    dns.setDefaultResultOrder('ipv4first')
    const connection = await mongoose.connect(mongoUri)
    console.log(`MongoDB connected: ${connection.connection.host}`)
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`)
    process.exit(1)
  }
}
