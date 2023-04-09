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
import moment from 'moment-timezone';
import './style.css';
import { DropdownButton, Dropdown, Form } from 'react-bootstrap';


function SignUp(props) {
  const navigate = useNavigate();
  const { page } = useParams();

  const redirect2 = () => {
    let path = `/SignUp/2`;
    navigate(path);
  }

  const redirect3 = () => {
    let path = '/SignUp/3';
    navigate(path);
  }

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

  let bankAcc = {};
  let cc = {};

  // creating just user without its associated stuff first
  let user = {};

  // new plan: never creating user until we get the roles. so we must still have user in fe and separate
  // pp and ps entities in order to pass to new BE
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
    /* Api.createNewUser(user)
       .then((data) => {
         navigate("/LoggedInHomepage");
       }) */
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
        navigate("/LoggedInHomepage");
      })
  }

  cc = {
    ccNum: ccNum,
    expDate: expDate,
    ccName: ccName,
    cvv: cvv,
  }

  // creating final user with its related fields:
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

  // handle original creation of user within FE
  const handleCompleteUserCreation = (e) => {
    handleRegistrationOfUser(e);
    handleCreationOfCc(e);
    handleCreationOfBankAcc(e);
  }
  
  
  // pet parent attributes
  const [searches, setSearches] = useState([]);
  const [mgRequests, setMgRequests] = useState([]);
  const [bookings, setBookings] = useState([]);

  const petParent = {
    user,
    petParentAttributes: {
      searches: searches,
      mgRequests: mgRequests,
      bookings: bookings
    }
  };

  // creation of petparent
  const handleCreationOfParent = (e) => {
    e.preventDefault();
    Api.createNewParent(user, petParent)
      .then((data) => {
        navigate("/CreatePet");
      })
  }

  // PET SITTER
  let petSitter = {};
  let authenReq = {};
  let expForm = {};
  let safetyForm = {};

  // Attributes
  const [serviceAddress, setServiceAddress] = useState("");
  const [region, setRegion] = useState("");
  const [preference, setPreference] = useState("");
  const [schedule, setSchedule] = useState([]);
  const [rate, setRate] = useState([]);
  const [service, setService] = useState("");
  // setting serviceEnum as string, and converting to enum later in the BE

  // Frontend Creation of Sitter
  const handleRegistrationOfSitter = (e) => {
    e.preventDefault();

    petSitter = {
      user,
      petSitterAttributes: {
        serviceAddress: serviceAddress,
        region: region,
        preference: preference,
        schedule: schedule,
        rate: rate,
        service: service,
        authenReq: authenReq,
        expForm: expForm,
        safetyForm: safetyForm,
        bookings: bookings,
        mgRequests: mgRequests
      }
    }

    authenReq = {
      createdDate: createdDate,
      petSitter: userId,
      documents: documents,
    }
    console.log(authenReq);

    expForm = {
      yearsOfExperience: yearsOfExperience,
      headline: headline,
      experience: experience,
    }
    console.log(expForm);

    safetyForm = {
      q1: q1,
      q2: q2,
      q3: q3,
    } 
    console.log(safetyForm);
  }

  // Relationships
  // authenReq
  const [createdDate, setCreatedDate] = useState(moment().toDate());
  const [userId, setUserId] = useState(0);
  const [documents, setDocuments] = useState(null);

  // expForm
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [headline, setHeadLine] = useState("");
  const [experience, setExperience] = useState("");

   // safetyForm
   const [q1, setQ1] = useState("");
   const [q2, setQ2] = useState("");
   const [q3, setQ3] = useState("");

  // Backend Creation of authenReq, expForm, safetyForm 
  const handleCreationOfAuthenReq = (e) => {
    e.preventDefault();

    Api.createAndAssociateNewAuthenReq(authenReq)
      .then((data) => {
        navigate("/LoggedInHomepage");
      })
  }
  
  const handleCreationOfExperienceForm = (e) => {
    e.preventDefault();

    Api.createAndAssociateNewExperienceForm(expForm)
      .then((data) => {
        navigate("/LoggedInHomepage");
      })
  }

  const handleCreationOfSafetyForm = (e) => {
    e.preventDefault();

    Api.createAndAssociateNewSafetyForm(safetyForm)
      .then((data) => {
        navigate("/LoggedInHomepage");
      })
  }

   // Frontend Creation of Sitter 
   const handleCompletePetSitterCreation = (e) => {
    handleCompleteUserCreation(e);
    handleCreationOfAuthenReq(e);
    handleCreationOfExperienceForm(e);
    handleCreationOfSafetyForm(e);
    handleRegistrationOfSitter(e); 
}

  // Backend Creation of Sitter
  const handleCreationOfSitter = (e) => {
    e.preventDefault();

    Api.createNewSitter(user, petSitter)
      .then((data) => {
        navigate("/LoggedInHomepage");
      })
  }
  
  const [reportsAgainstUser, setReportsAgainstUser] = useState(null);
  const [reportsUserMade, setReportsUserMade] = useState(null);
  const [ratingsForUsers, setRatingsForUsers] = useState(null);
  const [ratingsUserMade, setRatingsUserMade] = useState(null);


  // just storing user attributes first and setting values in FRONTEND USER only
  if (page === "1") {
    return (
      <>
        <MDBTypography tag='div' className='h1 pt-5 text-center'>
          Sign Up
        </MDBTypography>

        <form onSubmit={handleCompleteUserCreation}>
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
        </form>
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
                  <MDBCardImage src='https://images.unsplash.com/photo-1668036065203-4f1b08f1fcf1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
                    className='w-100 rounded-top'
                    alt="dogscenery"
                    height="500"
                  />

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
                      type="submit"
                      onClick = {redirect3}>
                      Submit
                      </MDBBtn>

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
                  <span>Welcome Onboard!</span>
                  <br></br>
                  <span class="text-primary">Who do you want to be?</span>
                </h1>
                <MDBRow>
                  <MDBCol>
                    <div class="row">
                      <div class="col">
                        <a href="/#/SignUp/1">
                          <button class="btn btn-primary w-100"
                            style={{ backgroundColor: '#4B0082', padding: '20px 20px' }}
                            onClick={handleCreationOfParent}>
                            <img src="https://cdn-icons-png.flaticon.com/512/3775/3775548.png"
                              alt="Image"
                              width="250"
                              height="250"
                              style={{ padding: '10px' }}>
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
                            style={{ padding: '10px' }}>
                          </img>
                          <h2 style={{ color: 'black' }}>I want to be a PetSitter</h2>
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

  // fill in petSitter attributes here in this page
  else if (page === "5") {
    return (
      <>
        <h1>test2</h1>
      //put below in a method:
        {/* <button onClick={handleCreationOfSitter}>
          Submit
        </button> */}
      // redirect 2 sitter homepage

        <div className="row pt-3 pb-5 mx-auto">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <div className="w-100 text-center">
              <h3>A few more steps to go!</h3>
              <h4>What service do you want to provide as a Pet Sitter?</h4>
            </div>
          </div>
          <div className="col-md-2"></div>
        </div>

        <form onSubmit={handleCreationOfSitter}>
          <MDBContainer fluid className='h-custom'>

            <MDBRow className='d-flex justify-content-center align-items-center h-100'>
              <MDBCol col='12' className='m-5'>
                <MDBCard>

                  <MDBCardBody className='p-0'>

                    <MDBRow>
                      <div className="mb-1">
                        <label htmlFor="gridCheck" className="form-label">
                          I want to provide
                        </label>
                      </div>

                      <div className="mb-6">
                        <DropdownButton id="dropdown-basic-button" title="Service" variant="light">
                          <Dropdown.Item href="#action-1">Daycare</Dropdown.Item>
                          <Dropdown.Item href="#action-2">Boarding</Dropdown.Item>
                          <Dropdown.Item href="#action-3">Drop-in Visits</Dropdown.Item>
                          <Dropdown.Item href="#action-3">Dog Walker</Dropdown.Item>
                        </DropdownButton>
                      </div>

                      <MDBRow>
                        <div className="mb-1">
                          <label htmlFor="gridCheck" className="form-label">
                            Pet Preference
                          </label>
                        </div>

                        <Form>
                          <Form.Group controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Dogs and Cats" checked={false} />
                            <Form.Check type="checkbox" label="Dogs only" checked={false} />
                            <Form.Check type="checkbox" label="Cats only" checked={false} />
                          </Form.Group>
                        </Form>

                      </MDBRow>

                    </MDBRow>

                  </MDBCardBody>
                </MDBCard>

              </MDBCol>
            </MDBRow>

          </MDBContainer>
        </form>
      </>
    )
  }
}

export default SignUp;
