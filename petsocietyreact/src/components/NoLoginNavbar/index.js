import React, { useState } from "react";
import "./styles.css";
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
          <img src="https://assets.stickpng.com/images/588a64e7d06f6719692a2d11.png"
          width='20'
          height='20' />
        </MDBNavbarToggler>

        <MDBCollapse navbar show={showNoLoginNavbar}>
          <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
            <MDBNavbarItem>
              <MDBNavbarLink href='/#/searchSitter'>
                Search Sitter
              </MDBNavbarLink>
            </MDBNavbarItem>

            <MDBNavbarItem>
              <MDBNavbarLink href='/#/services'>
                Our Services
              </MDBNavbarLink>
            </MDBNavbarItem>
          </MDBNavbarNav>

          <MDBNavbarNav className='d-flex ml-auto w-auto'>
          <MDBNavbarItem>
              <MDBNavbarLink href='/#/signUp/1' className='text-nowrap'>
                Sign Up
              </MDBNavbarLink>
            </MDBNavbarItem>

            <MDBNavbarItem>
              <MDBNavbarLink href='/#/signIn'className='text-nowrap'>
                Sign In
              </MDBNavbarLink>
            </MDBNavbarItem>

            <MDBNavbarItem>
              <MDBNavbarLink href='/#/help'className='text-nowrap'>
                Help
              </MDBNavbarLink>
            </MDBNavbarItem>
    
          </MDBNavbarNav> 

        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}

export default NoLoginNavbar;
