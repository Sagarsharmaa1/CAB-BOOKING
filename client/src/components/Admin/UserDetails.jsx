import { useLocation, useParams, useNavigate } from 'react-router-dom';
import AppShell, { BackButton } from '../ui/AppShell';
import '../../styles/theme.css';

function UserDetails() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state;

  if (!user) {
    return (
      <AppShell title="User not found" subtitle="No user data was provided for this page." badge="Admin Users" compact>
        <div className="empty-state">
          <h3>User not found</h3>
          <p>Return to the user list and open the selected account again.</p>
          <div className="form-actions">
            <BackButton onClick={() => navigate(-1)} />
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell
      title="User details"
      subtitle="View account information for the selected user."
      badge="Admin Users"
      compact
      actions={<BackButton onClick={() => navigate(-1)} />}
    >
      <article className="detail-panel">
        <div className="section-header">
          <span className="eyebrow">Profile Snapshot</span>
          <h2>{user.name}</h2>
          <p>Review the account details passed from the users listing screen.</p>
        </div>

        <div className="detail-stack">
          <p><strong>User ID:</strong> <span>{id}</span></p>
          <p><strong>Name:</strong> <span>{user.name}</span></p>
          <p><strong>Email:</strong> <span>{user.email}</span></p>
        </div>
      </article>
    </AppShell>
  );
}

export default UserDetails;
