import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingListing from "../BookingListing";
import Api from "../../helpers/Api";

function Modal(props) {
    const [RequestId, setRequestId] = props.reqId;
    const [toDo, setToDo] = useState('');

    return (
        <>
            <div class="modal fade" role="dialog" aria-labelledby="modalLabel">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="modalLabel">{props.header}</h5>
                            <button type="button" class="btn" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            {props.content}
                            <input type="text" id="requestId" value={props.reqId}/>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                        </div>
                        </div>
                    </div>
                </div>
        </>
    )
}

export default Modal;