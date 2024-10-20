import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI || 'mongodb://172.17.0.2:27017/Refaccionaria';

        await mongoose.connect(mongoURI);

        console.log('MongoDB connected:', mongoose.connection.name);
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
        process.exit(1); 
    }
};

export default connectDB;
