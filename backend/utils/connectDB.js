import mongoose from "mongoose"

const connectDB =async()=>{
   try {
      await mongoose.connect("mongodb://localhost:27017/complaintDB").then(()=>console.log("Db connected"));
   } catch (error) {
      console.log("MONGODB CONNECTION ERROR",error);
   }
}

export default connectDB;