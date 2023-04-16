import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import NoLoginNavbar from './components/NoLoginNavbar';
import Navbar from './components/Navbar'
import SearchSitter from "./containers/SearchSitter";
import Services from "./containers/Services";
import SignUp from './containers/SignUp';
import SignIn from "./containers/SignIn";
import Help from "./containers/Help";
import Bookings from "./containers/Bookings"
import MeetAndGreets from "./containers/MeetAndGreets"
import MakeBooking from "./containers/MakeBooking"
import LoggedInHomepage from './containers/LoggedInHomepage';
import CreatePet from './containers/CreatePet';
import Profile from './containers/Profile';
import Homepage from './containers/Homepage';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import AllSitters from './containers/AllSitters';


function App() {
  const [user, setUser] = useState({});
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const handleStorage = () => {
      if (localStorage.getItem("user") && localStorage.getItem("user_role")) {
        setUser(JSON.parse(localStorage.getItem("user")));
        setUserRole(JSON.parse(localStorage.getItem("user_role")));
      }
    }

    // localStorage.removeItem('user')
    // localStorage.removeItem('user_role')

    window.addEventListener('storage', handleStorage())
    return () => window.removeEventListener('storage', handleStorage())
  }, [])

  return (
    <>
      <Navbar user={user}></Navbar>
      <div className='container'>
        <Routes>
          <Route exact path="/" element= {user === {} ? <Homepage /> : <LoggedInHomepage />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp/:page" element={<SignUp />} />
          <Route path="/bookings"
            element={
              <ProtectedRoute user={user}>
                <Bookings />
              </ProtectedRoute>} />
          <Route path="/meetandgreets"
            element={
              <ProtectedRoute user={user}>
                <MeetAndGreets />
              </ProtectedRoute>} />
          <Route path="/makebooking"
            element={
              <ProtectedRoute user={user}>
                <MakeBooking />
              </ProtectedRoute>} />
          <Route path="/loggedInHomepage"
            element={
              <ProtectedRoute user={user}>
                <LoggedInHomepage />
              </ProtectedRoute>} />
          <Route path="/createPet" element={<CreatePet />} />
          <Route path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>} />
          <Route path="/searchSitter" element={<SearchSitter />} />
          <Route path="/services" element={<Services />} />
          <Route path="/help" element={<Help />} />
        </Routes>
      </div>
    </>
  )
}

export default App;
