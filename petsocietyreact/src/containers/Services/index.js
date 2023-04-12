import React from 'react';
import { Helmet } from "react-helmet";
import "./styles.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap';
import { MDBCol, MDBRow, MDBTypography, MDBBtn } from 'mdb-react-ui-kit';
import { Link, Route, Routes } from 'react-router-dom';
import Footer from '../../components/Footer';
import serviceBanner from '../../icons/services_banner.png';
import { position } from 'dom-helpers';


function Services() {
  return (
    <>
     <div>
        <Helmet>
          <title>Pet Society | Services</title>
        </Helmet>
      </div>

      <div className="hero-section">
        <div className="bg-image" style={{
          backgroundImage: `url(${serviceBanner})`,
          backgroundSize: 'cover',
          height: '90vh',
          width: '100%',
          display: 'block',
          position: "relative"
        }}>
          <MDBRow className='mt-5'>
            <MDBCol md='12'>
              {/* Additional content */}
            </MDBCol>
          </MDBRow>
          <MDBRow className='mt-5'>
            <MDBCol md='12'>
              {/* Additional content */}
            </MDBCol>
          </MDBRow>
          <MDBRow className='mt-5'>
            <MDBCol md='12'>
              {/* Additional content */}
            </MDBCol>
          </MDBRow>
          <MDBRow className='mt-5'>
            <MDBCol md='12'>
              {/* Additional content */}
            </MDBCol>
          </MDBRow>
          <MDBRow className='mt-5'>
            <MDBCol md='12'>
              {/* Additional content */}
            </MDBCol>
          </MDBRow>
          <MDBRow className='mt-5'>
            <MDBCol md='12'>
              {/* Additional content */}
            </MDBCol>
          </MDBRow>
          <MDBRow className='mt-5'>
            <MDBCol md='12'>
              {/* Additional content */}
            </MDBCol>
          </MDBRow>
          <MDBRow className='mt-5'>
            <MDBCol md='12'>
              {/* Additional content */}
            </MDBCol>
          </MDBRow>
          <MDBRow className='mt-5'>
            <MDBCol md='12'>
              {/* Additional content */}
            </MDBCol>
          </MDBRow>
          <MDBRow className='p-5 align-items-end'>
            <MDBCol md='1'></MDBCol>
            <MDBCol md='2' className='offset-md-2 offset-lg-0 text-end mt-5'>

              <MDBBtn
                class="btn btn-primary w-100 btn-rounded"
                style={{
                  backgroundColor: '#7B69A9',
                  padding: '15px 20px',
                }}
              >
               <a href="/#/SignUp/1" style={{color : 'white'}}><b>Register Now!</b></a> 
              </MDBBtn>

            </MDBCol>
            <MDBCol md='2' className='offset-md-2 offset-lg-0 text-end mt-5'>
            <Link to="/SignUp/1">
              <MDBBtn
                class="btn btn-primary w-100 btn-rounded"
                style={{
                  backgroundColor: '#808080',
                  padding: '15px 20px',
                }}
              >
                <b>See More</b>
              </MDBBtn>
              </Link>
            </MDBCol>
          </MDBRow>
        </div> 
      </div>

      <section id="service">
        <div className="service-card-section" 
        style={{backgroundColor : '#DEBD75',
        padding : '70px'}}>
          <MDBRow className="row-cols-1 row-cols-md-2 g-4 py-4">
            <MDBCol>
              <div class="card mb-3">
                <img src="https://www.caninecountryclubaz.com/wp-content/uploads/2019/03/shutterstock_140724097-min-1024x683.jpg"
                  class="card-img-top"
                  alt="dogboarding"
                  width="250"
                  height="360" />
                <div class="card-body">
                  <h5 class="card-title">DOG BOARDING</h5>
                  <p class="card-text">
                    <small class="text-muted">No more loud kennels or cages.</small>
                  </p>
                  <p class="card-text">
                    Discover your dog’s home away from home with a loving dog sitter in your neighborhood.
                  </p>
                  <Button>
                    Book One Now!
                  </Button>
                </div>
              </div>
            </MDBCol>

            <MDBCol>
              <div class="card mb-3">
                <img src="https://zumvet.com/blog/wp-content/uploads/2023/02/female-owner-and-dog-in-a-pet-taxi.v1.jpg"
                  class="card-img-top"
                  alt="pettaxi"
                  width="250"
                  height="360" />
                <div class="card-body">
                  <h5 class="card-title">DOG WALKING</h5>
                  <p class="card-text">
                    <small class="text-muted">Travel in style with your furkid.</small>
                  </p>
                  <p class="card-text">
                    Where to next? Get to your next destination safely and without fuss. Or walk there -- it's simple!
                  </p>
                  <Button>
                    Book One Now!
                  </Button>
                </div>
              </div>
            </MDBCol>
            <MDBCol>
              <div class="card mb-3">
                <img src="https://www.houndstownfranchise.com/wp-content/uploads/2019/12/Pittsburgh-Pups-960x675.jpg"
                  class="card-img-top"
                  alt="doggydaycare"
                  width="250"
                  height="360" />
                <div class="card-body">
                  <h5 class="card-title">DAYCARE</h5>
                  <p class="card-text">
                    <small class="text-muted">Finally—a doggy day care option that works</small>
                  </p>
                  <p class="card-text">
                    Personalized care for your pet - without breaking the bank.
                  </p>
                  <Button>
                    Book One Now!
                  </Button>
                </div>
              </div>
            </MDBCol>

            <MDBCol>
              <div class="card mb-3">
                <img src="https://images.squarespace-cdn.com/content/v1/54e7a1a6e4b08db9da801ded/7f2dae36-5650-4b84-b184-684f46fe68aa/98.jpg"
                  class="card-img-top"
                  alt="checkin"
                  width="250"
                  height="360" />
                <div class="card-body">
                  <h5 class="card-title">DROP IN</h5>
                  <p class="card-text">
                    <small class="text-muted">Safely and with no hassle.</small>
                  </p>
                  <p class="card-text">
                    Let PetSociety's trusted sitters check up on your pet -- no fuss at all!
                  </p>
                  <Button>
                    Book One Now!
                  </Button>
                </div>
              </div>
            </MDBCol>
          </MDBRow>
        </div>
      </section>
      <Footer />

    </>
  )
}

export default Services;