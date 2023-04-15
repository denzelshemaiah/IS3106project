import React, { useEffect, useState } from "react";
import Api from "../../helpers/Api";
import { Button, Badge } from "react-bootstrap";
import RequestModal from "../../components/BookingModals"
import NoRequestsPage from "../../components/NoRequestsPage";
import titleIcon from "./titleIcon.jpg"
import moment from "moment-timezone";
import Toast from 'react-bootstrap/Toast'
import ContactModal from "../../components/ContactDetailsModal";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//page to view all bookings, follows a tab view
function Bookings() {
    const [userId, setUserId] = useState(JSON.parse(localStorage.getItem("user")).userId);
    const [chosenTab, setChosenTab] = useState("pending")
    const [bookings, setBookings] = useState([]);
    const [userRole, setUserRole] = useState(JSON.parse(localStorage.getItem("user_role")));
    
    useEffect(() => {
        reloadData();
    }, [chosenTab]);

    useEffect(() => {
        const handleStorage = () => {
            setUserId(JSON.parse(localStorage.getItem("user")).userId);
            setUserRole(JSON.parse(localStorage.getItem("user_role")));
        }
        
        window.addEventListener('storage', handleStorage())
        return () => window.removeEventListener('storage', handleStorage())
    }, [])

    const showErrorToast = () => {
        toast.error('Could not carry out request!', {
          position: toast.POSITION.TOP_RIGHT,
          className:'error-toast'
        });
    }

    function otherParty(booking) {
        if (userRole === "parent") {
            return booking.sitter;
        } else {
            return booking.parent;
        }
    }

    function refreshPage() {
        window.location.reload(false);
    }

    //gets all the booking data for this user
    const reloadData = () => {
        Api.getAllBookings(chosenTab, userId)
        .then((res) => res.json())
        .then((bookings) => {
            for (const booking of bookings) {
                const {bookingReqId, cost, created, description, endDate, numPets, repeatDays, parent, sitter, startDate, status, visitFreq} = booking;

                console.log(booking.repeatDays);
                //account for auto timezone conversion to UTC by JSON ;-;
                booking.formatCreated = created.substring(0, created.length - 5)
                booking.formatStartDate = moment(booking.startDate, "YYYY-MM-DDTHH:mm:ssZ[UTC]").tz("Asia/Singapore").toDate().toString();
                booking.formatStartDate = booking.formatStartDate.split(" ");
                booking.formatStartDate = booking.formatStartDate.slice(0,4).join(" ");
                booking.formatEndDate = moment(booking.endDate, "YYYY-MM-DDTHH:mm:ssZ[UTC]").tz("Asia/Singapore").toDate().toString();
                booking.formatEndDate = booking.formatEndDate.split(" ");
                booking.formatEndDate = booking.formatEndDate.slice(0,4).join(" ");
            }
            setBookings(bookings);
        })
        .then(result);
    }

    const updateState = (item) => {
        const itemIndex = bookings.findIndex((data) => data.id === item.id);
        const newArray = [
          ...bookings.slice(0, itemIndex),
          item,
          ...bookings.slice(itemIndex + 1)
        ];
        setBookings(newArray);
    };

    function editButton(booking) {
        if (userRole === "parent") {
            return <div style={{width:"110px", float:"right"}}>
                <RequestModal buttonLabel="Edit" booking={booking} type="booking" updateState={updateState} reloadData={reloadData} refreshPage={refreshPage} showErrorToast={showErrorToast}/>
                {' '}
            </div>
        } else if (userRole === "sitter") {
            return <div style={{width:"200px", float:"right"}}>
                <RequestModal buttonLabel="Reject" booking={booking} type="booking" updateState={updateState} reloadData={reloadData} refreshPage={refreshPage} showErrorToast={showErrorToast}/>
                {' '}
                <RequestModal buttonLabel="Accept" booking={booking} type="booking" updateState={updateState} reloadData={reloadData} refreshPage={refreshPage} showErrorToast={showErrorToast}/>
            </div>
        }
    }

    function cancelButton(booking) {
        if (userRole === "parent") {
            return<div style={{width:"110px", float:"right"}}>
                <RequestModal buttonLabel="Cancel" booking={booking} type="booking" updateState={updateState} reloadData={reloadData} refreshPage={refreshPage} showErrorToast={showErrorToast}/>
                {' '}
            </div>
        }
    }

    function rateButton(booking) {
        if (!booking.rating && booking.status === "ARCHIVED") {
            return <div style={{display:"block"}}>
                <Button style={{backgroundColor: "#9d82ff", float:"right"}} onClick={redirectRatings}> Rate </Button>
            </div>
        }
    }

    function repeatText(booking) {
        if (booking.repeatDays) {
            console.log(booking.repeatDays)
            var repeatArray = booking.repeatDays;
            var daysArray = ["filler", "Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
            var daysStr = "";
            repeatArray.forEach((day) => {
                daysStr += ", " + daysArray[day];
            });
            daysStr = daysStr.substring(2)
            //booking will be repeated on certain days of wk
            return "Days of week: " +  daysStr;
        }
    }

    function badge(booking) {
        if (booking.status === "PENDING") {
            return <Badge color="warning" pill>Pending</Badge>
        } else if (booking.status === "ACCEPTED") {
            return <Badge color="success" pill>Accepted</Badge>
        } else if (booking.status === "REJECTED") {
            return <Badge color="danger" pill>Rejected</Badge>
        } else {
            return <Badge color="dark" pill>Archived</Badge>
        }
    }

    // converts the bookings array to UI form
    const result = bookings.map((booking) => {
        console.log(booking)
        if (chosenTab === "pending" && userRole === "parent") {
            return (
                <>  
                    <li className="list-group-item" key={booking.bookingReqId}  style={{padding:"20px"}}>
                        <h5>{booking.sitter.firstName} {booking.sitter.lastName}</h5>
                        Request Dates: {booking.formatStartDate} to {booking.formatEndDate}<br/>
                        Request Description: {booking.description}<br/>
                        {repeatText(booking)}<br/>
                        {editButton(booking)}
                        {cancelButton(booking)}
                        {badge(booking)}
                    </li>
                </>
            )
        } else if (chosenTab === "pending" && userRole === "sitter") {
            // can only reject here
            return (
                <>  
                    <li className="list-group-item" key={booking.bookingReqId} style={{padding:"20px"}}>
                        <h5>{booking.parent.firstName} {booking.parent.lastName}</h5>
                        Request Dates: {booking.formatStartDate} to {booking.formatEndDate}<br/>
                        Request Description: {booking.description}<br/>
                        {repeatText(booking)}<br/>
                        {editButton(booking)}
                        {badge(booking)}
                    </li>
                </>
            )
        } else if (chosenTab === "upcoming" && userRole === "parent") {
            return (
                <>
                    <li className="list-group-item" key={booking.bookingReqId}  style={{padding:"20px"}}>
                        <h5>{booking.sitter.firstName} {booking.sitter.lastName}</h5>
                        Request dates: {booking.formatStartDate} to {booking.formatEndDate}<br/>
                        Request Description: {booking.description}<br/>
                        {repeatText(booking)} <br/>
                        {cancelButton(booking)}
                        {badge(booking)}
                        <ContactModal user={otherParty(booking)}></ContactModal>
                    </li>
                </>
            )
        } else if (chosenTab === "upcoming" && userRole === "sitter") {
            return ( 
                <>
                    <li className="list-group-item" key={booking.bookingReqId} style={{padding:"20px"}}>
                        <h5>{booking.parent.firstName} {booking.parent.lastName}</h5>
                        Request Dates: {booking.formatStartDate} to {booking.formatEndDate}<br/>
                        Request Description: {booking.description} <br/>
                        {repeatText(booking)} <br/>
                        {badge(booking)}
                        <ContactModal user={otherParty(booking)}></ContactModal>
                    </li>
                </>
            )
        } else {
                return (
                    <>  
                        <li class="list-group-item" key={booking.bookingReqId} style={{padding:"20px"}}>
                            <h5>{otherParty(booking).firstName} {otherParty(booking).lastName}</h5>
                            Request Dates: {booking.formatStartDate} to {booking.formatEndDate}<br/>
                            Request Description: {booking.description} <br/>
                            {repeatText(booking)} <br/>
                            {rateButton(booking)}
                            {badge(booking)}
                        </li>
                    </>
                )
            }
        });

    function noReqs() {
        if (result.length === 0) {
           return <NoRequestsPage tab={chosenTab} type="bookings"/>
        }
    }

    function renderList(selectedTab) {
        setChosenTab(selectedTab);
    }
    
    function redirectRatings() {
        //DENZEL
    }

    return (
        <>
            <ToastContainer/>
            <div style={{display: "block", width:"100%", textAlign:"center"}}>
                <h3 style={{display: "inline", marginRight: "1vw"}}> My Bookings </h3>
                <img src={titleIcon} style={{height:"100px"}}/>
            </div>
            <div class="card mt-2 shadow rounded">
                <div class="card-header">
                    <ul class="nav nav-pills nav-fill" id="tabs" role="tablist">
                        <li class="nav-item" role="presentation">
                            <button class="nav-link active" id="pending-tab" data-bs-toggle="tab" data-bs-target="#pending" 
                            role="tab" aria-controls="pending" type="button" aria-selected="true" onClick={() => renderList('pending')}>Pending Requests</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="upcoming-tab" data-bs-toggle="tab" data-bs-target="#upcoming" r
                            ole="tab" aria-controls="upcoming" type="button" aria-selected="true" onClick={() => renderList('upcoming')}>Upcoming Stays</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="rejected-tab" data-bs-toggle="tab" data-bs-target="#rejected" 
                            role="tab" aria-controls="rejected" type="button" aria-selected="true" onClick={() => renderList('rejected')}>Rejected Requests</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="archived-tab" data-bs-toggle="tab" data-bs-target="#archived"
                             role="tab" aria-controls="archived" type="button" aria-selected="true" onClick={() => renderList('archived')}>Archived</button>
                        </li>
                    </ul>
                </div>

                <div className="card-body">
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade show active" id="pending" role="tabpanel" aria-labelledby="pending-tab">
                            <ul className="list-group">
                                {result}
                                {noReqs()}
                            </ul>
                        </div>
                        <div className="tab-pane fade" id="upcoming" role="tabpanel" aria-labelledby="upcoming-tab">
                            <ul className="list-group">
                                {result}
                                {noReqs()}
                            </ul>
                        </div>
                        <div className="tab-pane fade" id="rejected" role="tabpanel" aria-labelledby="rejected-tab">
                            <ul className="list-group">
                                {result}
                                {noReqs()}
                            </ul>
                        </div>
                        <div className="tab-pane fade" id="archived" role="tabpanel" aria-labelledby="archived-tab">
                            <ul className="list-group">
                                {result}
                                {noReqs()}
                            </ul>
                        </div>
                    </div>
                </div>
                
            </div>
        </>
    );
}

export default Bookings;