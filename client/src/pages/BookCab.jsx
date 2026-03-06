import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { createBooking, fetchCarById } from '../services/api';
import '../styles/theme.css';

function BookCab() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

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
    const amount = distance * car.price;
    setFare(amount);
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
      fare: fare.toString(),
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

  if (!car) return <p>Loading...</p>;

  return (
    <div className="page-container">
      <div className="card">
        <h2>Book Cab</h2>
        <input type="text" placeholder="Pickup Location" onChange={(e) => setPickupLocation(e.target.value)} />
        <select onChange={(e) => setPickupState(e.target.value)}>
          <option>Select State</option>
          <option>Uttar Pradesh</option>
          <option>Delhi</option>
          <option>Haryana</option>
        </select>
        <select onChange={(e) => setPickupCity(e.target.value)}>
          <option>Select City</option>
          <option>Meerut</option>
          <option>Noida</option>
          <option>Delhi</option>
        </select>
        <input type="text" placeholder="Drop Location" onChange={(e) => setDropLocation(e.target.value)} />
        <select onChange={(e) => setDropState(e.target.value)}>
          <option>Select State</option>
          <option>Uttar Pradesh</option>
          <option>Delhi</option>
          <option>Haryana</option>
        </select>
        <select onChange={(e) => setDropCity(e.target.value)}>
          <option>Select City</option>
          <option>Meerut</option>
          <option>Noida</option>
          <option>Delhi</option>
        </select>
        <input type="date" onChange={(e) => setPickupDate(e.target.value)} />
        <input type="time" onChange={(e) => setPickupTime(e.target.value)} />
        <input type="date" onChange={(e) => setDropDate(e.target.value)} />
        <input type="time" onChange={(e) => setDropTime(e.target.value)} />
        <input type="number" placeholder="Distance (km)" onChange={(e) => setDistance(e.target.value)} />
        <button className="btn" onClick={calculateFare}>Calculate Fare</button>
        {fare && <p>Total Fare: ₹{fare}</p>}
        <button className="btn" onClick={handleBooking}>Book Ride</button>
        <button className="btn" onClick={() => navigate(-1)}>⬅ Back</button>
      </div>
    </div>
  );
}

export default BookCab;