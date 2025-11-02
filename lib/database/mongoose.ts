import mongoose from 'mongoose';
let isConnected = false;

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);
  if(!process.env.MONGODB_URI){
    return console.log('Unable to connect MongoDB');
  }

  if(isConnected){
    return console.log('Existing database is connected');
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
    console.log('MongoDB is connected');
  } catch (error) {
    console.log(error)
  }
}