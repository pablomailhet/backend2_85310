import dotenv from "dotenv";
import mongoose from "mongoose";
import MongoStore from 'connect-mongo';

dotenv.config();

const DB_user = process.env.DB_user;
const DB_pass = process.env.DB_pass;

const connectDB = async () => {
    try {
        return await mongoose.connect(
            `mongodb+srv://${DB_user}:${DB_pass}@codercluster.pzv7p.mongodb.net/coderDB?retryWrites=true&w=majority&appName=coderCluster`
        );
    } catch (error) {
        console.error(error);
    }
};

const sessionStore = MongoStore.create({
    mongoUrl:
        `mongodb+srv://${DB_user}:${DB_pass}@codercluster.pzv7p.mongodb.net/coderDB?retryWrites=true&w=majority&appName=coderCluster`,
    ttl: 60,
});

export {connectDB, sessionStore };
