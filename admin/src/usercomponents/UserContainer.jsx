import { useState } from 'react';
import { Send, X, Check, Clock, AlertCircle, Trash2 } from 'lucide-react';
import UserComplaintList from './UserComplaintList';
import NavBar from '../components/NavBar';

const UserContainer = () => {
   // Sample categories
   const categories = ["Hostel", "IT", "Mess", "Academic", "Transportation", "Sports", "Other"];

   // Sample initial complaints for demonstration
   const [complaints, setComplaints] = useState([
      { id: 1, text: "WiFi not working in Block C", category: "IT", status: "resolved", date: "2025-05-01" },
      { id: 2, text: "Hot water not available in Room 204", category: "Hostel", status: "pending", date: "2025-05-02" },
      { id: 3, text: "Need vegetarian options in lunch", category: "Mess", status: "in-progress", date: "2025-05-03" },
      { id: 4, text: "WiFi not working in Block C", category: "IT", status: "resolved", date: "2025-05-01" },
      { id: 5, text: "Hot water not available in Room 204", category: "Hostel", status: "pending", date: "2025-05-02" },
      { id: 6, text: "Need vegetarian options in lunch", category: "Mess", status: "in-progress", date: "2025-05-03" },
   ]);

   const [complaintText, setComplaintText] = useState("");
   const [selectedCategory, setSelectedCategory] = useState("");
   const [error, setError] = useState("");

   // Status badge mapper
   const statusBadge = {
      "pending": { color: "bg-[#ffd6cc] text-[#ff0000]", icon: <Clock size={14} className="inline mr-1" /> },
      "in-progress": { color: "bg-[#ffffcc] text-[#996600]", icon: <AlertCircle size={14} className="inline mr-1" /> },
      "resolved": { color: "bg-[#b3ffb3] text-[#009900]", icon: <Check size={14} className="inline mr-1" /> },
      "delete":{color:"bg-[#ff6666]",icon:<Trash2 size={14} className ="inline mr-1"/>}
   };

   const handleSubmit = () => {
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
         id: complaints.length + 1,
         text: complaintText,
         category: selectedCategory,
         status: "pending",
         date: new Date().toISOString().split('T')[0]
      };

      setComplaints([newComplaint, ...complaints]);

      // Reset form
      setComplaintText("");
      setSelectedCategory("");
   };

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
                     className="absolute right-3 bottom-3 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
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
                  <div className="mt-3 text-red-500 text-sm flex items-center">
                     <AlertCircle size={16} className="mr-1" />
                     {error}
                  </div>
               )}
            </div>

            {/* Complaints List */}
            <UserComplaintList complaints={complaints} statusBadge={statusBadge} />
         </div>
      </>
   );
}

export default UserContainer;