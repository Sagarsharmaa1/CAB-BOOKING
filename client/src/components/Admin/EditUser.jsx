import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FaFloppyDisk } from 'react-icons/fa6';
import { updateUser } from '../../services/api';
import AppShell, { BackButton } from '../ui/AppShell';
import '../../styles/theme.css';

function EditUser() {
  const { id } = useParams();
  const location = useLocation();
  const user = location.state;
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');

  const handleSave = async () => {
    try {
      await updateUser(id, { name, email });
      alert('User updated');
      navigate('/admin/users');
    } catch (error) {
      alert('Update failed');
    }
  };

  if (!user) {
    return (
      <AppShell title="User not found" subtitle="Open the edit page from the user list to load the selected record." badge="Admin Users" compact>
        <div className="empty-state">
          <h3>User not found</h3>
          <p>Return to the user list and open edit again for the selected account.</p>
          <div className="form-actions">
            <BackButton onClick={() => navigate(-1)} />
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell
      title="Edit user"
      subtitle="Update the selected user account and save the changes."
      badge="Admin Users"
      compact
      actions={
        <>
          <button type="button" className="btn" onClick={handleSave}>
            <FaFloppyDisk />
            <span>Save</span>
          </button>
          <BackButton onClick={() => navigate(-1)} />
        </>
      }
    >
      <div className="form-shell">
        <div className="section-header">
          <span className="eyebrow">Profile Update</span>
          <h2>{user.name}</h2>
          <p>User ID: {id}</p>
        </div>

        <div className="form-grid">
          <label className="field-card">
            <span>Name</span>
            <input value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <label className="field-card">
            <span>Email</span>
            <input value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
        </div>

        <div className="form-actions">
          <button type="button" className="btn" onClick={handleSave}>
            <span>Save changes</span>
          </button>
          <BackButton onClick={() => navigate(-1)} />
        </div>
      </div>
    </AppShell>
  );
}

export default EditUser;
