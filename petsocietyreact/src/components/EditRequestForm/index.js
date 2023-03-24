import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

function EditForm(props) {
    const [form, setValues] = useState({
        bookingId: 0,
        item: "",
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
        props.updateState(form);
        props.toggle();
    }

    useEffect(() => {
        if (props.item) {
            const {bookingId, item} = props.item;
            setValues({bookingId, item})
        }
    }, [props.item]);

    return (
        <Form onSubmit={submitFormEdit}>
            <FormGroup>
                <Label for="bookingId"> ID: </Label>
                <Input
                    type="text"
                    name="bookingId"
                    id="bookingId"
                    onChange={onChange}
                    value={form.bookingId === null ? "" : form.bookingId}
                />
            </FormGroup>
            <FormGroup>
                <Label for="item"> Item: </Label>
                <Input
                    type="text"
                    name="item"
                    id="item"
                    onChange={onChange}
                    value={form.item === null ? "" : form.item}
                />
            </FormGroup>
            <Button>Submit</Button>
        </Form>
    );
}

export default EditForm;