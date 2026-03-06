import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Attach token to every request if available
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Auth
export const loginUser = (data) => API.post('/login', data);
export const registerUser = (data) => API.post('/register', data);
export const loginAdmin = (data) => API.post('/alogin', data);
export const registerAdmin = (data) => API.post('/aregister', data);

// Users (admin)
export const fetchUsers = () => API.get('/getusers');
export const fetchUserById = (id) => API.get(`/getuser/${id}`);
export const updateUser = (id, data) => API.put(`/useredit/${id}`, data);
export const deleteUser = (id) => API.delete(`/userdelete/${id}`);

// Cars
export const fetchCars = () => API.get('/cars');
export const fetchCarById = (id) => API.get(`/car/${id}`);
export const createCar = (formData) => API.post('/cars', formData); // multipart
export const updateCar = (id, formData) => API.put(`/acaredit/${id}`, formData);
export const deleteCar = (id) => API.delete(`/cardelete/${id}`);

// Bookings
export const createBooking = (data) => API.post('/rides', data);
export const fetchAllBookings = () => API.get('/getrides');
export const fetchUserBookings = (userId) => API.get(`/getrides/${userId}`);
export const deleteBooking = (id) => API.delete(`/usercardelete/${id}`);