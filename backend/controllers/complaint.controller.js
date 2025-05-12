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

      res.status(201).json({complaint,message:"Complaint Submitted"});
   } catch (error) {
      res.status(500).json({ message: "Failed to create complaint server error" });
   }
}


// FETCH AALL COMPLAINTS
export const getUserComplaints = async (req, res) => {
   try {
      const complaints = await Complaint.find({ createdBy: req.userId }).sort({ createdAt: -1 });
      res.status(200).json(complaints);
   } catch (error) {
      console.error("Error fetching user complaints");
      res.status(500).json({ message: "Server error" });
   }
}


//DELETE USER COMPLAINT BY USER
export const deleteUserComplaint = async (req, res) => {
   const complaintId = req.params.id;
   const userId = req.userId;

   try {
     // fisrt find the complaint if it exists 
     const complaint = await Complaint.findById(complaintId);

     if(!complaint){
      return res.status(404).json({message:"Complaint not found"})
     }

     //compare if that complainnt is created by the same person
     if(complaint.createdBy.toString()!==userId){
      return res.status(403).json({message:"Not Authorizeddd to delete this complaint"})
     }

     await Complaint.findByIdAndDelete(complaintId);

     return res.status(200).json({message:"Complaint deleted sucessfully"});
       
   } catch (error) {
       console.log("Error Deleting message",error);
       return res.status(500).json({message:"Interal Server Error"});
   }
}