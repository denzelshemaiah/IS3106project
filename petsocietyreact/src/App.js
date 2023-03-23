import './App.css';
import {Routes, Route} from "react-router-dom";
import Bookings from "./containers/Bookings";
import Navbar from './components/Navbar';
import NoLoginNavbar from './components/NoLoginNavbar';
import SignUp from './containers/SignUp';
import MeetAndGreets from "./containers/MeetAndGreets";


function App() {

  return (
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
}

export default App;
