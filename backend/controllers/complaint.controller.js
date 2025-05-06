import Complaint from "../models/complaint.model.js"

//CREATE A NEW COMPLAINT
export const createComplaint = async (req, res) => {

   try {
      const { description, category } = req.body;

      if (!description || !category) {
         return res.status(400).json({ message: "All feilds are required" });
      }

      const complaint = await Complaint.create({
         description,
         category: category.toLowerCase(),
         createdBy: req.userId,
         updatedBy: req.userId,
      });

      res.status(201).json(complaint);
   } catch (error) {
      res.status(500).json({ message: "Failed to create complaint server error" });
   }
}


// FETCH AALL COMPLAINTS
export const getUserComplaints = async (req, res) => {
   try {
      const complaints = await Complaint.find({createdBy:req.userId}).sort({createdAt:-1});
      res.status(200).json(complaints);
   } catch (error) {
     console.error("Error fetching user complaints");
     res.status(500).json({message:"Server error"});
   }
}