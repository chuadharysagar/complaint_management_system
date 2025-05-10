import { useEffect, useState } from 'react';
import { Send, X, Check, Clock, AlertCircle, Trash2 } from 'lucide-react';
import UserComplaintList from './UserComplaintList';
import NavBar from '../components/NavBar';
import apiRequest from '../utils/apiRequest';


const UserContainer = () => {
   // Sample categories
   const categories = ["Hostel", "IT", "Mess", "Academics", "Sports","Medical","Others"];

   const [complaints, setComplaints] = useState("");

   const [complaintText, setComplaintText] = useState("");
   const [selectedCategory, setSelectedCategory] = useState("");
   const [error, setError] = useState("");

   // Status badge mapper
   const statusBadge = {
      "pending": { color: "bg-[#ffd6cc] text-[#ff0000]", icon: <Clock size={14} className="inline mr-1" /> },
      "inprogress": { color: "bg-[#ffffcc] text-[#996600]", icon: <AlertCircle size={14} className="inline mr-1" /> },
      "resolved": { color: "bg-[#b3ffb3] text-[#009900]", icon: <Check size={14} className="inline mr-1" /> },
      "delete": { color: "bg-[#ff6666]", icon: <Trash2 size={14} className="inline mr-1" /> }
   };

   const fetchComplaints = async () => {
      try {
         const res = await apiRequest.get("/complaint/get");
         setComplaints(res.data);
      } catch (error) {
         console.log("Failed to fetch complaints", error);
      }
   }

   useEffect(() => {
      fetchComplaints();
   }, [])

   const handleSubmit = async () => {
      if (!complaintText.trim()) {
         setError("Please enter your complaint");
         return;
      }
      if (!selectedCategory) {
         setError("Please select a category");
         return;
      }
      // Clear any previous errors
      setError("");

      // Add new complaint
      const newComplaint = {
         description: complaintText,
         category: selectedCategory.toLowerCase(),
      };
      try {
         const res = await apiRequest.post("/complaint/create", newComplaint);

         fetchComplaints();
         setComplaintText("");
         setSelectedCategory("");
      } catch (error) {
         console.error("Error submittig complaint:", error);
         setError("Failed to submit complaint. Try again later");
      }
   };


  // Handle complaint delete 
   const hadelDeleteClick = async(complaintId)=>{
       try {
         const res = await apiRequest.delete(`/complaint/delete/${complaintId}`,{
           withCredentials:true
         });
          
         fetchComplaints();
         
       } catch (error) {
         console.log("Error deleting complaint",error);
       }
     }
   

   return (
      <>
         <NavBar />
         <div className="max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold text-center mb-6 text-blue-800">Register Your Complaint Here</h1>

            {/* Complaint Input Section */}
            <div className="mb-8 bg-gray-50 p-6 rounded-lg">
               <div className="relative">
                  <textarea
                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-24"
                     placeholder="Describe your complaint here..."
                     value={complaintText}
                     onChange={(e) => setComplaintText(e.target.value)}
                  />

                  <button
                     onClick={handleSubmit}
                     className="absolute right-3 bottom-3 bg-blue-600 text-white p-2 rounded-full hover:bg-green transition-colors"
                  >
                     <Send size={18} />
                  </button>
               </div>

               {/* Category Selection */}
               <div className="mt-3">
                  <p className="text-sm text-gray-600 mb-2">Select category:</p>
                  <div className="flex flex-wrap gap-2">
                     {categories.map((category) => (
                        <button
                           key={category}
                           onClick={() => setSelectedCategory(category)}
                           className={`px-3 py-1.5 text-sm rounded-full transition-colors ${selectedCategory === category
                              ? "bg-green text-black"
                              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                              }`}
                        >
                           {category}
                        </button>
                     ))}
                  </div>
               </div>

               {/* Error message */}
               {error && (
                  <div className="mt-3 text-red text-sm flex items-center">
                     <AlertCircle size={16} className="mr-1" />
                     {error}
                  </div>
               )}
            </div>

            {/* Complaints List */}
            <UserComplaintList complaints={complaints} statusBadge={statusBadge} hadelDeleteClick={hadelDeleteClick} />
         </div>
      </>
   );
}

export default UserContainer;