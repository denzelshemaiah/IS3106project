import { MDBFooter, MDBBtn } from 'mdb-react-ui-kit';
import { MDBIcon } from 'mdbreact';

function Footer() {
  return (
    <MDBFooter className="bg-light text-center text-white">
      <div className="container p-4 pb-0">
        <section className="mb-4">
          <MDBBtn href="#" color="primary" className="m-1">
          <MDBIcon icon="user" />
          </MDBBtn>
          <MDBBtn href="#" color="primary" className="m-1">
            <MDBIcon fab icon="twitter" />
          </MDBBtn>
          <MDBBtn href="#" color="primary" className="m-1">
            <MDBIcon fab icon="google" />
          </MDBBtn>
          <MDBBtn href="#" color="primary" className="m-1">
            <MDBIcon fab icon="instagram" />
          </MDBBtn>
          <MDBBtn href="#" color="primary" className="m-1">
            <MDBIcon fab icon="linkedin-in" />
          </MDBBtn>
          <MDBBtn href="#" color="primary" className="m-1">
            <MDBIcon fab icon="github" />
          </MDBBtn>
        </section>
      </div>
      <div className="text-center p-3 text-black" style={{ backgroundColor: "#E4E2F5" }}>
        © PetSociety 2023
      </div>
    </MDBFooter>
  );
}

export default Footer;