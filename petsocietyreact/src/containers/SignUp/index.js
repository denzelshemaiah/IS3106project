import React, { useState } from 'react';
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
  const navigate = useNavigate();
  const { page } = useParams();

  // for user, its attributes
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
  // removed status as it is now set in the backend

  const redirect2 = () => {
    let path = `/SignUp/2`;
    navigate(path);
  }

  let bankAcc = {};
  let cc = {};
  let user = {}
  // creating just user without its associated stuff first
  const handleRegistrationOfUser = (e) => {
    e.preventDefault();

    bankAcc = {
      bankAccNum: bankAccNum,
      bankName: bankName,
      accName: accName,
    }
    console.log(bankAcc);

    cc = {
      ccNum: ccNum,
      expDate: expDate,
      ccName: ccName,
      cvv: cvv,
    }

    console.log(cc);

    user = {
      firstName: firstName,
      lastName: lastName,
      username: username,
      contactNum: contactNum,
      email: email,
      password: password,
      age: age,
      emergencyContact: emergencyContact,
      profilePicture: profilePicture,
      billingAddress: billingAddress,
      bankAcc: bankAcc,
      cc: cc,
    }
    Api.createNewUser(user)
      .then((data) => {
        navigate("/LoggedInHomepage");
      })
  }

  // relationships
  // for bankAcc
  const [bankAccNum, setBankAccNum] = useState("");
  const [bankName, setBankName] = useState("");
  const [accName, setAccName] = useState("");

  const handleCreationOfBankAcc = (e) => {
    e.preventDefault();
    Api.createAndAssociateNewBankAccount(bankAcc)
      .then((data) => {
        Navigate("/LoggedInHomepage");
      })
  }

  // for cc
  const [ccNum, setCcNum] = useState("");
  const [expDate, setExpDate] = useState("");
  const [ccName, setCcName] = useState("");
  const [cvv, setCvv] = useState("");

  const now = new Date;
  const until = new Date(now.getFullYear() + 10, now.getMonth());

  // creating cc
  const handleCreationOfCc = (e) => {
    e.preventDefault();
    Api.createAndAssociateNewCreditCard(cc)
      .then((data) => {
        Navigate("/LoggedInHomepage");
      })
  }

  // handle money details
  const handleCompleteUserCreation = (e) => {
    handleRegistrationOfUser();
    handleCreationOfCc();
    handleCreationOfBankAcc();
    navigate(`/SignUp/3`);
  }

  const [reportsAgainstUser, setReportsAgainstUser] = useState(null);
  const [reportsUserMade, setReportsUserMade] = useState(null);
  const [ratingsForUsers, setRatingsForUsers] = useState(null);
  const [ratingsUserMade, setRatingsUserMade] = useState(null);

  // retrieve updated user here
  const updatedUser = Api.getUser(user);

  //creating final user with all fields
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
                            type='number'
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
                        onClick={redirect2}
                      >
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

  // UI: cc and bankacc details 
  else if (page === "2") {
    return (
      <>
        <form onSubmit={handleCompleteUserCreation}>
          <MDBContainer fluid className='h-custom'>

            <MDBRow className='d-flex justify-content-center align-items-center h-100'>

              <MDBCol lg='8'>

                <MDBCard className='my-5 rounded-3'>
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
                      value={bankAccNum}
                      onChange={(e) => setBankAccNum(e.target.value)}
                    />

                    <MDBRow>

                      <MDBCol md='6'>
                        <MDBInput wrapperClass='mb-4'
                          label='Bank Name'
                          id='inputBankName'
                          type='text'
                          value={bankName}
                          onChange={(e) => setBankName(e.target.value)}
                        />
                      </MDBCol>

                      <MDBCol md='6'>
                        <MDBInput wrapperClass='mb-4'
                          label='Name on Account'
                          id='inputAccName'
                          type='text'
                          value={accName}
                          onChange={(e) => setAccName(e.target.value)} />
                      </MDBCol>


                    </MDBRow>


                    <h5>Credit Card Details</h5>
                    <MDBRow>
                      <MDBCol md='12'>
                        <MDBInput wrapperClass='mb-4'
                          label='Credit Card Number'
                          id='inputCcNum'
                          type='text'
                          value={ccNum}
                          onChange={(e) => setCcNum(e.target.value)} />
                      </MDBCol>
                    </MDBRow>

                    <MDBRow>
                      <MDBCol md='5'>
                        <MDBInput wrapperClass='mb-4'
                          label='Name on Credit Card'
                          id='inputCcName'
                          type='text'
                          value={ccName}
                          onChange={(e) => setCcName(e.target.value)} />
                      </MDBCol>

                      <MDBCol md='4'>
                        <MDBInput wrapperClass='mb-4'
                          label='Expiry (MMYYYY)'
                          id='inputExpDate'
                          type='text'
                          maxLength='6'
                          value={expDate}
                          onChange={(e) => setExpDate(e.target.value)} />

                      </MDBCol>

                      <MDBCol md='3'>
                        <MDBInput wrapperClass='mb-4'
                          label='CVV'
                          id='inputCvv'
                          type='text'
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value)} />
                      </MDBCol>
                    </MDBRow>

                    <MDBBtn color='success'
                      className='mb-4'
                      size='lg'
                      type="submit">
                      Submit</MDBBtn>

                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </form>
      </>
    );
  }

  else if (page === "3") {
    return (
      <>
        <div class="py-5 text-center">
          <div class="container pb-md-5">
            <div class="row d-flex justify-content-center">
              <div class="col-lg-10">
                <h1 class="my-5 display-3 fw-bold ls-tight">
                  <span>Welcome, {updatedUser}!</span>
                  <br></br>
                  <span class="text-primary">Who do you want to be?</span>
                </h1>
                <MDBRow>
                  <MDBCol>
                    <div class="row">
                      <div class="col">
                      <a href="/#/SignUp/1">
                        <button class="btn btn-primary w-100"
                          style={{ backgroundColor: '#4B0082', padding: '20px 20px' }}>
                            <img src="https://cdn-icons-png.flaticon.com/512/3775/3775548.png" 
                            alt="Image" 
                            width="250" 
                            height="250"
                            style={{padding: '10px'}}>
                            </img>
                          <h2>I want to be a PetParent</h2>
                        </button>
                        </a>
                      </div>
                    </div>
                  </MDBCol>

                  <MDBCol>
                    <div class="row">
                      <div class="col">
                        <button class="btn btn-primary w-100"
                          style={{ backgroundColor: '#F3F5F4', padding: '20px 40px' }}>
                            <img src="https://static.thenounproject.com/png/1138226-200.png" 
                            alt="Image" 
                            width="250" 
                            height="250"
                            style={{padding: '10px'}}>
                            </img>
                          <h2 style={{color: 'black'}}>I want to be a PetSitter</h2>
                        </button>
                      </div>
                    </div>
                  </MDBCol>
                </MDBRow>


              </div>
            </div>
          </div>
        </div>
      </>
    )
  }


}

export default SignUp;
