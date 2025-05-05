import bycrpt from 'bcrypt'
import User from '../models/user.model.js'


export const registerUser =async(req,res)=>{
   const {displayName , email, password} = req.body;
    
   if(!displayName || !email || !password){
      return res.status(400).json({message:"All feilds are required"});
   }

   const existingUser = await User.findOne({email});
   if(existingUser){
      return res.status(409).json({meassge:"User Already exists"});
   }

   const newHashedPassword = await bycrpt.hash(password,10);
   
   const user = await User.create({
        displayName,
        email,
        password,
        hashedPassword:newHashedPassword,
   })
   
   const {hashedPassword,...deatilWithoutPassword} = user.toObject();

   return res.status(200).json(deatilWithoutPassword);
}


export const loginUser = async(req, res)=>{
   const {email,password} = req.body;
   
   if(!email || !password){
      return res.status(400).json({message:"All feilds are required"});
   }
   
   const user = await User.findOne({email});

   if(!user){
      return res.status(401).json({message:"Invalid email or password"});
   }
   const isMatchPassword = await bycrpt.compare(password,user.hashedPassword);
   
   if(!isMatchPassword){
      return res.status(401).json({meassge:"Invalid email or password"});
   }

   const{hashedPassword ,...deatilWithoutPassword} = user.toObject();

  return res.status(200).json(deatilWithoutPassword);
}