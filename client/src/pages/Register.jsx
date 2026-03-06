import "../styles/theme.css";
import { useNavigate } from "react-router-dom";

function Register(){

const navigate = useNavigate();

function handleSignup(){
  alert("Registration Successful");
  navigate("/login");
}

return(

<div className="page-container">

<div className="card">

<h2>Register</h2>

<input type="text" placeholder="Name"/>
<input type="email" placeholder="Email"/>
<input type="password" placeholder="Password"/>

<button className="btn" onClick={handleSignup}>
Signup
</button>

<button className="btn1" onClick={()=>navigate(-1)}>
⬅ Back
</button>

</div>

</div>

)

}

export default Register;