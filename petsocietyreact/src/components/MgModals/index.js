import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody} from "reactstrap";
import Api from "../../helpers/Api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment-timezone';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";
import EditMgForm from "../../components/EditMgForm";
import { useNavigate } from "react-router-dom";

function MgModal(props) {
    const [modal, setModal] = useState(false);
    const [sitter,setSitter] = useState(props.sitter);
    const [createdDate, setCreated] = useState(moment().startOf("day").tz("Asia/Singapore").toDate());
    const [mgDate, setMgDate] = useState(moment().startOf("day").tz("Asia/Singapore").toDate());
    const buttonLabel = props.buttonLabel;
    const reloadData = props.reloadData;
    const mgReq = props.mgReq;
    const [parent, setParent] = useState({});
    const [formatMgDate, setFormatMgDate] = useState("");

    let navigate = useNavigate();

    useEffect(() => {
        if (mgReq) {
          var formatDate = moment(mgReq.mgDate, "YYYY-MM-DDTHH:mm:ssZ[UTC]").tz("Asia/Singapore").toDate().toString();
          formatDate = formatDate.split(" ");
          formatDate = formatDate.slice(0,4).join(" ");
          setFormatMgDate(formatDate);
        }
        if (props.sitter) {
          setSitter(props.sitter);
        }
        if (JSON.parse(localStorage.getItem("user"))) {
          setParent(JSON.parse(localStorage.getItem("user")));
        }
    }, [props.sitter]);

    const toggle = () => {
      setModal(!modal);
    };

    const [form, setValues] = useState({
        createdDate : createdDate,
        mgDate : mgDate,
        mgDesc : "",
    });

    const submitFormCancel = (e) => {
        e.preventDefault();
        //change this to current user's Id
        console.log(parent.userId);
        console.log(mgReq.mgReqId);
        Api.cancelMg(parent.userId, mgReq.mgReqId)
        .then(props.reloadData())
        // .then(props.refreshPage())
        .then(toggle());
    }

    const submitFormAccept = (e) => {
        e.preventDefault();
        //change this to current user's Id
        Api.acceptMg(mgReq.sitter.userId, mgReq.mgReqId)
        .then(props.reloadData())
        .then(props.refreshPage())
        .then(toggle());
    }

    const submitFormReject = (e) => {
        e.preventDefault();
        //change this to current user's id
        Api.rejectMg(mgReq.sitter.userId, mgReq.mgReqId)
        .then(props.reloadData())
        .then(props.refreshPage())
        .then(toggle());
    }

    //when the form values change
    const onChange = (e) => {
        setValues({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const maxDate = () => {
        var currentDate = moment();
        return currentDate.add(31, "d").tz("Asia/Singapore").toDate();
    }

    const submitFormMake = (e) => {
        e.preventDefault();
        form.createdDate = createdDate;
        form.mgDate = mgDate;
        console.log(form);
        Api.createMg(form, sitter.userId, parent.userId)
        .then(toggle());
        toggle();
    }

    let button = "";
    let title = "";
    let modalBody = "";

    if (buttonLabel === "Create") {
        button = (
            <Button
              color="primary"
              onClick={toggle}
              style={{ float: "right", marginLeft: "30px", marginRight: "20px", padding: '15px 25px'}}
            >
            Meet Sitter
            </Button>
        ); title = "Meet " + sitter.firstName;
        modalBody = (
            <Form onSubmit={submitFormMake}>
                    <FormGroup>
                        <Label for="mgDesc"> You can introduce yourself and your furry friend </Label>
                        <Input
                            type="text"
                            name="mgDesc"
                            id="mgDesc"
                            onChange={onChange}
                            value={form.mgDesc}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="date"> Date: </Label>
                        <DatePicker
                            name="date"
                            minDate={moment().tz("Asia/Singapore").toDate()}
                            selected={mgDate}
                            onChange={(date) => setMgDate(date)}
                            selectsStart
                            startDate={moment().tz("Asia/Singapore").toDate()}
                            maxDate={maxDate()}
                        />
                    </FormGroup>
                <Button 
                    color="success" 
                    type="submit"
                    style={{float: "right"}}
                    >
                    Confirm
                </Button>
            </Form>
        )
    } else if (buttonLabel === "Edit") {
        button = (
            <Button
              color="warning"
              onClick={toggle}
              style={{ float: "right" }}
            >
            Edit
            </Button>
        ); title = "Edit Meet and Greet";
        modalBody = (
            <EditMgForm mgReq={props.mgReq}
             reloadData={props.reloadData} 
             updateState={props.updateState}
             refreshPage={props.refreshPage}
             toggle={toggle}></EditMgForm>
        )
    } else if (buttonLabel === "Cancel") {
        button = (
            <Button
              color="danger"
              onClick={toggle}
              style={{ float: "right", marginRight: "10px" }}
            >
            Cancel
            </Button>
        ); title= "Cancel Meet and Greet?";
        modalBody = (
            <div id="cancelModal">
            <Form onSubmit={submitFormCancel}>
              <p>
                Do you want to cancel this meet and greet?
              </p>
              <Button 
                color="danger" 
                type="submit"
                style={{float: "right"}}
                >
                Confirm
              </Button>
            </Form>
          </div>
        )
    } else if (buttonLabel === "Reject") {
        button = (
            <Button
              color="danger"
              onClick={toggle}
              style={{ float: "right" }}
            >
            Reject
            </Button>
        ); title = "Reject Meet and Greet?";
        modalBody = (
              <Form onSubmit={submitFormReject}>
                <p>
                  Date: {formatMgDate} <br/>
                  Description: {mgReq.mgDesc} <br/>
                  Parent : {mgReq.parent.firstName} {mgReq.parent.lastName} <br/>
                </p>
                <Button 
                  color="danger" 
                  type="submit"
                  style={{float: "right"}}
                  >
                  Reject
                </Button>
              </Form>
        );
    } else if (buttonLabel === "Accept") {
        button = (
            <Button
              color="success"
              onClick={toggle}
              style={{ float: "right", marginRight: "10px" }}
            >
            Accept
            </Button>
        ); title = "Accept Meet and Greet?";
        modalBody = (
            <div id="acceptModal">
              <Form onSubmit={submitFormAccept}>
                <p>
                  Date: {formatMgDate} <br/>
                  Description: {mgReq.mgDesc} <br/>
                  Parent : {mgReq.parent.firstName} {mgReq.parent.lastName} <br/>
                </p>
                <Button 
                  color="success" 
                  type="submit"
                  style={{float: "right"}}
                  >
                  Confirm
                </Button>
              </Form>
            </div>
        );
    }

    return (
        <>
        {button}
        <Modal isOpen={modal}
        toggle={toggle}
        className={props.className}
        backdrop={"static"}
        keyboard={false}
        centered={true}
        >
            <ModalHeader toggle={toggle}>
                {title} <FontAwesomeIcon icon={faPaw} style={{float: "left", marginRight: "15px", height:"30px", width:"30px"}}/>
            </ModalHeader>
            <ModalBody>
                {modalBody}
            </ModalBody>
        </Modal>
        </>
    )
}
export default MgModal;