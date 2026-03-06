import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchCars } from '../services/api';
import '../styles/theme.css';

function AdminCabView() {
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
      <h2>All Cabs</h2>
      {cabs.length === 0 ? (
        <p>No Cabs Added</p>
      ) : (
        cabs.map((cab) => (
          <div className="list-card" key={cab._id}>
            {cab.carImage && <img src={`http://localhost:8000${cab.carImage}`} alt={cab.carname} style={{ width: '100%', height: 'auto' }} />}
            <p>Driver: {cab.drivername}</p>
            <p>Model: {cab.carname}</p>
            <p>Type: {cab.cartype}</p>
            <p>Price: ₹{cab.price}</p>
            <p>Car No: {cab.carno}</p>
            <button onClick={() => navigate(`/admin/editcab/${cab._id}`)}>Edit</button>
          </div>
        ))
      )}
      <button className="btn" onClick={() => navigate('/admin')}>⬅ Back</button>
    </div>
  );
}

export default AdminCabView;