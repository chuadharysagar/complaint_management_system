import express from 'express'
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB  from './utils/connectDB.js';
import userRouter from './routes/user.route.js'
import complaintRouter from './routes/complaint.route.js'
import adminRouter from './routes/admin.route.js'

const app = express();


app.use(cors({
   origin:"http://localhost:5173",
   credentials:true,
}))
app.use(cookieParser());
app.use(express.json());


app.get("/",(req,res)=>{
   res.json({message:"Backend is running"});
})

app.use("/user",userRouter);
app.use("/complaint",complaintRouter);
app.use("/admin",adminRouter);

app.listen(3000,()=>{
   connectDB();
   console.log("Server is runnnig");
})