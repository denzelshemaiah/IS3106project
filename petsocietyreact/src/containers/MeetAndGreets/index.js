import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Api from "../../helpers/Api";


function MeetAndGreets() {
    //initialise all the necessary constants
    const {userId = 0} = useParams();
    const [chosenTab, setChosenTab] = useState("pending")
    const [bookings, setBookings] = useState([]);
    
    return (
        <>
            <div class="card mt-5 shadow rounded">
                <div class="card-header">
                    <ul class="nav nav-pills" id="tabs" role="tablist">
                        <li class="nav-item" role="presentation">
                            <button class="nav-link active" id="pending-tab" data-bs-toggle="tab" data-bs-target="#pending" role="tab" aria-controls="pending" type="button" aria-selected="true">Pending Requests</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="upcoming-tab" data-bs-toggle="tab" data-bs-target="#upcoming" role="tab" aria-controls="upcoming" type="button" aria-selected="true">Upcoming Stays</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="rejected-tab" data-bs-toggle="tab" data-bs-target="#rejected" role="tab" aria-controls="rejected" type="button" aria-selected="true">Rejected Requests</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="archived-tab" data-bs-toggle="tab" data-bs-target="#archived" role="tab" aria-controls="archived" type="button" aria-selected="true">Archived</button>
                        </li>
                    </ul>
                </div>
                
                <div class="card-body">
                    <div class="tab-content" id="myTabContent">
                        <div class="tab-pane fade show active" id="pending" role="tabpanel" aria-labelledby="pending-tab">
                            show pending m&g requests
                        </div>
                        <div class="tab-pane fade" id="upcoming" role="tabpanel" aria-labelledby="upcoming-tab">
                            show upcoming m&g bookings
                        </div>
                        <div class="tab-pane fade" id="rejected" role="tabpanel" aria-labelledby="rejected-tab">
                            show rejected m&g requests 
                        </div>
                        <div class="tab-pane fade" id="archived" role="tabpanel" aria-labelledby="archived-tab">
                            show archived bookings 
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MeetAndGreets;