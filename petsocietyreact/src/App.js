import './App.css';
<<<<<<< HEAD
import {Routes, Route} from "react-router-dom";
import Bookings from "./containers/Bookings";
import Navbar from './components/Navbar';
import NoLoginNavbar from './components/NoLoginNavbar';
import SignUp from './containers/SignUp';
import MeetAndGreets from "./containers/MeetAndGreets";

=======
import { Routes, Route } from "react-router-dom";
import NoLoginNavbar from './components/NoLoginNavbar';
import SignUp from './containers/SignUp';
>>>>>>> master

function App() {

  return (
<<<<<<< HEAD
    <>
      <Navbar/>
       <div className='container'>
        <Routes>
          <Route path="/bookings/:userId" element={<Bookings />}/>
          <Route path="/bookings" element={<Bookings />}/>
          <Route path="/meetandgreets" element={<MeetAndGreets />}/>
          <Route path="/meetandgreets/:userId" element={<MeetAndGreets />}/>
        </Routes>
       </div>
    </>
  )
=======
    <div className="wrapper">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      <NoLoginNavbar />
      <div className='content-wrapper'>
        <Routes>
        <Route path="/signUp" element={<SignUp />} />
        </Routes>
      </div>
    </div>
  );
>>>>>>> master
}

export default App;
