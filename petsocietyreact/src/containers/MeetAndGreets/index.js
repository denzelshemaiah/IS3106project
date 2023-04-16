import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Api from "../../helpers/Api";
import NoRequestsPage from "../../components/NoRequestsPage";
import { Button, Badge } from "react-bootstrap";
import RequestModal from "../../components/BookingModals"
import MgModal from "../../components/MgModals";
import titleIcon from "./mgTitle.jpeg"
import moment from "moment-timezone";
import ContactModal from "../../components/ContactDetailsModal";

function MeetAndGreets() {
    //initialise all the necessary constants
    const [userId, setUserId] = useState(JSON.parse(localStorage.getItem("user")).userId);
    const [chosenTab, setChosenTab] = useState("pending")
    const [requests, setRequests] = useState([]);
    const [userRole, setUserRole] = useState(JSON.parse(localStorage.getItem("user_role")));
    const [user, setUser] = useState({});

    useEffect(() => {
        reloadData();
    }, [chosenTab]);

    useEffect(() => {
        const handleStorage = () => {
            setUserId(JSON.parse(localStorage.getItem("user")).userId);
            setUserRole(JSON.parse(localStorage.getItem("user_role")));
            setUser(JSON.parse(localStorage.getItem("user")));
        }
        
        window.addEventListener('storage', handleStorage())
        return () => window.removeEventListener('storage', handleStorage())
    }, [])

    function renderList(selectedTab) {
        setChosenTab(selectedTab);
    }

    function otherParty(request) {
        if (userRole === "parent") {
            return request.sitter;
        } else {
            return request.parent;
        }
    }

    function refreshPage() {
        window.location.reload(false);
    }

    //gets all the mg data for this user
    const reloadData = () => {
        Api.getAllMeets(chosenTab, userId)
        .then((res) => res.json())
        .then((mgs) => {
            for (const mg of mgs) {
                const {mgReqId, createdDate, mgDate, mgDesc, status, parent, sitter} = mg;

                mg.formatCreated = createdDate.substring(0, createdDate.length - 5)
                mg.formatMgDate = moment(mgDate, "YYYY-MM-DDTHH:mm:ssZ[UTC]").tz("Asia/Singapore").toDate().toString();
                mg.formatMgDate = mg.formatMgDate.split(" ");
                mg.formatMgDate = mg.formatMgDate.slice(0,4).join(" ");
            }
            setRequests(mgs);
        })
        .then(result);

        console.log(requests)
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

    function badge(request) {
        if (request.status === "PENDING") {
            return <Badge color="warning" pill>Pending</Badge>
        } else if (request.status === "ACCEPTED") {
            return <Badge color="success" pill>Accepted</Badge>
        } else if (request.status === "REJECTED") {
            return <Badge color="danger" pill>Rejected</Badge>
        } else {
            return <Badge color="dark" pill>Archived</Badge>
        }
    }
    

    let editButton = "";
    editButton = (request) => {
        if (userRole === "parent" && (chosenTab === "pending" || chosenTab === "rejected")) {
            return <div style={{width:"110px", float:"right"}}>
                <MgModal buttonLabel="Edit" mgReq={request} userId={userId} updateState={updateState} reloadData={reloadData} refreshPage={refreshPage}/>
                {' '}
            </div>
        } else if (userRole === "sitter") {
            return <div style={{width:"200px", float:"right"}}>
                <MgModal buttonLabel="Reject" mgReq={request} updateState={updateState} reloadData={reloadData} refreshPage={refreshPage}/>
                {' '}
                <MgModal buttonLabel="Accept" mgReq={request} updateState={updateState} reloadData={reloadData} refreshPage={refreshPage}/>
            </div>
        }
    }

    let cancelButton = "";
    
    cancelButton = (request) => {
        if (userRole === "parent") {
            return<div style={{width:"110px", float:"right"}}>
                <MgModal buttonLabel="Cancel" mgReq={request} updateState={updateState} reloadData={reloadData} refreshPage={refreshPage}/>
                {' '}
            </div>
        }
    }


    // converts the requests array to UI form
    const result = requests.map((request) => {
        console.log(request)
        if (chosenTab === "pending" && userRole === "parent") {
            //can edit 
            return (
                <>  
                    <li className="list-group-item" key={request.mgReqId} style={{padding:"20px"}}>
                        <h5>{request.sitter.firstName} {request.sitter.lastName}</h5>
                        Request Date: {request.formatMgDate}<br/>
                        <p>{request.mgDesc}</p>
                        {cancelButton(request)}
                        {editButton(request)}
                        {badge(request)}
                    </li>
                </>
            )
        } else if (chosenTab === "pending" && userRole === "sitter") {
            // can only accept/reject here
            return (
                <>  
                    <li className="list-group-item" key={request.bookingReqId} style={{padding:"20px"}}>
                        <h5>{request.parent.firstName} {request.parent.lastName}</h5>
                        Request Date: {request.formatMgDate}<br/>
                        <p>{request.mgDesc}</p>
                        {editButton(request)}
                        {badge(request)}
                    </li>
                </>
            )
        } else if (chosenTab === "upcoming" && userRole === "parent") {
            //no action, only cancel?
            return (
                <>
                    <li className="list-group-item" key={request.mgReqId} style={{padding:"20px"}}>
                        <h5>{request.sitter.firstName} {request.sitter.lastName}</h5>                        
                        Request Date: {request.formatMgDate}<br/>
                        <p>{request.mgDesc}</p>
                        {cancelButton(request)}
                        {badge(request)}
                        <ContactModal user={otherParty(request)}></ContactModal>
                    </li>
                </>
            )
        } else if (chosenTab === "upcoming" && userRole === "sitter") {
            //sitter can cancel
            return ( 
                <>
                    <li className="list-group-item" key={request.mgReqId} style={{padding:"20px"}}>
                        <h5>{request.parent.firstName} {request.parent.lastName}</h5>
                        Request Date: {request.formatMgDate}<br/>
                        <p>{request.mgDesc}</p>
                        {badge(request)}
                        {cancelButton(request)}
                        <ContactModal user={otherParty(request)}></ContactModal>
                    </li>
                </>
            )
        } else if (chosenTab === "rejected" && userRole === "parent") {
            //can edit here, request will go back to pending status
            return (
                <>
                    <li className="list-group-item" key={request.mgReqId} style={{padding:"20px"}}>
                        <h5>{request.sitter.firstName} {request.sitter.lastName}</h5>                        
                        Request Date: {request.formatMgDate}<br/>
                        <p>{request.mgDesc}</p>
                        {editButton(request)}
                        {badge(request)}
                    </li>
                </>
            )
        }
        else {
            return (
                <>  
                    <li class="list-group-item" key={request.mgReqId} style={{padding:"20px"}}>
                        <h5>{otherParty(request).firstName} {otherParty(request).lastName}</h5>
                        Request Date: {request.formatDate} <br/>
                        <p>{request.mgDesc}</p>
                        {' '}
                        {badge(request)}
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

    return (
        <>
            <div style={{display: "block", width:"100%", textAlign:"center"}}>
                <h3 style={{display: "inline", marginRight: "1vw"}}> My Meet and Greets</h3>
                <img src={titleIcon} style={{height:"100px"}}/>
            </div>
            <div class="card mt-3 mb-2 shadow rounded">
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