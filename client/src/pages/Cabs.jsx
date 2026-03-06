import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchCars } from '../services/api';
import '../styles/theme.css';

function Cabs() {
  const navigate = useNavigate();
  const [cabs, setCabs] = useState([]);

  useEffect(() => {
    loadCabs();
  }, []);

  const loadCabs = async () => {
    try {
      const res = await fetchCars();
      setCabs(res.data);
    } catch (error) {
      console.error('Failed to fetch cabs', error);
    }
  };

  return (
    <div className="page-container">
      <h2 className="page-title">Available Cabs</h2>
      <div className="list-container">
        {cabs.map((cab) => (
          <div className="list-card" key={cab._id}>
            {cab.carImage && <img src={`http://localhost:8000${cab.carImage}`} alt={cab.carname} style={{ width: '100%', height: 'auto' }} />}
            <h3>{cab.carname}</h3>
            <p><b>Type:</b> {cab.cartype}</p>
            <p><b>Car Number:</b> {cab.carno}</p>
            <p><b>Driver:</b> {cab.drivername}</p>
            <p><b>Fare:</b> ₹{cab.price} / km</p>
            <div className="card-buttons">
              <button className="book-btn" onClick={() => navigate(`/bookcab/${cab._id}`)}>Book Cab</button>
              <button className="back-btn" onClick={() => navigate(-1)}>⬅ Back</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cabs;