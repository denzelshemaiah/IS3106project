import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import './style.css'
import { Card, CardText, CardBody, Button, Label, Input, Form, FormGroup} from "reactstrap";
import { faCloudSun, faHouseChimney, faRepeat, faSuitcase, faPaw } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-regular-svg-icons";
import moment from 'moment-timezone';
import "react-datepicker/dist/react-datepicker.css";
import Api from "../../helpers/Api";
import {Link, useParams, useNavigate} from "react-router-dom";

//page to view all bookings, follows a tab view
function MakeBooking(props) {
    const [service, setService] = useState("");
    const [startDate, setStartDate] = useState(moment().tz('Asia/Singapore').startOf("day").toDate());
    const [cost, setCost] = useState(0);
    const [created, setCreated] = useState(moment());
    const [description, setDescription] = useState("");
    const [freq, setFreq] = useState(0);
    const [endDate, setEndDate] = useState(moment("1990-01-01 00:00:00").toDate());
    const [repeat, setRepeat] = useState("once")
    const numPets = props.numPets
    const [bookings, setBookings] = useState([]);
    const navigate = useNavigate();
    const [rate, setRate] = useState(props.rate);
    const [parentId, setParentId] = useState(0);
    const [sitterId, setSitterId] = useState(0);

    useEffect(() => {
        setService("walking")
        const calculateTotalCost = () => {
            //per day (boarding,  daycare)
            if (service === "boarding" || service === "daycare") {
                var diffDays = Math.round((endDate - startDate)/(1000 * 60 * 60 * 24));
                if (repeat === "weekly") {
                    var numWeeks = calcNumWeeks;
                    return numWeeks * diffDays * rate;
                }
                return diffDays * rate;
            } else if (service === "walking" || service === "dropin") {
                //drop-in case, basis is per visit or walking, basis is per walk
                diffDays = Math.round((endDate - startDate)/(1000 * 60 * 60 * 24));
                //get weekly visits
                var visits = diffDays * freq
                if (repeat === "weekly") {
                    var numWeeks = calcNumWeeks;
                    return numWeeks * visits * rate;
                }
                return diffDays * rate;
            }      
        }
        setCost(calculateTotalCost)
    }, [service]);

    const calcNumWeeks = () => {
        var numWeeks = 0
            var copyStart = startDate
            while (copyStart < endDate) {
                copyStart = copyStart.setDate(copyStart.getDate() + 7)
                numWeeks += 1
            }
        return numWeeks;
    }

    //for the top bar stating service
    let serviceIcon = ""
    let serviceText = ""
    let repeatButtons = ""

    if (service === "walking") {
        serviceText = "Pet Walking"
        serviceIcon = (
            <FontAwesomeIcon icon={faPaw} style={{float: "left", marginRight: "15px", height:"30px", width:"30px"}}/>
        )
    } else if (service === "daycare") {
        serviceText = "Day Care"
        serviceIcon = (
            <FontAwesomeIcon icon={faCloudSun} style={{float: "left", marginRight: "15px", height:"30px", width:"30px"}}/>
        )
    } else if (service === "dropin") {
        serviceText = "Drop-in Visits"
        serviceIcon = (
            <FontAwesomeIcon icon={faHouseChimney} style={{float: "left", marginRight: "15px", height:"30px", width:"30px"}}/>
        )
    } else if (service === "boarding") {
        serviceText = "Boarding"
        serviceIcon = (
            <FontAwesomeIcon icon={faSuitcase} style={{float: "left", marginRight: "15px", height:"30px", width:"30px"}}/>
        )
    }

    let freqText = ""
    if(service === "dropin" || service === "walking") {
        freqText = (
            <>
                <h5>Daily frequency: {freq}</h5>
            </>
        )
    }

    repeatButtons = (
        <>
            <h5 style={{marginBottom : "3vh"}}>How often do you need {serviceText}?</h5>
            <Button outline color="secondary" className={repeat === "once" ? "active" : ""} style={{width: "45%", margin:"10px"}}> 
                <FontAwesomeIcon icon={faCalendarAlt} style={{float: "left", height:"30px", width:"30px"}}/> One Time</Button>{' '}
            <Button outline color="secondary"  className={repeat === "weekly" ? "active" : ""} style={{width: "45%", margin:"10px"}}>
            <FontAwesomeIcon icon={faRepeat} style={{float: "left", height:"30px", width:"30px"}}/>Repeat Weekly</Button>{' '}
        </>
    )

    const selectDates = (dates) => {
        const[start, end] = dates
        setStartDate(start);
        setEndDate(end);
    }

    const addAllBookings = () => {
        var copyStart = startDate;

    }

    const createBookingSubmit = (form) => {
        form.preventDefault();
        
        //fetch the Api
        Api.createBooking(bookings, parentId, sitterId)
        .then((data) => {
            navigate("/bookings");
        });
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
                
                <Form onSubmit={createBookingSubmit}>
                    <div style={{display: "block", marginBottom:"3vh"}}>
                        {repeatButtons}
                    </div>

                    <div style={{display: "block"}}>
                        <h5 style={{ marginBottom:"3vh"}}> Please select the dates for {serviceText} </h5>
                        <DatePicker
                            dateFormat="dd/MM/yyyy"
                            selected={startDate}
                            onChange={selectDates}
                            startDate={startDate}
                            endDate={endDate}
                            selectsRange
                            readOnly="true"
                        />
                    </div>

                    <div style={{display: "block", marginTop:"3vh"}}>
                        {freqText}
                    </div>

                    <div style={{display: "block", marginTop:"3vh"}}>
                        <h5> The total cost will be: {cost}</h5>
                    </div>

                    <div style={{display: "block", marginBottom:"3vh", marginTop:"3vh"}}>
                        <h5>
                            Message
                        </h5>
                        <FormGroup>
                            <Label for="exampleText">Share a little about your pet and why they'd have a great time with </Label>
                            <Input type="textarea" name="text" id="exampleText" style={{height: "20vh"}} onChange={setDescription}/>
                        </FormGroup>
                    </div>

                    <div style={{display: "block"}}>
                        <Button type="submit" style={{backgroundColor: "#e6e4f5", color: "black"}}> Book now </Button>
                    </div>
                </Form>
            </div>
        </>
    );
}

export default MakeBooking;