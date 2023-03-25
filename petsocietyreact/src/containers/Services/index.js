import React from 'react';
import "./styles.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import { CardGroup, Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap';
import { MDBCol, MDBRow, MDBTypography, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText } from 'mdb-react-ui-kit';


function Services() {
  return (
    <>
      <MDBTypography tag='div' className='display-3 pt-5 pb-3 text-center'>
        Our Services
      </MDBTypography>

      <div className="row pt-3 pb-5">
        <div className="col-md-6"></div>
        <div className="col-md-6 text-center mx-auto">
          <h4>Give you and your pet the best experience possible. 
            Join the PetSociety family and give your furry friend the love and care they deserve!</h4>
        </div>
        <div className="col-md-6"></div>
      </div>

      <div className="d-flex justify-content-center pb-5">
        <button className="btn btn-primary mx-2">Register Now!</button>
        <button className="btn btn-secondary mx-2">Look for More</button>
      </div>

      <MDBRow className="row-cols-1 row-cols-md-2 g-4 py-4">
      <MDBCol>
        <MDBCard>
          <MDBCardBody>
            <MDBCardTitle>Card 1</MDBCardTitle>
            <MDBCardText>
              This is some text within a card body.
            </MDBCardText>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
      <MDBCol>
        <MDBCard>
          <MDBCardBody>
            <MDBCardTitle>Card 2</MDBCardTitle>
            <MDBCardText>
              This is some text within a card body.
            </MDBCardText>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBRow>

      <CardGroup>
        <Card>
          <CardImg
            alt="Card image cap"
            src="https://picsum.photos/318/180"
            top
            width="100%"
          />
          <CardBody>
            <CardTitle tag="h5">
              DOG BOARDING
            </CardTitle>
            <CardSubtitle
              className="mb-2 text-muted"
              tag="h6"
            >
              No more loud kennels or cages.
            </CardSubtitle>
            <CardText>
              Discover your dog’s home away from home with a loving dog sitter in your neighborhood.
            </CardText>
            <Button>
              Book One Now!
            </Button>
          </CardBody>
        </Card>
        <Card>
          <CardImg
            alt="Card image cap"
            src="https://picsum.photos/318/180"
            top
            width="100%"
          />
          <CardBody>
            <CardTitle tag="h5">
              PET TAXI
            </CardTitle>
            <CardSubtitle
              className="mb-2 text-muted"
              tag="h6"
            >
              Travel in style with your furkid.
            </CardSubtitle>
            <CardText>
              Where to next? Get to your next destination safely and without fuss.
            </CardText>
            <Button>
              Book One Now!
            </Button>
          </CardBody>
        </Card>
        <Card>
          <CardImg
            alt="Card image cap"
            src="https://picsum.photos/318/180"
            top
            width="100%"
          />
          <CardBody>
            <CardTitle tag="h5">
              DAYCARE
            </CardTitle>
            <CardSubtitle
              className="mb-2 text-muted"
              tag="h6"
            >
              Finally—a doggy day care option that works
            </CardSubtitle>
            <CardText>
              Personalized care for your pet - without breaking the bank.
            </CardText>
            <Button>
              Drop Off Now!
            </Button>
          </CardBody>
        </Card>
        <Card>
          <CardImg
            alt="Card image cap"
            src="https://picsum.photos/318/180"
            top
            width="100%"
          />
          <CardBody>
            <CardTitle tag="h5">
              DROP IN
            </CardTitle>
            <CardSubtitle
              className="mb-2 text-muted"
              tag="h6"
            >
              Safely and with no hassle.
            </CardSubtitle>
            <CardText>
              Let PetSociety's trusted sitters check up on your pet -- no fuss at all!
            </CardText>
            <Button>
              Check Now!
            </Button>
          </CardBody>
        </Card>
      </CardGroup>
    </>
  )
}

export default Services;