import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FaImage, FaPlus } from 'react-icons/fa6';
import { createCar } from '../services/api';
import AppShell, { BackButton } from '../components/ui/AppShell';
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
    if (carImage) {
      formData.append('carImage', carImage);
    }

    try {
      await createCar(formData);
      alert('Cab Added Successfully');
      navigate('/admin/cabs');
    } catch (error) {
      alert('Failed to add cab');
    }
  };

  return (
    <AppShell
      title="Add a new cab"
      subtitle="Create a new fleet entry with driver, vehicle, fare, and image details."
      badge="Fleet Admin"
      compact
      actions={
        <>
          <button type="button" className="btn" onClick={handleAddCab}>
            <FaPlus />
            <span>Add cab</span>
          </button>
          <BackButton onClick={() => navigate(-1)} />
        </>
      }
    >
      <div className="form-shell">
        <div className="section-header">
          <span className="eyebrow">Fleet Intake</span>
          <h2>Add Cab</h2>
          <p>Enter the basic cab details below to add the vehicle to the available fleet.</p>
        </div>

        <div className="form-grid form-grid--two">
          <label className="field-card">
            <span>Driver name</span>
            <input placeholder="Driver Name" onChange={(e) => setDrivername(e.target.value)} />
          </label>
          <label className="field-card">
            <span>Cab model</span>
            <input placeholder="Cab Model" onChange={(e) => setCarname(e.target.value)} />
          </label>
          <label className="field-card">
            <span>Cab type</span>
            <input placeholder="Cab Type" onChange={(e) => setCartype(e.target.value)} />
          </label>
          <label className="field-card">
            <span>Price per km</span>
            <input placeholder="Price per km" onChange={(e) => setPrice(e.target.value)} />
          </label>
          <label className="field-card">
            <span>Car number</span>
            <input placeholder="Car Number" onChange={(e) => setCarno(e.target.value)} />
          </label>
          <label className="field-card">
            <span><FaImage /> Upload image</span>
            <input type="file" accept="image/*" onChange={(e) => setCarImage(e.target.files[0])} />
          </label>
        </div>

        <div className="form-actions">
          <button type="button" className="btn" onClick={handleAddCab}>
            <span>Add cab</span>
          </button>
          <BackButton onClick={() => navigate(-1)} />
        </div>
      </div>
    </AppShell>
  );
}

export default AdminAddCab;
