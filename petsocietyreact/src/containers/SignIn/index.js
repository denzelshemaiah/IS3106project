import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter } from 'mdb-react-ui-kit';
import "./style.css";
import swal from 'sweetalert';
import Api from "../../helpers/Api";
import loginBanner from "../../icons/login_banner.png"
import Footer from '../../components/Footer';

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  // remember to import User from SignUp so that password can be changed
  const [forgotPasswordModal, setForgotPasswordModal] = useState(false);
  const toggleShowForgotPassword = () => setForgotPasswordModal(!forgotPasswordModal);

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await Api.userLogin({
      email, password
    }).then((res) => res.json());
    if ('userId' in response) {
      console.log(response)
      localStorage.setItem('user', JSON.stringify(response));
      getUserRole(response);
      navigate("/loggedInHomepage");
    } else {
      swal("Failed", response.message, "error", {
        buttons: false,
        timer: 2000,
        toast: true,
        target: "#error-target",
        customClass: {
          container: 'position-absolute'
        },
      })
    }
  }

  async function getUserRole(user) {
    const response = await Api.getUserRole(user.userId)
      .then((res) => res.json())
    localStorage.setItem("user_role", JSON.stringify(response['userRole']))
    console.log("user role:" + localStorage.getItem('user_role'))
  }

  return (
    <>
      <MDBContainer fluid className="p-3 my-5 h-custom">
        <MDBRow id="#error-target">
        </MDBRow>

        <MDBRow>

          <MDBCol col='10' md='6'>
            <img src={loginBanner}
              class="img-fluid"
              alt="Sample image" 
              height="600"
              width="300"/>
          </MDBCol>

          <MDBCol col='4' md='6'>
            <h1>
              <b>
                Sign In
              </b>
            </h1>
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

            <div className="d-flex justify-content-between mb-4">
              <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
              <a onClick={toggleShowForgotPassword}>Forgot password?</a>
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
              <MDBBtn className="mb-0 px-5"
                size='lg'
                onClick={(e) => handleLogin(e)}>Login
              </MDBBtn>
              <p className="small fw-bold mt-2 pt-1 mb-2">Don't have an account?
                <a href="#/SignUp/1" className="link-danger"> Register</a></p>
            </div>

          </MDBCol>

        </MDBRow> 

      </MDBContainer>
      <Footer></Footer>
    </>
  );
}

export default SignIn;