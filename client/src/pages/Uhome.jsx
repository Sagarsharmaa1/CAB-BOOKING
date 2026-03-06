import {useNavigate} from "react-router-dom";
import "../styles/theme.css";

function Uhome(){

const navigate = useNavigate();

function handleLogout(){
navigate("/");
}

return(

<div className="page-container">

<div className="card">

<h2>User Dashboard</h2>

<button className="btn" onClick={()=>navigate("/cabs")}>
View Cabs
</button>

<br/><br/>

<button className="btn" onClick={()=>navigate("/mybookings")}>
My Bookings
</button>

<br/><br/>

<button className="btn" onClick={handleLogout}>
Logout
</button>

</div>

</div>

)

}

export default Uhome;