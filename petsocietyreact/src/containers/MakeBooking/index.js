import React, { useEffect, useState } from "react";
import { DatePicker } from "reactstrap-date-picker";
import Navbar from "../../components/Navbar";
import './style.css'
import moment from "moment";

//page to view all bookings, follows a tab view
function MakeBookings(props) {
    const [service, setService] = useState("");
    const sitterName = props.sitter
    const [startDate, setStartDate] = useState(moment("1990-01-01 00:00:00"));
    const [sitterId, setSitterId] = useState(0);
    const [parentId, setParentId] = useState(0);
    const [cost, setCost] = useState(0);
    const [created, setCreated] = useState(moment());
    const [description, setDescription] = useState("");
    const [endDate, setEndDate] = useState(moment("1990-01-01 00:00:00").toDate());

    let optionButtons = "";

    //for the top bar stating service
    let serviceIcon = ""

    return (
        <div class="wrapper">
            <h2 class="m-4 ml-5" id="contact-header"> Contact {sitterName} </h2>
        </div>
    );
}

export default MakeBookings;