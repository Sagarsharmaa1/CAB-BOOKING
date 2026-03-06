import { useLocation, useParams } from "react-router-dom";

function UserDetails() {
  const { id } = useParams();
  const location = useLocation();
  const user = location.state;

  if (!user) return <p>User not found!</p>;

  return (
    <div className="page-container">
      <h2>User Details</h2>
      <p>
        <b>User ID:</b> {id}
      </p>
      <p>
        <b>Name:</b> {user.name}
      </p>
      <p>
        <b>Email:</b> {user.email}
      </p>
    </div>
  );
}

export default UserDetails;