import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCarRear, FaMoneyBillWave, FaRoute, FaUser } from 'react-icons/fa6';
import { fetchAllBookings } from '../services/api';
import AppShell, { BackButton } from '../components/ui/AppShell';
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
    <AppShell
      title="Booking operations"
      subtitle="Review booking records, rider details, and trip amounts from the admin side."
      badge="Admin Trips"
      stats={[
        { label: 'Bookings', value: bookings.length, hint: 'Loaded from rides API' },
        { label: 'Fare view', value: 'Enabled', hint: 'Amounts shown per record' },
        { label: 'Riders', value: 'Visible', hint: 'User names included' },
      ]}
      actions={<BackButton onClick={() => navigate(-1)} />}
    >
      {bookings.length === 0 ? (
        <div className="empty-state">
          <h3>No bookings found</h3>
          <p>Trips will populate here once riders begin confirming bookings.</p>
        </div>
      ) : (
        <div className="booking-feed">
          {bookings.map((b) => (
            <article className="timeline-card" key={b._id}>
              <div className="timeline-card__top">
                <div>
                  <span className="eyebrow">Booking Record</span>
                  <h3>{b.selectedPickupCity} to {b.selectedDropCity}</h3>
                </div>
                <span className="status-pill">Active</span>
              </div>

              <div className="detail-grid">
                <p><FaRoute /> <span>{b.selectedPickupCity} to {b.selectedDropCity}</span></p>
                <p><FaCarRear /> <span>{b.carname}</span></p>
                <p><FaMoneyBillWave /> <span>Rs {b.fare}</span></p>
                <p><FaUser /> <span>{b.userName}</span></p>
              </div>

              <div className="detail-stack detail-stack--tight">
                <p><strong>Driver:</strong> <span>{b.drivername}</span></p>
                <p><strong>Pickup:</strong> <span>{b.pickupdate} {b.pickuptime}</span></p>
                <p><strong>Drop:</strong> <span>{b.dropdate} {b.droptime}</span></p>
              </div>
            </article>
          ))}
        </div>
      )}
    </AppShell>
  );
}

export default AdminBookings;
