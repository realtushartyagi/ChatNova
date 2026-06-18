import mongoose from 'mongoose';

const connectDB = async () =>{
    if (mongoose.connection.readyState >= 1) {
        return;
    }

    try {
        mongoose.connection.on('connected', ()=> console.log('Database connected'))
        await mongoose.connect(`${process.env.MONGODB_URI}/quickgpt`, {
            serverSelectionTimeoutMS: 5000,
        })
    } catch (error) {
        console.log("DB Connection Error: ", error.message)
    }
}

export default connectDB;