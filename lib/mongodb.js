import mongoose  from "mongoose";

const connectDB = async()=>{
    if(mongoose.connection.readyState>=1){
        console.log("Mongodb already connected");
        return;
    }
    try{
        await mongoose.connect(process.env.MONGODB_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
        console.log("Mongodb connected successfully");
    }
    catch(error){
        console.log("MongoDb connection error",error);
        process.exit(1);
    }
};
export default connectDB;