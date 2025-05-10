import Complaint from '../models/complaint.model.js'
import User from '../models/user.model.js'

//GET ALL THE COMPLAINTS
export const getAllComplaints = async (req, res) => {
  try {
    const searchQuery = req.query.search || "";

    const complaints = await Complaint.find({})
      .sort({ createdAt: -1 })
      .populate("createdBy", "displayName");

    const filteredComplaints = complaints.filter(c =>
      c.description.toLowerCase().includes(searchQuery) ||
      c.createdBy?.displayName?.toLowerCase().includes(searchQuery)
    );

    res.status(200).json(filteredComplaints);
  } catch (error) {
    console.error("Error fetching complaints:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


// Update complaint status
export const updateComplaintStatus = async (req, res) => {
  const { complaintId } = req.params;
  const { status } = req.body;
  try {
    const updatedComplaint = await Complaint.findByIdAndUpdate(
      complaintId,
      { status },
      { new: true },);

    if (!updatedComplaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    res.status(200).json(updatedComplaint);

  } catch (error) {
    console.log("Error updating complaint status", error);
    return res.status(500).json({ message: "Internal server Error" });
  }
}

//GET COMPLLAQINTS STATES
export const getComplaintStats = async (req, res) => {
  try {
    const stats = await Complaint.aggregate([
      {
        $group: {
          _id: { category: "$category", status: "$status" },
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: "$_id.category",
          statusCounts: {
            $push: { status: "$_id.status", count: "$count" },
          },
          total: { $sum: "$count" },
        },
      },
      {
        $project: {
          _id: 0,
          category: "$_id",
          statusCounts: 1,
          total: 1,
        },
      },
    ]);

    res.status(200).json(stats);
  } catch (error) {
    console.error("Error fetching complaint stats", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export const getMonthlyComplaintStats = async (req, res) => {
  try {
    const now = new Date();
    const startOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfPreviousMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfPreviousMonth = new Date(now.getFullYear(), now.getMonth(), 0);

    // Get current month stats
    const currentMonthStats = await Complaint.aggregate([
      {
        $match: {
          createdAt: { $gte: startOfCurrentMonth }
        }
      },
      {
        $group: {
          _id: { category: "$category", status: "$status" },
          count: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: "$_id.category",
          statusCounts: {
            $push: { status: "$_id.status", count: "$count" }
          },
          total: { $sum: "$count" }
        }
      },
      {
        $project: {
          _id: 0,
          category: "$_id",
          statusCounts: 1,
          total: 1
        }
      }
    ]);

    // Get previous month stats
    const previousMonthStats = await Complaint.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startOfPreviousMonth,
            $lte: endOfPreviousMonth
          }
        }
      },
      {
        $group: {
          _id: { category: "$category", status: "$status" },
          count: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: "$_id.category",
          statusCounts: {
            $push: { status: "$_id.status", count: "$count" }
          },
          total: { $sum: "$count" }
        }
      },
      {
        $project: {
          _id: 0,
          category: "$_id",
          statusCounts: 1,
          total: 1
        }
      }
    ]);

    res.status(200).json({
      currentMonth: currentMonthStats,
      lastMonth: previousMonthStats
    });

  } catch (error) {
    console.error("Error fetching monthly complaint stats", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



//GET ALL THE USER DATA FOR ADMIN
export const getAllUsers = async(req,res)=>{
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({meassge:"Failed to fetch usser data"});
  }
}

