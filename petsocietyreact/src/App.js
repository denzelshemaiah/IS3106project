import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from 'react';
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


function App() {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    setUser(sessionStorage.getItem('user'));
    setUserRole(sessionStorage.getItem('user_role'));
  }, [sessionStorage.getItem('user')])

  let navbar = ''
  let routeList = ''

  if (user === null) {
    navbar = <NoLoginNavbar></NoLoginNavbar>
    routeList = 
    (<Routes>
      <Route path="/signIn" element={<SignIn />} />
      <Route path="/signUp/:page" element={<SignUp />} />

      <Route path="/searchSitter" element={<SearchSitter />} />
      <Route path="/services" element={<Services />} />
      <Route path="/help" element={<Help />} />
    </Routes>);
  } else {
    navbar = <Navbar role={userRole} user={user}></Navbar>
    console.log({userRole})
    routeList =
    (<Routes>
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/meetandgreets" element={<MeetAndGreets />} />
        <Route path="/makebooking" element={<MakeBooking />} />
        <Route path="/loggedInHomepage" element={<LoggedInHomepage />} />
        <Route path="/createPet" element={<CreatePet />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/searchSitter" element={<SearchSitter />} />
        <Route path="/services" element={<Services />} />
        <Route path="/help" element={<Help />} />
    </Routes>)
  }


  return (
    <> 
      {navbar}
      <div className='container'>
        {routeList}
      </div>
    </>
  )
}

export default App;
