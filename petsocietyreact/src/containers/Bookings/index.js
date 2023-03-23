import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingListing from "../../components/BookingListing";
import Api from "../../helpers/Api";


//page to view all bookings, follows a tab view
function Bookings() {
    const {userId = 0} = useState(0);
    const [chosenTab, setChosenTab] = useState("pending")
    const [bookings, setBookings] = useState([]);

    // converts the bookings array to UI form
    const result = bookings.map((item) => {
        return <BookingListing booking={item} tab={chosenTab}/>
    })

    useEffect(() => {
        //const bookings = Api.getAllBookings(selectedTab)
        setBookings(["hello", "hi", "hehe"]);
        //.then((res) => res.json());
    }, [chosenTab]);

    function renderList(selectedTab) {
        setChosenTab(selectedTab);
    }

    return (
        <>
            <div class="card mt-5 shadow rounded">
                <div class="card-header">
                    <ul class="nav nav-pills" id="tabs" role="tablist">
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
                <div class="card-body">
                    <div class="tab-content" id="myTabContent">
                        <div class="tab-pane fade show active" id="pending" role="tabpanel" aria-labelledby="pending-tab">
                            <ul class="list-group">
                                {result}
                            </ul>
                        </div>
                        <div class="tab-pane fade" id="upcoming" role="tabpanel" aria-labelledby="upcoming-tab">
                            <ul class="list-group">
                                {result}
                            </ul>
                        </div>
                        <div class="tab-pane fade" id="rejected" role="tabpanel" aria-labelledby="rejected-tab">
                            <ul class="list-group">
                                {result}
                            </ul>
                        </div>
                        <div class="tab-pane fade" id="archived" role="tabpanel" aria-labelledby="archived-tab">
                            <ul class="list-group">
                                {result}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>


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
                
                <div class="modal fade" id="cancelUpcomingModal" role="dialog" aria-labelledby="cancelLabel">
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
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                        </div>
                        </div>
                    </div>
                </div>

                <div class="modal fade" id="editUpcomingModal" role="dialog" aria-labelledby="editLabel">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="editLabel">Confirm Edits</h5>
                            <button type="button" class="btn" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            Would you like to edit this booking request?
                            <input type="text" name="hiddenValue" id="hiddenValue" value="" />
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
    );
}

export default Bookings;