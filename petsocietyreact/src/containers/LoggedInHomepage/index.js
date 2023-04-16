import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MDBCard, MDBTypography, MDBContainer, MDBCardBody, MDBCardTitle, MDBCardText, MDBCol, MDBRow, MDBBtn } from 'mdb-react-ui-kit';
import dogBoardingIcon from '../../icons/dog_boarding.png';
import dogWalkingIcon from '../../icons/dog_walking.png';
import dogDayCareIcon from '../../icons/dog_daycare.png';
import dogDropInIcon from '../../icons/dog_dropin.png';
import dogHeader from '../../icons/dog_header.png';
import { useState, useEffect } from 'react';
import Services from '../Services';

function LoggedInHomepage() {
    const [user, setUser] = useState({});
    const [userRole, setUserRole] = useState("");

    useEffect(() => {
        const handleStorage = () => {
          setUser(JSON.parse(localStorage.getItem("user")));
          setUserRole(JSON.parse(localStorage.getItem("user_role")));
        }
      
        window.addEventListener('storage', handleStorage())
        return () => window.removeEventListener('storage', handleStorage())
    }, [])

    return (
        <>
            <div className="bg-image" style={{
                backgroundImage: `url(${dogHeader})`,
                backgroundSize: 'cover',
                height: '90vh',
            }}>

                <MDBRow className='m-5'></MDBRow>
                <MDBRow className='m-5'></MDBRow>
                <MDBRow className='m-5'></MDBRow>
                <MDBRow className='m-5'></MDBRow>
                <MDBRow className='m-5'></MDBRow>
                <MDBRow className='m-5'></MDBRow>
                <MDBRow className='m-5'></MDBRow>
                <div className="d-flex justify-content-center">
                    <MDBCol md='10'>
                        <div class="card mb-3" style={{ backgroundColor: 'rgba(123, 105, 169, 0.5)' }}>
                            <div class="card-body">
                                <h4 class="card-title text-center"
                                    style={{
                                        fontWeight: "bold",
                                        color: '#FFFFFF',
                                        padding : '10px'
                                    }}>
                                    BOOK A SERVICE TODAY
                                </h4>
                                <p class="card-text text-center">
                                    <small style={{ color: '#FFFFFF' }}>Available Services:</small>
                                </p>

                                <MDBRow>
                                    <MDBCol md='3'>
                                        <div class="row">
                                            <div class="col">
                                                <button class="btn btn-primary w-100"
                                                    style={{ backgroundColor: '#F3F5F4', padding: '20px 40px' }}>
                                                    <img src={dogBoardingIcon}
                                                        alt="Image"
                                                        width="50"
                                                        height="50"
                                                    >
                                                    </img>
                                                    <br></br>
                                                    <span style={{ color: 'black' }}>BOARDING</span>
                                                </button>
                                            </div>
                                        </div>
                                    </MDBCol>
                                    <MDBCol md='3'>
                                        <div class="row">
                                            <div class="col">
                                                <button class="btn btn-primary w-100"
                                                    style={{ backgroundColor: '#F3F5F4', padding: '20px 40px' }}>
                                                    <img src={dogWalkingIcon}
                                                        alt="Image"
                                                        width="50"
                                                        height="50"
                                                    >
                                                    </img>
                                                    <br></br>
                                                    <span style={{ color: 'black' }}>WALKING</span>
                                                </button>
                                            </div>
                                        </div>
                                    </MDBCol>
                                    <MDBCol md='3'>
                                        <div class="row">
                                            <div class="col">
                                                <button class="btn btn-primary w-100"
                                                    style={{ backgroundColor: '#F3F5F4', padding: '20px 40px' }}>
                                                    <img src={dogDayCareIcon}
                                                        alt="Image"
                                                        width="50"
                                                        height="50"
                                                    >
                                                    </img>
                                                    <br></br>
                                                    <span style={{ color: 'black' }}>DAYCARE</span>
                                                </button>
                                            </div>
                                        </div>
                                    </MDBCol>
                                    <MDBCol md='3'>
                                        <div class="row">
                                            <div class="col">
                                                <button class="btn btn-primary w-100"
                                                    style={{ backgroundColor: '#F3F5F4', padding: '20px 40px' }}>
                                                    <img src={dogDropInIcon}
                                                        alt="Image"
                                                        width="50"
                                                        height="50"
                                                    >
                                                    </img>
                                                    <br></br>
                                                    <span style={{ color: 'black' }}>DROP IN</span>
                                                </button>
                                            </div>
                                        </div>
                                    </MDBCol>
                                </MDBRow>

                            </div>
                        </div>
                    </MDBCol>
                </div>
            </div>
            <Services></Services>
        </>
    )
}

export default LoggedInHomepage;