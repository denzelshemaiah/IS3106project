import React from "react"; 
import "./styles.css"
import logo from "./assets/dog_logo.png"
 
function Navbar() { 
  return ( 
    <nav className="nav"> 
    <img src={logo} class="logo"/>
    <a href="/" className="site-title"> Pet Society </a>
    <div class="wrapper">
      <ul>
        <li><a href="/searchSitter">Search Sitter</a></li>
        <li><a href="/bookings">Bookings</a></li>
        <li><a href="/meetandgreets">My Meet and Greets</a></li>
        <li><a href="/services">Our Services</a></li>
      </ul>

      <ul>
        <li class="right"><a href="/help">Help</a></li>
        <li class="right"><a href="/logout">Logout</a></li>
      </ul>
    </div>
    </nav> 
  ); 
} 
 
export default Navbar; 