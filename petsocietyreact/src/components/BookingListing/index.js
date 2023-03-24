import React, {useState} from 'react';
import Modal from "../../components/RequestModals";

function BookingListing(props) {
    let tab = props.tab;

    function editButton() {
        if (tab === "pending") {
            return (
            <>
                <button type="button" class="btn btn-warning m-1" data-bs-toggle="modal" data-bs-target="#editPendingModal" data-bs-id={props.booking} style={{"float": "right"}}>Edit Request</button>
            </>
            )
        } else {
            return ""
        }
    }
    
    function cancelButton() {
        if (tab === "pending") {
            return <button type="button" class="btn btn-danger m-1" data-bs-toggle="modal" data-bs-target="#cancelPendingModal" data-bs-id={props.booking} style={{"float": "right"}}>Cancel Request</button>
        } else if (tab === "upcoming") {
            // need to calculate penalty
            return <button type="button" class="btn btn-danger m-1" data-bs-toggle="modal" data-bs-target="#cancelUpcomingModal" style={{"float": "right"}}>Cancel Request</button>
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
                {editButton()}
                {cancelButton()}
            </li>

            <Modal id= "editPendingModal" booking={props.booking}/>
         </>
    )
};

export default BookingListing;