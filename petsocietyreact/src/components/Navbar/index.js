import React from "react"; 
import "./styles.css"
import logo from "./assets/dog_logo.png"
import { Link } from "react-router-dom";
 
function Navbar() { 
  return ( 
    <nav className="navbar navbar-expand-lg">
      <a href="/" className="navbar-brand"> 
        <img src={logo} className="logo"/>
        PetSociety 
      </a>
      
      <div className="wrapper">
        <ul className="nav navbar-nav mr-auto">
          <li><Link to="/searchSitter">Search Sitter</Link></li>
          <li><Link to="/bookings">Bookings</Link></li>
          <li><Link to="/meetandgreets">Meet and Greets</Link></li>
          <li><Link to="/services">Our Services</Link></li>
          <li><Link to="/makebooking">Make A Booking</Link></li>
        </ul>
        
        <ul className="nav navbar-nav ml-auto">
          <li className="right"><Link to="/help">Help</Link></li>
          <li className="right"><Link to="/logout">Logout</Link></li>
        </ul>
      </div>
    </nav> 
  ); 
} 
 
export default Navbar; 