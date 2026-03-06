import "../styles/theme.css";
import { useNavigate } from "react-router-dom";
function AdminBookings(){
const navigate = useNavigate();
const bookings = JSON.parse(localStorage.getItem("bookings")) || []

return(

<div className="page-container">

<h2>All Bookings</h2>

<div className="list-container">

{bookings.map((b,index)=>(
<div className="list-card" key={index}>

<p><b>Trip :</b> {b.trip}</p>
<p><b>Driver :</b> {b.driverName}</p>
<p><b>Car :</b> {b.carModel}</p>
<p><b>Amount :</b> ₹{b.amountPaid}</p>

</div>
))}

<button className="btn" onClick={()=>navigate(-1)}>
Back
</button>
</div>

</div>

)

}

export default AdminBookings