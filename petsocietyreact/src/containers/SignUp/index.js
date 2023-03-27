import React from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
  MDBTypography
}
  from 'mdb-react-ui-kit';
import { MDBCard } from 'mdbreact';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import Api from "../../helpers/Api";


function SignUp() {

  /* const handleRegistration = () => {
    Api.createNewUser({
      userId,
      firstName,
      lastName,
      username,
      contactNum,
      email,
      password,
      age,
      emergencyContact,
      profilePicture,
      billingAddress
    })
  } */





  return (
    <>
      <MDBTypography tag='div' className='h1 pt-5 text-center'>
          Sign Up
        </MDBTypography>

      <MDBContainer fluid className='h-custom'>

        <MDBRow className='d-flex justify-content-center align-items-center h-100'>
          <MDBCol col='12' className='m-5'>

            <MDBCard>
           
              <MDBCardBody className='p-0'>

                <MDBRow>

                  <MDBCol md='6' className='p-5 bg-gray rounded-start'>

                    <h3 className="fw-bold mb-5" style={{ color: '#4835d4' }}>General Information</h3>

                    <MDBRow>

                      <MDBCol md='6'>
                        <MDBInput wrapperClass='mb-4' label='First Name' size='lg' id='name' type='text' />
                      </MDBCol>

                      <MDBCol md='6'>
                        <MDBInput wrapperClass='mb-4' label='Last Name' size='lg' id='form2' type='text' />
                      </MDBCol>

                    </MDBRow>


                    <MDBInput wrapperClass='mb-4' label='Username' size='lg' id='form3' type='text' />


                    <MDBRow>

                      <MDBCol md='3'>
                        <MDBInput wrapperClass='mb-3' label='Age' size='lg' id='form4' type='text' />
                      </MDBCol>

                      <MDBCol md='6'>

                      </MDBCol>

                    </MDBRow>

                    <MDBRow>
                      <MDBCol md='12'>
                        <label className="form-label" htmlFor="customFile">Profile Picture</label>
                        <input type="file" className="form-control" id="customFile" />
                      </MDBCol>
                    </MDBRow>

                  </MDBCol>


                  <MDBCol md='6' className='p-5 rounded-end' style={{ backgroundColor: '#4835d4' }}>

                    <h3 className="fw-bold mb-5 text-white" style={{ color: '#4835d4' }}>Contact Details</h3>
                    <MDBInput wrapperClass='mb-4' labelClass='text-white' label='Email' size='lg' id='form5' type='text' />

                    <MDBInput wrapperClass='mb-4' labelClass='text-white' label='Password' size='lg' id='form6' type='password' />


                    <MDBRow>

                      <MDBCol md='5'>
                        <MDBInput wrapperClass='mb-4' labelClass='text-white' label='Code +' size='lg' id='form9' type='text' />
                      </MDBCol>

                      <MDBCol md='7'>
                        <MDBInput wrapperClass='mb-4' labelClass='text-white' label='Phone Number' size='lg' id='form10' type='text' />
                      </MDBCol>
                    </MDBRow>

                    <MDBRow>

                      <MDBCol md='5'>
                        <MDBInput wrapperClass='mb-4' labelClass='text-white' label='Code +' size='lg' id='form9' type='text' />
                      </MDBCol>

                      <MDBCol md='7'>
                        <MDBInput wrapperClass='mb-4' labelClass='text-white' label='Emergency Contact' size='lg' id='form10' type='text' />
                      </MDBCol>
                    </MDBRow>


                    <MDBInput wrapperClass='mb-4' labelClass='text-white' label='Billing Address' size='lg' id='form6' type='text' />


                    <MDBCheckbox name='flexCheck' id='flexCheckDefault' labelClass='text-white mb-4' label='I do accept the Terms and Conditions of PetSociety.' />

                    <MDBBtn color='light' size='lg'>
                      Register
                    </MDBBtn>

                  </MDBCol>
                </MDBRow>

              </MDBCardBody>
            </MDBCard>
            

          </MDBCol>
        </MDBRow>

      </MDBContainer>
    </>
  );
}

export default SignUp;
