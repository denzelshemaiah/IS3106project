import React from "react"; 
import "./styles.css";
import logo from "./assets/dog_logo.png";
import { Link } from "react-router-dom";
import { MDBNavbar, MDBContainer } from "mdb-react-ui-kit";
 
function NoLoginNavbar() { 
  return ( 
    <MDBNavbar expand='lg' bgColor='E4E2F5'>
            <MDBContainer fluid>
    <a href="/" class="navbar-brand"> 
      <img src={logo} class="logo"/>
      PetSociety 
    </a>
    <div class="wrapper">
      <ul class="nav navbar-nav mr-auto">
        <li><Link to="/searchSitter">Search Sitter</Link></li>
        <li><Link to="/services">Our Services</Link></li>
      </ul>

      <ul class="nav navbar-nav ml-auto">
        <li class="right"><Link to="/signUp/1">Sign Up</Link></li>
        <li class="right"><Link to="/signIn">Sign In</Link></li>
        <li class="right"><Link to="/help">Help</Link></li>
      </ul>
    </div>
    </MDBContainer>
    </MDBNavbar> 
  ); 
} 
 
export default NoLoginNavbar; 
