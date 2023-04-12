import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css"
import logo from "./assets/dog_logo.png"
import { Link } from "react-router-dom";
import { MDBCollapse, MDBContainer, MDBNavbar, MDBNavbarItem, MDBNavbarNav, MDBNavbarToggler, MDBNavbarLink } from "mdb-react-ui-kit";
import hamburgerMenu from '../../icons/hamburger_menu.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBell } from '@fortawesome/free-solid-svg-icons'

function Navbar() {
  const [loggedInUser, setLoggedInUser] = useState(localStorage.getItem("user"));
  const [userRole, setUserRole] = useState(localStorage.getItem("user_role"))

  const [showNavbar, setShowNavbar] = useState(false);

  const [showNoLoginNavbar, setShowNoLoginNavbar] = useState(false);

  useEffect(() => {
    const handleStorage = () => {
      setLoggedInUser(JSON.parse(localStorage.getItem("user")));
      setUserRole(JSON.parse(localStorage.getItem("user_role")));
    }
  
    window.addEventListener('storage', handleStorage())
    return () => window.removeEventListener('storage', handleStorage())
  }, [])

  let navigate = useNavigate();

  function handleLogout(e) {
    e.preventDefault();
    localStorage.removeItem("user")
    localStorage.removeItem("user_role")
    navigate('/signIn')
  }

  function links() {
    if (userRole === "parent") {
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
    } else if (userRole === "sitter") {
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
    } else if (userRole === null) {
      return (
        <>
          <MDBNavbarToggler
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
            onClick={() => setShowNoLoginNavbar(!showNoLoginNavbar)}
          >
            <img src={hamburgerMenu}
              width='20'
              height='20' />
          </MDBNavbarToggler>
  
          <MDBCollapse navbar show={showNoLoginNavbar}>
            <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
              <MDBNavbarItem>
                <MDBNavbarLink>
                  <li><Link to="/searchSitter">Search Sitter</Link></li>
                </MDBNavbarLink>
              </MDBNavbarItem>
  
              <MDBNavbarItem>
                <MDBNavbarLink>
                  <li><Link to="/services">Our Services</Link></li>
                </MDBNavbarLink>
              </MDBNavbarItem>
            </MDBNavbarNav>
  
            <MDBNavbarNav className='d-flex ml-auto w-auto'>
              <MDBNavbarItem>
                <MDBNavbarLink className='text-nowrap'>
                  <li><Link to="/signUp/1">Sign Up</Link></li>
                </MDBNavbarLink>
              </MDBNavbarItem>
  
              <MDBNavbarItem>
                <MDBNavbarLink className='text-nowrap'>
                <li><Link to="/signIn">Sign In</Link></li>
                </MDBNavbarLink>
              </MDBNavbarItem>
  
              <MDBNavbarItem>
                <MDBNavbarLink className='text-nowrap'>
                <li><Link to="/help">Help</Link></li>
                </MDBNavbarLink>
              </MDBNavbarItem>
  
            </MDBNavbarNav>
  
          </MDBCollapse>
        </>
      );

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