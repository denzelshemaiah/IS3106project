import React, { useEffect, useState } from "react";
import Api from "../../helpers/Api";
import { Button } from "react-bootstrap";
import RequestModal from "../../components/RequestModals"
import moment from 'moment-timezone';

//page to view all bookings, follows a tab view
function Bookings(props) {
    const {userId = 1} = useState(1);
    const [chosenTab, setChosenTab] = useState("pending")
    const [bookings, setBookings] = useState([]);
    const user = {"role": "sitter"}

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
                booking.formatEndDate = endDate.split("T")[0];
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
                <RequestModal buttonLabel="Edit" booking={booking} updateState={updateState} reloadData={reloadData}/>
                {' '}
            </div>
        } else if (user.role === "sitter") {
            return <div style={{width:"200px", float:"right"}}>
                <RequestModal buttonLabel="Reject" booking={booking} updateState={updateState} reloadData={reloadData}/>
                {' '}
                <RequestModal buttonLabel="Accept" booking={booking} updateState={updateState} reloadData={reloadData}/>
            </div>
        }
    }

    function cancelButton(booking) {
        if (user.role === "parent") {
            <div style={{width:"110px", float:"right"}}>
                <RequestModal buttonLabel="Cancel" booking={booking} updateState={updateState}/>
                {' '}
            </div>
        }
    }

    // converts the bookings array to UI form
    const result = bookings.map((booking) => {
        console.log(booking)
        if (chosenTab === "pending" && user.role === "parent") {
            return (
                <>  
                    <li className="list-group-item" key={booking.bookingReqId} style={{padding:"10px"}}>
                        <h5>{booking.parent.firstName} {booking.parent.lastName}</h5>
                        Request Dates: {booking.formatStartDate} to {booking.formatEndDate}<br/>
                        <p>{booking.description}</p>
                        {editButton(booking)}
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
                        {editButton(booking)}
                    </li>
                </>
            )
        } else if (chosenTab === "upcoming" && user.role === "parent") {
            return (
                <>
                    <li className="list-group-item" key={booking.bookingReqId}>
                        <h5>Request from name</h5>
                        Request dates<br/>
                        <p>Desription of request</p>
                        {cancelButton(booking)}
                    </li>
                </>
            )
        } 
        else {
            return (
                <>  
                    <li class="list-group-item" key={booking.bookingReqId}>
                        <h5>Request from name</h5>
                        Request dates<br/>
                        <p>Desription of request</p>
                        {' '}
                        <div style={{display:"block"}}>
                            <Button style={{backgroundColor: "#9d82ff", float:"right"}} onClick={redirectRatings}> Rate </Button>
                        </div>
                    </li>
                </>
            )
        }
    })

    function renderList(selectedTab) {
        setChosenTab(selectedTab);
    }

    function handleReject() {
        //call API
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
                            </ul>
                        </div>
                        <div className="tab-pane fade" id="upcoming" role="tabpanel" aria-labelledby="upcoming-tab">
                            <ul className="list-group">
                                {result}
                            </ul>
                        </div>
                        <div className="tab-pane fade" id="rejected" role="tabpanel" aria-labelledby="rejected-tab">
                            <ul className="list-group">
                                {result}
                            </ul>
                        </div>
                        <div className="tab-pane fade" id="archived" role="tabpanel" aria-labelledby="archived-tab">
                            <ul className="list-group">
                                {result}
                            </ul>
                        </div>
                    </div>
                </div>
                
            </div>
        </>
    );
}

export default Bookings;