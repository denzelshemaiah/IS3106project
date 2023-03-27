import React from 'react';
import "./styles.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import { CardGroup, Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap';
import { MDBCol, MDBRow, MDBTypography, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn } from 'mdb-react-ui-kit';
import { Link, Route, Routes } from 'react-router-dom';
import Footer from '../../components/Footer';
import ResponsiveNavbar from '../../components/ResponsiveNavbar/index.js';


function Services() {
  return (
    <>
          <ResponsiveNavbar />

      <div className="hero-section">
        <MDBTypography tag='div' className='display-3 pt-5 pb-3 text-center'>
          Our Services
        </MDBTypography>

        <div className="row pt-3 pb-5 mx-auto">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <div className="w-100 text-center">
              <h4>Give you and your pet the best experience possible.
                Join the PetSociety family and give your furry friend the love and care they deserve!</h4>
            </div>
          </div>
          <div className="col-md-2"></div>
        </div>

        <div className="d-flex justify-content-center pb-5">
          <a href="/#/SignUp">
          <MDBBtn style={{backgroundColor: '#4B0082', padding: '10px 20px'}}>
            Register Now!
            </MDBBtn>        
          </a>
          <a href="#service">
          <MDBBtn style={{backgroundColor: '#808080', padding: '10px 20px'}}>
              See More
              </MDBBtn>
          </a>
        </div>
      </div>

      <section id="service">
        <div className="service-card-section">
          <MDBRow className="row-cols-1 row-cols-md-2 g-4 py-4">
            <MDBCol>
              <div class="card mb-3">
                <img src="https://www.caninecountryclubaz.com/wp-content/uploads/2019/03/shutterstock_140724097-min-1024x683.jpg" class="card-img-top" alt="dogboarding" />
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
                <img src="https://zumvet.com/blog/wp-content/uploads/2023/02/female-owner-and-dog-in-a-pet-taxi.v1.jpg" class="card-img-top" alt="pettaxi" />
                <div class="card-body">
                  <h5 class="card-title">PET TAXI</h5>
                  <p class="card-text">
                    <small class="text-muted">Travel in style with your furkid.</small>
                  </p>
                  <p class="card-text">
                    Where to next? Get to your next destination safely and without fuss.
                  </p>
                  <Button>
                    Book One Now!
                  </Button>
                </div>
              </div>
            </MDBCol>
            <MDBCol>
              <div class="card mb-3">
                <img src="https://www.houndstownfranchise.com/wp-content/uploads/2019/12/Pittsburgh-Pups-960x675.jpg" class="card-img-top" alt="doggydaycare" />
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
                <img src="https://images.squarespace-cdn.com/content/v1/54e7a1a6e4b08db9da801ded/7f2dae36-5650-4b84-b184-684f46fe68aa/98.jpg" class="card-img-top" alt="checkin" />
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