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
  MDBCardImage,
  MDBTextArea,
  MDBRadio
}
  from 'mdb-react-ui-kit';
import { MDBCard } from 'mdbreact';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import Api from "../../helpers/Api";
import moment from 'moment-timezone';
import './style.css';
import Form from 'react-bootstrap/Form';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import Button from '@mui/material/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCat, faDog } from '@fortawesome/free-solid-svg-icons';
import Footer from '../../components/Footer';
import dogBanner from '../../icons/dog_banner.png';


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

  const redirect4 = () => {
    let path = `/SignUp/Sitter`;
    navigate(path);
  }

  const redirect5 = () => {
    let path = `/SignUp/ExpForm`;
    navigate(path);
  }

  const redirect6 = () => {
    let path = `/SignUp/SafetyForm`;
    navigate(path);
  }

  const redirect7 = () => {
    let path = `/SignUp/Authentication`;
    navigate(path);
  }

  const redirectToSignIn = () => {
    let path = `/SignIn`;
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

  const today = new Date(moment().toDate());
  //const tomorrow = new Date();
  //tomorrow.setDate(tomorrow.getDate() + 1);

  // Attributes
  const [serviceAddress, setServiceAddress] = useState("");
  const [region, setRegion] = useState("");
  const [petPreference, setPetPreference] = useState("");
  const [maxWeightPreference, setMaxWeightPreference] = useState("");
  const [maxNumPets, setMaxNumPets] = useState("");
  const [schedule, setSchedule] = useState([today]);
  const [rate, setRate] = useState("");
  const [service, setService] = useState("");
  // setting serviceEnum as string, and converting to enum later in the BE

  // Relationships
  // authenReq
  const [createdDate, setCreatedDate] = useState(moment().toDate());
  //const [userId, setUserId] = useState(0);
  const [documents, setDocuments] = useState(null);

  // expForm
  const [yearsOfExperience, setYearsOfExperience] = useState(0);
  const [headline, setHeadline] = useState("");
  const [experience, setExperience] = useState("");

  // safetyForm
  const [q1, setQ1] = useState("");
  const [q2, setQ2] = useState("");
  const [q3, setQ3] = useState("");

  // Frontend Creation of Sitter
  const handleRegistrationOfSitter = (e) => {
    e.preventDefault();

    petSitter = {
      user,
      petSitterAttributes: {
        serviceAddress: serviceAddress,
        region: region,
        petPreference: petPreference,
        maxWeightPreference: maxWeightPreference,
        maxNumPets: maxNumPets,
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
      //petSitter: userId,
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

  const handleCreationOfBESitter = (e) => {
    handleCompletePetSitterCreation(e);
    handleCreationOfSitter(e);
  }

  function handleDayClick(day, { selected }) {
    if (selected) {
      setSchedule(schedule.filter(selectedDay => selectedDay.getTime() !== day.getTime()));
    } else {
      setSchedule([...schedule, day]);
    }
  }

  const footer =
    schedule && schedule.length > 0 ? (
      <p>You have selected {schedule.length} day(s).</p>
    ) : (
      <p>Please pick your free days.</p>
    );

  const [reportsAgainstUser, setReportsAgainstUser] = useState(null);
  const [reportsUserMade, setReportsUserMade] = useState(null);
  const [ratingsForUsers, setRatingsForUsers] = useState(null);
  const [ratingsUserMade, setRatingsUserMade] = useState(null);


  // just storing user attributes first and setting values in FRONTEND USER only
  if (page === "1") {
    return (
      <>
        <div style={{ margin: '20px' }}>
          <MDBTypography tag='div' className='h1 pt-5 text-center'>
            <FontAwesomeIcon icon={faDog} /> <b>Sign Up For PetSociety</b> <FontAwesomeIcon icon={faCat} />
          </MDBTypography>
        </div>


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
          <Footer />
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
                  <MDBCardImage src={dogBanner}
                    className='w-100 rounded-top'
                    alt="dogscenery"
                    height="450"
                    style={{ padding: '10px' }}
                  />

                  <MDBCardBody className='px-5'>

                    <h3 className="mb-4 p-3 pb-md-0 mb-md-3 px-md-2 text-center" class="text-center">
                      <b>Welcome To PetSociety!</b>
                    </h3>
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
                      onClick={redirect3}>
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
                          style={{ backgroundColor: '#F3F5F4', padding: '20px 40px' }}
                          onClick={redirect4}>
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

  // Pet Sitter Pages 
  else if (page === "Sitter") {
    return (
      <>
        <form onSubmit={handleCompletePetSitterCreation}>
          <MDBContainer fluid className='h-custom'>

            <MDBRow className='d-flex justify-content-center align-items-center h-100'>
              <MDBCol col='12' className='m-5'>
                <MDBCard>

                  <MDBCardBody className='p-0'>

                    <MDBRow>
                      <MDBCol md='6' className='p-5 bg-gray rounded-start' style={{ backgroundColor: '#e8e6f2' }}>
                        <h5 className="fw-bold" style={{ color: "black" }}>A few more steps to go!</h5>
                        <h6 className="fw-bold mb-5" style={{ color: '#afa7eb' }}>To become a Pet Sitter, please fill in the following fields.</h6>

                        <MDBRow>
                          <h6 className="fw-bold" style={{ color: '#39335c' }}>Select a Service</h6>

                          <Form.Group controlId="serviceSelect">
                            <Form.Control className="mb-1" as="select" style={{ backgroundColor: "#e8e6f2", color: "black" }}
                              value={service}
                              onChange={(e) => setService(e.target.value)}>
                              <option>Service</option>
                              <option value="DAYCARE">Daycare</option>
                              <option value="BOARDING">Boarding</option>
                              <option value="DROP_IN">Drop-in Visits</option>
                              <option value="WALKING">Dog Walking</option>
                            </Form.Control>
                          </Form.Group>
                          <h6 style={{ fontSize: 12 }}>Note: Each Pet Sitter can only provide one service.</h6>
                        </MDBRow>

                        <MDBRow>
                          <h6 className="fw-bold" style={{ color: '#e8e6f2' }}>.</h6>
                        </MDBRow>

                        <MDBRow>
                          <h6 className="fw-bold" style={{ color: '#39335c' }}>Region and Service Address</h6>
                          <MDBCol md='3'>
                            <Form.Group controlId="serviceSelect">
                              <Form.Control as="select" style={{ backgroundColor: "#e8e6f2", color: "black" }}
                                value={region}
                                onChange={(e) => setRegion(e.target.value)}>
                                <option>Region</option>
                                <option value="NORTH">North</option>
                                <option value="SOUTH">South</option>
                                <option value="EAST">East</option>
                                <option value="WEST">West</option>
                                <option value="CENTRAL">Central</option>
                              </Form.Control>
                            </Form.Group>
                          </MDBCol>
                          <MDBCol md='9'>
                            <MDBInput wrapperClass='mb-4'
                              labelClass='text-black' label='Service Address' size='lg' id='inputServiceAddress' type='text'
                              value={serviceAddress}
                              onChange={(e) => setServiceAddress(e.target.value)} />
                          </MDBCol>
                        </MDBRow>

                        <MDBRow>
                          <h5 className="fw-bold" style={{ color: '#39335c' }}>Preferences</h5>
                          <h6 className="fw-bold" style={{ color: '#39335c' }}>Pet Preference</h6>
                          <MDBCol md='6'>
                            <Form.Group controlId="preferenceSelect" className="mb-3">
                              <Form.Control as="select" style={{ backgroundColor: "#e8e6f2", color: "black" }}
                                value={petPreference}
                                onChange={(e) => setPetPreference(e.target.value)}>
                                <option>Select</option>
                                <option value="DOGS ONLY">Dogs Only</option>
                                <option value="CATS ONLY">Cats Only</option>
                                <option value="DOGS AND CATS">Dogs and Cats</option>
                              </Form.Control>
                            </Form.Group>
                          </MDBCol>
                        </MDBRow>

                        <MDBRow>
                          <h6 className="fw-bold" style={{ color: '#39335c' }}>Max Weight (in kg, per pet)</h6>
                          <MDBCol md='6'>
                            <MDBInput wrapperClass='mb-3' label='Max Weight' size='lg' id='inputMaxWeight' type='text'
                              value={maxWeightPreference}
                              onChange={(e) => setMaxWeightPreference(e.target.value)} />
                          </MDBCol>
                        </MDBRow>

                        <MDBRow>
                          <MDBCol md='6'>
                            <h6 className="fw-bold" style={{ color: '#39335c' }}>Max Number of Pets</h6>
                            <MDBInput wrapperClass='mb-3' label='Max Number' size='lg' id='inputMaxNumPets' type='text'
                              value={maxNumPets}
                              onChange={(e) => setMaxNumPets(e.target.value)} />
                          </MDBCol>
                        </MDBRow>
                      </MDBCol>


                      <MDBCol md='6' className='p-5 rounded-end' style={{ backgroundColor: '#d1cbf5' }}>
                        <h4 className="fw-bold mb-5 text-black" style={{ color: '#4835d4' }}>Service Rate and Schedule</h4>
                        <MDBRow>
                          <MDBCol md='6'>
                            <h6 className="fw-bold" style={{ color: '#39335c' }}>Preferred Rate Per Service (SGD)</h6>
                            <MDBInput wrapperClass='mb-4' labelClass='text-black' label='Rate' size='lg' id='inputRate' type='text'
                              value={rate}
                              onChange={(e) => setRate(e.target.value)} />
                          </MDBCol>
                        </MDBRow>

                        <MDBRow>
                          <h6 className="fw-bold" style={{ color: '#39335c' }}>Schedule</h6>

                          <DayPicker
                            mode="multiple"
                            min={1}
                            selected={schedule}
                            onDayClick={handleDayClick}
                            footer={footer}
                          />

                        </MDBRow>

                        <MDBBtn color='light' size='lg'
                          type="submit"
                          onClick={redirect5}
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
    )
  }

  else if (page === "ExpForm") {
    return (
      <>
        <form onSubmit={handleCompletePetSitterCreation}>
          <MDBContainer fluid className='bg-dark'>
            <MDBRow className='d-flex justify-content-center align-items-center h-100'>
              <MDBCol>

                <MDBCard className='my-4' style={{ backgroundColor: '#e8e6f2' }}>
                  <MDBRow className='g-0'>
                    <MDBCol md='6' className="d-none d-md-block">
                      <MDBCardImage src='https://images.unsplash.com/photo-1557199582-14cd70bc6d39?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80' alt="Sample photo" className="rounded-start" fluid />
                    </MDBCol>

                    <MDBCol md='6'>

                      <MDBCardBody className='text-black d-flex flex-column justify-content-center'>
                        <h3 className="mb-2 text-uppercase fw-bold">EXPERIENCE FORM</h3>
                        <h6 style={{ fontSize: 12 }} className="mb-3">We would like to get to know you and your experiences better.</h6>
                        <MDBRow>
                          <h5>Years of Experience</h5>
                          <MDBCol md="2">
                            <MDBInput wrapperClass='mb-4' label='Years' id='inputYearsOfExperience' type='text'
                              value={yearsOfExperience}
                              onChange={(e) => setYearsOfExperience(e.target.value)} />
                          </MDBCol>
                        </MDBRow>

                        <MDBRow>
                          <h5>Testimonials</h5>
                        </MDBRow>

                        <MDBRow>
                          <MDBCol md='12'>
                            <h6>Headline</h6>
                            <MDBInput wrapperClass='mb-4' label='Headline' id='inputHeadline' type='text'
                              value={headline}
                              onChange={(e) => setHeadline(e.target.value)} />
                          </MDBCol>
                        </MDBRow>

                        <MDBRow>
                          <h6>Description</h6>
                          <MDBCol md='12'>

                            <MDBTextArea className="mb-4" label='Describe your experience' rows={4}
                              value={experience}
                              onChange={(e) => setExperience(e.target.value)} />
                          </MDBCol>
                        </MDBRow>

                        <MDBBtn color='dark' className='mb-4' size='lg'
                          type='submit'
                          onClick={redirect6}>Next</MDBBtn>

                      </MDBCardBody>

                    </MDBCol>
                  </MDBRow>

                </MDBCard>

              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </form>
      </>
    )
  }

  else if (page === "SafetyForm") {
    return (
      <>
        <form onSubmit={handleCompletePetSitterCreation}>
          <MDBContainer fluid className='bg-dark'>
            <MDBRow className='d-flex justify-content-center align-items-center h-100'>
              <MDBCol>

                <MDBCard className='my-4' style={{ backgroundColor: '#e8e6f2' }}>
                  <MDBRow className='g-0'>
                    <MDBCol md='6' className="d-none d-md-block">
                      <MDBCardImage src='https://images.unsplash.com/photo-1557199582-14cd70bc6d39?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80' alt="Sample photo" className="rounded-start" fluid />
                    </MDBCol>

                    <MDBCol md='6'>

                      <MDBCardBody className='text-black d-flex flex-column justify-content-center'>
                        <h3 className="mb-2 text-uppercase fw-bold">SAFETY FORM</h3>
                        <h6 style={{ fontSize: 12 }} className="mb-3">We would like to get to know you and your experiences better.</h6>
                        <MDBRow>
                          <h6>Are you vaccinated against most types of animal-related diseases?</h6>
                          <MDBCol md='12'>

                            <MDBTextArea className="mb-4" label='Answer' rows={2}
                              value={q1}
                              onChange={(e) => setQ1(e.target.value)} />
                          </MDBCol>
                        </MDBRow>

                        <MDBRow>
                          <h6>Have you been convicted of any crimes?</h6>
                          <MDBCol md='12'>

                            <MDBTextArea className="mb-4" label='Answer' rows={2}
                              value={q2}
                              onChange={(e) => setQ2(e.target.value)} />
                          </MDBCol>
                        </MDBRow>

                        <MDBRow>
                          <h6>Another safety question</h6>
                          <MDBCol md='12'>

                            <MDBTextArea className="mb-4" label='Answer' rows={2}
                              value={q3}
                              onChange={(e) => setQ3(e.target.value)} />
                          </MDBCol>
                        </MDBRow>

                        <MDBBtn color='dark' className='mb-4' size='lg' type='submit'
                          onClick={redirect7}>Next</MDBBtn>

                      </MDBCardBody>
                    </MDBCol>
                  </MDBRow>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </form>
      </>
    )
  }

  else if (page === "Authentication") {
    return (
      <>
        <MDBContainer fluid className='bg-dark'>
          <form onSubmit={handleCreationOfBESitter}>
            <MDBRow className='d-flex justify-content-center align-items-center h-100'>
              <MDBCol>

                <MDBCard className='my-4' style={{ backgroundColor: '#e8e6f2' }}>
                  <MDBRow className='g-0'>
                    <MDBCol md='6' className="d-none d-md-block">
                      <MDBCardImage src='https://images.unsplash.com/photo-1557199582-14cd70bc6d39?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80' alt="Sample photo" className="rounded-start" fluid />
                    </MDBCol>

                    <MDBCol md='6'>

                      <MDBCardBody className='text-black d-flex flex-column justify-content-center'>
                        <h3 className="mb-2 fw-bold">Last step!</h3>
                        <h6 style={{ fontSize: 12 }} className="mb-3">The privacy and security of our community is very important.
                          We’re identifying ways to help make our community as secure as possible for everyone.That’s why when you
                          become a Pet Sitter with PetSociety, we may need to verify your personal information, such as your legal name,
                          address, phone number and other contact details.</h6>
                        <h6 style={{ fontSize: 12 }} className="mb-3"><u>
                          Please upload a file (in PDF format) containing a photo of
                          your Government ID (with NRIC covered) and a selfie.</u></h6>

                        <MDBRow>
                          <MDBCol md='12'>
                            <label className="form-label" htmlFor="customFile">Identity Authentication</label>
                            <input type="file"
                              className="form-control mb-1"
                              id="customFile"
                              value={documents}
                              onChange={(e) => setDocuments(e.target.value)} />
                          </MDBCol>
                        </MDBRow>

                        <h6 style={{ fontSize: 14 }} className="mb-3">
                          You may start accepting bookings once your account has been verified by PetSociety.</h6>

                        <MDBRow className='mb-5'>
                          <MDBCol md='3'>
                            <MDBBtn color='success' className='mb-4' size='lg' type='submit'
                              onClick={redirectToSignIn}>Submit</MDBBtn>
                          </MDBCol>
                        </MDBRow>
                      </MDBCardBody>
                    </MDBCol>
                  </MDBRow>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </form>
        </MDBContainer>
      </>
    )
  }
}

export default SignUp;
