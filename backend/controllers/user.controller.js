import bycrpt from 'bcrypt'
import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'


export const registerUser = async (req, res) => {
   const { displayName, email, password, role } = req.body;

   if (!displayName || !email || !password) {
      return res.status(400).json({ message: "All feilds are required" });
   }

   const existingUser = await User.findOne({ email });
   if (existingUser) {
      return res.status(409).json({ message: "User Already exists" });
   }

   const newHashedPassword = await bycrpt.hash(password, 10);

   const user = await User.create({
      displayName,
      email,
      password,
      hashedPassword: newHashedPassword,
      role: role || "user",
   })

   const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

   res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 24 * 60 * 60 * 1000,
      sameSite: "lax",
   });


   const { hashedPassword, ...deatilWithoutPassword } = user.toObject();

   return res.status(200).json({deatilWithoutPassword,message:"User Created Sucessfully"});
}


export const loginUser = async (req, res) => {
   const { email, password } = req.body;

   if (!email || !password) {
      return res.status(400).json({ message: "All feilds are required" });
   }

   const user = await User.findOne({ email });

   if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
   }
   const isMatchPassword = await bycrpt.compare(password, user.hashedPassword);

   if (!isMatchPassword) {
      return res.status(401).json({ meassge: "Invalid email or password" });
   }
   const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

   res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      sameSite: "lax", // SameSite should be set to 'lax' or 'strict' for better security
   });

   const { hashedPassword, ...deatilWithoutPassword } = user.toObject();

   return res.status(200).json(deatilWithoutPassword);
}


export const logoutUser = async (req, res) => {
   try {
      res.clearCookie("token", {
         httpOnly: true,
         secure: process.env.NODE_ENV === "production",
      });

      return res.status(200).json({ message: "Logout successful" });
   } catch (error) {
      return res.status(500).json({ message: "Logout failed", error: error.message });
   }
};

