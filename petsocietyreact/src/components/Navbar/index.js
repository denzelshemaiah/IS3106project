import React from "react"; 
import "./styles.css"
import logo from "./assets/dog_logo.png"
import { Link } from "react-router-dom";
 
function Navbar() { 
  return ( 
    <nav class="navbar navbar-expand-lg">
      <a href="/" class="navbar-brand"> 
        <img src={logo} class="logo"/>
        PetSociety 
      </a>
      
      <div class="wrapper">
        <ul class="nav navbar-nav mr-auto">
          <li><Link to="/searchSitter">Search Sitter</Link></li>
          <li><Link to="/bookings">Bookings</Link></li>
          <li><Link to="/meetandgreets">Meet and Greets</Link></li>
          <li><Link to="/services">Our Services</Link></li>
          <li><Link to="/makebooking">Make A Booking</Link></li>
        </ul>
        
        <ul class="nav navbar-nav ml-auto">
          <li class="right"><Link to="/help">Help</Link></li>
          <li class="right"><Link to="/logout">Logout</Link></li>
        </ul>
      </div>
    </nav> 
  ); 
} 
 
export default Navbar; 