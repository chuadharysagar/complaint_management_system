import express from 'express';
import { createComplaint ,getUserComplaints } from '../controllers/complaint.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';


const router = express.Router();

router.post("/create",verifyToken,createComplaint);
router.get("/get",verifyToken , getUserComplaints);


export default router;