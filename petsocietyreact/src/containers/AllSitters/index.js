import React, { useState, useEffect } from 'react';
import Api from "../../helpers/Api";
import { useNavigate } from 'react-router-dom';
import { MDBCard, MDBTypography, MDBContainer, MDBCardBody, MDBCardTitle, MDBCardText, MDBCol, MDBRow, MDBBtn } from 'mdb-react-ui-kit';
import sitterList from "../../icons/sitter_list.png";
import sitterListBg from "../../icons/sitter_list_bg.png";


function AllSitters() {
    let navigate = useNavigate();

    const [sitters, setSitters] = useState([]);

    useEffect(() => {
        Api.getAllPetSitters()
            .then((res) => res.json())
            .then((data) => setSitters(data))
            .catch(error => console.error(error));
        console.log(sitters);
    }, []);

    // const getAllSitters = async () => {
    //     const response = await fetch(Api.getAllPetSitters());
    //     const data = await response.json();
    //     return data;
    // };

    return (
        <div style={{
            padding: '50px',
            backgroundImage: `url(${sitterListBg})`,
            backgroundColor: '#DEBD75',
            height : '100vh',
            overflow : 'auto',
        }}>
            <h1 style={{ color: '#393331' }}>
                <b>List of Sitters</b>
                <img src={sitterList}
                    height="70"
                    style={{ marginLeft: '20px' }}
                />
            </h1>

            <div className="justify-content-center" style={{ paddingTop: '20px' }}>
                <ul>
                    {sitters.map((sitter) => (
                        <MDBCard className="my-3 p-1"
                            key={sitter.userId}>
                            <MDBCardBody className="p-2 m-2">
                                <MDBRow className="align-items-center">
                                    <MDBCol md='8'>
                                        <h5><b>{sitter.firstName} {sitter.lastName}</b></h5>
                                        <p>{sitter.email}</p>
                                        <small>Rating</small>
                                    </MDBCol>
                                    <MDBCol md='4'>
                                        <MDBBtn class="btn btn-primary"
                                            style={{
                                                backgroundColor: '#7B69A9',
                                                padding: '15px 25px'}}>
                                                Book Now!
                                        </MDBBtn>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>
                    ))}
                </ul>

            </div>
        </div>
    )
}

export default AllSitters;