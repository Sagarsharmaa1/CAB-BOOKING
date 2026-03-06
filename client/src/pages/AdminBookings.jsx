import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAllBookings } from '../services/api';
import '../styles/theme.css';

function AdminBookings() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const res = await fetchAllBookings();
      setBookings(res.data);
    } catch (error) {
      console.error('Failed to load bookings', error);
    }
  };

  return (
    <div className="page-container">
      <h2>All Bookings</h2>
      <div className="list-container">
        {bookings.map((b) => (
          <div className="list-card" key={b._id}>
            <p><b>Trip:</b> {b.selectedPickupCity} → {b.selectedDropCity}</p>
            <p><b>Driver:</b> {b.drivername}</p>
            <p><b>Car:</b> {b.carname}</p>
            <p><b>Amount:</b> ₹{b.fare}</p>
            <p><b>User:</b> {b.userName}</p>
          </div>
        ))}
        <button className="btn" onClick={() => navigate(-1)}>Back</button>
      </div>
    </div>
  );
}

export default AdminBookings;