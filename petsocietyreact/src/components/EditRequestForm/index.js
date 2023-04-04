import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input} from "reactstrap";
import { InputGroup } from 'react-bootstrap';
import Api from "../../helpers/Api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment-timezone';

function EditForm(props) {
    const userId = props.userId;
    const booking = props.booking;
    const [startDate, setStartDate] = useState(moment(booking.startDate, "YYYY-MM-DDTHH:mm:ssZ[UTC]").toDate());
    const [endDate, setEndDate] = useState(moment(booking.endDate, "YYYY-MM-DDTHH:mm:ssZ[UTC]").toDate());
    const [service, setService] = useState("walking");
    const [visitFreq, setVisitFreq] = useState(0);

    const [form, setValues] = useState({
        bookingReqId : booking.bookingReqId,
        cost : booking.cost, 
        created : booking.created,
        description : booking.description,
        endDate: endDate,
        numPets: booking.numPets,
        startDate: startDate,
        visitFreq: visitFreq,
    });

    //when the form values change
    const onChange = (e) => {
        setValues({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    function calculateNewCost() {
        //per day (boarding,  daycare)
        if (service === "boarding" || service === "daycare") {
            var diffDays = Math.round((endDate - startDate)/(1000 * 60 * 60 * 24));
            return diffDays * 0.00;
            // for 
        } else if (service === "walking") {
            
        } else {
            //drop-in case, basis is per visit
            diffDays = Math.round((endDate - startDate)/(1000 * 60 * 60 * 24));
            //get weekly visits
            var visits = diffDays * visitFreq
            return diffDays * 0.00
        }
    }

    const submitFormEdit = (e) => {
        e.preventDefault();
        //fetch the Api
        form.startDate = startDate;
        form.endDate = endDate;
        form.cost = calculateNewCost();
        Api.updateBooking(form)
        .then(props.reloadData);
        props.updateState(form);
        props.toggle();
    }

    useEffect(() => {
        if (props.booking) {
            const {bookingReqId, cost, created, description, endDate, numPets, parent, startDate, status} = props.booking;
            setValues({bookingReqId, cost, created, description, endDate, numPets, parent, startDate, status})
        }
    }, [props.booking]);

    return (
        <Form onSubmit={submitFormEdit}>
            <FormGroup>
                <Label for="description"> Booking Description: </Label>
                <Input
                    type="text"
                    name="description"
                    id="description"
                    onChange={onChange}
                    value={form.description === null ? "" : form.description}
                />
            </FormGroup>
            <FormGroup>
                <Label for="startDate"> Start Date: </Label>
                <DatePicker
                    name="startDate"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                />
            </FormGroup>
            <FormGroup>
                <Label for="endDate"> End Date: </Label>
                <DatePicker
                    name="endDate"
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                />
            </FormGroup>
            <FormGroup>
                <Label for="numPets"> Number of pets: </Label>
                <Input
                    type="number"
                    name="numPets"
                    id="numPets"
                    onChange={onChange}
                    value={form.numPets === null ? "" : form.numPets}
                />
            </FormGroup>
            <Button
            color="danger" 
            style={{float: "right"}}
            type="submit">Submit</Button>
        </Form>
    );
}

export default EditForm;