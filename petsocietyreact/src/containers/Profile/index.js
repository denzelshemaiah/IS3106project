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
import Form from 'react-bootstrap/Form';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import Button from '@mui/material/Button';



function Profile() {
  const [username, setUsername] = useState('username');
  const [firstName, setFirstName] = useState('Valerie');
  const [lastName, setLastName] = useState('Luna');
  const [orgName, setOrgName] = useState('Start Bootstrap');
  const [location, setLocation] = useState('San Francisco, CA');
  const [email, setEmail] = useState('name@example.com');
  const [phone, setPhone] = useState('555-123-4567');
  const [birthday, setBirthday] = useState('06/10/1988');

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  function handleFirstNameChange(event) {
    setFirstName(event.target.value);
  }

  function handleLastNameChange(event) {
    setLastName(event.target.value);
  }

  function handleOrgNameChange(event) {
    setOrgName(event.target.value);
  }

  function handleLocationChange(event) {
    setLocation(event.target.value);
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePhoneChange(event) {
    setPhone(event.target.value);
  }

  function handleBirthdayChange(event) {
    setBirthday(event.target.value);
  }

  // need to link edit pet/add pet here

  return (
    <></>
  )
}
    
export default Profile;

        