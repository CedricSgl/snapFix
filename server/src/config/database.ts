import { connect } from "mongoose";

const mongoURL = "mongodb://127.0.0.1:27017/immoApp?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.0";

export const connectDB = async () => {
    try {
        await  connect(mongoURL);

        console.log("MongoDB connected");
    } catch (err: any) {
        console.error(err.message);
        // Exit process with failure
        process.exit(1);
      }
}