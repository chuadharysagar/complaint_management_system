import express from 'express';
import {
   createComplaint,
   getUserComplaints,
   deleteUserComplaint
} from '../controllers/complaint.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';


const router = express.Router();

router.post("/create", verifyToken, createComplaint);
router.get("/get", verifyToken, getUserComplaints);
router.delete("/delete/:id", verifyToken, deleteUserComplaint);


export default router;