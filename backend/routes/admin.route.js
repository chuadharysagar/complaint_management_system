import express from 'express'
import {
   getAllComplaints,
   updateComplaintStatus,
   getMonthlyComplaintStats,
   getAllUsers,
   deleteUser,
   deleteComplaint,
} from '../controllers/complaint.admin.controller.js';
import { verifyToken } from '../middleware/verifyToken.js'


const router = express.Router();

router.get("/complaint", verifyToken, getAllComplaints);
router.put("/updatestatus/:complaintId", verifyToken, updateComplaintStatus);
router.get("/stats", verifyToken,getMonthlyComplaintStats);
router.get("/users",verifyToken,getAllUsers);
router.delete("/delete/:userId",verifyToken,deleteUser);
router.delete("/delete/complaint/:complaintId",verifyToken,deleteComplaint);


export default router;