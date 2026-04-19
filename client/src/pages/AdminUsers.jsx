import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import { fetchUsers, deleteUser } from '../services/api';
import AppShell, { BackButton } from '../components/ui/AppShell';
import '../styles/theme.css';

function AdminUsers() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const res = await fetchUsers();
      setUsers(res.data);
    } catch (error) {
      console.error('Failed to fetch users', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await deleteUser(id);
        loadUsers();
      } catch (error) {
        alert('Delete failed');
      }
    }
  };

  return (
    <AppShell
      title="User management"
      subtitle="View registered users and manage account records from the admin panel."
      badge="Admin Users"
      stats={[
        { label: 'Users', value: users.length, hint: 'Loaded from user API' },
        { label: 'Actions', value: '3', hint: 'View, edit, delete' },
        { label: 'Panel', value: 'Admin', hint: 'Protected management access' },
      ]}
      actions={<BackButton to="/admin" label="Dashboard" />}
    >
      {users.length === 0 ? (
        <div className="empty-state">
          <h3>No users found</h3>
          <p>Registered customers will appear here when they sign up.</p>
        </div>
      ) : (
        <div className="profile-grid">
          {users.map((user, index) => (
            <article className="profile-card" key={user._id}>
              <div className="profile-card__head">
                <span className="profile-rank">#{index + 1}</span>
                <div>
                  <h3>{user.name}</h3>
                  <p>{user.email}</p>
                </div>
              </div>

              <div className="detail-stack detail-stack--tight">
                <p><strong>User ID:</strong> <span>{user._id}</span></p>
              </div>

              <div className="operation-buttons">
                <button className="view-btn" onClick={() => navigate(`/admin/user/${user._id}`, { state: user })}>
                  <FaEye />
                  <span>View</span>
                </button>
                <button className="edit-btn" onClick={() => navigate(`/admin/edituser/${user._id}`, { state: user })}>
                  <FaEdit />
                  <span>Edit</span>
                </button>
                <button className="delete-btn" onClick={() => handleDelete(user._id)}>
                  <FaTrash />
                  <span>Delete</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </AppShell>
  );
}

export default AdminUsers;
