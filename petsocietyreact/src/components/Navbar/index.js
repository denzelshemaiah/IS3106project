import React, { useState } from "react";
import "./styles.css"
import logo from "./assets/dog_logo.png"
import { Link } from "react-router-dom";
import { MDBCollapse, MDBContainer, MDBNavbar, MDBNavbarItem, MDBNavbarNav, MDBNavbarToggler } from "mdb-react-ui-kit";
import hamburgerMenu from '../../icons/hamburger_menu.png';

function Navbar() {
  const [loggedInUser, setLoggedInUser] = useState({ role: "parent" });
  console.log(loggedInUser.role)

  const [showNavbar, setShowNavbar] = useState(false);

  function links(loggedInUser) {
    if (loggedInUser.role === "parent") {
      return (
        <MDBCollapse navbar show={showNavbar}>
          <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
            <MDBNavbarItem>
              <li><Link to="/searchSitter">Search Sitter</Link></li>
            </MDBNavbarItem>

            <MDBNavbarItem>
              <li><Link to="/bookings">Bookings</Link></li>
            </MDBNavbarItem>

            <MDBNavbarItem>
              <li><Link to="/meetandgreets">Meet and Greets</Link></li>
            </MDBNavbarItem>

            <MDBNavbarItem>
              <li><Link to="/services">Our Services</Link></li>
            </MDBNavbarItem>

            <MDBNavbarItem>
              <li><Link to="/services">Our Services</Link></li>
            </MDBNavbarItem>

            <MDBNavbarItem>
              <li><Link to="/makebooking">Make A Booking</Link></li>
            </MDBNavbarItem>
          </MDBNavbarNav>

          <MDBNavbarNav className='d-flex ml-auto w-auto'>
            <MDBNavbarItem>
              <li><Link to="/profile">Profile</Link></li>
            </MDBNavbarItem>

            <MDBNavbarItem>
              <li><Link to="/help">Help</Link></li>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <li><Link to="/logout">Logout</Link></li>
            </MDBNavbarItem>
          </MDBNavbarNav>

        </MDBCollapse>
      )

    } else if (loggedInUser.role === "sitter") {
      return (
        <MDBCollapse navbar show={showNavbar}>
          <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
            <MDBNavbarItem>
              <li><Link to="/bookings">Bookings</Link></li>
            </MDBNavbarItem>

            <MDBNavbarItem>
              <li><Link to="/meetandgreets">Meet and Greets</Link></li>
            </MDBNavbarItem>

            <MDBNavbarItem>
              <li><Link to="/services">Our Services</Link></li>
            </MDBNavbarItem>
          </MDBNavbarNav>

          <MDBNavbarNav className='d-flex ml-auto w-auto'>
            <MDBNavbarItem>
              <li><Link to="/profile">Profile</Link></li>
            </MDBNavbarItem>

            <MDBNavbarItem>
              <li className="right"><Link to="/help">Help</Link></li>
            </MDBNavbarItem>

            <MDBNavbarItem>
              <li className="right"><Link to="/logout">Logout</Link></li>
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBCollapse>
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

        <MDBNavbarToggler
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setShowNavbar(!showNavbar)}
        >
          <img src={hamburgerMenu}
            width='20'
            height='20' />
        </MDBNavbarToggler>

        {links(loggedInUser)}
      </MDBContainer>
    </MDBNavbar>
  );
}

export default Navbar;