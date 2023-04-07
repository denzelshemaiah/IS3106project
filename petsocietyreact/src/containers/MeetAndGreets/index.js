import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Api from "../../helpers/Api";
import NoRequestsPage from "../../components/NoRequestsPage";
import { Button } from "react-bootstrap";
import RequestModal from "../../components/BookingModals"
import MgModal from "../../components/MgModals";



function MeetAndGreets() {
    //initialise all the necessary constants
    const {userId = 0} = useParams();
    const [chosenTab, setChosenTab] = useState("pending")
    const [requests, setRequests] = useState([]);
    const user = {"role": "parent"};

    useEffect(() => {
        reloadData();
    }, [chosenTab]);

    function renderList(selectedTab) {
        setChosenTab(selectedTab);
    }

    function otherParty(request) {
        if (user.role === "parent") {
            return request.sitter;
        } else {
            return request.parent;
        }
    }

    //gets all the mg data for this user
    const reloadData = () => {
        Api.getAllMeets(chosenTab, userId)
        .then((res) => res.json())
        .then((mgs) => {
            for (const mg of mgs) {
                const {mgReqId, createdDate, mgDate, mgDesc, status, parent, sitter} = mg;

                mg.createdFormat = createdDate.substring(0, createdDate.length - 5);
                mg.formatDate = mgDate.split("T")[0]
                //account for auto timezone conversion to UTC by JSON ;-;
                mg.formatDate = mg.formatDate.split("-")
                mg.formatDate = mg.formatDate[0] + "-" + mg.formatDate[1] + "-" + mg.formatDate[2][0] + (Number(mg.formatDate[2][1]) + 1)
            }
            setRequests(mgs);
        });
    }

    // converts the requests array to UI form
    const result = requests.map((request) => {
        console.log(request)
        if (chosenTab === "pending" && user.role === "parent") {
            //can edit 
            return (
                <>  
                    <li className="list-group-item" key={request.mgReqId} style={{padding:"10px"}}>
                        <h5>{request.sitter.firstName} {request.sitter.lastName}</h5>
                        Request Dates: {request.formatDate}<br/>
                        <p>{request.mgDesc}</p>
                    </li>
                </>
            )
        } else if (chosenTab === "pending" && user.role === "sitter") {
            // can only accept/reject here
            return (
                <>  
                    <li className="list-group-item" key={request.bookingReqId} style={{padding:"10px"}}>
                        <h5>{request.parent.firstName} {request.parent.lastName}</h5>
                        Request Dates: {request.formatDate}<br/>
                        <p>{request.mgDesc}</p>
                    </li>
                </>
            )
        } else if (chosenTab === "upcoming" && user.role === "parent") {
            //no action, only cancel?
            return (
                <>
                    <li className="list-group-item" key={request.mgReqId}>
                        <h5>{request.sitter.firstName} {request.sitter.lastName}</h5>                        
                        Request Dates: {request.formatDate}<br/>
                        <p>{request.mgDesc}</p>
                        <Button color="danger">Cancel</Button>
                    </li>
                </>
            )
        } else if (chosenTab === "upcoming" && user.role === "sitter") {
            //no action
            return ( 
                <>
                    <li className="list-group-item" key={request.mgReqId} style={{padding:"10px"}}>
                        <h5>{request.parent.firstName} {request.parent.lastName}</h5>
                        Request Dates: {request.formatDate}<br/>
                        <p>{request.mgDesc}</p>
                    </li>
                </>
            )
        } else if (chosenTab === "rejected" && user.role === "parent") {
            //can edit here, request will go back to pending status
            return (
                <>
                    <li className="list-group-item" key={request.mgReqId}>
                        <h5>{request.sitter.firstName} {request.sitter.lastName}</h5>                        
                        Request Dates: {request.formatDate}<br/>
                        <p>{request.mgDesc}</p>
                        <Button color="warning">Edit</Button>
                    </li>
                </>
            )
        }
        else {
            return (
                <>  
                    <li class="list-group-item" key={request.mgReqId}>
                        <h5>{otherParty(request).firstName} {otherParty(request).lastName}</h5>
                        Request dates<br/>
                        <p>Desription of request</p>
                        {' '}
                    </li>
                </>
            )
        }
    })

    function noReqs() {
        if (result.length === 0) {
           return <NoRequestsPage tab={chosenTab} type="meet and greets"/>
        }
    }

    const updateState = (item) => {
        const itemIndex = requests.findIndex((data) => data.id === item.id);
        const newArray = [
          ...requests.slice(0, itemIndex),
          item,
          ...requests.slice(itemIndex + 1)
        ];
        setRequests(newArray);
    };
    
    let editButton = "";
    editButton = (request) => {
        if (user.role === "parent" && (chosenTab === "pending" || chosenTab === "rejected")) {
            return <div style={{width:"110px", float:"right"}}>
                <MgModal buttonLabel="Edit" mgReq={request} updateState={updateState} reloadData={reloadData}/>
                {' '}
            </div>
        } else if (user.role === "sitter") {
            return <div style={{width:"200px", float:"right"}}>
                <MgModal buttonLabel="Reject" mgReq={request} updateState={updateState} reloadData={reloadData}/>
                {' '}
                <MgModal buttonLabel="Accept" mgReq={request} updateState={updateState} reloadData={reloadData}/>
            </div>
        }
    }

    let cancelButton = "";
    
    cancelButton = (request) => {
        if (user.role === "parent") {
            return<div style={{width:"110px", float:"right"}}>
                <MgModal buttonLabel="Cancel" mgReq={request} updateState={updateState} reloadData={reloadData}/>
                {' '}
            </div>
        }
    }

    
    return (
        <>
            <div class="card mt-5 shadow rounded">
                <div class="card-header">
                    <ul class="nav nav-pills nav-fill" id="tabs" role="tablist">
                        <li class="nav-item" role="presentation">
                            <button class="nav-link active" id="pending-tab" data-bs-toggle="tab" data-bs-target="#pending" role="tab" aria-controls="pending" type="button" aria-selected="true" onClick={() => renderList('pending')}>Pending Requests</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="upcoming-tab" data-bs-toggle="tab" data-bs-target="#upcoming" role="tab" aria-controls="upcoming" type="button" aria-selected="true" onClick={() => renderList('upcoming')}>Upcoming Stays</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="rejected-tab" data-bs-toggle="tab" data-bs-target="#rejected" role="tab" aria-controls="rejected" type="button" aria-selected="true" onClick={() => renderList('rejected')}>Rejected Requests</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="archived-tab" data-bs-toggle="tab" data-bs-target="#archived" role="tab" aria-controls="archived" type="button" aria-selected="true" onClick={() => renderList('archived')}>Archived</button>
                        </li>
                    </ul>
                </div>
                
                <div class="card-body">
                    <div class="tab-content" id="myTabContent">
                        <div class="tab-pane fade show active" id="pending" role="tabpanel" aria-labelledby="pending-tab">
                            <ul className="list-group">
                                {result}
                                {noReqs()}
                            </ul>
                        </div>
                        <div class="tab-pane fade" id="upcoming" role="tabpanel" aria-labelledby="upcoming-tab">
                            <ul className="list-group">
                                {result}
                                {noReqs()}
                            </ul>                        
                        </div>
                        <div class="tab-pane fade" id="rejected" role="tabpanel" aria-labelledby="rejected-tab">
                            <ul className="list-group">
                                {result}
                                {noReqs()}
                            </ul> 
                        </div>
                        <div class="tab-pane fade" id="archived" role="tabpanel" aria-labelledby="archived-tab">
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

export default MeetAndGreets;