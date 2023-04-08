import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap';
import { MDBCol, MDBRow, MDBTypography, MDBBtn } from 'mdb-react-ui-kit';
import { Link, Route, Routes } from 'react-router-dom';
import Footer from '../../components/Footer';



function LoggedInHomepage() {
    return (
        <>
        <div className="hero-section">
        <MDBTypography tag='div' className='display-3 pt-5 pb-3 text-center'>
          Loving pet care in your neighbourhood.
        </MDBTypography>

        </div>

        <Footer/>
        </>
    )
}

export default LoggedInHomepage;