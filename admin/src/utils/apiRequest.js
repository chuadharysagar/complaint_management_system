import axios from 'axios'

const apiRequest = axios.create({
   baseURL:import.meta.env.VITE_API_ENDPOINT,
   withCredentials:true,
})


apiRequest.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      // Redirect to login page
      window.location.href = "/auth";
    }
    return Promise.reject(error);
  }
);


export default apiRequest;