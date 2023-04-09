import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../../helpers/Api";
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBRadio
}
    from 'mdb-react-ui-kit';


function CreatePet() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [weight, setWeight] = useState("");
    const [ageInYears, setAgeInYears] = useState(0);
    const [ageInMonths, setAgeInMonths] = useState(0);
    const [gender, setGender] = useState('1');
    const [breed, setBreed] = useState("");
    const [microchip, setMicrochip] = useState('1');
    const [spayedOrNeutered, setSpayedOrNeutered] = useState('1');
    const [houseTrained, setHouseTrained] = useState('1');
    const [friendlyWithChildren, setFriendlyWithChildren] = useState('1');
    const [friendlyWithDogs, setFriendlyWithDogs] = useState('1');
    const [friendlyWithCats, setFriendlyWithCats] = useState('1');
    const [adoptionDate, setAdoptionDate] = useState(new Date('2022-01-01'));
    const [petDescription, setPetDescription] = useState("");
    const [pottyBreakSchedule, setPottyBreakSchedule] = useState('1');
    const [energyLevel, setEnergyLevel] = useState('1');
    const [feedingSchedule, setFeedingSchedule] = useState('1');
    const [timeCanBeLeftAlone, setTimeCanBeLeftAlone] = useState('1');
    const [medication, setMedication] = useState('1');
    const [additionalSitterInformation, setAdditionalSitterInformation] = useState("");
    const [vetDetails, setVetDetails] = useState("");
    const [photos, setPhotos] = useState(null);
    // to link petparent, useParams here
    // need to find out how to do it

    let pet = {};

    pet = {
        name: name,
        weight: weight,
        ageInYears: ageInYears,
        ageInMonths: ageInMonths,
        gender: gender,
        breed: breed,
        microchip: microchip,
        spayedOrNeutered: spayedOrNeutered,
        houseTrained: houseTrained,
        friendlyWithChildren: friendlyWithChildren,
        friendlyWithDogs: friendlyWithDogs,
        friendlyWithCats: friendlyWithCats,
        adoptionDate: adoptionDate,
        petDescription: petDescription,
        pottyBreakSchedule: pottyBreakSchedule,
        energyLevel: energyLevel,
        feedingSchedule: feedingSchedule,
        timeCanBeLeftAlone: timeCanBeLeftAlone,
        medication: medication,
        additionalSitterInformation: additionalSitterInformation,
        vetDetails: vetDetails,
        photos: photos
    }

    const handleCreationOfPet = (e) => {
        Api.createNewPet(pet)
            .then((data) => {
                navigate("/Profile");
            })
    }

    return (
        <>
            <MDBContainer fluid>

                <MDBRow className='justify-content-center align-items-center m-5'>

                    <MDBCard>
                        <MDBCardBody className='px-4'>

                            <h3 className="fw-bold mt-2 mb-4 pb-2 pb-md-0 mb-md-5 text-center">
                                Tell us about your pet</h3>

                            <div>
                                <h5 class="text-muted"> Pet Details</h5>
                            </div>


                            <MDBRow>

                                <MDBCol md='6'>
                                    <MDBInput wrapperClass='mb-4' label='First Name' size='lg' id='form1' type='text' />
                                </MDBCol>

                                <MDBCol md='6'>
                                    <MDBInput wrapperClass='mb-4' label='Last Name' size='lg' id='form2' type='text' />
                                </MDBCol>

                            </MDBRow>

                            <MDBRow>

                                <MDBCol md='6'>
                                    <MDBInput wrapperClass='mb-4' label='Birthday' size='lg' id='form3' type='text' />
                                </MDBCol>

                                <MDBCol md='6' className='mb-4'>
                                    <h6 className="fw-bold">Gender: </h6>
                                    <MDBRadio name='inlineRadio' id='inlineRadio1' value='option1' label='Female' inline />
                                    <MDBRadio name='inlineRadio' id='inlineRadio2' value='option2' label='Male' inline />
                                    <MDBRadio name='inlineRadio' id='inlineRadio3' value='option3' label='Other' inline />
                                </MDBCol>

                            </MDBRow>

                            <MDBRow>

                                <MDBCol md='6'>
                                    <MDBInput wrapperClass='mb-4' label='Email' size='lg' id='form4' type='email' />
                                </MDBCol>

                                <MDBCol md='6'>
                                    <MDBInput wrapperClass='mb-4' label='Phone Number' size='lg' id='form5' type='rel' />
                                </MDBCol>

                            </MDBRow>

                            <div>

                            </div>


                            <MDBBtn className='mb-4' size='lg'>Submit</MDBBtn>

                        </MDBCardBody>
                    </MDBCard>

                </MDBRow>
            </MDBContainer>
        </>
    );
}

export default CreatePet;