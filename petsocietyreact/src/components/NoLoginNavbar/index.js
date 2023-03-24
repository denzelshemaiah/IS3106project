import React from "react"; 
import "./styles.css"
import logo from "./assets/dog_logo.png"
import { Link } from "react-router-dom"
 
function NoLoginNavbar() { 
  return ( 
    <nav className="navbar navbar-expand-lg"> 
    <a href="/" class="navbar-brand"> 
      <img src={logo} class="logo"/>
      PetSociety 
    </a>
    <div class="wrapper">
      <ul class="nav navbar-nav mr-auto">
        <li><a href="/searchSitter">Search Sitter</a></li>
        <li><a href="/services">Our Services</a></li>
      </ul>

      <ul class="nav navbar-nav ml-auto">
        <li class="right"><Link to="/signUp">Sign Up</Link></li>
        <li class="right"><a href="/signIn">Sign In</a></li>
        <li class="right"><a href="/help">Help</a></li>
      </ul>
    </div>
    </nav> 
  ); 
} 
 
export default NoLoginNavbar; 