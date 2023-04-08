import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import './style.css'
import { Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, ButtonGroup } from "reactstrap";
import { faCloudSun, faHouseChimney, faRepeat, faSuitcase, faDog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-regular-svg-icons";
import moment from 'moment-timezone';
import "react-datepicker/dist/react-datepicker.css";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import SearchResults from "../../components/SearchResults";
import Api from "../../helpers/Api";


function SearchSitter(props) {

    const [showResults, setShowResults] = useState(false);    

    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const response = await Api.getParentId();
                const parentId = response.data.parentId;
                setFormData(prevState => ({
                ...prevState,
                parentId: parentId
                }));
            } catch (error) {
                console.error(error);
                setFormData(prevState => ({
                ...prevState,
                parentId: null
                }));
            }
        };


        fetchUserId();
    }, []);

//handle search sitter form and attach the pet parentid 
const handleSearch  = () => {
    console.log(formData.parentId);
}

    const handleInputChange = (event) => {
        const { name, value, type } = event.target;
        if (type === "checkbox" && name === "petType") {
          setFormData((prevState) => {
            const petType = prevState.petType.includes(value)
              ? prevState.petType.filter((pet) => pet !== value)
              : [...prevState.petType, value];
            return {
              ...prevState,
              [name]: petType
            };
          });
        } else if (type === "checkbox" && name === "fulltime") {
            setFormData((prevState) => ({
                ...prevState,
                [name]: !prevState.fulltime
            }));
        } else {
          setFormData((prevState) => ({
            ...prevState,
            [name]: type === "number" ? parseInt(value) : value
          }));
        }
      };

    // define form input query
    const [formData, setFormData] = useState({
        userId: null,
        serviceType: "",
        petType: [],
        location: "",
        dates: {
          startDate: null,
          endDate: null
        },
        petSize: "",
        rate: [0, 200],
        repeat: "",
        fulltime: false,
        numOfTimes: null,
        // timeOfDay: ""
      });
    

    const [startDate, setStartDate] = useState(moment().tz('Asia/Singapore').startOf("day").toDate());
    const [endDate, setEndDate] = useState(moment("1990-01-01 00:00:00").toDate());   
    const selectDates = (dates) => {
        const [start, end] = dates
        setStartDate(start);
        setEndDate(end);
        formData.dates = {startDate: start, endDate: end}
    }

    const [dropdownOpen1, setDropdownOpen1] = useState(false);
    const [selectedItem1, setSelectedItem1] = useState('DayCare');
    const toggle1 = () => setDropdownOpen1((prevState) => !prevState);
    const handleDropdownChange1 = (selectedService) => {
        setSelectedItem1(selectedService);
        setFormData(prevState => ({
          ...prevState,
          serviceType: selectedService
        }));
      }

    const [dropdownOpen2, setDropdownOpen2] = useState(false);
    const [selectedItem2, setSelectedItem2] = useState('North');
    const toggle2 = () => setDropdownOpen2((prevState) => !prevState);
    const handleDropdownChange2 = (selectedLocation) => {
        setSelectedItem2(selectedLocation);
        setFormData(prevState => ({
          ...prevState,
          location: selectedLocation
        }));
      }


    //indicate the weight of the dog
    const [selectedWeight, setSelectedWeight] = useState('');
    const handleWeightSelection = (selectedWeight) => {
        setSelectedWeight(selectedWeight);
        setFormData((prevState) => ({
          ...prevState,
          selectedWeight: selectedWeight
        }));
      };

    const [rate, setRate] = useState([1.00, 200.00]);
    const handleRateChange = (value) => {
        setRate(value);
        setFormData((prevState) => ({
            ...prevState,
            rate: value
        }));
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
        setFormData((prevState) => ({
          ...prevState,
          numOfTimes: num
        }));
      };
    let numOfTimesButton = ""

    const [repeat, setRepeat] = useState("once");
    const handleRepeatSelection = (selectedRepeat) => {
        setRepeat(selectedRepeat);
        setFormData((prevState) => ({
          ...prevState,
          repeat: selectedRepeat
        }));
      };
    //for repeated service
    let repeatButtons = ""
    if (selectedItem1 === "DayCare" || selectedItem1 ==="Drop-in Visits" || selectedItem1==="Dog Walker") {
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


    //indicate the day of the week if user chooses weekly
    const [selectedDay, setSelectedDay] = useState([]);
    const handleDaySelection = (selected) => {
        const index = selectedDay.indexOf(selected);
        if (index < 0) {
            setSelectedDay([...selectedDay, selected]);
        } else {
            setSelectedDay(selectedDay.filter((day) => day !== selected));
        }
        setFormData((prevState) => ({
            ...prevState,
            dayOfWeek: selectedDay
          }));
      };
    let dayOfWeekButton = ""

    let fulltimeButton = "";
    if (selectedItem1 === "DayCare") {
        fulltimeButton = (
            <>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="fulltimeCheck" name="fulltime" onChange={handleInputChange}/>
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
        <>
        <div className="container">
            <div className="row">
                <div
                    className="col-md-5"
                    style={{ display: 'block', backgroundColor: '#6c757d', float: "right", marginLeft: "-42px" }}>

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
                                    </div>

                                    <label htmlFor="gridCheck" className="form-label">
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
                                                    onChange={handleInputChange}
                                                />
                                                <label className="form-check-label" htmlFor="dogCheck">
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
                                                    onChange={handleInputChange}
                                                />
                                                <label className="form-check-label" htmlFor="catCheck">
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
                                            Size of pet(kg):
                                        </label>
                                        <ButtonGroup>
                                            <Button
                                                color= "purple"
                                                active={selectedWeight === '0-10'}
                                                style={{ whiteSpace: 'nowrap' }}
                                                onClick={() => handleWeightSelection('0-10')}>
                                                0-10
                                            </Button>
                                            <Button
                                                color= "purple"
                                                active={selectedWeight === '11-20'}
                                                style={{ whiteSpace: 'nowrap' }}
                                                onClick={() => handleWeightSelection('11-20')}>
                                                11-20
                                            </Button>
                                            <Button
                                                color= "purple"
                                                active={selectedWeight === '21-30'}
                                                style={{ whiteSpace: 'nowrap' }}
                                                onClick={() => handleWeightSelection('21-30')}>
                                                21-30
                                            </Button>
                                            <Button
                                                color= "purple"
                                                active={selectedWeight === '30+'}
                                                style={{ whiteSpace: 'nowrap' }}
                                                onClick={() => handleWeightSelection('30+')}>
                                                30+
                                            </Button>
                                        </ButtonGroup>
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
                                            type="submit">
                                            Search
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    </div>
                    <div className="col-md-4" style={{ marginLeft: "-25px" }}>
                            {/* {showResults && <SearchResults searchQuery={formData} style={{ overflow: "auto" }} />} */}
                        <SearchResults searchQuery={formData} style={{ float: "right", overflow: "auto" }} />
                    </div>
                </div>
        </div>
        </>
    );
}
  export default SearchSitter;