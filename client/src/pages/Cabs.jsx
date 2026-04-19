import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCarRear, FaRoute, FaUserTie } from 'react-icons/fa6';
import { fetchCars } from '../services/api';
import AppShell, { BackButton } from '../components/ui/AppShell';
import { getMediaUrl } from '../utils/media';
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
    <AppShell
      title="Available cabs"
      subtitle="Browse available cabs, review driver and fare details, and continue to booking."
      badge="Fleet"
      stats={[
        { label: 'Available', value: cabs.length, hint: 'Loaded from fleet data' },
        { label: 'Pricing', value: 'Per km', hint: 'Fare shown on each cab' },
        { label: 'Next step', value: 'Book', hint: 'Open any cab to continue' },
      ]}
      actions={<BackButton onClick={() => navigate(-1)} />}
    >
      {cabs.length === 0 ? (
        <div className="empty-state">
          <h3>No cabs available right now</h3>
          <p>No cab records are currently available. Please check again after the fleet is updated.</p>
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
                  <p><FaCarRear /> <span>{cab.cartype}</span></p>
                  <p><FaUserTie /> <span>{cab.drivername}</span></p>
                  <p><FaRoute /> <span>{cab.carno}</span></p>
                </div>

                <div className="form-actions">
                  <button type="button" className="btn" onClick={() => navigate(`/bookcab/${cab._id}`)}>
                    <span>Book cab</span>
                  </button>
                  <BackButton onClick={() => navigate(-1)} />
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </AppShell>
  );
}

export default Cabs;
