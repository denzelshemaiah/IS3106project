import React, { useState } from 'react';
import { Helmet } from "react-helmet";
import { useNavigate } from 'react-router-dom';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter } from 'mdb-react-ui-kit';
import "./style.css";
import swal from 'sweetalert';
import Api from "../../helpers/Api";
import loginBanner from "../../icons/login_banner.png"
import Footer from '../../components/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  // remember to import User from SignUp so that password can be changed
  const [forgotPasswordModal, setForgotPasswordModal] = useState(false);
  const toggleShowForgotPassword = () => setForgotPasswordModal(!forgotPasswordModal);

  const showErrorToast = () => {
    toast.error('Invalid Credentials!', {
      position: toast.POSITION.TOP_RIGHT,
      className:'error-toast'
    });
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    await Api.userLogin({
      email, password
    })
    .then((res) => res.json())
    .then((res) => {
      if ('userId' in res) {
        localStorage.setItem('user', JSON.stringify(res));
        getUserRole();
      }
    })
    .then(() => {
      if (localStorage.getItem('user_role')) {
        navigate("/loggedInHomepage");
        window.location.reload(false)
      }
    })
    .catch(err => {
      console.log(err)
      showErrorToast();
    })
  }

  async function getUserRole() {
    const response = await Api.getUserRole(JSON.parse(localStorage.getItem('user')).userId)
      .then((res) => res.json());
    localStorage.setItem("user_role", JSON.stringify(response['userRole']))
    navigate("/loggedInHomepage")
    window.location.reload(false);
  }

  return (
    <>
      <ToastContainer/>
      <div>
        <Helmet>
          <title>Pet Society | Sign In</title>
        </Helmet>
      </div>

      <MDBContainer fluid className="p-3 my-5 h-custom">
        <MDBRow id="#error-target">
        </MDBRow>
        <MDBRow>

          <MDBCol md='6'>
            <img src={loginBanner}
              class="img-fluid"
              alt="Sample image"
              style={{ height: '70vh' }} />
          </MDBCol>

          <MDBCol md='6'>

            <MDBRow>
              <h1 className="text-center">
                <b>
                  Sign In
                </b>
              </h1>
            </MDBRow>

            <MDBRow className="p-3 pt-4">
              <MDBInput wrapperClass='mb-4'
                label='Email'
                id='formControlLg'
                type='email'
                size="lg"
                onChange={(e) => setEmail(e.target.value)} />
              <MDBInput wrapperClass='mb-4'
                label='Password'
                id='formControlLg'
                type='password'
                size="lg"
                onChange={(e) => setPassword(e.target.value)} />
            </MDBRow>

            <div className="d-flex justify-content-between mb-4">
              <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
              <a onClick={toggleShowForgotPassword}
                style={{ color: 'blue' }}>
                Forgot password?
              </a>
              <MDBModal show={forgotPasswordModal} setShow={setForgotPasswordModal} tabIndex='-1'>
                <MDBModalDialog>
                  <MDBModalContent>
                    <MDBModalHeader>

                      <MDBModalTitle>
                        Forgot Password?
                      </MDBModalTitle>

                      <MDBBtn className='btn-close'
                        color='none'
                        onClick={toggleShowForgotPassword}>
                      </MDBBtn>

                    </MDBModalHeader>

                    <MDBModalBody>
                      <MDBInput label='Old Password' id='oldPassword' type='text' />
                      <div style={{ margin: '1rem 0' }}></div>
                      <MDBInput label='New Password' id='newPassword' type='text' />
                    </MDBModalBody>

                    <MDBModalFooter>
                      <MDBBtn color='secondary'
                        onClick={toggleShowForgotPassword}>
                        Close
                      </MDBBtn>
                      <MDBBtn>Save changes</MDBBtn>
                    </MDBModalFooter>

                  </MDBModalContent>
                </MDBModalDialog>

              </MDBModal>
            </div>

            <div className='text-center text-md-start mt-4 pt-2'>
              <div className="d-flex justify-content-center align-items-center">
                <MDBBtn className="mb-0 px-5"
                  size='lg'
                  onClick={(e) => handleLogin(e)}
                  style={{ backgroundColor: '#7B69A9' }}>
                  Login
                </MDBBtn>
              </div>

              <div className="d-flex justify-content-center align-items-center">

                <p className="small fw-bold mt-2 pt-3 mb-2">Don't have an account?
                  <a href="#/SignUp/1" className="link-danger"> Register</a></p>
              </div>
            </div>

          </MDBCol>

        </MDBRow>

      </MDBContainer>
      <Footer></Footer>
    </>
  );
}

export default SignIn;
