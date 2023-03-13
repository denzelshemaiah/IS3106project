import './App.css';
import {Routes, Route} from "react-router-dom";
import Bookings from "./containers/Bookings"
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="wrapper">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
       <Navbar/>
       <div className='content-wrapper'>
        <Routes>
          <Route path="/bookings" element={<Bookings />}/>
        </Routes>
       </div>
    </div>
  );
}

export default App;
