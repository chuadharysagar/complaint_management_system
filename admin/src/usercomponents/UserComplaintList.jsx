import React from 'react'

const UserComplaintList = ({ complaints, statusBadge }) => {
  // Category styling
  const getCategoryStyle = (category) => {
    const styles = {
      Academic: { color: '#009900', bg: '#b3ffb3' },
      Mess: { color: '#996600', bg: '#ffffcc' },
      Hostel: { color: '#9900ff', bg: '#ddccff' },
      IT: { color: '#e68a00', bg: '#ffe0b3' },
      Sports: { color: '#0099cc', bg: '#ccf5ff' },
      Transportation: { color: '#cc0000', bg: '#ffcccc' },
      Medical: { color: '#9900ff', bg: '#ddccff' },
      Other: { color: '#333333', bg: '#e6e6e6' }
    };
    return styles[category] || { color: '#333333', bg: '#eeeeee' };
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">Your Complaints</h2>

      {complaints.length === 0 ? (
        <div className="text-center py-6 text-gray-500">
          No complaints submitted yet.
        </div>
      ) : (
        <div className="space-y-4 overflow-y-auto max-h-96" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {complaints.map((complaint) => {
            const { color: categoryColor, bg: categoryBgColor } = getCategoryStyle(complaint.category);

            return (
              <div key={complaint.id} className="border rounded-lg p-4 bg-white shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <span
                    className="inline-block px-3 py-1 text-xs font-medium rounded-full"
                    style={{
                      backgroundColor: categoryBgColor,
                      color: categoryColor,
                    }}
                  >
                    {complaint.category}
                  </span>

                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${statusBadge[complaint.status].color}`}>
                    {statusBadge[complaint.status].icon}
                    {complaint.status.charAt(0).toUpperCase() + complaint.status.slice(1)}
                  </span>
                </div>

                <p className="text-gray-800 mb-2">{complaint.text}</p>

                 <div className='flex justify-between'>
                 <div className="text-xs .text-gray-500">
                  Submitted on {complaint.date}
                </div>
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium cursor-pointer ${statusBadge["delete"].color}`}>
                    {statusBadge["delete"].icon}
                    Delete
                  </span>
                 </div>
              </div>
            );
          })}
        </div>
      )}
    </div>)
}

export default UserComplaintList