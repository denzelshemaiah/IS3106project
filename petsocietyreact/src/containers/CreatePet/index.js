import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../../helpers/Api";
import { Helmet } from "react-helmet";
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBRadio,
    MDBTextArea,
    MDBCheckbox,
    MDBFile
}
    from 'mdb-react-ui-kit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faIdCard, faHeart, faNoteSticky, faImage } from '@fortawesome/free-regular-svg-icons'
import { faCat, faDog } from '@fortawesome/free-solid-svg-icons'
import cuteDog from '../../icons/cute_dog.png';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import '../../loading.css';

function CreatePet() {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const [typeOfPet, setTypeOfPet] = useState('1');
    // button selected until page is submitted
    const [isActive, setIsActive] = useState(false);
    const handleDogButtonClick = () => {
        setIsActive(true);
        setTypeOfPet('1');
    };
    const handleCatButtonClick = () => {
        setIsActive(true);
        setTypeOfPet('2');
    };


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

    const [dayJsAdoptionDate, setDayJsAdoptionDate] = useState(new dayjs('2022-01-01'));
    // converting dayjs object back to date using toDate()
    const adoptionDate = dayJsAdoptionDate.toDate();

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

    // reminder to self: to figure out how to take params of this FE pet and pass it in correctly to BE pet... maybe use formParam again



    let pet = {};

    pet = {
        typeOfPet: typeOfPet,
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
        e.preventDefault();
        setIsLoading(true);
        Api.createNewPet(pet)
            .then((data) => {
                navigate("/Profile");
            })
        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    }

    return (
        <>
            <div>
                <Helmet>
                    <title>Pet Society | Add Pet</title>
                </Helmet>
            </div>

            <form onSubmit={handleCreationOfPet}>
                <MDBContainer fluid>

                    <MDBRow className='justify-content-center align-items-center m-5 px-5'>

                        <MDBCard>
                            <MDBCardBody className='px-5'>
                                <div style={{ alignItems: 'center' }}>

                                    <h3 className="fw-bold mt-4 mb-2 pb-2 pb-md-0 mb-md-3 text-center">
                                        Tell us about your pet <img src={cuteDog}
                                            width="60"
                                            height="60" />
                                    </h3>
                                </div>

                                <div className="p-3">
                                    <div className="pb-3">
                                        <h5 style={{ fontWeight: 'bold' }}>
                                            <FontAwesomeIcon icon={faIdCard} /> Pet Details
                                        </h5>

                                        <small class="text-muted">Provide a description of your pet.</small>
                                    </div>

                                    <MDBRow className='mb-4'>
                                        <h6 className="pb-2">What type of pet?</h6>
                                        <MDBCol md='6'>
                                            <MDBBtn className="w-100"
                                                active={isActive}
                                                color='light'
                                                style={{ padding: '20px' }}
                                                value='1'
                                                label='Dog'
                                                onClick={handleDogButtonClick}
                                                type="button"
                                                checked={isActive && typeOfPet === '1'}
                                            >
                                                <FontAwesomeIcon icon={faDog}
                                                    width="20"
                                                    height="20"
                                                />
                                                <br></br>
                                                <span style={{ color: 'black' }}>Dog</span>
                                            </MDBBtn>
                                        </MDBCol>

                                        <MDBCol md='6'>
                                            <MDBBtn className="w-100"
                                                color='light'
                                                style={{ padding: '20px' }}
                                                value='2'
                                                label='Cat'
                                                onClick={handleCatButtonClick}
                                                type="button"
                                                checked={isActive && typeOfPet === '2'}
                                            >
                                                <FontAwesomeIcon icon={faCat}
                                                    width="20"
                                                    height="20"
                                                />
                                                <br></br>
                                                <span style={{ color: 'black' }}>Cat</span>
                                            </MDBBtn>
                                        </MDBCol>

                                    </MDBRow>

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
                                                value='1'
                                                label='Female'
                                                inline
                                                checked={gender === '1'}
                                                onChange={(e) => setGender(e.target.value)} />
                                            <MDBRadio name='inlineRadio2'
                                                id='inputGenderMale'
                                                value='2'
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
                                        <h5 style={{ fontWeight: 'bold' }}>
                                            <FontAwesomeIcon icon={faEye} /> Additional Details
                                        </h5>
                                    </div>
                                    <MDBRow>
                                        <MDBCol md='4' className='mb-4'>
                                            <h6 className="pb-2">Microchipped?</h6>

                                            <MDBRadio name='inlineRadio3'
                                                id='inputMicrochippedYes'
                                                value='1'
                                                label='Yes'
                                                inline
                                                checked={microchip === '1'}
                                                onChange={(e) => setMicrochip(e.target.value)} />
                                            <MDBRadio name='inlineRadio4'
                                                id='inputMicrochippedNo'
                                                value='2'
                                                label='No'
                                                inline
                                                checked={microchip === '2'}
                                                onChange={(e) => setMicrochip(e.target.value)} />
                                        </MDBCol>

                                        <MDBCol md='4' className='mb-4'>
                                            <h6 className="pb-2">Spayed/Neutered?</h6>

                                            <MDBRadio name='inlineRadio5'
                                                id='inputSpayedOrNeuteredYes'
                                                value='1'
                                                label='Yes'
                                                inline
                                                checked={spayedOrNeutered === '1'}
                                                onChange={(e) => setSpayedOrNeutered(e.target.value)} />
                                            <MDBRadio name='inlineRadio6'
                                                id='inputSpayedOrNeuteredNo'
                                                value='2'
                                                label='No'
                                                inline
                                                checked={spayedOrNeutered === '2'}
                                                onChange={(e) => setSpayedOrNeutered(e.target.value)} />
                                        </MDBCol>

                                        <MDBCol md='4' className='mb-4'>
                                            <h6 className="pb-2">House trained?</h6>

                                            <MDBRadio name='inlineRadio7'
                                                id='inputHouseTrainedYes'
                                                value='1'
                                                label='Yes'
                                                inline
                                                checked={houseTrained === '1'}
                                                onChange={(e) => setHouseTrained(e.target.value)} />
                                            <MDBRadio name='inlineRadio8'
                                                id='inputHouseTrainedNo'
                                                value='2'
                                                label='No'
                                                inline
                                                checked={houseTrained === '2'}
                                                onChange={(e) => setHouseTrained(e.target.value)} />
                                        </MDBCol>

                                    </MDBRow>

                                    <MDBRow>
                                        <MDBCol md='4' className='mb-4'>
                                            <h6 className="pb-2">Friendly with children?</h6>

                                            <MDBRadio name='inlineRadio9'
                                                id='inputFriendlyWithChildrenYes'
                                                value='1'
                                                label='Yes'
                                                inline
                                                checked={friendlyWithChildren === '1'}
                                                onChange={(e) => setFriendlyWithChildren(e.target.value)} />
                                            <MDBRadio name='inlineRadio10'
                                                id='inputFriendlyWithChildrenNo'
                                                value='2'
                                                label='No'
                                                inline
                                                checked={friendlyWithChildren === '2'}
                                                onChange={(e) => setFriendlyWithChildren(e.target.value)} />
                                        </MDBCol>

                                        <MDBCol md='4' className='mb-4'>
                                            <h6 className="pb-2">Friendly with dogs?</h6>

                                            <MDBRadio name='inlineRadio11'
                                                id='inputFriendlyWithDogsYes'
                                                value='1'
                                                label='Yes'
                                                inline
                                                checked={friendlyWithDogs === '1'}
                                                onChange={(e) => setFriendlyWithDogs(e.target.value)} />
                                            <MDBRadio name='inlineRadio12'
                                                id='inputFriendlyWithDogsNo'
                                                value='2'
                                                label='No'
                                                inline
                                                checked={friendlyWithDogs === '2'}
                                                onChange={(e) => setFriendlyWithDogs(e.target.value)} />
                                        </MDBCol>

                                        <MDBCol md='4' className='mb-4'>
                                            <h6 className="pb-2">Friendly with cats?</h6>

                                            <MDBRadio name='inlineRadio13'
                                                id='inputFriendlyWithCatsYes'
                                                value='1'
                                                label='Yes'
                                                inline
                                                checked={friendlyWithCats === '1'}
                                                onChange={(e) => setFriendlyWithCats(e.target.value)} />
                                            <MDBRadio name='inlineRadio14'
                                                id='inputFriendlyWithCatsNo'
                                                value='2'
                                                label='No'
                                                inline
                                                checked={friendlyWithCats === '2'}
                                                onChange={(e) => setFriendlyWithCats(e.target.value)} />
                                        </MDBCol>
                                    </MDBRow>

                                    <MDBRow md='8'>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DemoContainer components={['DatePicker']}>
                                                <DatePicker
                                                label="Adoption Date"
                                                value={dayJsAdoptionDate}
                                                onChange={(newDate) => setDayJsAdoptionDate(newDate)}>
                                                </DatePicker>
                                            </DemoContainer>
                                        </LocalizationProvider>
                                    </MDBRow>

                                    <MDBRow>
                                        <h6 className="mt-4 pb-2">About your pet</h6>
                                        <MDBTextArea wrapperClass='mb-4'
                                            label="Add a description of your pet"
                                            id='inputPetDescription'
                                            rows={4}
                                            value={petDescription}
                                            onChange={(e) => setPetDescription(e.target.value)}>
                                        </MDBTextArea>
                                    </MDBRow>
                                </div>

                                <div className="p-3">
                                    <div className="pb-3">
                                        <h5 style={{ fontWeight: 'bold' }}>
                                            <FontAwesomeIcon icon={faHeart} /> Care Info
                                        </h5>

                                        <small class="text-muted">Provide your sitter with instructions for walking, feeding, and other care.</small>

                                    </div>

                                    <MDBRow className='pb-3'>

                                        <h6 className="pb-2">Potty Break Schedule</h6>

                                        <MDBCol md="2" className="pr-md-1">
                                            <MDBRadio
                                                name='inlineRadio15'
                                                id='inputPottyBreakScheduleEveryHour'
                                                value='1'
                                                label='Every Hour'
                                                inline
                                                checked={pottyBreakSchedule === '1'}
                                                onChange={(e) => setPottyBreakSchedule(e.target.value)} />
                                        </MDBCol>


                                        <MDBCol md="2" className="pr-md-1">
                                            <MDBRadio name='inlineRadio16'
                                                id='inputPottyBreakSchedule2Hours'
                                                value='2'
                                                label='2 hours'
                                                inline
                                                checked={pottyBreakSchedule === '2'}
                                                onChange={(e) => setPottyBreakSchedule(e.target.value)} />
                                        </MDBCol>

                                        <MDBCol md="2" className="pr-md-1">
                                            <MDBRadio name='inlineRadio17'
                                                id='inputPottyBreakSchedule4Hours'
                                                value='3'
                                                label='4 hours'
                                                inline
                                                checked={pottyBreakSchedule === '3'}
                                                onChange={(e) => setPottyBreakSchedule(e.target.value)} />
                                        </MDBCol>

                                        <MDBCol md="2" className="pr-md-1">
                                            <MDBRadio name='inlineRadio18'
                                                id='inputPottyBreakSchedule8Hours'
                                                value='4'
                                                label='8 hours'
                                                inline
                                                checked={pottyBreakSchedule === '4'}
                                                onChange={(e) => setPottyBreakSchedule(e.target.value)} />
                                        </MDBCol>

                                        <MDBCol md="2" className="pr-md-1">
                                            <MDBRadio name='inlineRadio19'
                                                id='inputPottyBreakScheduleCustomHours'
                                                value='5'
                                                label='Custom'
                                                inline
                                                checked={pottyBreakSchedule === '5'}
                                                onChange={(e) => setPottyBreakSchedule(e.target.value)} />
                                        </MDBCol>

                                    </MDBRow>

                                    <MDBRow className='pb-3'>

                                        <h6 className="pb-2">Energy Level</h6>

                                        <MDBCol md="2" className="pr-md-1">
                                            <MDBRadio name='inlineRadio20'
                                                id='inputEnergyLevelHigh'
                                                value='1'
                                                label='High'
                                                inline
                                                checked={energyLevel === '1'}
                                                onChange={(e) => setEnergyLevel(e.target.value)} />
                                        </MDBCol>

                                        <MDBCol md="2" className="pr-md-1">
                                            <MDBRadio name='inlineRadio21'
                                                id='inputEnergyLevelModerate'
                                                value='2'
                                                label='Average'
                                                inline
                                                checked={energyLevel === '2'}
                                                onChange={(e) => setEnergyLevel(e.target.value)} />
                                        </MDBCol>

                                        <MDBCol md="2" className="pr-md-1">
                                            <MDBRadio name='inlineRadio22'
                                                id='inputEnergyLevelLow'
                                                value='3'
                                                label='Low'
                                                inline
                                                checked={energyLevel === '3'}
                                                onChange={(e) => setEnergyLevel(e.target.value)} />
                                        </MDBCol>

                                    </MDBRow>

                                    <MDBRow className='pb-3'>

                                        <h6 className="pb-2">Feeding Schedule</h6>

                                        <MDBCol md="2" className="pr-md-1">

                                            <MDBRadio name='inlineRadio23'
                                                id='inputFeedingScheduleMorning'
                                                value='1'
                                                label='Morning'
                                                inline
                                                checked={feedingSchedule === '1'}
                                                onChange={(e) => setFeedingSchedule(e.target.value)} />
                                        </MDBCol>

                                        <MDBCol md="2" className="pr-md-1">
                                            <MDBRadio name='inlineRadio24'
                                                id='inputFeedingScheduleTwiceADay'
                                                value='2'
                                                label='Twice a day'
                                                inline
                                                checked={feedingSchedule === '2'}
                                                onChange={(e) => setFeedingSchedule(e.target.value)} />
                                        </MDBCol>

                                        <MDBCol md="2" className="pr-md-1">
                                            <MDBRadio name='inlineRadio25'
                                                id='inputFeedingScheduleCustom'
                                                value='3'
                                                label='Custom'
                                                inline
                                                checked={feedingSchedule === '3'}
                                                onChange={(e) => setFeedingSchedule(e.target.value)} />
                                        </MDBCol>
                                    </MDBRow>

                                    <MDBRow className='pb-3'>
                                        <h6 className="pb-2">Can be left alone</h6>

                                        <MDBCol md="2" className="pr-md-1">
                                            <MDBRadio name='inlineRadio26'
                                                id='inputTimeCanBeLeftAloneLessThan1Hour'
                                                value='1'
                                                label='<1 hour'
                                                inline
                                                checked={timeCanBeLeftAlone === '1'}
                                                onChange={(e) => setTimeCanBeLeftAlone(e.target.value)} />
                                        </MDBCol>

                                        <MDBCol md="2" className="pr-md-1">
                                            <MDBRadio name='inlineRadio27'
                                                id='inputTimeCanBeLeftAlone1To4Hours'
                                                value='2'
                                                label='1 - 4 hours'
                                                inline
                                                checked={timeCanBeLeftAlone === '2'}
                                                onChange={(e) => setTimeCanBeLeftAlone(e.target.value)} />
                                        </MDBCol>

                                        <MDBCol md="2" className="pr-md-1">
                                            <MDBRadio name='inlineRadio28'
                                                id='inputTimeCanBeLeftAlone4To8Hours'
                                                value='3'
                                                label='4 - 8 hours'
                                                inline
                                                checked={timeCanBeLeftAlone === '3'}
                                                onChange={(e) => setTimeCanBeLeftAlone(e.target.value)} />
                                        </MDBCol>

                                        <MDBCol md="2" className="pr-md-1">
                                            <MDBRadio name='inlineRadio29'
                                                id='inputTimeCanBeLeftAloneCustom'
                                                value='4'
                                                label='Custom'
                                                inline
                                                checked={timeCanBeLeftAlone === '4'}
                                                onChange={(e) => setTimeCanBeLeftAlone(e.target.value)} />
                                        </MDBCol>

                                    </MDBRow>

                                    <MDBRow>
                                        <h6 className="pb-2">Medication (select all that apply)</h6>

                                        <MDBCol md='3'>
                                            <MDBCheckbox label="Pill"
                                                id='inputMedicationPill'
                                                value='1'
                                                checked={medication === '1'}
                                                onChange={(e) => setMedication(e.target.value)} />
                                        </MDBCol>

                                        <MDBCol md='3'>
                                            <MDBCheckbox label="Topical"
                                                id='inputMedicationTopical'
                                                value='2'
                                                checked={medication === '2'}
                                                onChange={(e) => setMedication(e.target.value)} />
                                        </MDBCol>

                                        <MDBCol md='3'>
                                            <MDBCheckbox label="Injection"
                                                value='3'
                                                checked={medication === '3'}
                                                onChange={(e) => setMedication(e.target.value)} />
                                        </MDBCol>

                                    </MDBRow>

                                    <MDBRow>
                                        <h6 className="mt-4 pb-2">Anything else a sitter should know?</h6>
                                        <MDBTextArea wrapperClass='mb-4'
                                            label="Add instructions for walking, feeding, or other care"
                                            id='inputAdditionalSitterInformation'
                                            rows={4}
                                            value={additionalSitterInformation}
                                            onChange={(e) => setAdditionalSitterInformation(e.target.value)}>
                                        </MDBTextArea>
                                    </MDBRow>
                                </div>

                                <div className="p-3">
                                    <div className="pb-3">
                                        <h5 style={{ fontWeight: 'bold' }}>
                                            <FontAwesomeIcon icon={faNoteSticky} /> Veterinary Info
                                        </h5>
                                        <small class="text-muted">Add your vets name, address, and phone number</small>
                                    </div>

                                    <MDBRow>
                                        <MDBTextArea wrapperClass='mb-4'
                                            label="Add your vets name, address, and phone number"
                                            id='inputVetDetails'
                                            rows={4}
                                            value={vetDetails}
                                            onChange={(e) => setVetDetails(e.target.value)}>
                                        </MDBTextArea>
                                    </MDBRow>

                                </div>

                                <div className="p-3">
                                    <div className="pb-3">
                                        <h5 style={{ fontWeight: 'bold' }}>
                                            <FontAwesomeIcon icon={faImage} /> Photo Gallery
                                        </h5>
                                        <small class="text-muted">Show off your pet by adding photos and curating photos taken during your bookings.</small>
                                    </div>
                                    <MDBFile label='Add photos here'
                                        size='lg'
                                        id='formFileLg'
                                        value={photos}
                                        onChange={(e) => setPhotos(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <MDBRow className='justify-content-center p-2'>
                                        <MDBCol md='2'>
                                            <MDBBtn className='mb-4 btn-primary'
                                                size='lg'
                                                type="submit">
                                                Save Pet
                                            </MDBBtn>
                                            {isLoading && (
                                                <div className="loading-overlay">
                                                    <img src={process.env.PUBLIC_URL + '/loadingAnimation.gif'} alt="Loading" className="loading-gif" />
                                                </div>
                                            )}
                                        </MDBCol>
                                    </MDBRow>
                                </div>

                            </MDBCardBody>
                        </MDBCard>

                    </MDBRow>
                </MDBContainer>
            </form>
        </>
    );
}

export default CreatePet;