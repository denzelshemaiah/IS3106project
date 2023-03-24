import React from "react"; 
import "./styles.css"
import logo from "./assets/dog_logo.png"
<<<<<<< HEAD
=======
import { Link } from "react-router-dom"
>>>>>>> master
 
function NoLoginNavbar() { 
  return ( 
    <nav className="nav"> 
    <img src={logo} class="logo"/>
    <a href="/" className="site-title"> Pet Society </a>
    <div class="wrapper">
      <ul>
        <li><a href="/searchSitter">Search Sitter</a></li>
        <li><a href="/services">Our Services</a></li>
      </ul>

      <ul>
<<<<<<< HEAD
        <li class="right"><a href="/signUp">Sign Up</a></li>
=======
        <li class="right"><Link to="/signUp">Sign Up</Link></li>
>>>>>>> master
        <li class="right"><a href="/signIn">Sign In</a></li>
        <li class="right"><a href="/help">Help</a></li>
      </ul>
    </div>
    </nav> 
  ); 
} 
 
export default NoLoginNavbar; 