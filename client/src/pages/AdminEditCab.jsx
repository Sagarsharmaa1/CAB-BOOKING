import "../styles/theme.css";
import { useNavigate } from "react-router-dom";
function AdminEditCab(){
const navigate = useNavigate();
return(

<div className="page-container">

<div className="card">

<h2>Edit Cab</h2>

<input placeholder="Cab Model"/>

<input placeholder="Seats"/>

<input placeholder="Price"/>

<button className="btn">
Update Cab
</button>
<button className="btn" onClick={()=>navigate(-1)}>
Back
</button>
</div>

</div>

)

}

export default AdminEditCab