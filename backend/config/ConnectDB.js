import mongoose from "mongoose";

const ConnectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB Connected: ${connection.connection.host}`);
    } catch (error) {
        console.log("Error connection to MongoDB", error.message);
        process.exit(1);
    }
}
export default ConnectDB;