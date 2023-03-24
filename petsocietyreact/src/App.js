import './App.css';
import { Routes, Route } from "react-router-dom";
import NoLoginNavbar from './components/NoLoginNavbar';
import SearchSitter from "./containers/SearchSitter";
import Services from "./containers/Services";
import SignUp from './containers/SignUp';
import SignIn from "./containers/SignIn";
import Help from "./containers/Help";


function App() {

  return (
    <>
      <NoLoginNavbar></NoLoginNavbar>
      <div className='container'>
        <Routes>
          <Route path="/searchSitter" element={<SearchSitter />} />
          <Route path="/services" element={<Services />} /> 
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/help" element={<Help />} />
        </Routes>
      </div>
    </>
  )
}

export default App;
