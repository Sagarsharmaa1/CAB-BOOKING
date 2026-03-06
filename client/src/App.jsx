import { Routes, Route } from "react-router-dom";

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
      <Route path="/uhome" element={<Uhome />} />
      <Route path="/cabs" element={<Cabs />} />
      <Route path="/mybookings" element={<Mybookings />} />
      <Route path="/bookcab/:id" element={<BookCab />} />

      {/* Admin Pages */}
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/users" element={<AdminUsers />} />
      <Route path="/admin/addcab" element={<AdminAddCab />} />
      <Route path="/admin/cabs" element={<AdminCabView />} />
      <Route path="/admin/editcab/:id" element={<AdminEditCab />} />
      <Route path="/admin/bookings" element={<AdminBookings />} />
      <Route path="/admin/user/:id" element={<UserDetails />} />
      <Route path="/admin/edituser/:id" element={<EditUser />} />

    </Routes>
  );
}

export default App;