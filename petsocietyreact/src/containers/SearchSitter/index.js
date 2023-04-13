import React, { useState, useEffect, useCallback} from "react";
import DatePicker from "react-datepicker";
import './style.css'
import { Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, ButtonGroup, InputGroup, InputGroupText, Input } from "reactstrap";
import { faCloudSun, faHouseChimney, faRepeat, faSuitcase, faDog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-regular-svg-icons";
import moment from 'moment-timezone';
import "react-datepicker/dist/react-datepicker.css";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import SearchResults from "../../components/SearchResults";
import Api from "../../helpers/Api";


const queryClient = new QueryClient();


function SearchSitter(props) {


    const [formData, setFormData] = useState({
        userId: null,
        serviceType: "DayCare",
        petType: [],
        region: "North",
        dates: {
            startDate: null,
            endDate: null
        },
        numOfPets: "",
        petSize: 0,
        rate: [0, 200],
        repeat: "",
        dayOfWeek: [],
        fulltime: false,
        numOfTimes: null,
    });
     
    useEffect(() => {


        const handleStorage = () => {
          const storedUser = JSON.parse(localStorage.getItem("user"));
          setUser(storedUser);
          if (storedUser) {
            setUserId(storedUser.userId);
            setUserRole(JSON.parse(localStorage.getItem("user_role")));
            setFormData(prevState => ({
                ...prevState,
                userId: storedUser.userId
              }));}
            }
            window.addEventListener('storage', handleStorage())
            return () => window.removeEventListener('storage'. handleStorage())
        }, [])




    //SearchResult will only show when they user clicks the search button
    const [showResults, setShowResults] = useState(false);
    //handle search sitter form and attach the pet parentid
    const handleSearch = () => {
        setFormData({
            ...formData,
            // userId: userId,
            serviceType: selectedItem1,
            petType: selectedType,
            region: selectedItem2,
            dates: {
                startDate: startDate,
                endDate: endDate
            },
            numOfPets: selectedNumOfPets,
            petSize: maxWeight,
            rate: rate,
            repeat: repeat,
            dayOfWeek: selectedDay,
            fulltime: fulltime,
            numOfTimes: selectedNum,
        });
        setShowResults(true);
    }


    const [dropdownOpen1, setDropdownOpen1] = useState(false);
    const [selectedItem1, setSelectedItem1] = useState('DayCare');
    const toggle1 = () => setDropdownOpen1((prevState) => !prevState);
    const handleDropdownChange1 = (selectedService) => {
        setSelectedItem1(selectedService);


    }


    //indicate the type of pets
    const [selectedType, setSelectedType] = useState([]);
    const handleTypes = (event) => {
        const { value, checked } = event.target;
        setSelectedType(prevState => {
          if (checked) {
            return [...prevState, value];
          } else {
            return prevState.filter((type) => type !== value);
          }
        });
    };




    const [dropdownOpen2, setDropdownOpen2] = useState(false);
    const [selectedItem2, setSelectedItem2] = useState('North');
    const toggle2 = () => setDropdownOpen2((prevState) => !prevState);
    const handleDropdownChange2 = (selectedLocation) => {
        setSelectedItem2(selectedLocation);
        setFormData(prevState => ({
            ...prevState,
            region: selectedLocation
        }));
      }


    const [startDate, setStartDate] = useState(moment().tz('Asia/Singapore').startOf("day").toDate());
    const [endDate, setEndDate] = useState(moment("1990-01-01 00:00:00").toDate());
    const selectDates = (dates) => {
        const [start, end] = dates
        setStartDate(start);
        setEndDate(end);
    }


    //indicate the num of pets
    const [selectedNumOfPets, setSelectedNumOfPets] = useState('1');
    const handleNumOfPets = (num) => {
        setSelectedNumOfPets(num);
        setPetWeights(new Array(parseInt(num)).fill(''));
    };


    //indicate the weight of the dog and will display the number of weight buttons based on the number of
    //finding the min and max weight in the array of weights
    const [petWeights, setPetWeights] = useState([]);
    const [maxWeight, setMaxWeight] = useState(0);
    const handleWeightChange = (index, event) => {
        const updatedPetWeights  = [...petWeights]
        updatedPetWeights[index] = parseInt(event.target.value);;
        setPetWeights(updatedPetWeights);
        setMaxWeight(Math.max(...updatedPetWeights))
    };
   


    //rate for the service given as a range  
    const [rate, setRate] = useState([1.00, 200.00]);
    const handleRateChange = (value) => {
        setRate(value);
    };




    //label for the heading of the slider
    const getLabel = () => {
        switch (selectedItem1) {
            case "Boarding":
            case "DayCare":
                return "Rate (per day):";
            case "Drop-in Visits":
                return "Rate (per hr):";
            case "Dog Walker":
                return "Rate (per walk):";
            default:
                return "";
        }
    };




    //indicate the number or recurring times of service per day
    const [selectedNum, setSelectedNumOfTime] = useState('');
    const handleNumOfTimesSelection = (num) => {
        setSelectedNumOfTime(num);
      };
    let numOfTimesButton = ""


    const [repeat, setRepeat] = useState("once");
    const handleRepeatSelection = (selectedRepeat) => {
        setRepeat(selectedRepeat);
      };


    //for repeated service
    let repeatButtons = ""
    if (selectedItem1 === "DayCare" || selectedItem1 === "Drop-in Visits" || selectedItem1 === "Dog Walker") {
        repeatButtons = (
            <>
                <label style={{marginBottom : "3vh"}}>How often do you need {selectedItem1}?</label>
                <Button outline color="secondary" className={repeat === "once" ? "active" : ""} style={{width: "40%", margin:"5px 10px 10px 10px", color:"black"}} onClick={() => handleRepeatSelection("once")}>
                    <FontAwesomeIcon icon={faCalendarAlt} style={{float: "left", height:"25px", width:"25px"}}/> One Time</Button>{' '}
                <Button outline color="secondary"  className={repeat === "weekly" ? "active" : ""} style={{width: "40%", margin:"5px 10px 10px 10px", color:"black"}} onClick={() => handleRepeatSelection("weekly")}>
                <FontAwesomeIcon icon={faRepeat} style={{float: "left", height:"25px", width:"25px"}}/>Repeat Weekly</Button>{' '}
            </>
        )
    }


    //number of weight selection buttons will be displayed based on the number of pets selected and this is mapped to each pet
    const weightInput = [];
    for (let i = 0; i < parseInt(selectedNumOfPets); i++) {
        weightInput.push(
            <div className="mb-3" key={i}>
                <label htmlFor={`pet-${i}-weight`} className="form-label">
                    Pet {i + 1} weight (kg):
                </label>
                <InputGroup>
                    <Input
                        id={`pet-${i}-weight`}
                        placeholder="Enter weight"
                        type="number"
                        onChange={(event) => handleWeightChange(i, event)}
                    />
                    <InputGroupText>
                        kg
                    </InputGroupText>
                </InputGroup>
            </div>
        );
    }


    //indicate the day of the week if user chooses weekly
    const [selectedDay, setSelectedDay] = useState([]);
    const handleDaySelection = (selected) => {
        const index = selectedDay.indexOf(selected);
        if (index < 0) {
            setSelectedDay([...selectedDay, selected]);
        } else {
            setSelectedDay(selectedDay.filter((day) => day !== selected));
        }
      };


    let dayOfWeekButton = ""


    let fulltimeButton = "";
    if (selectedItem1 === "DayCare") {
        fulltimeButton = (
            <>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="fulltimeCheck" name="fulltime" onChange={handleInputChange} />
                    <label className="form-check-label" htmlFor="fulltimeCheck">
                        Sitter is home full-time
                    </label>
                </div>
            </>
        )
    }


    if (selectedItem1 === "Dog Walker" || selectedItem1 === "Drop-in Visits") {
        numOfTimesButton = (
            <>
                <div className="d-flex flex-column">
                    <label htmlFor="gridCheck" className="form-label">
                        How many times a day?
                    </label>
                    <ButtonGroup>
                        <Button
                            color="purple"
                            active={selectedNum === '1'}
                            onClick={() => handleNumOfTimesSelection('1')}
                        >
                            1
                        </Button>
                        <Button
                            color="purple"
                            active={selectedNum === '2'}
                            onClick={() => handleNumOfTimesSelection('2')}
                        >
                            2
                        </Button>
                        <Button
                            color="purple"
                            active={selectedNum === '3'}
                            onClick={() => handleNumOfTimesSelection('3')}
                        >
                            3
                        </Button>
                    </ButtonGroup>
                </div>
            </>
        )
    }


    if ((selectedItem1 === "Dog Walker" || selectedItem1 === "Drop-in Visits") && repeat === "weekly") {
        const daysOfWeek = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];


        dayOfWeekButton = (
            <>
                <label htmlFor="gridCheck" className="form-label">
                    Which days do you need?
                </label>
                <ButtonGroup>
                    {daysOfWeek.map((day, index) => (
                        <Button
                            key={index}
                            color={selectedDay.includes(day) ? 'yellow' : 'purple'}
                            style={{ whiteSpace: 'nowrap' }}
                            onClick={() => handleDaySelection(day)}
                            active={selectedDay.includes(day)}>
                            {day}
                        </Button>
                    ))}
                </ButtonGroup>
                <p>Selected: {selectedDay.join(", ")}</p>
            </>
        );
    }




    return (
       
        <QueryClientProvider client={queryClient}>
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-4"
                        style={{ display: 'block', backgroundColor: '#6c757d', float: "right" }}>


                    <div style={{ height: "100vh", overflow: "auto", marginTop: "3vh"}}>
                        <form className="bg-light p-4 custom-form" onSubmit={handleSearch}>
                            <div className="mb-3">


                                    <div className="mb-3">
                                        <label htmlFor="gridCheck" className="form-label">
                                            What service are you looking for?
                                        </label>
                                        <Dropdown isOpen={dropdownOpen1} toggle={toggle1}>
                                            <DropdownToggle className="btn-purple" caret size="lg">
                                                {selectedItem1}
                                            </DropdownToggle>
                                            <DropdownMenu>
                                                <DropdownItem className="dropdown-item-icon" onClick={() => handleDropdownChange1('DayCare')}>
                                                    <FontAwesomeIcon icon={faCloudSun} className="dropdown-item-icon-left" />
                                                    <span>DayCare</span>
                                                </DropdownItem>
                                                <DropdownItem className="dropdown-item-icon" onClick={() => handleDropdownChange1('Drop-in Visits')}>
                                                    <FontAwesomeIcon icon={faHouseChimney} className="dropdown-item-icon-left" />
                                                    <span>Drop-in Visits</span>
                                                </DropdownItem>
                                                <DropdownItem className="dropdown-item-icon" onClick={() => handleDropdownChange1('Boarding')}>
                                                    <FontAwesomeIcon icon={faSuitcase} className="dropdown-item-icon-left" />
                                                    <span>Boarding</span>
                                                </DropdownItem>
                                                <DropdownItem className="dropdown-item-icon" onClick={() => handleDropdownChange1('Dog Walker')}>
                                                    <FontAwesomeIcon icon={faDog} className="dropdown-item-icon-left" />
                                                    <span>Dog Walker</span>
                                                </DropdownItem>


                                            </DropdownMenu>
                                        </Dropdown>
                                        <input type="hidden" name="selectedItem1" value={selectedItem1} />
                                    </div>


                                    <label className="form-label">
                                        I'm looking for my service for my:
                                    </label>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="dogCheck"
                                                    name="petType"
                                                    value="dog"
                                                    checked={selectedType.includes("dog")}
                                                    onChange={handleTypes }
                                                />
                                                <label className="form-check-label">
                                                    Dog
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="catCheck"
                                                    name="petType"
                                                    value="cat"
                                                    checked={selectedType.includes("cat")}
                                                    onChange={handleTypes }
                                                />
                                                <label className="form-check-label">
                                                    Cat
                                                </label>
                                            </div>
                                        </div>


                                    <div className="mb-3">
                                        <label htmlFor="gridCheck" className="form-label">
                                            Location:
                                        </label>
                                        <Dropdown isOpen={dropdownOpen2} toggle={toggle2} {...props}>
                                            <DropdownToggle className="btn-purple" caret size="lg">
                                                {selectedItem2}
                                            </DropdownToggle>
                                            <DropdownMenu>
                                                <DropdownItem onClick={() => handleDropdownChange2('North')}>North</DropdownItem>
                                                <DropdownItem onClick={() => handleDropdownChange2('South')}>South</DropdownItem>
                                                <DropdownItem onClick={() => handleDropdownChange2('East')}>East</DropdownItem>
                                                <DropdownItem onClick={() => handleDropdownChange2('West')}>West</DropdownItem>
                                                <DropdownItem onClick={() => handleDropdownChange2('Central')}>Central</DropdownItem>
                                            </DropdownMenu>
                                        </Dropdown>
                                        </div>


                                        <div style={{ display: "block" }}>
                                            <label htmlFor="gridCheck" className="form-label">
                                                Dates
                                            </label>
                                            <DatePicker
                                                dateFormat="dd/MM/yyyy"
                                                selected={startDate}
                                                onChange={selectDates}
                                                startDate={startDate}
                                                endDate={endDate}
                                                selectsRange />
                                        </div>


                                        <div className="mb-3">
                                            <label htmlFor="gridCheck" className="form-label">
                                                Number of pets:
                                            </label>
                                            <br />
                                            <ButtonGroup>
                                                <Button
                                                    color="purple"
                                                    active={selectedNumOfPets === '1'}
                                                    style={{ whiteSpace: 'nowrap' }}
                                                    onClick={() => handleNumOfPets('1')}>
                                                    1
                                                </Button>
                                                <Button
                                                    color="purple"
                                                    active={selectedNumOfPets === '2'}
                                                    style={{ whiteSpace: 'nowrap' }}
                                                    onClick={() => handleNumOfPets('2')}>
                                                    2
                                                </Button>
                                                <Button
                                                    color="purple"
                                                    active={selectedNumOfPets === '3'}
                                                    style={{ whiteSpace: 'nowrap' }}
                                                    onClick={() => handleNumOfPets('3')}>
                                                    3
                                                </Button>
                                            </ButtonGroup>
                                        </div>


                                        <div className="mb-3">
                                            {weightInput}
                                        </div>


                                        <div className="mb-3">
                                            <label htmlFor="rate">{getLabel()}</label>
                                            <Slider
                                                range
                                                min={1.00}
                                                max={200.00}
                                                step={1.0}
                                                value={rate}
                                                onChange={handleRateChange} />
                                            <div>
                                                Rate: {rate[0].toFixed(2)} - {rate[1].toFixed(2)}
                                            </div>
                                        </div>


                                        <div className="mb-3">
                                            {repeatButtons}
                                        </div>


                                        <div className="mb-3">
                                            {fulltimeButton}
                                        </div>


                                        <div className="mb-3">
                                            {numOfTimesButton}
                                        </div>


                                        <div className="mb-3">
                                            {dayOfWeekButton}
                                        </div>


                                    <div>
                                        <Button
                                            color="primary"
                                            type="submit"
                                            onClick={() => {
                                                handleSearch();
                                            }}>
                                            Search
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    </div>
                    <div className="col-md-4" style={{ marginLeft: "-25px" }}>
                        {showResults && <SearchResults formData={formData} style={{ overflow: "auto" }} />}
                        {/* <SearchResults searchQuery={searchQuery} style={{ float: "right", overflow: "auto" }} /> */}
                    </div>
                </div>
        </div>
        </>
        </QueryClientProvider>
    );
}


export default SearchSitter;


