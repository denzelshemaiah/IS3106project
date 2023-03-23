import React, {useState} from 'react';
import Modal from "../../components/RequestModals"

function BookingListing(props) {
    const tab = props.tab;
    const bookingId = props.bookingId

    function editButton() {
        if (tab === "pending") {
            return <button type="button" class="btn btn-warning m-1" data-bs-toggle="modal" data-bs-target="#editPendingModal" data-bs-id= {bookingId} style={{"float": "right"}}>Edit Request</button>
        } else {
            return ""
        }
    }
    
    function cancelButton() {
        if (tab === "pending") {
            return <button type="button" class="btn btn-danger m-1" data-bs-toggle="modal" data-bs-target="#cancelPendingModal" data-bs-id={bookingId} style={{"float": "right"}}>Cancel Request</button>
        } else if (tab === "upcoming") {
            // need to calculate penalty
            return <button type="button" class="btn btn-danger m-1" data-bs-toggle="modal" data-bs-target="#cancelUpcomingModal" data-bs-id={bookingId} style={{"float": "right"}}>Cancel Request</button>
        }else {
            return ""
        }
    }

    return (
        <>
            <li class="list-group-item" key={props.booking}>
                <h5>Request from name</h5>
                Request dates<br/>
                <p>Desription of request</p>
                {props.booking}
                {editButton()}
                {cancelButton()}
            </li>

            <Modal id="#editPendingModal" header="Edit Pending Request" reqId={bookingId}/>
            <Modal id="#cancelUpcomingModal" header="Cancel Upcoming Request"/>
            <Modal id="#cancelPendingModal" header="Cancel Pending Request"/>
        </>
    )
};

export default BookingListing;