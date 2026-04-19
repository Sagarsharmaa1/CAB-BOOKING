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
        compact
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
        <>
          <button type="button" className="btn" onClick={calculateFare}>
            <FaMoneyBillWave />
            <span>Calculate fare</span>
          </button>
          <BackButton onClick={() => navigate(-1)} />
        </>
      }
    >
      <div className="booking-layout">
        <article className="booking-summary">
          <div className="catalog-card__media booking-summary__media">
            {car.carImage ? (
              <img src={getMediaUrl(car.carImage)} alt={car.carname} className="catalog-card__image" />
            ) : (
              <div className="catalog-card__placeholder">
                <FaCarRear />
                <span>{car.carname}</span>
              </div>
            )}
          </div>

          <div className="section-header">
            <span className="eyebrow">Selected Cab</span>
            <h2>{car.carname}</h2>
            <p>Review the cab and driver details before you submit the trip request.</p>
          </div>

          <div className="detail-stack">
            <p><FaUserTie /> <span>{car.drivername}</span></p>
            <p><FaCarRear /> <span>{car.cartype}</span></p>
            <p><FaMoneyBillWave /> <span>Rs {car.price} per km</span></p>
          </div>

          <div className="fare-box">
            <span>Estimated fare</span>
            <strong>{fare ? `Rs ${fare}` : 'Add distance to calculate'}</strong>
          </div>
        </article>

        <article className="form-shell">
          <div className="section-header">
            <span className="eyebrow">Trip Planner</span>
            <h2>Book Cab</h2>
            <p>Enter pickup, drop, schedule, and distance details to complete the booking.</p>
          </div>

          <div className="form-grid form-grid--two">
            <label className="field-card">
              <span><FaLocationDot /> Pickup location</span>
              <input type="text" placeholder="Pickup Location" onChange={(e) => setPickupLocation(e.target.value)} />
            </label>
            <label className="field-card">
              <span><FaLocationDot /> Drop location</span>
              <input type="text" placeholder="Drop Location" onChange={(e) => setDropLocation(e.target.value)} />
            </label>

            <label className="field-card">
              <span>Pickup state</span>
              <select defaultValue="" onChange={(e) => setPickupState(e.target.value)}>
                <option value="" disabled>Select State</option>
                <option>Uttar Pradesh</option>
                <option>Delhi</option>
                <option>Haryana</option>
              </select>
            </label>
            <label className="field-card">
              <span>Pickup city</span>
              <select defaultValue="" onChange={(e) => setPickupCity(e.target.value)}>
                <option value="" disabled>Select City</option>
                <option>Meerut</option>
                <option>Noida</option>
                <option>Delhi</option>
              </select>
            </label>

            <label className="field-card">
              <span>Drop state</span>
              <select defaultValue="" onChange={(e) => setDropState(e.target.value)}>
                <option value="" disabled>Select State</option>
                <option>Uttar Pradesh</option>
                <option>Delhi</option>
                <option>Haryana</option>
              </select>
            </label>
            <label className="field-card">
              <span>Drop city</span>
              <select defaultValue="" onChange={(e) => setDropCity(e.target.value)}>
                <option value="" disabled>Select City</option>
                <option>Meerut</option>
                <option>Noida</option>
                <option>Delhi</option>
              </select>
            </label>

            <label className="field-card">
              <span><FaCalendarDays /> Pickup date</span>
              <input type="date" onChange={(e) => setPickupDate(e.target.value)} />
            </label>
            <label className="field-card">
              <span><FaClock /> Pickup time</span>
              <input type="time" onChange={(e) => setPickupTime(e.target.value)} />
            </label>

            <label className="field-card">
              <span><FaCalendarDays /> Drop date</span>
              <input type="date" onChange={(e) => setDropDate(e.target.value)} />
            </label>
            <label className="field-card">
              <span><FaClock /> Drop time</span>
              <input type="time" onChange={(e) => setDropTime(e.target.value)} />
            </label>

            <label className="field-card field-card--full">
              <span><FaMoneyBillWave /> Distance (km)</span>
              <input type="number" placeholder="Distance in kilometers" onChange={(e) => setDistance(e.target.value)} />
            </label>
          </div>

          <div className="form-actions">
            <button type="button" className="btn" onClick={calculateFare}>
              <span>Calculate fare</span>
            </button>
            <button type="button" className="btn" onClick={handleBooking}>
              <span>Book ride</span>
            </button>
            <BackButton onClick={() => navigate(-1)} />
          </div>
        </article>
      </div>
    </AppShell>
  );
}

export default BookCab;
