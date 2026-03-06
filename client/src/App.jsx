import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Uhome from "./pages/Uhome";
import Cabs from "./pages/Cabs";
import Mybookings from "./pages/Mybooking";
import BookCab from "./pages/BookCab";

import AdminDashboard from "./pages/AdminDashboard";

import AdminAddCab from "./pages/AdminAddCab";
import AdminCabView from "./pages/AdminCabView";
import AdminEditCab from "./pages/AdminEditCab";
import AdminBookings from "./pages/AdminBookings";
import AdminUsers from "./pages/AdminUsers";
import UserDetails from "./components/Admin/UserDetails";
import EditUser from "./components/Admin/EditUser";
function App() {
  return (
    <Routes>

      {/* Public Pages */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* User Pages */}
      <Route path="/uhome" element={<ProtectedRoute allowedRole="user"><Uhome /></ProtectedRoute>} />
     <Route path="/cabs" element={<ProtectedRoute allowedRole="user"><Cabs /></ProtectedRoute>} />
     <Route path="/mybookings" element={<ProtectedRoute allowedRole="user"><Mybookings /></ProtectedRoute>} />
      <Route path="/bookcab/:id" element={<ProtectedRoute allowedRole="user"><BookCab /></ProtectedRoute>} />

      {/* Admin Pages */}
      <Route path="/admin" element={<ProtectedRoute allowedRole="admin"><AdminDashboard /></ProtectedRoute>} />
<Route path="/admin/users" element={<ProtectedRoute allowedRole="admin"><AdminUsers /></ProtectedRoute>} />
<Route path="/admin/addcab" element={<ProtectedRoute allowedRole="admin"><AdminAddCab /></ProtectedRoute>} />
<Route path="/admin/cabs" element={<ProtectedRoute allowedRole="admin"><AdminCabView /></ProtectedRoute>} />
<Route path="/admin/editcab/:id" element={<ProtectedRoute allowedRole="admin"><AdminEditCab /></ProtectedRoute>} />
<Route path="/admin/bookings" element={<ProtectedRoute allowedRole="admin"><AdminBookings /></ProtectedRoute>} />
<Route path="/admin/user/:id" element={<ProtectedRoute allowedRole="admin"><UserDetails /></ProtectedRoute>} />
<Route path="/admin/edituser/:id" element={<ProtectedRoute allowedRole="admin"><EditUser /></ProtectedRoute>} />

    </Routes>
  );
}

export default App;