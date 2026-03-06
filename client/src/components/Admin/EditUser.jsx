import { useLocation, useParams } from "react-router-dom";
import { useState } from "react";

function EditUser() {
  const { id } = useParams();
  const location = useLocation();
  const user = location.state;

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  const handleSave = () => {
    alert(`Saved:\nName: ${name}\nEmail: ${email}`);
    // In a real app, here you'd update backend or global state
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
    </div>
  );
}

export default EditUser;