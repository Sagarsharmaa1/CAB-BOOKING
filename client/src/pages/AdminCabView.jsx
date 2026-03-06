import "../styles/theme.css";
import { useNavigate } from "react-router-dom";

function AdminCabView(){

const navigate = useNavigate();

const cabs = JSON.parse(localStorage.getItem("cabs")) || []

return(

<div className="page-container">



<h2>All Cabs</h2>

{cabs.length === 0 ? (

<p>No Cabs Added</p>

) : (

cabs.map((cab,index)=>(

<div className="list-card" key={index}>

<p>Model : {cab.model}</p>
<p>Seats : {cab.seats}</p>
<p>Price : ₹{cab.price}</p>

</div>

))

)}

<button className="btn" onClick={()=>navigate("/admin")}>
⬅ Back
</button>
</div>

)

}

export default AdminCabView