import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap';
import { MDBCard, MDBTypography, MDBContainer, MDBCardBody, MDBCardTitle, MDBCardText, MDBCol, MDBRow, MDBBtn } from 'mdb-react-ui-kit';
import { Link, Route, Routes } from 'react-router-dom';
import Footer from '../../components/Footer';



function LoggedInHomepage() {
    return (
        <>
        
            <div className="bg-image" style={{
                backgroundImage: `url('https://images.pexels.com/photos/1490908/pexels-photo-1490908.jpeg?cs=srgb&dl=pexels-svetozar-milashevich-1490908.jpg&fm=jpg')`,
                backgroundSize: 'cover',
                height: '100vh',
            }}>

                <MDBTypography tag='div'
                    className='display-3 pt-5 pb-5 text-center'
                    style={{ color: 'white', fontWeight: "bold" }}>
                    Loving pet care in your neighbourhood.
                </MDBTypography>

                <div className="d-flex justify-content-center pb-5">
                    <div className="col-md-8">
                        <div className="w-100 text-center"
                            style={{ color: 'white' }}>
                            <MDBTypography tag='h4'>Book trusted sitters and dog walkers.
                            </MDBTypography>
                        </div>
                    </div>
                </div>

                <div className="d-flex justify-content-center">
                    <MDBCol md='10'>
                        <div class="card mb-3">
                            <div class="card-body">
                                <h5 class="card-title" style={{ fontWeight: "bold" }}>BOOK A SERVICE TODAY</h5>
                                <p class="card-text">
                                    <small class="text-muted">Available Services:</small>
                                </p>

                                <MDBRow>
                                    <MDBCol md='3'>
                                        <div class="row">
                                            <div class="col">
                                                <button class="btn btn-primary w-100"
                                                    style={{ backgroundColor: '#F3F5F4', padding: '20px 40px' }}>
                                                    <img src="https://thenounproject.com/api/private/icons/3762083/edit/?backgroundShape=SQUARE&backgroundShapeColor=%23000000&backgroundShapeOpacity=0&exportSize=752&flipX=false&flipY=false&foregroundColor=%23000000&foregroundOpacity=1&imageFormat=png&rotation=0&token=gAAAAABkMWMLEat10iesV-C94ACSAoRV-z5Xo4OgdZfO4y9adnM0BoOtlZzbuS0r96AmElrzfGxIQ_dnm-rY5ztpyDLqIJMjSg%3D%3D"
                                                        alt="Image"
                                                        width="50"
                                                        height="50"
                                                        >
                                                    </img>
                                                    <br></br>
                                                    <span style = {{ color: 'black'}}>BOARDING</span>
                                                </button>
                                            </div>
                                        </div>
                                    </MDBCol>
                                    <MDBCol md='3'>
                                        <div class="row">
                                            <div class="col">
                                                <button class="btn btn-primary w-100"
                                                    style={{ backgroundColor: '#F3F5F4', padding: '20px 40px' }}>
                                                    <img src="https://thenounproject.com/api/private/icons/5620968/edit/?backgroundShape=SQUARE&backgroundShapeColor=%23000000&backgroundShapeOpacity=0&exportSize=752&flipX=false&flipY=false&foregroundColor=%23000000&foregroundOpacity=1&imageFormat=png&rotation=0&token=gAAAAABkMWMLEat10iesV-C94ACSAoRV-z5Xo4OgdZfO4y9adnM0BoOtlZzbuS0r96AmElrzfGxIQ_dnm-rY5ztpyDLqIJMjSg%3D%3D"
                                                        alt="Image"
                                                        width="50"
                                                        height="50"
                                                        >
                                                    </img>
                                                    <br></br>
                                                    <span style = {{ color: 'black'}}>PET TAXI</span>
                                                </button>
                                            </div>
                                        </div>
                                    </MDBCol>
                                    <MDBCol md='3'>
                                        <div class="row">
                                            <div class="col">
                                                <button class="btn btn-primary w-100"
                                                    style={{ backgroundColor: '#F3F5F4', padding: '20px 40px' }}>
                                                    <img src="https://thenounproject.com/api/private/icons/2401714/edit/?backgroundShape=SQUARE&backgroundShapeColor=%23000000&backgroundShapeOpacity=0&exportSize=752&flipX=false&flipY=false&foregroundColor=%23000000&foregroundOpacity=1&imageFormat=png&rotation=0&token=gAAAAABkMWMLEat10iesV-C94ACSAoRV-z5Xo4OgdZfO4y9adnM0BoOtlZzbuS0r96AmElrzfGxIQ_dnm-rY5ztpyDLqIJMjSg%3D%3D"
                                                        alt="Image"
                                                        width="50"
                                                        height="50"
                                                        >
                                                    </img>
                                                    <br></br>
                                                    <span style = {{ color: 'black'}}>DAYCARE</span>
                                                </button>
                                            </div>
                                        </div>
                                    </MDBCol>
                                    <MDBCol md='3'>
                                        <div class="row">
                                            <div class="col">
                                                <button class="btn btn-primary w-100"
                                                    style={{ backgroundColor: '#F3F5F4', padding: '20px 40px' }}>
                                                    <img src="https://thenounproject.com/api/private/icons/403614/edit/?backgroundShape=SQUARE&backgroundShapeColor=%23000000&backgroundShapeOpacity=0&exportSize=752&flipX=false&flipY=false&foregroundColor=%23000000&foregroundOpacity=1&imageFormat=png&rotation=0&token=gAAAAABkMWMLEat10iesV-C94ACSAoRV-z5Xo4OgdZfO4y9adnM0BoOtlZzbuS0r96AmElrzfGxIQ_dnm-rY5ztpyDLqIJMjSg%3D%3D"
                                                        alt="Image"
                                                        width="50"
                                                        height="50"
                                                        >
                                                    </img>
                                                    <br></br>
                                                    <span style = {{ color: 'black'}}>DROP IN</span>
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
            <Footer />
        </>
    )
}

export default LoggedInHomepage;
