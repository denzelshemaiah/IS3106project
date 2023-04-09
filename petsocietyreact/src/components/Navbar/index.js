import React, { useState } from "react";
import "./styles.css"
import logo from "./assets/dog_logo.png"
import { Link } from "react-router-dom";
import { MDBNavbar } from "mdb-react-ui-kit";

function Navbar() {
  const [loggedInUser, setLoggedInUser] = useState({ role: "parent" });
  console.log(loggedInUser.role)

  function links(loggedInUser) {
    if (loggedInUser.role === "parent") {
      return (
<<<<<<< HEAD
      <div style={{display: "block", width:"100%", padding:"20px"}}>
        <ul className="nav navbar-nav" style={{float:"left"}}>
          <li><Link to="/searchSitter">Search Sitter</Link></li>
          <li><Link to="/bookings">Bookings</Link></li>
          <li><Link to="/meetandgreets">Meet and Greets</Link></li>
          <li><Link to="/services">Our Services</Link></li>
          <li><Link to="/makebooking">Make A Booking</Link></li>
        </ul>
        
        <ul className="nav navbar-nav" style={{float:"right"}}>
          <li className="right"><Link to="/help">Help</Link></li>
          <li className="right"><Link to="/logout">Logout</Link></li>
        </ul>
      </div>
=======
        <div style={{ display: "block", width: "100%" }}>
          <ul className="nav navbar-nav" style={{ float: "left" }}>
            <li><Link to="/searchSitter">Search Sitter</Link></li>
            <li><Link to="/bookings">Bookings</Link></li>
            <li><Link to="/meetandgreets">Meet and Greets</Link></li>
            <li><Link to="/services">Our Services</Link></li>
            <li><Link to="/makebooking">Make A Booking</Link></li>
          </ul>

          <ul className="nav navbar-nav" style={{ float: "right" }}>
            <li className="right"><Link to="/help">Help</Link></li>
            <li className="right"><Link to="/logout">Logout</Link></li>
          </ul>
        </div>
>>>>>>> origin/master
      )
    } else if (loggedInUser.role === "sitter") {
      return (
<<<<<<< HEAD
        <div style={{display: "block", width:"100%", padding:"20px"}}>
          <ul className="nav navbar-nav" style={{float:"left"}}>
=======
        <div style={{ display: "block", width: "100%" }}>
          <ul className="nav navbar-nav" style={{ float: "left" }}>
>>>>>>> origin/master
            <li><Link to="/bookings">Bookings</Link></li>
            <li><Link to="/meetandgreets">Meet and Greets</Link></li>
            <li><Link to="/services">Our Services</Link></li>
          </ul>
<<<<<<< HEAD
          
          <ul className="nav navbar-nav" style={{float:"right"}}>
            <li><Link to="/help">Help</Link></li>
            <li><Link to="/logout">Logout</Link></li>
=======

          <ul className="nav navbar-nav" style={{ float: "right" }}>
            <li className="right"><Link to="/help">Help</Link></li>
            <li className="right"><Link to="/logout">Logout</Link></li>
>>>>>>> origin/master
          </ul>
        </div>
      )
    }
  }

  return (
    <MDBNavbar expand='lg' bgColor='E4E2F5'>
      <a href="/" className="navbar-brand">
        <img src={logo} className="logo" />
        PetSociety
      </a>
      {links(loggedInUser)}
    </MDBNavbar>
  );
}

export default Navbar;