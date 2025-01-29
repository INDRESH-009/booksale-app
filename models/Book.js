// Mongoose schema for Books 
import mongoose from "mongoose";

const BookSchema =  new mongoose.Schema({
    title:{type:String,required:true},
    author:{type:String,required:true},
    price:{type:Number,required:true},
    condition:{type:String,required:true},
    seller:{type:String,required:true},   
},
{timestamps:true}
);

export default mongoose.models.Book || mongoose.model("Book",BookSchema);