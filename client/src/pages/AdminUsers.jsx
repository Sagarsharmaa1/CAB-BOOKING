import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import { fetchUsers, deleteUser } from '../services/api';
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
        loadUsers(); // refresh list
      } catch (error) {
        alert('Delete failed');
      }
    }
  };

  return (
    <div className="page-container">
      <h2 className="page-title">All Users</h2>
      <div className="list-container">
        {users.map((user, index) => (
          <div className="list-card" key={user._id}>
            <p><b>Sno:</b> {index + 1}</p>
            <p><b>UserID:</b> {user._id}</p>
            <p><b>Name:</b> {user.name}</p>
            <p><b>Email:</b> {user.email}</p>
            <div className="operation-buttons">
              <button className="view-btn" onClick={() => navigate(`/admin/user/${user._id}`, { state: user })}>
                <FaEye />
              </button>
              <button className="edit-btn" onClick={() => navigate(`/admin/edituser/${user._id}`, { state: user })}>
                <FaEdit />
              </button>
              <button className="delete-btn" onClick={() => handleDelete(user._id)}>
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
        <button className="btn" onClick={() => navigate('/admin')}>⬅ Back</button>
      </div>
    </div>
  );
}

export default AdminUsers;