import mongoose from "mongoose";
import 'dotenv/config';

const connectionDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
    } catch (err) {
        console.log("erro: ",err)
        process.exit(1);
    }
}


export default connectionDb