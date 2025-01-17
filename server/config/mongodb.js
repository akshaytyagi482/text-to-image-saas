import mongoose from "mongoose";
import 'dotenv/config'
const connectDB = async () =>{
    mongoose.connection.on('connected',()=>{
        console.log("connected databse")
    })
    await mongoose.connect(`${process.env.MONGO_URI}/imagify`)
}
export default connectDB