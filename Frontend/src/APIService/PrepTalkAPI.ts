// api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Example: GET request
export const registerUser = (user: { fullName: string; email: string; password: string; }) => api.post('/register',user);

export const loginUser = (userAuth: { email: string; password: string; }) => api.post('/login',userAuth);

export const sendPrompt = (prompt: any) => api.get(`/generate?prompt=${prompt}`)
// Example: POST request
// export const createUser = (data) => api.post('/users', data);

// Export instance for custom use
export default api;
