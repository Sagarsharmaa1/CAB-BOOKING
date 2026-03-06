import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { fetchUserBookings, deleteBooking } from '../services/api';
import '../styles/theme.css';

function MyBookings() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (user) loadBookings();
  }, [user]);

  const loadBookings = async () => {
    try {
      const res = await fetchUserBookings(user.id);
      setBookings(res.data);
    } catch (error) {
      console.error('Failed to load bookings', error);
    }
  };

  const cancelBooking = async (id) => {
    if (window.confirm('Cancel booking?')) {
      try {
        await deleteBooking(id);
        loadBookings();
      } catch (error) {
        alert('Cancel failed');
      }
    }
  };

  return (
    <div className="page-container">
      <h2 className="page-title">My Bookings</h2>
      {bookings.length === 0 ? (
        <p className="empty">No bookings yet</p>
      ) : (
        bookings.map((b) => (
          <div className="card booking-card" key={b._id}>
            <p><b>Cab Booked Date:</b> {b.bookeddate}</p>
            <p><b>Trip:</b> {b.selectedPickupCity} → {b.selectedDropCity}</p>
            <p><b>Pickup Time:</b> {b.pickupdate} {b.pickuptime}</p>
            <p><b>Drop Time:</b> {b.dropdate} {b.droptime}</p>
            <p><b>Driver:</b> {b.drivername}</p>
            <hr />
            <p><b>Car:</b> {b.carname}</p>
            <p><b>Car Type:</b> {b.cartype}</p>
            <p><b>Car Number:</b> {b.carno}</p>
            <p><b>Amount Paid:</b> ₹{b.fare}</p>
            <p className="status"><b>Status:</b> {b.status || 'Confirmed'}</p>
            <button className="btn cancel-btn" onClick={() => cancelBooking(b._id)}>Cancel Booking</button>
            <button className="btn" onClick={() => navigate(-1)}>⬅ Back</button>
          </div>
        ))
      )}
    </div>
  );
}

export default MyBookings;