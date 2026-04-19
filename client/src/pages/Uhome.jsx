import { useNavigate } from 'react-router-dom';
import { FaCarSide, FaPowerOff, FaReceipt } from 'react-icons/fa6';
import { useAuth } from '../context/AuthContext';
import AppShell from '../components/ui/AppShell';
import '../styles/theme.css';

function Uhome() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const dashboardCards = [
    {
      title: 'Browse fleet',
      description: 'View available cabs, compare fare rates, and choose the right option for your trip.',
      icon: <FaCarSide />,
      action: () => navigate('/cabs'),
      cta: 'View cabs',
    },
    {
      title: 'Booking history',
      description: 'Review upcoming trips, booking details, and cancellation status from one place.',
      icon: <FaReceipt />,
      action: () => navigate('/mybookings'),
      cta: 'My bookings',
    },
    {
      title: 'Logout',
      description: 'Sign out of your account and return to the public booking site.',
      icon: <FaPowerOff />,
      action: logout,
      cta: 'Logout',
    },
  ];

  return (
    <AppShell
      title={`Welcome${user?.name ? `, ${user.name}` : ''}`}
      subtitle="Start a new booking, review your trips, or manage your account from the rider dashboard."
      badge="User Dashboard"
      stats={[
        { label: 'Actions', value: '3', hint: 'Key rider tasks' },
        { label: 'Access', value: '24/7', hint: 'Book anytime' },
        { label: 'Account', value: 'Active', hint: 'Ready to use' },
      ]}
    >
      <div className="feature-grid">
        {dashboardCards.map((card) => (
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

export default Uhome;
