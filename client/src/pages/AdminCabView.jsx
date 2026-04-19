import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCarRear, FaPenToSquare, FaUserTie } from 'react-icons/fa6';
import { fetchCars } from '../services/api';
import AppShell, { BackButton } from '../components/ui/AppShell';
import { getMediaUrl } from '../utils/media';
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
    <AppShell
      title="Fleet manager"
      subtitle="View all cab listings, check key details, and open any record to edit."
      badge="Fleet Admin"
      stats={[
        { label: 'Total cabs', value: cabs.length, hint: 'Current fleet count' },
        { label: 'Edit access', value: 'Enabled', hint: 'Open a cab to update' },
        { label: 'Images', value: 'Supported', hint: 'Media loads from API base URL' },
      ]}
      actions={<BackButton to="/admin" label="Dashboard" />}
    >
      {cabs.length === 0 ? (
        <div className="empty-state">
          <h3>No cabs added</h3>
          <p>Your fleet inventory will appear here after the first cab is added.</p>
        </div>
      ) : (
        <div className="catalog-grid">
          {cabs.map((cab) => (
            <article className="catalog-card" key={cab._id}>
              <div className="catalog-card__media">
                {cab.carImage ? (
                  <img src={getMediaUrl(cab.carImage)} alt={cab.carname} className="catalog-card__image" />
                ) : (
                  <div className="catalog-card__placeholder">
                    <FaCarRear />
                    <span>{cab.carname}</span>
                  </div>
                )}
              </div>

              <div className="catalog-card__body">
                <div className="catalog-card__header">
                  <h3>{cab.carname}</h3>
                  <span className="price-pill">Rs {cab.price}/km</span>
                </div>

                <div className="detail-stack">
                  <p><FaUserTie /> <span>{cab.drivername}</span></p>
                  <p><FaCarRear /> <span>{cab.cartype}</span></p>
                  <p><strong>Car No:</strong> <span>{cab.carno}</span></p>
                </div>

                <div className="form-actions">
                  <button type="button" className="btn" onClick={() => navigate(`/admin/editcab/${cab._id}`)}>
                    <FaPenToSquare />
                    <span>Edit cab</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </AppShell>
  );
}

export default AdminCabView;
