import React, {useState} from 'react';

function BookingListing(props) {
    const tab = props.tab;
    const booking = props.booking

    function editButton() {
        if (tab === "upcoming") {
            return <button type="button" class="btn btn-warning m-1" data-bs-toggle="modal" data-bs-target="#editUpcomingModal" data-bs-id={props.booking} style={{"float": "right"}}>Edit Request</button>
        } else {
            return ""
        }
    }
    
    function cancelButton() {
        if (tab === "pending") {
            return <button type="button" class="btn btn-danger m-1" data-bs-toggle="modal" data-bs-target="#cancelPendingModal" data-bs-id={props.booking} style={{"float": "right"}}>Cancel Request</button>
        } else if (tab === "upcoming") {
            // need to calculate penalty
            return <button type="button" class="btn btn-danger m-1" data-bs-toggle="modal" data-bs-target="#cancelUpcomingModal" data-bs-id={props.booking} style={{"float": "right"}}>Cancel Request</button>
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

            <div class="body">
                <div class="modal fade" id="cancelPendingModal" role="dialog" aria-labelledby="cancelLabel">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="cancelLabel">Confirm Cancellation</h5>
                            <button type="button" class="btn" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            Would you like to delete this booking request?
                            <input type="text" id="booking-id"/>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default BookingListing;