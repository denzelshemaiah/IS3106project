import React, { useState, useEffect } from 'react';
import { Navigate, useParams, useNavigate } from "react-router-dom";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
  MDBTypography,
  MDBCardImage
}
  from 'mdb-react-ui-kit';
import { MDBCard } from 'mdbreact';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import Api from "../../helpers/Api";


function SignUp(props) {

  const { page } = useParams();
  // params
  const [userId] = useState();
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
  const [reportsAgainstUser, setReportsAgainstUser] = useState(null);
  const [reportsUserMade, setReportsUserMade] = useState(null);
  const [bankAcc, setBankAcc] = useState(fetchCreateAndAssociateNewBankAccount);
  const [ratingsForUsers, setRatingsForUsers] = useState(null);
  const [ratingsUserMade, setRatingsUserMade] = useState(null);
  const [cc, setCc] = useState(null);

  const navigate = useNavigate();

  const userRegistrationStep2 = (e) => {
    setStatus(e.target.value);
    navigate('/SignUp/2');
  };

  // for userstatusenum
  async function fetchUserStatusEnum() {
    try {
      const data = await Api.getUserStatusEnum();
      setStatus(data[0]);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchUserStatusEnum();
  }, []);

  // for bankAcc
  async function fetchCreateAndAssociateNewBankAccount() {
    try {
      const data = await Api.createAndAssociateNewBankAccount();
      setBankAcc(data);
    } catch (error) {
      console.error(error);
    }
  }


  // final registration, reading all properties of User
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
      status,
      reportsAgainstUser,
      reportsUserMade,
      bankAcc,
      ratingsForUsers,
      ratingsUserMade,
      cc
    }).then((data) => {
      Navigate("/LoggedInHomepage");
    })
  }

  if (page === "1") {
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
                        onClick={userRegistrationStep2}>
                        Next
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

  // rest of the fields are filled in by user here in order to hopefully avoid constraint violations
  else if (page === "2") {
    // do handleRegistration here
    return (
      <>
        <MDBContainer fluid className='h-custom'>

          <MDBRow className='d-flex justify-content-center align-items-center h-100'>

            <MDBCol lg='8'>

              <MDBCard className='my-5 rounded-3' style={{ maxWidth: '600px' }}>
                <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img3.webp'
                  className='w-100 rounded-top'
                  alt="Sample photo" />

                <MDBCardBody className='px-5'>

                  <h3 className="mb-4 pb-2 pb-md-0 mb-md-3 px-md-2">Welcome To PetSociety!</h3>
                  <p class="card-text">
                    <small class="text-muted">One more step before you're done!</small>
                  </p>

                  <h5>Bank Account Details</h5>
                  <MDBInput wrapperClass='mb-4'
                    label='Bank Account Number'
                    id='inputBankAcc'
                    type='text'
                    value={bankAcc.bankAccNum}
                    onChange={(e) => setBankAcc(e.target.value)} />

                  <MDBRow>

                    <MDBCol md='6'>
                      <MDBInput wrapperClass='mb-4'
                        label='Bank Name'
                        id='inputBankName'
                        type='text'
                        value={bankAcc.bankName}
                        onChange={(e) => setBankAcc(e.target.value)} />
                    </MDBCol>

                    <MDBCol md='6'>
                      <MDBInput wrapperClass='mb-4'
                        label='Account on Name'
                        id='inputAccName'
                        type='text'
                        value={bankAcc.accName}
                        onChange={(e) => setBankAcc(e.target.value)} />
                    </MDBCol>


                  </MDBRow>


                <h5>Credit Card Details</h5>
                  <MDBRow>
                    <MDBCol md='6'>
                      <MDBInput wrapperClass='mb-4' label='Registration code' id='form3' type='text' />
                    </MDBCol>
                  </MDBRow>

                  <MDBBtn color='success' className='mb-4' size='lg'>Submit</MDBBtn>

                </MDBCardBody>
              </MDBCard>

            </MDBCol>
          </MDBRow>

        </MDBContainer>
      </>
    );
  }


}

export default SignUp;
