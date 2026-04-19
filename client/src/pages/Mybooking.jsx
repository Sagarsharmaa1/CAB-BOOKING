import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCalendarDays, FaCarRear, FaLocationArrow, FaMoneyBillWave } from 'react-icons/fa6';
import { useAuth } from '../context/AuthContext';
import { fetchUserBookings, deleteBooking } from '../services/api';
import AppShell, { BackButton } from '../components/ui/AppShell';
import '../styles/theme.css';

function MyBookings() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (user) {
      loadBookings();
    }
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
    <AppShell
      title="My bookings"
      subtitle="View confirmed rides, trip details, and cancellation actions from your booking history."
      badge="Trips"
      stats={[
        { label: 'Bookings', value: bookings.length, hint: 'Loaded for this account' },
        { label: 'Status', value: 'Live', hint: 'Updated from backend' },
        { label: 'Actions', value: 'Cancel', hint: 'Cancel when needed' },
      ]}
      actions={<BackButton onClick={() => navigate(-1)} />}
    >
      {bookings.length === 0 ? (
        <div className="empty-state">
          <h3>No bookings yet</h3>
          <p>Your trip history will appear here as soon as you confirm your first cab.</p>
        </div>
      ) : (
        <div className="booking-feed">
          {bookings.map((b) => (
            <article className="timeline-card" key={b._id}>
              <div className="timeline-card__top">
                <div>
                  <span className="eyebrow">Confirmed Booking</span>
                  <h3>{b.selectedPickupCity} to {b.selectedDropCity}</h3>
                </div>
                <span className="status-pill">{b.status || 'Confirmed'}</span>
              </div>

              <div className="detail-grid">
                <p><FaCalendarDays /> <span>{b.bookeddate}</span></p>
                <p><FaLocationArrow /> <span>{b.pickupdate} {b.pickuptime}</span></p>
                <p><FaCarRear /> <span>{b.carname} ({b.cartype})</span></p>
                <p><FaMoneyBillWave /> <span>Rs {b.fare}</span></p>
              </div>

              <div className="detail-stack detail-stack--tight">
                <p><strong>Driver:</strong> <span>{b.drivername}</span></p>
                <p><strong>Car Number:</strong> <span>{b.carno}</span></p>
                <p><strong>Drop Schedule:</strong> <span>{b.dropdate} {b.droptime}</span></p>
              </div>

              <div className="form-actions">
                <button type="button" className="btn btn-danger" onClick={() => cancelBooking(b._id)}>
                  <span>Cancel booking</span>
                </button>
                <BackButton onClick={() => navigate(-1)} />
              </div>
            </article>
          ))}
        </div>
      )}
    </AppShell>
  );
}

export default MyBookings;
