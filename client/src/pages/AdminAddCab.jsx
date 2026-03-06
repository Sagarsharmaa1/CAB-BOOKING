import { useNavigate } from "react-router-dom";
import {useState} from "react"
import "../styles/theme.css";

function AdminAddCab(){
const navigate = useNavigate();
const [model,setModel] = useState("")
const [seats,setSeats] = useState("")
const [price,setPrice] = useState("")

function addCab(){

if(!model || !seats || !price){
alert("Please fill all fields")
return
}

let cab = {model,seats,price}

let old = JSON.parse(localStorage.getItem("cabs")) || []

old.push(cab)

localStorage.setItem("cabs",JSON.stringify(old))

alert("Cab Added Successfully")

}

return(

<div className="page-container">

<div className="card">
<h2>Add Cab</h2>

<input
placeholder="Cab Model"
onChange={(e)=>setModel(e.target.value)}
/>

<input
placeholder="Seats"
onChange={(e)=>setSeats(e.target.value)}
/>

<input
placeholder="Price per km"
onChange={(e)=>setPrice(e.target.value)}
/>

<button className="btn" onClick={addCab}>
Add Cab
</button>
<button className="btn1" onClick={()=>navigate(-1)}>
⬅ Back
</button>

</div>

</div>

)

}

export default AdminAddCab