import React, { useState } from 'react';
import { Navigate, useParams } from "react-router-dom";
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


function SignUp(props) {
  // params
  const { userId = 0 } = useParams;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [contactNum, setContactNum] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [billingAddress, setBillingAddress] = useState("");

  const [status, setStatus] = useState([]);
  
  async function fetchUserStatusEnum() {
    try {
      const data = await getUserStatusEnum();
      setStatus(data[0]);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchUserStatusEnum();
  }, []);

  const handleRegistration = (e) => {
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
      billingAddress,
      status
    }).then((data) => {
      Navigate("/LoggedInHomepage");
    })
  }


  return (
    <>
      <MDBTypography tag='div' className='h1 pt-5 text-center'>
        Sign Up
      </MDBTypography>

      <MDBContainer fluid className='h-custom'>

        <MDBRow className='d-flex justify-content-center align-items-center h-100'>
          <MDBCol col='12' className='m-5'>
            <form onSubmit={handleRegistration}>
              <MDBCard>

                <MDBCardBody className='p-0'>

                  <MDBRow>

                    <MDBCol md='6' className='p-5 bg-gray rounded-start'>

                      <h3 className="fw-bold mb-5" style={{ color: '#4835d4' }}>General Information</h3>

                      <MDBRow>

                        <MDBCol md='6'>
                          <MDBInput wrapperClass='mb-4'
                            label='First Name'
                            size='lg'
                            id='inputFirstName'
                            type='text'
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)} />
                        </MDBCol>

                        <MDBCol md='6'>
                          <MDBInput wrapperClass='mb-4'
                            label='Last Name'
                            size='lg'
                            id='inputLastName'
                            type='text'
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)} />
                        </MDBCol>

                      </MDBRow>


                      <MDBInput wrapperClass='mb-4'
                        label='Username'
                        size='lg'
                        id='inputUsername'
                        type='text'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} />


                      <MDBRow>

                        <MDBCol md='3'>
                          <MDBInput wrapperClass='mb-3'
                            label='Age'
                            size='lg'
                            id='inputAge'
                            type='text'
                            value={age}
                            onChange={(e) => setAge(e.target.value)} />
                        </MDBCol>

                        <MDBCol md='6'>

                        </MDBCol>

                      </MDBRow>

                      <MDBRow>
                        <MDBCol md='12'>
                          <label className="form-label" htmlFor="customFile">Profile Picture</label>
                          <input type="file"
                            className="form-control"
                            id="customFile"
                            value={profilePicture}
                            onChange={(e) => setProfilePicture(e.target.value)} />
                        </MDBCol>
                      </MDBRow>

                    </MDBCol>


                    <MDBCol md='6' className='p-5 rounded-end' style={{ backgroundColor: '#4835d4' }}>

                      <h3 className="fw-bold mb-5 text-white" style={{ color: '#4835d4' }}>Contact Details</h3>
                      <MDBInput wrapperClass='mb-4'
                        labelClass='text-white'
                        label='Email'
                        size='lg'
                        id='inputEmail'
                        type='text'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />

                      <MDBInput wrapperClass='mb-4'
                        labelClass='text-white'
                        label='Password'
                        size='lg'
                        id='inputPassword'
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />


                      <MDBRow>

                        <MDBCol md='5'>
                          <MDBInput wrapperClass='mb-4'
                            labelClass='text-white'
                            label='Code +'
                            size='lg'
                            id='form9'
                            type='text' />
                        </MDBCol>

                        <MDBCol md='7'>
                          <MDBInput wrapperClass='mb-4'
                            labelClass='text-white'
                            label='Phone Number'
                            size='lg'
                            id='inputContactNum'
                            type='text'
                            value={contactNum}
                            onChange={(e) => setContactNum(e.target.value)} />
                        </MDBCol>
                      </MDBRow>

                      <MDBRow>

                        <MDBCol md='5'>
                          <MDBInput wrapperClass='mb-4'
                            labelClass='text-white'
                            label='Code +'
                            size='lg'
                            id='form9'
                            type='text' />
                        </MDBCol>

                        <MDBCol md='7'>
                          <MDBInput wrapperClass='mb-4'
                            labelClass='text-white'
                            label='Emergency Contact'
                            size='lg'
                            id='inputEmergencyContact'
                            type='text'
                            value={emergencyContact}
                            onChange={(e) => setEmergencyContact(e.target.value)} />
                        </MDBCol>
                      </MDBRow>


                      <MDBInput wrapperClass='mb-4'
                        labelClass='text-white'
                        label='Billing Address'
                        size='lg'
                        id='inputBillingAddress'
                        type='text'
                        value={billingAddress}
                        onChange={(e) => setBillingAddress(e.target.value)} />


                      <MDBCheckbox name='flexCheck' id='flexCheckDefault' labelClass='text-white mb-4' label='I do accept the Terms and Conditions of PetSociety.' />

                      <MDBBtn color='light'
                        size='lg'
                        type="submit"
                        onClick={(e) => setStatus(e.target.value)}>
                        Register
                      </MDBBtn>

                    </MDBCol>
                  </MDBRow>

                </MDBCardBody>
              </MDBCard>
            </form>

          </MDBCol>
        </MDBRow>

      </MDBContainer>
    </>
  );
}

export default SignUp;
