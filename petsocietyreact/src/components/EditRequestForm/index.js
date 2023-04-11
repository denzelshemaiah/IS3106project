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
    const [sitter, setSitter] = useState(booking.sitter);
    const [cost, setCost] = useState(null);
    const [repeatDays, setRepeatDays] = useState(props.booking.repeatDays);

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

    function calculateNewCost(start, end) {
        if (booking.repeatDays) {
            let freq = 1;
            //repeat bookings
            diffDays = 0;
            var copyStart = start
            while (copyStart <= end) {
                var dayIdx = copyStart.day();
                if (repeatDays.includes(dayIdx)) {
                    //add charge for one more day
                    diffDays++;
                }
                copyStart = moment(copyStart).add(1, "days");
            }
            return diffDays * sitter.rate * parseInt(freq) * form.numPets;
        } else if (service === "boarding" || service === "daycare") {
            var diffDays = Math.round((end - start)/(1000 * 60 * 60 * 24));
            return diffDays * sitter.rate * form.numPets;
        } else if (service === "walking" || service === "dropin") {
            //drop-in case, basis is per visit or walking, basis is per walk
            diffDays = Math.round((end - start)/(1000 * 60 * 60 * 24));
            console.log(diffDays)
            console.log(booking.freq)
            console.log(form.numPets)
            return (diffDays + 1) * sitter.rate * parseInt(booking.freq) * form.numPets;
        }
    }

    const maxDate = () => {
        var currentDate = new moment();
        return currentDate.add(31, "d").tz("Asia/Singapore").toDate();
    }

    const submitFormEdit = (e) => {
        e.preventDefault();
        //fetch the Api
        form.startDate = startDate;
        form.endDate = endDate;
        form.cost = cost;
        Api.updateBooking(form)
        .then(props.reloadData)
        props.updateState(form);
        props.toggle();
    }

    useEffect(() => {
        if (props.booking) {
            const {bookingReqId, cost, created, description, endDate, numPets, parent, sitter, repeatDays, startDate, status} = props.booking;
            setValues({bookingReqId, cost, created, description, endDate, numPets, parent, sitter, repeatDays, startDate, status})
        }
    }, [props.booking]);

    const handleStartDateChange = (date) => {
        setStartDate(moment(date).tz("Asia/Singapore").toDate());
        setCost(calculateNewCost(date, endDate));
    }

    const handleEndDateChange = (date) => {
        setEndDate(moment(date).tz("Asia/Singapore").toDate());
        setCost(calculateNewCost(startDate, date));
    }

    const handleNumPets = (num) => {
        form.numPets = num.target.value;
        setCost(calculateNewCost(startDate, endDate));
    }

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
                    minDate={new moment().tz("Asia/Singapore").toDate()}
                    selected={startDate}
                    onChange={handleStartDateChange}
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
                    onChange={handleEndDateChange}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    maxDate={maxDate()}
                />
            </FormGroup>
            <FormGroup>
                <Label for="numPets"> Number of pets: </Label>
                <Input
                    type="number"
                    name="numPets"
                    id="numPets"
                    onChange={handleNumPets}
                    value={form.numPets === null ? "" : form.numPets}
                />
            </FormGroup>
            <FormGroup>
                The new cost will be: {cost}
            </FormGroup>
            <Button
            color="danger" 
            style={{float: "right"}}
            type="submit">Submit</Button>
        </Form>
    );
}

export default EditForm;