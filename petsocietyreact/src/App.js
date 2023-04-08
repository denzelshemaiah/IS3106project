import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import NoLoginNavbar from './components/NoLoginNavbar';
import ResponsiveNavbar from './components/ResponsiveNavbar';
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


function App() {
  return (
    <>
      <Navbar></Navbar>
      <NoLoginNavbar></NoLoginNavbar>
      <div className='container'>
        <Routes>
          {/* public routes */}
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp/:page" element={<SignUp />} />
 
          <Route path="/searchSitter" element={<SearchSitter />} />
          <Route path="/services" element={<Services />} />
          
          {/* private routes */}
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/meetandgreets" element={<MeetAndGreets />} />
          <Route path="/makebooking" element={<MakeBooking />} />
          <Route path="/loggedInHomepage" element={<LoggedInHomepage />}/>
        </Routes>
      </div>
    </>
  )
}

export default App;
