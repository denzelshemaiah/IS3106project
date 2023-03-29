import React, { useState } from "react";
import DatePicker from "react-datepicker";
import './style.css'
import { Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, ButtonGroup} from "reactstrap";
import { faCloudSun, faHouseChimney, faRepeat, faSuitcase, faDog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-regular-svg-icons";
import moment from 'moment-timezone';
import "react-datepicker/dist/react-datepicker.css";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';


function SearchSitter(props) {

    const [startDate, setStartDate] = useState(moment().tz('Asia/Singapore').startOf("day").toDate());
    const [endDate, setEndDate] = useState(moment("1990-01-01 00:00:00").toDate());
    const [repeat, setRepeat] = useState("once")

    const [dropdownOpen1, setDropdownOpen1] = useState(false);
    const [selectedItem1, setSelectedItem1] = useState('DayCare');
    const toggle1 = () => setDropdownOpen1((prevState) => !prevState);

    const [dropdownOpen2, setDropdownOpen2] = useState(false);
    const [selectedItem2, setSelectedItem2] = useState('North');
    const toggle2 = () => setDropdownOpen2((prevState) => !prevState);

    const selectDates = (dates) => {
        const[start, end] = dates
        setStartDate(start);
        setEndDate(end);
    }

    //indicate the weight of the dog
    const [selectedWeight, setSelectedWeight] = useState('');
    const handleWeightSelection = (num) => {setSelectedWeight(num);}

    const [rate, setRate] = useState([1.00, 500.00]);
    const handleRateChange = (value) => {setRate(value);};

    //for repeated service
    let repeatButtons = ""

    //indicate if the sitter is home full-time
    let fulltimeButton = ""

    //indicate the number or recurring times of service per day
    const [selectedNum, setSelectedNumOfTime] = useState('');
    const handleNumOfTimesSelection = (num) => {setSelectedNumOfTime(num);}
    let numOfTimesButton = ""
    
    
    
    //indicate if the time 
    const [selectedTime, setSelectedTime] = useState([]);
    const handleTimeSelection = (selected) => {
        const index = selectedTime.indexOf(selected);
        if (index < 0) {
            selectedTime.push(selected);
        } else {
            selectedTime.splice(index, 1);
        }
        setSelectedTime([...selectedTime]);
      };
    let timeOfDayButton = ""

    if (selectedItem1 === "DayCare" || selectedItem1 ==="Drop-in Visits" || selectedItem1==="Dog Walker") {
        repeatButtons = (
            <>
                <label style={{marginBottom : "3vh"}}>How often do you need {selectedItem1}?</label>
                <Button outline color="secondary" className={repeat === "once" ? "active" : ""} style={{width: "40%", margin:"5px 10px 10px 10px", color:"black"}} onClick={() => setRepeat("once")}> 
                    <FontAwesomeIcon icon={faCalendarAlt} style={{float: "left", height:"25px", width:"25px"}}/> One Time</Button>{' '}
                <Button outline color="secondary"  className={repeat === "weekly" ? "active" : ""} style={{width: "40%", margin:"5px 10px 10px 10px", color:"black"}} onClick={() => setRepeat("weekly")}>
                <FontAwesomeIcon icon={faRepeat} style={{float: "left", height:"25px", width:"25px"}}/>Repeat Weekly</Button>{' '}
            </>
        )
    }

    if (selectedItem1 === "DayCare") {
        fulltimeButton = (
            <>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="fulltimeCheck"/>
                    <label className="form-check-label" htmlFor="fulltimeCheck">
                    Sitter is home full-time
                    </label>
                </div>
            </>
        )
    }

    if (selectedItem1 === "Dog Walker" || selectedItem1 ==="Drop-in Visits") {
        numOfTimesButton = (
            <>
                <label htmlFor="gridCheck" className="form-label">
                        How many times a day?
                    </label>
                    <ButtonGroup>
                    <Button
                        color={selectedNum === '1' ? 'yellow' : 'purple'}
                        style={{ whiteSpace: 'nowrap' }}
                        onClick={() => handleNumOfTimesSelection('1')}>
                            1
                        </Button>
                        <Button
                        color={selectedNum === '2' ? 'yellow' : 'purple'}
                        style={{ whiteSpace: 'nowrap' }}
                        onClick={() => handleNumOfTimesSelection('2')}>
                            2
                        </Button>
                        <Button
                        color={selectedNum === '3+' ? 'yellow' : 'purple'}
                        style={{ whiteSpace: 'nowrap' }}
                        onClick={() => handleNumOfTimesSelection('3+')}>
                            3+
                        </Button>
                    </ButtonGroup>
            </>
        )
    }

    if (selectedItem1 === "Dog Walker" || selectedItem1 === "Drop-in Visits") {
        timeOfDayButton = (
            <>
                <label htmlFor="gridCheck" className="form-label">
                    Which time of the day do you need?
                </label>
                <ButtonGroup>
                    <Button
                        color={selectedTime === '6am-11am' ? 'yellow' : 'purple'}
                        style={{ whiteSpace: 'nowrap' }}
                        onClick={() => handleTimeSelection(1)}
                        active={selectedTime.includes(1)}>
                            6am-11am
                        </Button>
                        <Button
                        color={selectedTime === '11am-3pm' ? 'yellow' : 'purple'}
                        style={{ whiteSpace: 'nowrap' }}
                        onClick={() => handleTimeSelection(2)}
                        active={selectedTime.includes(2)}>
                            11am-3pm
                        </Button>
                        <Button
                        color={selectedTime === '3pm-10pm' ? 'yellow' : 'purple'}
                        style={{ whiteSpace: 'nowrap' }}
                        onClick={() => handleTimeSelection(3)}
                        active={selectedTime.includes(3)}>
                            3pm-10pm
                    </Button>
                </ButtonGroup>
                <p>Selected: {selectedTime.join(", ")}</p>
            </>
        );
    }

    return (
      <div className="container">
        <div className="row">
          <div 
            className="col-md-4" 
            style={{ display: 'block', backgroundColor: '#6c757d' }}>

            <div style={{ height: "600px", overflow: "auto" }}>
            <form className="bg-light p-4 custom-form">
              <div className="mb-3">
                <label htmlFor="gridCheck" className="form-label">
                  I'm looking for my service for my:
                </label>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="dogCheck"/>
                      <label className="form-check-label" htmlFor="dogCheck">
                        Dog
                      </label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="catCheck"/>
                      <label className="form-check-label" htmlFor="catCheck">
                        Cat
                      </label>
                    </div>
                  </div>
                
                <div className="mb-3">
                    <label htmlFor="gridCheck" className="form-label">
                        What service are you looking for?
                    </label>
                    <Dropdown isOpen={dropdownOpen1} toggle={toggle1}>
                        <DropdownToggle className="btn-purple" caret size="lg">
                            {selectedItem1}
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem className="dropdown-item-icon" onClick={() => setSelectedItem1('DayCare')}>
                                <FontAwesomeIcon icon={faCloudSun} className="dropdown-item-icon-left" />
                                <span>DayCare</span>
                            </DropdownItem>
                            <DropdownItem className="dropdown-item-icon" onClick={() => setSelectedItem1('Drop-in Visits')}>
                                <FontAwesomeIcon icon={faHouseChimney} className="dropdown-item-icon-left" />
                                <span>Drop-in Visits</span>
                            </DropdownItem>
                            <DropdownItem className="dropdown-item-icon" onClick={() => setSelectedItem1('Boarding')}>
                                <FontAwesomeIcon icon={faSuitcase} className="dropdown-item-icon-left" />
                                <span>Boarding</span>
                            </DropdownItem>
                            <DropdownItem className="dropdown-item-icon" onClick={() => setSelectedItem1('Dog Walker')}>
                                <FontAwesomeIcon icon={faDog} className="dropdown-item-icon-left" />
                                <span>Dog Walker</span>
                            </DropdownItem>

                        </DropdownMenu>
                    </Dropdown>
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
                            <DropdownItem onClick={() => setSelectedItem2('North')}>North</DropdownItem>
                            <DropdownItem onClick={() => setSelectedItem2('South')}>South</DropdownItem>
                            <DropdownItem onClick={() => setSelectedItem2('East')}>East</DropdownItem>
                            <DropdownItem onClick={() => setSelectedItem2('West')}>West</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>

                <div style={{display: "block"}}>
                    <label htmlFor="gridCheck" className="form-label">
                        Dates
                    </label>
                    <DatePicker
                        dateFormat="dd/MM/yyyy"
                        selected={startDate}
                        onChange={selectDates}
                        startDate={startDate}
                        endDate={endDate}
                        selectsRange/>
                </div>

                <div className="mb-3">
                    <label htmlFor="gridCheck" className="form-label">
                        Size of pet(kg):
                    </label>
                    <ButtonGroup>
                        <Button
                        color={selectedWeight === '0-10' ? 'yellow' : 'purple'}
                        style={{ whiteSpace: 'nowrap' }}
                        onClick={() => handleWeightSelection('0-10')}>
                            0-10
                        </Button>
                        <Button
                        color={selectedWeight === '11-20' ? 'yellow' : 'purple'}
                        style={{ whiteSpace: 'nowrap' }}
                        onClick={() => handleWeightSelection('11-20')}>
                            11-20
                        </Button>
                        <Button
                        color={selectedWeight === '21-30' ? 'yellow' : 'purple'}
                        style={{ whiteSpace: 'nowrap' }}
                        onClick={() => handleWeightSelection('21-30')}>
                            21-30
                        </Button>
                        <Button
                        color={selectedWeight === '30+' ? 'yellow' : 'purple'}
                        style={{ whiteSpace: 'nowrap' }}
                        onClick={() => handleWeightSelection('30+')}>
                            30+
                        </Button>
                    </ButtonGroup>
                </div>

                <div className="mb-3">
                    <label htmlFor="gridCheck" className="form-label">
                        {selectedItem1 === ("Dog Walker" || "Drop-in Visits") ? "Rate (per hour):" : "Rate (per day):"}
                    </label>
                    <Slider
                        range
                        min={1.00}
                        max={500.00}
                        step={1}
                        value={rate}
                        onChange={handleRateChange}/>
                        <div>Rate: {rate[0]} - {rate[1]}</div>
                </div>

                <div>
                    {repeatButtons}
                </div>

                <div>
                    {fulltimeButton}
                </div>

                <div>
                    {numOfTimesButton}
                </div>

                <div>
                    {timeOfDayButton}
                </div>

                <div>
                    <Button
                        color="primary">
                        Search
                    </Button>
                </div>


            </div>
        </div>
    </form>
    </div>
    </div>
        
          {/*results from the search*/}
          <div className="col-md-8">
            {/* Your main content goes here */}
          </div>
        </div>
      </div>
    );
  }
  
  export default SearchSitter;
  
  
  
  