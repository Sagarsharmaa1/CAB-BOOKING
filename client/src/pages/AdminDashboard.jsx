import { useNavigate } from 'react-router-dom';
import { FaCarSide, FaPeopleGroup, FaPowerOff, FaSquarePollVertical, FaTaxi } from 'react-icons/fa6';
import { useAuth } from '../context/AuthContext';
import AppShell, { BackButton } from '../components/ui/AppShell';
import '../styles/theme.css';

function AdminDashboard() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const adminCards = [
    {
      title: 'Users',
      description: 'View registered users, open profile details, and update account information.',
      icon: <FaPeopleGroup />,
      action: () => navigate('/admin/users'),
      cta: 'View users',
    },
    {
      title: 'Add cab',
      description: 'Create a new cab listing with driver, pricing, number, and optional image.',
      icon: <FaTaxi />,
      action: () => navigate('/admin/addcab'),
      cta: 'Add cab',
    },
    {
      title: 'Fleet manager',
      description: 'Review current fleet listings and update cab information when needed.',
      icon: <FaCarSide />,
      action: () => navigate('/admin/cabs'),
      cta: 'View cabs',
    },
    {
      title: 'Bookings',
      description: 'Monitor booking activity, fare amounts, and trip records from the admin side.',
      icon: <FaSquarePollVertical />,
      action: () => navigate('/admin/bookings'),
      cta: 'View bookings',
    },
    {
      title: 'Logout',
      description: 'Exit the admin workspace securely and return to the public landing page.',
      icon: <FaPowerOff />,
      action: logout,
      cta: 'Logout',
    },
  ];

  return (
    <AppShell
      title="Admin control center"
      subtitle="Manage users, cabs, and bookings from the main admin dashboard."
      badge="Admin"
      stats={[
        { label: 'Modules', value: '5', hint: 'Available admin sections' },
        { label: 'Status', value: 'Live', hint: 'Connected to app data' },
        { label: 'Access', value: 'Admin', hint: 'Protected dashboard' },
      ]}
      actions={<BackButton to="/" label="Home" />}
    >
      <div className="feature-grid">
        {adminCards.map((card) => (
          <article className="feature-card" key={card.title}>
            <div className="feature-card__icon">{card.icon}</div>
            <h3>{card.title}</h3>
            <p>{card.description}</p>
            <button type="button" className="btn" onClick={card.action}>
              <span>{card.cta}</span>
            </button>
          </article>
        ))}
      </div>
    </AppShell>
  );
}

export default AdminDashboard;
