import React, { useState } from 'react'
import { useNavigate } from "react-router";
import apiRequest from '../utils/apiRequest';
import useAuthStore from '../utils/useAuthStore';

const Authpage = () => {
  const {setCurrentUser ,removeCurrentUser} = useAuthStore();
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    try {
      const response = await apiRequest.post(`/user/auth/${isRegister?"register":"login"}`,data);
      setCurrentUser(response.data);
      navigate("/");
    } catch (error) {
      setError(error?.response?.data?.message || error.message || "Something went wrong");
    }
  };

  return (
    <div className='w-screen h-screen flex items-center justify-center'>
      <div className="flex flex-col items-center justify-center gap-8 p-8 rounded-[32px] shadow-md w-full max-w-md bg-purpleLight">
         <span>Hostel Care</span>
        <h1 className="font-normal text-xl">
          {isRegister ? "Create an Account" : "Login to your account"}
        </h1>

        {isRegister ? (
          <form key="registerForm" onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="displayName" className="text-sm">Name</label>
              <input type="text" required name="displayName" id="displayName"
                placeholder="Name"
                className="p-4 border-2 border-gray-300 rounded-[16px]" />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm">Email</label>
              <input type="email" required name="email" id="email"
                placeholder="Email"
                className="p-4 border-2 border-gray-300 rounded-[16px]" />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-sm">Password</label>
              <input type="password" required name="password" id="password"
                placeholder="Password"
                className="p-4 border-2 border-gray-300 rounded-[16px]" />
            </div>

            <button type="submit"
              className="bg-purple text-white font-bold p-4 rounded-full cursor-pointer">
              Register
            </button>

            <p onClick={() => setIsRegister(false)}
              className="text-sm text-center cursor-pointer">
              Do you have an Account? <b>Login</b>
            </p>

            {error && <p className="text-[#e50829] text-sm">{error}</p>}
          </form>
        ) : (
          <form key="loginForm" onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm">Email</label>
              <input type="email" required name="email" id="email"
                placeholder="Email"
                className="p-4 border-2 border-gray-300 rounded-[16px]" />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-sm">Password</label>
              <input type="password" required name="password" id="password"
                placeholder="Password"
                className="p-4 border-2 border-gray-300 rounded-[16px]" />
            </div>

            <button type="submit"
              className="bg-purple text-white font-bold p-4 rounded-full cursor-pointer">
              Login
            </button>

            <p onClick={() => setIsRegister(true)}
              className="text-sm text-center cursor-pointer">
              Don't have an Account? <b>Register</b>
            </p>

            {error && <p className="text-[#e50829] text-sm">{error}</p>}
          </form>
        )}
      </div>
    </div>
  );
};

export default Authpage;
