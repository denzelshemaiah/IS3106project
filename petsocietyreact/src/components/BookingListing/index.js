import React, {useState} from 'react';

function BookingListing(props) {
    const tab = props.tab;

    function editButton() {
        if (tab === "upcoming") {
            return <button type="button" class="btn btn-warning m-1" data-bs-toggle="modal" data-bs-target="#editUpcomingModal" style={{"float": "right"}}>Edit Request</button>
        } else {
            return ""
        }
    }
    
    function cancelButton(bookingId) {
        if (tab === "pending") {
            return <button type="button" class="btn btn-danger m-1" data-bs-toggle="modal" data-bs-target="#cancelPendingModal" style={{"float": "right"}}>Cancel Request</button>
        } else if (tab === "upcoming") {
            // need to calculate penalty
            return <button type="button" class="btn btn-danger m-1" data-bs-toggle="modal" data-bs-target="#cancelUpcomingModal" style={{"float": "right"}}>Cancel Request</button>
        }else {
            return ""
        }
    }

    <script src="js/bootstrap.js"></script>

    return (
        <>
            <li class="list-group-item" key={props.booking}>
                <h5>Request from name</h5>
                Request dates<br/>
                <p>Desription of request</p>
                {editButton()}
                {cancelButton(props.booking)}
            </li>
        </>
    )
};

export default BookingListing;