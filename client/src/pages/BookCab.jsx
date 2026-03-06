import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/theme.css";

function BookCab() {

const { id } = useParams();
const navigate = useNavigate();

const [pickupLocation,setPickupLocation] = useState("");
const [pickupState,setPickupState] = useState("");
const [pickupCity,setPickupCity] = useState("");

const [dropLocation,setDropLocation] = useState("");
const [dropState,setDropState] = useState("");
const [dropCity,setDropCity] = useState("");

const [pickupDate,setPickupDate] = useState("");
const [pickupTime,setPickupTime] = useState("");

const [dropDate,setDropDate] = useState("");
const [dropTime,setDropTime] = useState("");

const [distance,setDistance] = useState("");
const [fare,setFare] = useState("");

const cabData = {
1:{model:"Toyota Etios",type:"Sedan",price:10},
2:{model:"Innova",type:"SUV",price:18},
3:{model:"Ertiga",type:"MPV",price:14}
};

function calculateFare(){

if(!distance){
alert("Enter distance first");
return;
}

const selectedCab = cabData[id];
const amount = distance * selectedCab.price;

setFare(amount);
}

function handleBooking(){

if(!pickupLocation || !dropLocation || !pickupDate || !pickupTime){
alert("Please fill all fields");
return;
}

const selectedCab = cabData[id];

const newBooking = {

bookingDate:new Date().toLocaleDateString(),

trip:`${pickupLocation}, ${pickupCity} → ${dropLocation}, ${dropCity}`,

pickupTime:`${pickupDate} ${pickupTime}`,
dropTime:`${dropDate} ${dropTime}`,

driverName:"Sneha Kapoor",

carModel:selectedCab.model,
carType:selectedCab.type,

carNumber:"RJ 14 QW " + Math.floor(Math.random()*9000+1000),

amountPaid:fare,

status:"On the Way"

};

const existingBookings =
JSON.parse(localStorage.getItem("bookings")) || [];

existingBookings.push(newBooking);

localStorage.setItem("bookings",JSON.stringify(existingBookings));

navigate("/mybookings");

}

return(

<div className="page-container">

<div className="card">

<h2>Book Cab</h2>

<input
type="text"
placeholder="Pickup Location"
onChange={(e)=>setPickupLocation(e.target.value)}
/>

<select onChange={(e)=>setPickupState(e.target.value)}>
<option>Select State</option>
<option>Uttar Pradesh</option>
<option>Delhi</option>
<option>Haryana</option>
</select>

<select onChange={(e)=>setPickupCity(e.target.value)}>
<option>Select City</option>
<option>Meerut</option>
<option>Noida</option>
<option>Delhi</option>
</select>

<input
type="text"
placeholder="Drop Location"
onChange={(e)=>setDropLocation(e.target.value)}
/>

<select onChange={(e)=>setDropState(e.target.value)}>
<option>Select State</option>
<option>Uttar Pradesh</option>
<option>Delhi</option>
<option>Haryana</option>
</select>

<select onChange={(e)=>setDropCity(e.target.value)}>
<option>Select City</option>
<option>Meerut</option>
<option>Noida</option>
<option>Delhi</option>
</select>

<input type="date" onChange={(e)=>setPickupDate(e.target.value)} />

<input type="time" onChange={(e)=>setPickupTime(e.target.value)} />

<input type="date" onChange={(e)=>setDropDate(e.target.value)} />

<input type="time" onChange={(e)=>setDropTime(e.target.value)} />

<input
type="number"
placeholder="Distance (km)"
onChange={(e)=>setDistance(e.target.value)}
/>

<button className="btn" onClick={calculateFare}>
Calculate Fare
</button>

{fare && <p>Total Fare : ₹{fare}</p>}

<button className="btn" onClick={handleBooking}>
Book Ride
</button>

<button className="btn" onClick={()=>navigate(-1)}>
⬅ Back
</button>

</div>

</div>

)

}

export default BookCab;