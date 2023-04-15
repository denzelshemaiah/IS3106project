import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input} from "reactstrap";
import Api from "../../helpers/Api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment-timezone';

function EditForm(props) {
    const userId = props.userId;
    const mgReq = props.mgReq;
    const [date, setDate] = useState(moment(mgReq.mgDate, "YYYY-MM-DDTHH:mm:ssZ[UTC]").toDate());
    const [service, setService] = useState("walking");

    const [form, setValues] = useState({
        mgReqId : mgReq.mgRedId,
        createdDate : mgReq.createdDate,
        mgDate : mgReq.mgDate,
        mgDesc : mgReq.mgDesc,
        status: mgReq.status,
        parent : mgReq.parent,
        sitter : mgReq.sitter,
    });

    //when the form values change
    const onChange = (e) => {
        setValues({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const maxDate = () => {
        //max date for meet and greet
        var currentDate = moment();
        return currentDate.add(31, "d").tz("Asia/Singapore").toDate();
    }

    const submitFormEdit = (e) => {
        e.preventDefault();
        //fetch the Api
        form.mgDate = date;
        console.log(form.mgDate)
        Api.updateMg(form)
        .then(props.reloadData)
        props.updateState(form);
        props.toggle();
    }

    useEffect(() => {
        if (props.mgReq) {
            const {mgReqId, createdDate, mgDate, mgDesc, status, parent, sitter} = props.mgReq;
            setValues({mgReqId, createdDate, mgDate, mgDesc, status, parent, sitter});
        }
    }, [props.mgReq]);

    return (
        <Form onSubmit={submitFormEdit}>
            <FormGroup>
                <Label for="mgDesc"> Request Description: </Label>
                <Input
                    type="text"
                    name="mgDesc"
                    id="mgDesc"
                    onChange={onChange}
                    value={form.mgDesc === null ? "" : form.mgDesc}
                />
            </FormGroup>
            <FormGroup>
                <Label for="date"> Start Date: </Label>
                <DatePicker
                    name="date"
                    minDate={moment().tz("Asia/Singapore").toDate()}
                    selected={date}
                    onChange={(date) => setDate(date)}
                    maxDate={maxDate()}
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