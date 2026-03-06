import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { createCar } from '../services/api';
import '../styles/theme.css';

function AdminAddCab() {
  const navigate = useNavigate();
  const [drivername, setDrivername] = useState('');
  const [carname, setCarname] = useState('');
  const [cartype, setCartype] = useState('');
  const [price, setPrice] = useState('');
  const [carno, setCarno] = useState('');
  const [carImage, setCarImage] = useState(null);

  const handleAddCab = async () => {
    if (!drivername || !carname || !cartype || !price || !carno) {
      alert('Please fill all fields');
      return;
    }

    const formData = new FormData();
    formData.append('drivername', drivername);
    formData.append('carname', carname);
    formData.append('cartype', cartype);
    formData.append('price', price);
    formData.append('carno', carno);
    if (carImage) formData.append('carImage', carImage);

    try {
      await createCar(formData);
      alert('Cab Added Successfully');
      navigate('/admin/cabs');
    } catch (error) {
      alert('Failed to add cab');
    }
  };

  return (
    <div className="page-container">
      <div className="card">
        <h2>Add Cab</h2>
        <input placeholder="Driver Name" onChange={(e) => setDrivername(e.target.value)} />
        <input placeholder="Cab Model" onChange={(e) => setCarname(e.target.value)} />
        <input placeholder="Cab Type" onChange={(e) => setCartype(e.target.value)} />
        <input placeholder="Price per km" onChange={(e) => setPrice(e.target.value)} />
        <input placeholder="Car Number" onChange={(e) => setCarno(e.target.value)} />
        <input type="file" accept="image/*" onChange={(e) => setCarImage(e.target.files[0])} />
        <button className="btn" onClick={handleAddCab}>Add Cab</button>
        <button className="btn1" onClick={() => navigate(-1)}>⬅ Back</button>
      </div>
    </div>
  );
}

export default AdminAddCab;