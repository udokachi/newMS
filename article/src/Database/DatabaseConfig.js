
import mongoose from"mongoose";
import dotenv from 'dotenv'
dotenv.config()


const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false);
    const connect = await mongoose.connect(process.env.DATABASE_URL);
    console.log(`connected to ${connect.connection.host}`)

  } catch (error) {
    console.error(`error connecting to db ${error}`)

  }
}

export default connectDB