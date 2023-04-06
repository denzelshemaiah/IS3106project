import React, { useEffect, useState } from "react";
import Api from "../../helpers/Api";
import { Button, Badge } from "react-bootstrap";
import RequestModal from "../../components/RequestModals"
import moment from 'moment-timezone';
import NoRequestsPage from "../../components/NoRequestsPage";

//page to view all bookings, follows a tab view
function Bookings(props) {
    const {userId = 1} = useState(1);
    const [chosenTab, setChosenTab] = useState("pending")
    const [bookings, setBookings] = useState([]);
    const user = {role : "parent"}

    useEffect(() => {
        reloadData();
    }, [chosenTab]);

    //gets all the booking data for this user
    const reloadData = () => {
        Api.getAllBookings(chosenTab, userId)
        .then((res) => res.json())
        .then((bookings) => {
            for (const booking of bookings) {
                const {bookingReqId, cost, created, description, endDate, numPets, parent, startDate, status, visitFreq} = booking;

                booking.formatCreated = created.substring(0, created.length - 5)
                booking.formatStartDate = startDate.split("T")[0]
                //account for auto timezone conversion to UTC by JSON ;-;
                booking.formatStartDate = booking.formatStartDate.split("-")
                booking.formatStartDate = booking.formatStartDate[0] + "-" + booking.formatStartDate[1] + "-" + booking.formatStartDate[2][0] + (Number(booking.formatStartDate[2][1]) + 1)
                booking.formatEndDate = endDate.split("T")[0]
                booking.formatEndDate = booking.formatEndDate.split("-")
                booking.formatEndDate = booking.formatEndDate[0] + "-" + booking.formatEndDate[1] + "-" + booking.formatEndDate[2][0] + (Number(booking.formatEndDate[2][1]) + 1)
            }
            setBookings(bookings);
        });
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
        if (user.role === "parent") {
            return <div style={{width:"110px", float:"right"}}>
                <RequestModal buttonLabel="Edit" booking={booking} type="booking" updateState={updateState} reloadData={reloadData}/>
                {' '}
            </div>
        } else if (user.role === "sitter") {
            return <div style={{width:"200px", float:"right"}}>
                <RequestModal buttonLabel="Reject" booking={booking} type="booking" updateState={updateState} reloadData={reloadData}/>
                {' '}
                <RequestModal buttonLabel="Accept" booking={booking} type="booking" updateState={updateState} reloadData={reloadData}/>
            </div>
        }
    }

    function cancelButton(booking) {
        if (user.role === "parent") {
            return<div style={{width:"110px", float:"right"}}>
                <RequestModal buttonLabel="Cancel" booking={booking} type="booking" updateState={updateState} reloadData={reloadData}/>
                {' '}
            </div>
        }
    }

    function rateButton(booking) {
        //only parents can rate sitters
        if (!booking.rating && user.role === "parent") {
            return <div style={{display:"block"}}>
                <Button style={{backgroundColor: "#9d82ff", float:"right"}} onClick={redirectRatings}> Rate </Button>
            </div>
        }
    }

    function repeatText(booking) {
        if (booking.repeatDay) {
            var repeatArray = booking.repeatDay;
            var daysArray = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
            var daysStr = "";
            repeatArray.forEach((day) => {
                daysStr += ", " + daysArray[day];
            });
            //booking will be repeated on certain days of wk
            return <p>Repeat Days: {daysStr.substring(2)}</p>
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
        if (chosenTab === "pending" && user.role === "parent") {
            return (
                <>  
                {/*  CHANGE TO SITTER ! */}
                    <li className="list-group-item" key={booking.bookingReqId} style={{padding:"10px"}}>
                        <h5>{booking.sitter.firstName} {booking.sitter.lastName}</h5>
                        Request Dates: {booking.formatStartDate} to {booking.formatEndDate}<br/>
                        <p>{booking.description}</p>
                        {repeatText(booking)}
                        {editButton(booking)}
                        {cancelButton(booking)}
                        {badge(booking)}
                    </li>
                </>
            )
        } else if (chosenTab === "pending" && user.role === "sitter") {
            // can only reject here
            return (
                <>  
                    <li className="list-group-item" key={booking.bookingReqId} style={{padding:"10px"}}>
                        <h5>{booking.parent.firstName} {booking.parent.lastName}</h5>
                        Request Dates: {booking.formatStartDate} to {booking.formatEndDate}<br/>
                        <p>{booking.description}</p>
                        {repeatText(booking)}
                        {editButton(booking)}
                        {badge(booking)}
                    </li>
                </>
            )
        } else if (chosenTab === "upcoming" && user.role === "parent") {
            return (
                <>
                    <li className="list-group-item" key={booking.bookingReqId}>
                        <h5>{booking.sitter.firstName} {booking.sitter.lastName}</h5>
                        Request dates: {booking.formatStartDate} to {booking.formatEndDate}<br/>
                        <p>{booking.description}</p>
                        {repeatText(booking)}
                        {cancelButton(booking)}
                        {badge(booking)}
                    </li>
                </>
            )
        } else if (chosenTab === "upcoming" && user.role === "sitter") {
            return ( 
                <>
                    <li className="list-group-item" key={booking.bookingReqId} style={{padding:"10px"}}>
                        <h5>{booking.parent.firstName} {booking.parent.lastName}</h5>
                        Request Dates: {booking.formatStartDate} to {booking.formatEndDate}<br/>
                        <p>{booking.description}</p>
                        {repeatText(booking)}
                        {badge(booking)}
                    </li>
                </>
            )
        }
        else {
            if (user.role === "parent") {
                return (
                    <>  
                        <li class="list-group-item" key={booking.bookingReqId}>
                            <h5>{booking.sitter.firstName} {booking.sitter.lastName}</h5>
                            Request Dates: {booking.formatStartDate} to {booking.formatEndDate}<br/>
                            <p>{booking.description}</p>
                            {' '}
                            {rateButton(booking)}
                            {badge(booking)}
                        </li>
                    </>
                )
            } else {
                //case of sitter
                return (
                    <>  
                        <li class="list-group-item" key={booking.bookingReqId}>
                            <h5>{booking.parent.firstName} {booking.parent.lastName}</h5>
                            Request Dates: {booking.formatStartDate} to {booking.formatEndDate}<br/>
                            <p>{booking.description}</p>
                            {repeatText(booking)}
                            {' '}
                        </li>
                    </>
                )
            }
        }
    })

    function noReqs() {
        if (result.length === 0) {
           return <NoRequestsPage tab={chosenTab} type="bookings"/>
        }
    }

    function renderList(selectedTab) {
        setChosenTab(selectedTab);
    }
    
    function redirectRatings() {

    }

    return (
        <>
            <div class="card mt-5 shadow rounded">
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