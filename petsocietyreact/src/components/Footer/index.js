import { MDBFooter, MDBBtn, MDBIcon } from 'mdb-react-ui-kit';

function Footer() {
  return (
    <MDBFooter className="bg-light text-center text-white">
      <div className="container p-4 pb-0">
        <section className="mb-4">
          <MDBBtn href="#" color="light" className="m-1 p-3">
          <img src="https://png.pngtree.com/png-vector/20221018/ourmid/pngtree-twitter-social-media-round-icon-png-image_6315985.png"
            width="25"
            height="25" />
          </MDBBtn>
          <MDBBtn href="#" className="m-1 p-3" color="light">
          <img src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
            width="25"
            height="25" />
          </MDBBtn>
          <MDBBtn href="#" color="light" className="m-1 p-3">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png"
            width="25"
            height="25" />
          </MDBBtn>
          <MDBBtn href="#" color="light" className="m-1 p-3">
          <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
            width="25"
            height="25" />
          </MDBBtn>
          <MDBBtn href="#" color="light" className="m-1 p-3">  
          <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
            width="25"
            height="25" />
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