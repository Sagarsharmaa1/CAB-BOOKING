import { useNavigate } from "react-router-dom";
import "../styles/theme.css";

function Cabs() {
  const navigate = useNavigate();

  const cabList = [
    { id: 1, model: "Swift Dzire", type: "Sedan", carNo: "UP 15 AB 2345", driver: "Rahul Sharma", fare: 10 },
    { id: 2, model: "Innova", type: "SUV", carNo: "UP 15 CD 5678", driver: "Amit Verma", fare: 18 },
    { id: 3, model: "Ertiga", type: "MPV", carNo: "UP 15 EF 9101", driver: "Sanjay Kumar", fare: 14 }
  ];

  return (
    <div className="page-container">
      <h2 className="page-title">Available Cabs</h2>

      <div className="list-container">
        {cabList.map((cab) => (
          <div className="list-card" key={cab.id}>
            <h3>{cab.model}</h3>
            <p><b>Type:</b> {cab.type}</p>
            <p><b>Car Number:</b> {cab.carNo}</p>
            <p><b>Driver:</b> {cab.driver}</p>
            <p><b>Fare:</b> ₹{cab.fare} / km</p>

            {/* Buttons aligned side by side */}
           <div className="card-buttons">
  <button className="book-btn" onClick={() => navigate(`/bookcab/${cab.id}`)}>
    Book Cab
  </button>
  <button className="back-btn" onClick={() => navigate(-1)}>
    ⬅ Back
  </button>
</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cabs;