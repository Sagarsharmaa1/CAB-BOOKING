import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { updateUser } from '../../services/api';

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

  if (!user) return <p>User not found!</p>;

  return (
    <div className="page-container">
      <h2>Edit User</h2>
      <p>Editing User ID: {id}</p>
      <div>
        <label>Name:</label>
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label>Email:</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <button onClick={handleSave}>Save</button>
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
}

export default EditUser;