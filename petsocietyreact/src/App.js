import './App.css';
import { Routes, Route, Navigate , useRouteError} from "react-router-dom";
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
  function ErrorBoundary() {
    let error = useRouteError();
    console.error(error);
    // Uncaught ReferenceError: path is not defined
    return <div>Dang!</div>;
  }
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
          <Route path="/help" element={<Help />} />

          {/* private routes */}
          <Route path="/bookings" 
          element={<Bookings />}
          errorElement={<ErrorBoundary />} />
          <Route path="/meetandgreets" element={<MeetAndGreets />} />
          <Route path="/makebooking" element={<MakeBooking />} />
          <Route path="/loggedInHomepage" element={<LoggedInHomepage />} />
          <Route path="/createPet" element={<CreatePet />} />
          <Route path="/profile" element={<Profile />} />
          
        </Routes>
      </div>
    </>
  )
}

export default App;
