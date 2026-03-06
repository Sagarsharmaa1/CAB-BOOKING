import { useNavigate } from "react-router-dom";
import "../styles/theme.css";

function AdminDashboard(){

const navigate = useNavigate();

return(

<div className="page-container">

<h2>Admin Dashboard</h2>

<div className="card">

<button className="btn" onClick={()=>navigate("/admin/users")}>
View Users
</button>

<br/><br/>

<button className="btn" onClick={()=>navigate("/admin/addcab")}>
Add Cab
</button>

<br/><br/>

<button className="btn" onClick={()=>navigate("/admin/cabs")}>
View Cabs
</button>

<br/><br/>

<button className="btn" onClick={()=>navigate("/admin/bookings")}>
View Bookings
</button>
<button className="btn" onClick={()=>navigate("/")}>
⬅ Back
</button>
</div>

</div>

)

}

export default AdminDashboard