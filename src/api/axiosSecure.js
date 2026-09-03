import axios from 'axios';

// Use this instance for every call that needs the JWT cookie
// (private facility/booking routes). Public GET calls can use
// plain axios or this instance — doesn't matter.
const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export default axiosSecure;
