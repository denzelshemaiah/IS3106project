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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw, faInfoCircle } from '@fortawesome/free-solid-svg-icons'



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

                            <h3 className="fw-bold mt-4 mb-2 pb-2 pb-md-0 mb-md-3 text-center">
                                Tell us about your pet</h3>

                            <div className="p-3">
                                <div className="pb-3">
                                    <h5>
                                        <FontAwesomeIcon icon={faPaw} /> Pet Details
                                    </h5>

                                    <small class="text-muted">Provide a description of your pet.</small>
                                </div>

                                <MDBRow>

                                    <MDBCol md='9'>
                                        <MDBInput wrapperClass='mb-4'
                                            label='Name'
                                            size='lg'
                                            id='inputName'
                                            type='text'
                                            value={name}
                                            onChange={(e) => setName(e.target.value)} />
                                    </MDBCol>

                                    <MDBCol md='3'>
                                        <MDBInput wrapperClass='mb-4'
                                            label='Weight (kg)'
                                            size='lg'
                                            id='inputWeight'
                                            type='text'
                                            value={weight}
                                            onChange={(e) => setWeight(e.target.value)} />
                                    </MDBCol>

                                </MDBRow>

                                <MDBRow>

                                    <MDBCol md='3'>
                                        <MDBInput wrapperClass='mb-4'
                                            label='Age (Yr.)'
                                            size='lg'
                                            id='inputAgeInYears'
                                            type='text'
                                            value={ageInYears}
                                            onChange={(e) => setAgeInYears(e.target.value)} />
                                    </MDBCol>

                                    <MDBCol md='3'>
                                        <MDBInput wrapperClass='mb-4'
                                            label='Age (Mo.)'
                                            size='lg'
                                            id='inputAgeInMonths'
                                            type='text'
                                            value={ageInMonths}
                                            onChange={(e) => setAgeInMonths(e.target.value)} />
                                    </MDBCol>


                                    <MDBCol md='6' className='mb-4'>
                                        <small>Gender </small>
                                        <br></br>
                                        <MDBRadio name='inlineRadio1'
                                            id='inputGenderFemale'
                                            value={gender}
                                            label='Female'
                                            inline
                                            checked={gender === '1'}
                                            onChange={(e) => setGender(e.target.value)} />
                                        <MDBRadio name='inlineRadio2'
                                            id='inputGenderMale'
                                            value={gender}
                                            label='Male'
                                            inline
                                            checked={gender === '2'}
                                            onChange={(e) => setGender(e.target.value)} />
                                    </MDBCol>
                                </MDBRow>

                                <MDBRow>
                                    <small class="text-muted" className="pb-2">
                                        Enter all breeds that apply. If your dog is a mixed breed, add ‘Mixed’ as well.
                                    </small>
                                    <MDBCol md='12'>
                                        <MDBInput wrapperClass='mb-4'
                                            label='Breed(s)'
                                            size='lg'
                                            id='inputBreed'
                                            type='text'
                                            value={breed}
                                            onChange={(e) => setBreed(e.target.value)} />
                                    </MDBCol>
                                </MDBRow>
                            </div>


                            <div className="p-3">
                                <div className="pb-3">
                                    <h5>
                                        <FontAwesomeIcon icon={faInfoCircle} /> Additional Details
                                    </h5>
                                </div>
                                <MDBRow>
                                    <MDBCol md='6' className='mb-4'>
                                        <h6 className="pb-2">Microchipped?</h6>
                                    
                                        <MDBRadio name='inlineRadio3'
                                            id='inputMicrochippedYes'
                                            value={microchip}
                                            label='Yes'
                                            inline
                                            checked={microchip === '1'}
                                            onChange={(e) => setMicrochip(e.target.value)} />
                                        <MDBRadio name='inlineRadio4'
                                            id='inputMicrochippedNo'
                                            value={microchip}
                                            label='No'
                                            inline
                                            checked={microchip === '2'}
                                            onChange={(e) => setMicrochip(e.target.value)} />
                                    </MDBCol>

                                </MDBRow>
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