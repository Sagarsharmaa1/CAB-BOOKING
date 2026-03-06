import "../styles/theme.css";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa"; // import icons

function AdminUsers() {
  const navigate = useNavigate();

  const users = [
    { id: 1, name: "Rahul", email: "rahul@gmail.com" },
    { id: 2, name: "Priya", email: "priya@gmail.com" },
  ];

  const deleteUser = (id) => {
    alert("User Deleted : " + id);
  };

  return (
    <div className="page-container">
      <h2 className="page-title">All Users</h2>

      <div className="list-container">
        {users.map((user, index) => (
          <div className="list-card" key={user.id}>
            <p>
              <b>Sno :</b> {index + 1}
            </p>
            <p>
              <b>UserID :</b> {user.id}
            </p>
            <p>
              <b>Name :</b> {user.name}
            </p>
            <p>
              <b>Email :</b> {user.email}
            </p>

            <div className="operation-buttons">
              <button
                className="view-btn"
                onClick={() =>
                  navigate(`/admin/user/${user.id}`, { state: user })
                }
              >
                <FaEye />
              </button>

              <button
                className="edit-btn"
                onClick={() =>
                  navigate(`/admin/edituser/${user.id}`, { state: user })
                }
              >
                <FaEdit /> 
              </button>

              <button
                className="delete-btn"
                onClick={() => deleteUser(user.id)}
              >
                <FaTrash /> 
              </button>
            </div>
          </div>
        ))}

        <button className="btn" onClick={() => navigate("/admin")}>
          ⬅ Back
        </button>
      </div>
    </div>
  );
}

export default AdminUsers;