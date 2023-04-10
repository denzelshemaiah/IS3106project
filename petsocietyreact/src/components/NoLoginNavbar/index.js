import React, { useState } from "react";
import logo from "./assets/dog_logo.png";
import { Link } from "react-router-dom";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBBtn,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse
} from "mdb-react-ui-kit";
import hamburgerMenu from '../../icons/hamburger_menu.png';

function NoLoginNavbar() {
  const [showNoLoginNavbar, setShowNoLoginNavbar] = useState(false);

  return (
    <MDBNavbar expand='lg' bgColor='E4E2F5' className="d-flex auto" scrollingNavbar>
      <MDBContainer fluid>
        <a href="/" class="navbar-brand">
          <img src={logo} class="logo" />
          PetSociety
        </a>

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
      </MDBContainer>
    </MDBNavbar>
  );
}

export default NoLoginNavbar;
