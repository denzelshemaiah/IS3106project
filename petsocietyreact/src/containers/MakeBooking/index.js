import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import './style.css'
import { Card, CardText, CardBody, Button, Label, Input, Form, FormGroup, ButtonGroup} from "reactstrap";
import { faCloudSun, faHouseChimney, faRepeat, faSuitcase, faPaw } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-regular-svg-icons";
import moment from 'moment-timezone';
import "react-datepicker/dist/react-datepicker.css";
import Api from "../../helpers/Api";
import {Link, useParams, useNavigate, useSearchParams, useLocation} from "react-router-dom";

//page to view all bookings, follows a tab view
function MakeBooking() {
    const [service, setService] = useState("");
    const [startDate, setStartDate] = useState(moment("2023-04-08 00:00:00").startOf("day").toDate());
    const [cost, setCost] = useState(0);
    const [created, setCreated] = useState(moment().toDate());
    const [description, setDescription] = useState("");
    const [freq, setFreq] = useState('2');
    const [endDate, setEndDate] = useState(moment("2023-05-08 00:00:00").startOf("day").toDate());
    const [repeat, setRepeat] = useState("");
    const [numPets, setNumPets] = useState(0);
    const navigate = useNavigate();
    const [rate, setRate] = useState(10);
    const [parentId, setParentId] = useState(1);
    const [sitterId, setSitterId] = useState(0);
    const [daysRepeat, setDaysRepeat] = useState([]);
    const location = useLocation();
    const daysOfWeek = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
    const [sitter, setSitter] = useState({});

    useEffect(() => {
        const handleStorage = () => {
            setParentId(JSON.parse(localStorage.getItem("user")).userId);
        }
        
        window.addEventListener('storage', handleStorage())
        return () => window.removeEventListener('storage', handleStorage())
    }, [])

    useEffect(() => {
        const sitter = location.state?.sitter;
        setSitter(sitter)
        if (sitter) {
            setService(sitter.service)
            setStartDate(moment().tz("Asia/Singapore").toDate())
            setEndDate(moment().tz("Asia/Singapore").toDate())
            setRate(sitter.rate);
            setSitterId(sitter.userId);
            setSitter(sitter);
        }
    }, []);

    const calculateTotalCost = () => {
        //per day (boarding,  daycare)
        if (service === "BOARDING" || service === "DAYCARE") {
            var diffDays = Math.round((endDate.getTime() - startDate.getTime())/(1000 * 60 * 60 * 24));

            console.log("first diff" + diffDays)
            if (repeat === "weekly") {
                diffDays = 0;
                var copyStart = startDate
                while (copyStart <= endDate) {
                    var dayIdx = moment(copyStart).day();
                    var daysRepeatIdx = convertDays(daysRepeat);
                    if (daysRepeatIdx.includes(dayIdx)) {
                        //add charge for one more day
                        diffDays++;
                    }
                    copyStart = moment(copyStart).add(1, "days");
                }
            }
            console.log("diff days:" +  diffDays);
            console.log(rate);
            console.log(numPets);
            setCost(diffDays * rate * numPets);
        } else if (service === "WALKING" || service === "DROP_IN") {
            //drop-in case, basis is per visit or walking, basis is per walk
            diffDays = Math.round((endDate - startDate)/(1000 * 60 * 60 * 24));
            if (repeat === "weekly") {
                diffDays = 0;
                copyStart = startDate
                while (copyStart <= endDate) {
                    var dayIdx = moment(copyStart).day();
                    var daysRepeatIdx = convertDays(daysRepeat);
                    if (daysRepeatIdx.includes(dayIdx)) {
                        //add charge for one more day
                        diffDays++;
                    }
                    copyStart = moment(copyStart).add(1, "days");
                }
                console.log(diffDays)
                setCost(diffDays * rate * parseInt(freq) * numPets);
            }
            setCost((diffDays + 1) * rate * parseInt(freq) * numPets);
        }      
    }

    const handleDaySelection = (selected) => {
        console.log(selected)
        const index = daysRepeat.indexOf(selected);
        console.log(index);
        if (index < 0) {
            setDaysRepeat([...daysRepeat, selected]);
        } else {
            setDaysRepeat(daysRepeat.filter((day) => day !== selected));
        }
    };

    let dayOfWeekButton = "";

    if (repeat === "weekly") {
        dayOfWeekButton = (
            <>
                <h5>Which days per week? </h5>
                <ButtonGroup>
                    {daysOfWeek.map((day, index) => (
                        <Button
                            value={day}
                            key={index}
                            color={daysRepeat.includes(day)}
                            style={{ whiteSpace: 'nowrap' }}
                            onClick={(day) => handleDaySelection(day.target.value)}
                            active={daysRepeat.includes(day)}>
                            {day}
                        </Button>
                    ))}
                </ButtonGroup>
                <p>Selected: {daysRepeat.join(", ")}</p>
            </>
        );
    }

    //convert days repeat to integers
    function convertDays(array) {
        var daysStr = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
        var daysNum = [];
        array.forEach((day) => {
            var idx = daysStr.indexOf(day);
            daysNum.push(idx);
        })
        //sort earliest day to latest
        return daysNum.sort()
    }

    //for the top bar stating service
    let serviceIcon = ""
    let serviceText = ""
    let repeatButtons = ""
    let numOfTimesButton = ""
    let repeatDaysButton = ""

    if (service === "walking") {
        serviceText = "Pet Walking"
        serviceIcon = (
            <FontAwesomeIcon icon={faPaw} style={{float: "left", marginRight: "15px", height:"30px", width:"30px"}}/>
        )
        numOfTimesButton = (
            <>  
                <h5>Number of walks per day: </h5>
                <ButtonGroup>
                <Button
                        style={{ whiteSpace: 'nowrap'}}
                        active={freq === "1"}
                        onClick={() => setFreq(1)}>
                            1
                    </Button>
                    <Button
                        style={{ whiteSpace: 'nowrap'}}
                        active={freq === "2"}
                        onClick={() => setFreq(2)}>
                            2
                    </Button>
                    <Button
                        style={{ whiteSpace: 'nowrap'}}
                        active={freq === "3"}
                        onClick={() => setFreq(3)}>
                            3
                    </Button>
                </ButtonGroup>
            </>
        )
    } else if (service === "DAYCARE") {
        serviceText = "Day Care"
        serviceIcon = (
            <FontAwesomeIcon icon={faCloudSun} style={{float: "left", marginRight: "15px", height:"30px", width:"30px"}}/>
        )
    } else if (service === "DROP_IN") {
        serviceText = "Drop-in Visits"
        serviceIcon = (
            <FontAwesomeIcon icon={faHouseChimney} style={{float: "left", marginRight: "15px", height:"30px", width:"30px"}}/>
        )
        numOfTimesButton = (
            <>  
                <h5>Number of visits per day: </h5>
                <ButtonGroup>
                    <Button
                        style={{ whiteSpace: 'nowrap'}}
                        active={freq === 1}
                        onClick={() => setFreq(1)}
                        color="white"
                    >
                            1
                    </Button>
                    <Button
                        style={{ whiteSpace: 'nowrap'}}
                        active={freq === 2}
                        onClick={() => setFreq(2)}
                        color="white"
                    >
                            2
                    </Button>
                    <Button
                        style={{ whiteSpace: 'nowrap'}}
                        active={freq === 3}
                        onClick={() => setFreq(3)}
                        color="white">
                            3
                    </Button>
                </ButtonGroup>
            </>
        )
    } else if (service === "BOARDING") {
        serviceText = "Boarding"
        serviceIcon = (
            <FontAwesomeIcon icon={faSuitcase} style={{float: "left", marginRight: "15px", height:"30px", width:"30px"}}/>
        )
    }

    let freqText = ""
    if(service === "DROP_IN" || service === "WALKING") {
        freqText = (
            <>
                <h5>Daily frequency: {freq}</h5>
            </>
        )
    }

    repeatButtons = (
        <>
            <h5 style={{marginBottom : "3vh"}}>How often do you need {serviceText}?</h5>
            <Button outline color="secondary" className={repeat === "once" ? "active" : ""} onClick={() => setRepeat("once")} style={{width: "45%", margin:"10px"}}> 
                <FontAwesomeIcon icon={faCalendarAlt} style={{float: "left", height:"30px", width:"30px"}}/> One Time</Button>{' '}
            <Button outline color="secondary"  className={repeat === "weekly" ? "active" : ""} onClick={() => setRepeat("weekly")} style={{width: "45%", margin:"10px"}}>
            <FontAwesomeIcon icon={faRepeat} style={{float: "left", height:"30px", width:"30px"}}/>Repeat Weekly</Button>{' '}
        </>
    )

    const getMaxDate = () => {
        //can only make bookings for the next 30 days
        return moment(created).add(31, 'days').toDate();
    }

    const selectDates = (dates) => {
        const[start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    }

    let booking = {};

    //HANDLE FORM
    const createBookingSubmit = async () => {
        booking = {
            created : created,
            description : description,
            endDate : endDate,
            numPets : numPets,
            startDate : startDate,
            freq : freq,
            repeatDays : daysRepeat,
            cost: cost,
        }
        console.log(booking);
        
        //fetch the Api
        await Api.createBooking(booking, parentId, sitterId, repeat)
        .then(() => navigate("/bookings"));
    }

    const handleDescChange = e => {
        setDescription(e.target.value);
    }


    return (
        <>
            <head>
                <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css"
                />
            </head>
            <div style={{width: "50vw", margin: "auto"}}>
                <div style={{display: "block", marginTop:"3vh", marginBottom:"3vh"}}> 
                    <h2 id="contact-header"> Contact </h2>
                </div>

                <div style={{display: "block"}}>
                    <Card style={{
                    padding: 0,
                    width: '100%',
                    VerticalAlignCenter: true,
                    marginBottom:"3vh"
                    }}>
                        <CardBody>
                            <CardText>
                                <span>
                                    {serviceIcon}
                                </span>
                                <span>
                                    <h5>
                                        {serviceText} 
                                    </h5>
                                </span>
                            </CardText>
                        </CardBody>
                    </Card>
                </div>
                
                    <div style={{display: "block", marginBottom:"3vh"}}>
                        {repeatButtons}
                    </div>

                    <div style={{display: "block"}}>
                        <h5 style={{ marginBottom:"3vh"}}> Selected dates for {serviceText} </h5>
                        <DatePicker
                            dateFormat="dd/MM/yyyy"
                            selected={startDate}
                            onChange={e => {selectDates(e)}}
                            startDate={startDate}
                            endDate={endDate}
                            selectsRange
                            maxDate={getMaxDate()}
                            minDate={created}
                            showIcon
                        />
                    </div>

                    <div style={{display: "block"}}>
                        <h5 style={{ marginBottom:"3vh", marginTop:"3vh"}}> Selected number of pets: </h5>
                        <ButtonGroup>
                            <Button
                                color="purple"
                                active={numPets === '1'}
                                style={{ whiteSpace: 'nowrap' }}
                                onClick={() => {setNumPets('1')}}>
                                1
                            </Button>
                            <Button
                                color="purple"
                                active={numPets === '2'}
                                style={{ whiteSpace: 'nowrap' }}
                                onClick={() => {setNumPets('2')}}>
                                2
                            </Button>
                            <Button
                                color="purple"
                                active={numPets === '3'}
                                style={{ whiteSpace: 'nowrap' }}
                                onClick={() => {setNumPets('3')}}>
                                3
                            </Button>
                        </ButtonGroup>
                    </div>

                    <div style={{display: "block", marginTop:"3vh"}}>
                        {numOfTimesButton}
                    </div>

                    <div style={{display: "block", marginTop:"3vh"}}>
                        {dayOfWeekButton}
                    </div>

                    <div style={{display: "block", marginTop:"3vh"}}>
                        <h5> The total cost will be: {cost}</h5>
                        <Button style={{backgroundColor: "#e6e4f5", color: "black", float:"right", marginTop:"-5vh"}}
                        onClick={() => calculateTotalCost()}> View cost</Button>
                    </div>

                    <div style={{display: "block", marginBottom:"3vh", marginTop:"3vh"}}>
                        <h5>
                            Message
                        </h5>
                        <FormGroup>
                            <Label for="exampleText">Share a little about your pet and why they'd have a great time with {sitter.firstName}</Label>
                            <Input type="textarea" name="text" id="exampleText" value={description} style={{height: "20vh"}} onChange={handleDescChange}/>
                        </FormGroup>
                    </div>

                    <div style={{display: "block"}}>
                        <Button type="submit" style={{backgroundColor: "#e6e4f5", color: "black"}} onClick={() => createBookingSubmit()}> Book now </Button>
                    </div>
            </div>
        </>
    );
}

export default MakeBooking;