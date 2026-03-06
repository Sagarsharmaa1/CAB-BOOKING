import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchCarById, updateCar } from '../services/api';
import '../styles/theme.css';

function AdminEditCab() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [drivername, setDrivername] = useState('');
  const [carname, setCarname] = useState('');
  const [cartype, setCartype] = useState('');
  const [price, setPrice] = useState('');
  const [carno, setCarno] = useState('');
  const [carImage, setCarImage] = useState(null);

  useEffect(() => {
    loadCab();
  }, []);

  const loadCab = async () => {
    try {
      const res = await fetchCarById(id);
      const cab = res.data;
      setDrivername(cab.drivername);
      setCarname(cab.carname);
      setCartype(cab.cartype);
      setPrice(cab.price);
      setCarno(cab.carno);
    } catch (error) {
      alert('Failed to load cab');
    }
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append('drivername', drivername);
    formData.append('carname', carname);
    formData.append('cartype', cartype);
    formData.append('price', price);
    formData.append('carno', carno);
    if (carImage) formData.append('image', carImage);

    try {
      await updateCar(id, formData);
      alert('Cab Updated');
      navigate('/admin/cabs');
    } catch (error) {
      alert('Update failed');
    }
  };

  return (
    <div className="page-container">
      <div className="card">
        <h2>Edit Cab</h2>
        <input placeholder="Driver Name" value={drivername} onChange={(e) => setDrivername(e.target.value)} />
        <input placeholder="Cab Model" value={carname} onChange={(e) => setCarname(e.target.value)} />
        <input placeholder="Cab Type" value={cartype} onChange={(e) => setCartype(e.target.value)} />
        <input placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
        <input placeholder="Car Number" value={carno} onChange={(e) => setCarno(e.target.value)} />
        <input type="file" accept="image/*" onChange={(e) => setCarImage(e.target.files[0])} />
        <button className="btn" onClick={handleUpdate}>Update Cab</button>
        <button className="btn" onClick={() => navigate(-1)}>Back</button>
      </div>
    </div>
  );
}

export default AdminEditCab;