import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input} from "reactstrap";
import { DatePicker } from "reactstrap-date-picker"
import Api from "../../helpers/Api";

function EditForm(props) {
    const navigate = useNavigate();
    const userId = props.userId;

    const [form, setValues] = useState({
        bookingReqId : 0,
        cost : 0.00, 
        created : "",
        description : "",
        endDate: "",
        numPets: "",
        startDate: "",
        bookingStatus: "",
    });

    //when the form values change
    const onChange = (e) => {
        setValues({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const submitFormEdit = (e) => {
        e.preventDefault();
        //fetch the Api
        Api.updateBooking(userId, form)
        .then((data) => {navigate("/bookings")})
        props.updateState(form);
        props.toggle();
    }

    useEffect(() => {
        if (props.booking) {
            const {bookingReqId, cost, created, description, endDate, numPets, startDate, bookingStatus} = props.booking;
            setValues({bookingReqId, cost, created, description, endDate, numPets, startDate, bookingStatus})
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
                <DatePicker id="startDate"
                dateFormat="dd/MM/yyyy"
                selected = {form.startDate}
                onChange={onChange}
                />
            </FormGroup>
            <FormGroup>
                <Label for="endDate"> End Date: </Label>
                <DatePicker id="endDate"
                dateFormat="dd/MM/yyyy"
                selected = {form.endDate}
                onChange={onChange}
                />
            </FormGroup>
            <FormGroup>
                <Label for="numPets"> Booking Description: </Label>
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