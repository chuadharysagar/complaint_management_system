import { Schema } from "mongoose";
import mongoose from "mongoose";


const userSchema = new Schema({
   displayName:{
      type:String,
      required:true,
   },
   email:{
      type:String,
      required:true,
      unique:true,
   },
   hashedPassword:{
      type:String,
      required:true,
   },
   role:{
      type:String,
      enum:["super_admin","hostel_admin","mess_admin","medical_admin","sport_admin","academics_admin","IT_admin","user"],
      default:"user",
   }
},{
  timestamps:true,
})


export default mongoose.model("User",userSchema);