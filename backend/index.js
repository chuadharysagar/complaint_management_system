import express from 'express'
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB  from './utils/connectDB.js';
import userRouter from './routes/user.route.js'

const app = express();


app.use(cors())
app.use(cookieParser());
app.use(express.json());


app.get("/",(req,res)=>{
   res.json({message:"Backend is running"});
})

app.use("/user",userRouter);

app.listen(3000,()=>{
   connectDB();
   console.log("Server is runnnig");
})