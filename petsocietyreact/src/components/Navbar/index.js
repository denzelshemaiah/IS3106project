import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css"
import logo from "./assets/dog_logo.png"
import { Link } from "react-router-dom";
import { MDBCollapse, MDBContainer, MDBNavbar, MDBNavbarItem, MDBNavbarNav, MDBNavbarToggler } from "mdb-react-ui-kit";
import hamburgerMenu from '../../icons/hamburger_menu.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBell } from '@fortawesome/free-solid-svg-icons'

function Navbar(props) {
  const [loggedInUser, setLoggedInUser] = useState(props.user);

  const [showNavbar, setShowNavbar] = useState(false);

  let navigate = useNavigate();

  function handleLogout(e) {
    e.preventDefault();
    sessionStorage.removeItem("user")
    sessionStorage.removeItem("user_role")
    navigate('/signIn')
  }

  function links() {
    if (props.role === '"parent"') {
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

          </MDBNavbarNav>

          <MDBNavbarNav className='d-flex ml-auto w-auto'>
            <MDBNavbarItem style={{ padding : '0 0.5rem'}}>
            <li><Link to="/profile"><text><FontAwesomeIcon icon={faUser}/></text></Link></li>
            </MDBNavbarItem>

            <MDBNavbarItem style={{ padding : '0 0.5rem'}}>
            <li><Link to="/notifications"><text><FontAwesomeIcon icon={faBell}/></text></Link></li>
            </MDBNavbarItem>

            <MDBNavbarItem>
              <li><Link to="/help">Help</Link></li>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <li onClick={(e) => handleLogout(e)}><Link to="/signIn">Logout</Link></li>
            </MDBNavbarItem>
          </MDBNavbarNav>

        </MDBCollapse>
      )
    } else if (props.role === '"sitter"') {
      console.log("in sitter")
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
            <MDBNavbarItem style={{ padding : '0 0.5rem'}}>
              <li><Link to="/profile"><text><FontAwesomeIcon icon={faUser}/></text></Link></li>
            </MDBNavbarItem>

            <MDBNavbarItem style={{ padding : '0 0.5rem'}}>
            <li><Link to="/notifications"><text><FontAwesomeIcon icon={faBell}/></text></Link></li>
            </MDBNavbarItem>

            <MDBNavbarItem>
              <li className="right"><Link to="/help">Help</Link></li>
            </MDBNavbarItem>

            <MDBNavbarItem>
              <li onClick={(e) => handleLogout(e)}><Link to="/signIn">Logout</Link></li>
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

        {links()}
      </MDBContainer>
    </MDBNavbar>
  );
}

export default Navbar;