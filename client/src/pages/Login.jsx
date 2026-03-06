import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/theme.css";

function Login(){

const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const navigate = useNavigate();

function handleLogin(){

// ADMIN LOGIN
if(email === "vgg@gmail.com" && password === "vgg123"){
navigate("/admin");
}

// USER LOGIN
else if(email && password){
navigate("/uhome");
}

else{
alert("Enter email and password");
}

}

return(

<div className="page-container">

<div className="card">

<h2>Login</h2>

<input
type="email"
placeholder="Enter Email"
onChange={(e)=>setEmail(e.target.value)}
/>

<input
type="password"
placeholder="Enter Password"
onChange={(e)=>setPassword(e.target.value)}
/>

<button className="btn" onClick={handleLogin}>
Login
</button>
<button className="btn" onClick={()=>navigate("/register")}>
Register
</button>

</div>

</div>

)

}

export default Login;