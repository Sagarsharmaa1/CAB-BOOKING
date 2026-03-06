import { Link } from "react-router-dom";
import taxi from "../assets/taxi.png";
import "../styles/home.css";

function Home(){

  return(

    <div>

      <div className="navbar">
        <div className="logo">Cab Booking App</div>

        <Link to="/login" className="login-link">
          Login
        </Link>
      </div>


      <div className="hero">

        <h1>Your Ride, Your Way</h1>

        <p>
          Reliable. Fast. Affordable. Book cabs anytime, anywhere.
        </p>

        <Link to="/login">
          <button>Explore Services</button>
        </Link>

        <img src={taxi} alt="taxi"/>

      </div>

    </div>

  )
}

export default Home