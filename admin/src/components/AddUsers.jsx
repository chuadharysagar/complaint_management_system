import React, { useState } from 'react';
import apiRequest from '../utils/apiRequest';
import { toast } from 'react-toastify';
import { useRef } from 'react';

const AddUsers = () => {
  const [error, setError] = useState("");
  const formRef = useRef();
 
  const handleCreate =async(e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
     try {
      const res = await apiRequest.post("/user/auth/register",data);
      formRef.current.reset();
      toast.success(res.data.message);
     } catch (error) {
      toast.error("Error creatig a user");
      console.log("Error creatig a user",error);
     }
  }

  return (
    <form key="createuser" ref={formRef} onSubmit={handleCreate} className="max-w-md flex flex-col gap-4 p-8">
      <div className="flex flex-col gap-2">
        <label htmlFor="displayName" className="text-sm">Name</label>
        <input
          type="text"
          required name="displayName"
          id="displayName"
          placeholder="Name"
          className="p-4 border-2 border-gray-300 rounded-[16px]" />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-md">Email</label>
        <input
          type="email"
          required
          name="email"
          id="email"
          placeholder="Email"
          className="p-3 border-2 border-gray-300 rounded-[16px]"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="text-md">Password</label>
        <input
          type="password"
          required
          name="password"
          id="password"
          placeholder="Password"
          className="p-3 border-2 border-gray-300 rounded-[16px]"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="role" className="text-md">Role</label>
        <select
          name="role"
          id="role"
          defaultValue=""
          className="p-3 border-2 border-gray-300 rounded-[16px] bg-[#ffffff] text-gray-700"
        >
          <option value="" disabled>Select role</option>
          <option value="user">User</option>
          <option value="hostel_admin">Hostel Admin</option>
          <option value="mess_admin">Mess Admin</option>
          <option value="super_admin">Super Admin</option>
          <option value="medical_admin">Medical Admin</option>
          <option value="sports_admin">Sports Admin</option>
          <option value="academics_admin">Academics Admin</option>
          <option value="IT_admin">IT Admin</option>
        </select>
      </div>

      <button
        type="submit"
        className="bg-black text-[#ffffff] font-bold p-3 rounded-full cursor-pointer"
      >
        Create
      </button>

      {error && <p className="text-[#e50829] text-sm">{error}</p>}
    </form>
  );
};

export default AddUsers;
