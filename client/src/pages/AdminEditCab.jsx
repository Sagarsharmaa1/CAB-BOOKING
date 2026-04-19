import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FaFloppyDisk, FaImage } from 'react-icons/fa6';
import { fetchCarById, updateCar } from '../services/api';
import AppShell, { BackButton } from '../components/ui/AppShell';
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
    if (carImage) {
      formData.append('image', carImage);
    }

    try {
      await updateCar(id, formData);
      alert('Cab Updated');
      navigate('/admin/cabs');
    } catch (error) {
      alert('Update failed');
    }
  };

  return (
    <AppShell
      title="Edit cab profile"
      subtitle="Update cab details and save the changes to the fleet record."
      badge="Fleet Admin"
      compact
      actions={
        <>
          <button type="button" className="btn" onClick={handleUpdate}>
            <FaFloppyDisk />
            <span>Save changes</span>
          </button>
          <BackButton onClick={() => navigate(-1)} />
        </>
      }
    >
      <div className="form-shell">
        <div className="section-header">
          <span className="eyebrow">Fleet Update</span>
          <h2>Edit Cab</h2>
          <p>Review the existing cab information and update the fields that need to change.</p>
        </div>

        <div className="form-grid form-grid--two">
          <label className="field-card">
            <span>Driver name</span>
            <input placeholder="Driver Name" value={drivername} onChange={(e) => setDrivername(e.target.value)} />
          </label>
          <label className="field-card">
            <span>Cab model</span>
            <input placeholder="Cab Model" value={carname} onChange={(e) => setCarname(e.target.value)} />
          </label>
          <label className="field-card">
            <span>Cab type</span>
            <input placeholder="Cab Type" value={cartype} onChange={(e) => setCartype(e.target.value)} />
          </label>
          <label className="field-card">
            <span>Price per km</span>
            <input placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
          </label>
          <label className="field-card">
            <span>Car number</span>
            <input placeholder="Car Number" value={carno} onChange={(e) => setCarno(e.target.value)} />
          </label>
          <label className="field-card">
            <span><FaImage /> Replace image</span>
            <input type="file" accept="image/*" onChange={(e) => setCarImage(e.target.files[0])} />
          </label>
        </div>

        <div className="form-actions">
          <button type="button" className="btn" onClick={handleUpdate}>
            <span>Update cab</span>
          </button>
          <BackButton onClick={() => navigate(-1)} />
        </div>
      </div>
    </AppShell>
  );
}

export default AdminEditCab;
