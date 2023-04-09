import React, { useState } from "react";
import "./styles.css"
import logo from "./assets/dog_logo.png"
import { Link } from "react-router-dom";
import { MDBContainer, MDBNavbar } from "mdb-react-ui-kit";

function Navbar() {
  const [loggedInUser, setLoggedInUser] = useState({ role: "parent" });
  console.log(loggedInUser.role)

  function links(loggedInUser) {
    if (loggedInUser.role === "parent") {
      return (
        <div style={{ display: "block", width: "100%" }}>
          <ul className="nav navbar-nav" style={{ float: "left" }}>
            <li><Link to="/searchSitter">Search Sitter</Link></li>
            <li><Link to="/bookings">Bookings</Link></li>
            <li><Link to="/meetandgreets">Meet and Greets</Link></li>
            <li><Link to="/services">Our Services</Link></li>
            <li><Link to="/makebooking">Make A Booking</Link></li>
          </ul>

          <ul className="nav navbar-nav" style={{ float: "right" }}>
          <li className="right"><Link to="/profile">Profile</Link></li> 
            <li className="right"><Link to="/help">Help</Link></li>
            <li className="right"><Link to="/logout">Logout</Link></li>
          </ul>
        </div>
      )
    } else if (loggedInUser.role === "sitter") {
      return (
        <div style={{ display: "block", width: "100%" }}>
          <ul className="nav navbar-nav" style={{ float: "left" }}>
            <li><Link to="/bookings">Bookings</Link></li>
            <li><Link to="/meetandgreets">Meet and Greets</Link></li>
            <li><Link to="/services">Our Services</Link></li>
          </ul>
          <ul className="nav navbar-nav" style={{ float: "right" }}>
            <li className="right"><Link to="/help">Help</Link></li>
            <li className="right"><Link to="/logout">Logout</Link></li>
          </ul>
        </div>
      )
    }
  }

  return (
    <MDBNavbar expand='lg' bgColor='E4E2F5'>
      <MDBContainer fluid>
      <a href="/" className="navbar-brand">
        <img src={logo} className="logo" />
        PetSociety
      </a>
      {links(loggedInUser)}
      </MDBContainer>
    </MDBNavbar>
  );
}

export default Navbar;