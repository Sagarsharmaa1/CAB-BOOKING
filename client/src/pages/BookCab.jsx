import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaCalendarDays, FaCarRear, FaClock, FaLocationDot, FaMoneyBillWave, FaUserTie } from 'react-icons/fa6';
import { createBooking, fetchCarById } from '../services/api';
import AppShell, { BackButton } from '../components/ui/AppShell';
import { getMediaUrl } from '../utils/media';
import '../styles/theme.css';

function BookCab() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pickupLocation, setPickupLocation] = useState('');
  const [pickupState, setPickupState] = useState('');
  const [pickupCity, setPickupCity] = useState('');
  const [dropLocation, setDropLocation] = useState('');
  const [dropState, setDropState] = useState('');
  const [dropCity, setDropCity] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [dropDate, setDropDate] = useState('');
  const [dropTime, setDropTime] = useState('');
  const [distance, setDistance] = useState('');
  const [fare, setFare] = useState(null);
  const [car, setCar] = useState(null);

  useEffect(() => {
    loadCar();
  }, []);

  const loadCar = async () => {
    try {
      const res = await fetchCarById(id);
      setCar(res.data);
    } catch (error) {
      alert('Failed to load car details');
    }
  };

  const calculateFare = () => {
    if (!distance || !car) {
      alert('Enter distance first');
      return;
    }
    setFare(distance * car.price);
  };

  const handleBooking = async () => {
    if (!pickupLocation || !dropLocation || !pickupDate || !pickupTime) {
      alert('Please fill all fields');
      return;
    }

    const bookingData = {
      selectedPickupState: pickupState,
      selectedPickupCity: pickupCity,
      selectedDropState: dropState,
      selectedDropCity: dropCity,
      pickupdate: pickupDate,
      pickuptime: pickupTime,
      dropdate: dropDate,
      droptime: dropTime,
      bookeddate: new Date().toLocaleDateString(),
      drivername: car.drivername,
      fare: String(fare),
      carname: car.carname,
      cartype: car.cartype,
      carno: car.carno,
      price: car.price,
    };

    try {
      await createBooking(bookingData);
      navigate('/mybookings');
    } catch (error) {
      alert('Booking failed');
    }
  };

  if (!car) {
    return (
      <AppShell
        title="Loading cab details"
        subtitle="Loading selected cab information before the booking form opens."
        badge="Booking"
      >
        <div className="empty-state">
          <h3>Please wait</h3>
          <p>The selected cab details are being loaded.</p>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell
      title="Confirm your ride"
      subtitle="Review your cab, enter trip details, and confirm the booking."
      badge="Booking"
      stats={[
        { label: 'Cab', value: car.carname, hint: car.cartype },
        { label: 'Driver', value: car.drivername, hint: car.carno },
        { label: 'Rate', value: `Rs ${car.price}/km`, hint: 'Used for fare calculation' },
      ]}
      actions={
        <div style={{ display: 'flex', gap: '12px' }}>
          <button type="button" className="btn btn-primary" onClick={calculateFare}>
            <FaMoneyBillWave />
            <span>Calculate fare</span>
          </button>
          <BackButton onClick={() => navigate(-1)} />
        </div>
      }
    >
      <div className="booking-layout" style={{ display: 'grid', gridTemplateColumns: '350px 1fr', gap: '24px' }}>
        <article className="glass-card" style={{ height: 'fit-content' }}>
          <div className="catalog-card__media" style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: '24px' }}>
            {car.carImage ? (
              <img src={getMediaUrl(car.carImage)} alt={car.carname} className="catalog-card__image" />
            ) : (
              <div className="catalog-card__placeholder">
                <FaCarRear />
                <span>{car.carname}</span>
              </div>
            )}
          </div>

          <div style={{ marginBottom: '24px' }}>
            <span className="badge badge-gold" style={{ marginBottom: '8px' }}>Selected Cab</span>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>{car.carname}</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Review the cab and driver details before you submit the trip request.</p>
          </div>

          <div className="detail-stack">
            <p><FaUserTie /> <span>{car.drivername}</span></p>
            <p><FaCarRear /> <span>{car.cartype}</span></p>
            <p><FaMoneyBillWave /> <span>Rs {car.price} per km</span></p>
          </div>

          <div className="fare-box" style={{ 
            marginTop: '24px', 
            padding: '24px', 
            background: 'var(--bg-soft)', 
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--accent-gold-glow)',
            textAlign: 'center'
          }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Estimated fare</span>
            <strong style={{ display: 'block', fontSize: '2rem', marginTop: '8px', color: 'var(--accent-gold)' }}>
              {fare ? `Rs ${fare}` : 'Add distance to calculate'}
            </strong>
          </div>
        </article>

        <article className="glass-card">
          <div style={{ marginBottom: '32px' }}>
            <span className="badge badge-blue" style={{ marginBottom: '8px' }}>Trip Planner</span>
            <h2 style={{ fontSize: '2rem', marginBottom: '8px' }}>Book Cab</h2>
            <p style={{ color: 'var(--text-secondary)' }}>Enter pickup, drop, schedule, and distance details to complete the booking.</p>
          </div>

          <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
            <div className="form-group">
              <label className="form-label"><FaLocationDot /> Pickup location</label>
              <input type="text" className="form-input" placeholder="Pickup Location" onChange={(e) => setPickupLocation(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label"><FaLocationDot /> Drop location</label>
              <input type="text" className="form-input" placeholder="Drop Location" onChange={(e) => setDropLocation(e.target.value)} />
            </div>

            <div className="form-group">
              <label className="form-label">Pickup state</label>
              <select className="form-input" defaultValue="" onChange={(e) => setPickupState(e.target.value)}>
                <option value="" disabled>Select State</option>
                <option>Uttar Pradesh</option>
                <option>Delhi</option>
                <option>Haryana</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Pickup city</label>
              <select className="form-input" defaultValue="" onChange={(e) => setPickupCity(e.target.value)}>
                <option value="" disabled>Select City</option>
                <option>Meerut</option>
                <option>Noida</option>
                <option>Delhi</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Drop state</label>
              <select className="form-input" defaultValue="" onChange={(e) => setDropState(e.target.value)}>
                <option value="" disabled>Select State</option>
                <option>Uttar Pradesh</option>
                <option>Delhi</option>
                <option>Haryana</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Drop city</label>
              <select className="form-input" defaultValue="" onChange={(e) => setDropCity(e.target.value)}>
                <option value="" disabled>Select City</option>
                <option>Meerut</option>
                <option>Noida</option>
                <option>Delhi</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label"><FaCalendarDays /> Pickup date</label>
              <input type="date" className="form-input" onChange={(e) => setPickupDate(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label"><FaClock /> Pickup time</label>
              <input type="time" className="form-input" onChange={(e) => setPickupTime(e.target.value)} />
            </div>

            <div className="form-group">
              <label className="form-label"><FaCalendarDays /> Drop date</label>
              <input type="date" className="form-input" onChange={(e) => setDropDate(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label"><FaClock /> Drop time</label>
              <input type="time" className="form-input" onChange={(e) => setDropTime(e.target.value)} />
            </div>

            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label className="form-label"><FaMoneyBillWave /> Distance (km)</label>
              <input type="number" className="form-input" placeholder="Distance in kilometers" onChange={(e) => setDistance(e.target.value)} />
            </div>
          </div>

          <div className="form-actions" style={{ marginTop: '32px' }}>
            <button type="button" className="btn btn-primary" onClick={handleBooking} style={{ flex: 1 }}>
              <span>Confirm & Book ride</span>
            </button>
            <BackButton onClick={() => navigate(-1)} />
          </div>
        </article>
      </div>
    </main>
  );
}

export default BookCab;
