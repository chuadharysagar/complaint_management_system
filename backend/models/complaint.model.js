import mongoose, { Schema } from "mongoose";
import User from '../models/user.model.js'

const complaintSchema = new Schema({
   description:{
      type:String,
      required:true,
   },
   category:{
      type:String,
      enum:["hostel","mess","it","sports","academic","medical","other"],
      required:true,
   },
   status:{
      type:String,
      enum:["pending","inprogress","resolved","rejected"],
      default:"pending",
   },
   createdBy:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
      required:true
   },
   updatedBy:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
   }
},{
   timestamps:true,
})

export default mongoose.model("Complaint",complaintSchema);