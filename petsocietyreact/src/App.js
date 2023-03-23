import './App.css';
import { Routes, Route } from "react-router-dom";
import NoLoginNavbar from './components/NoLoginNavbar';
import SignUp from './containers/SignUp';

function App() {
  return (
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
}

export default App;
