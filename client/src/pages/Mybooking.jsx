import { useEffect, useState } from "react";
import "../styles/theme.css";
import { useNavigate } from "react-router-dom";
function MyBookings() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const storedBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(storedBookings);
  }, []);

  function cancelBooking(index) {

    const updatedBookings = bookings.filter((_, i) => i !== index);

    localStorage.setItem("bookings", JSON.stringify(updatedBookings));

    setBookings(updatedBookings);
  }

  return (

    <div className="page-container">

      <h2 className="page-title">My Bookings</h2>
      

      {bookings.length === 0 ? (

        <p className="empty">No bookings yet</p>

      ) : (

        bookings.map((b, index) => (

          <div className="card booking-card" key={index}>

            <p><b>Cab Booked Date:</b> {b.bookingDate}</p>

            <p><b>Trip:</b> {b.trip}</p>

            <p><b>Pickup Time:</b> {b.pickupTime}</p>

            <p><b>Drop Time:</b> {b.dropTime}</p>

            <p><b>Driver:</b> {b.driverName}</p>

            <hr />

            <p><b>Car:</b> {b.carModel}</p>

            <p><b>Car Type:</b> {b.carType}</p>

            <p><b>Car Number:</b> {b.carNumber}</p>

            <p><b>Amount Paid:</b> ₹{b.amountPaid}</p>

            <p className="status">
              <b>Status:</b> {b.status}
            </p>

            <button 
              className="btn cancel-btn"
              onClick={() => cancelBooking(index)}
            >
              Cancel Booking
            </button>
            <button className="btn" onClick={()=>navigate(-1)}>
⬅ Back
</button>

          </div>


        ))

      )}

    </div>

  );
}

export default MyBookings;