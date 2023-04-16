import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, Input} from "reactstrap";
import EditForm from '../EditRequestForm';
import Api from "../../helpers/Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";
import moment from 'moment-timezone';


function RequestModal(props) {

    const [modal, setModal] = useState(false);
    const label = props.buttonLabel;
    const [booking, setBooking] = useState(props.booking);
    const reloadData = props.reloadData;

    useEffect(() => {
        if (props.booking) {
          setBooking(props.booking)
        }
      }, [props.booking]);
    
    const toggle = () => {
      setModal(!modal);
    };

    let button = "";
    let title = "";

    const calcDaysDiff = () => {
      var diffDays = Math.round((moment(booking.endDate, "YYYY-MM-DDTHH:mm:ssZ[UTC]").toDate()).getTime() - moment(booking.startDate, "YYYY-MM-DDTHH:mm:ssZ[UTC]").toDate().getTime())/(1000 * 60 * 60 * 24);
      console.log("DIFF: " + diffDays);
      return diffDays;
    }
    
    const calcDaysFromBooking = () => {
      var diffDays = Math.abs(Math.round((moment().toDate()).getTime() - moment(booking.startDate, "YYYY-MM-DDTHH:mm:ssZ[UTC]").toDate().getTime())/(1000 * 60 * 60 * 24));
      console.log("DIFF2: " + diffDays);
      return diffDays;
    }
    //edit this
    const calculatePenalty = (booking) => {
      return 0.75 * booking.cost;
    }

    const submitFormCancel = (e) => {
      e.preventDefault();
      //change this to current user's Id
      Api.cancelBooking(booking.parent.userId, booking.bookingReqId, booking)
      .catch(err => {
        console.log(err)
        props.showErrorToast();
      })
      .then(props.reloadData())
      toggle();
    }

    let penaltyMsg = ""
    if (calcDaysFromBooking() <= 3) {
      penaltyMsg = (<Form onSubmit={submitFormCancel}>
              <p>
                Do you want to cancel this booking?
              </p>
              <p>
              You would have to pay: ${calculatePenalty(booking)}
              <Input type="text" value={booking.bookingId} hidden={true}/>
              </p>
              <p style={{fontSize: "13px", fontWeight:"600"}}>
                **Note: This will automatically be charged to your credit card**
              </p>
              <Button 
                color="danger" 
                type="submit"
                style={{float: "right"}}
                >
                Confirm
              </Button>
            </Form>)
    } else {
      penaltyMsg = (<Form onSubmit={submitFormCancel}>
        <p>
          Do you want to cancel this booking?
        </p>
        <Button 
          color="danger" 
          type="submit"
          style={{float: "right"}}
          >
          Confirm
        </Button>
      </Form>)
    }

    if (label === "Edit") {
        button = (
          <Button
            color="warning"
            onClick={toggle}
            style={{ float: "left", marginRight: "10px" }}
          >
            {label}
          </Button>
        ); title="Edit booking";
    } else if (label === "Cancel") {
        button = (
            <Button
              color="danger"
              onClick={toggle}
              style={{ float: "left", marginRight: "10px" }}
            >
              {label}
            </Button>
          );
          title = "Cancel booking";
    } else if (label === "Accept") {
      button = (
        <Button
          color="success"
          onClick={toggle}
          style={{ float: "left", marginRight: "10px" }}
        >
          {label}
        </Button>
      ); title="Accept this booking?"
    } else if (label === "Reject") {
      button = (
          <Button
            color="danger"
            onClick={toggle}
            style={{ float: "left", marginRight: "10px" }}
          >
            {label}
          </Button>
        );
        title = "Reject this booking?";
    }

    const submitFormAccept = (e) => {
      e.preventDefault();
      //change this to current user's Id
      Api.acceptBooking(booking.sitter.userId, booking.bookingReqId)
      .then(toggle())
      .then(props.reloadData())
    }

    const submitFormReject = (e) => {
      e.preventDefault();
      console.log(booking.sitter.userId)
      //change this to current user's id
      Api.rejectBooking(booking.sitter.userId, booking.bookingReqId)
      .then(toggle())
      .then(props.reloadData())
      .then(props.refreshPage);
    }

    let modalBody = ""
    if (label === "Edit") {
      modalBody = (
          <EditForm
              addItemToState={props.addItemToState}
              updateState={props.updateState}
              toggle={toggle}
              booking={props.booking}
              reloadData={props.reloadData}
              refreshPage={props.refreshPage}
          />
      )
    } else if (label === "Cancel") {
        modalBody = ((
          <div id="cancelModal">
            {penaltyMsg}
          </div>
        ))
      } else if (label === "Accept") {
        modalBody = (
          <div id="acceptModal">
            <Form onSubmit={submitFormAccept}>
              <p>
                Duration: {booking.formatStartDate} to {booking.formatEndDate} <br/>
                Description: {booking.description} <br/>
                Parent : {booking.parent.firstName} {booking.parent.lastName} <br/>
                Number of pets: {booking.numPets} <br/>
                You could earn: ${booking.cost}!
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
        )
      } else if (label === "Reject") {
        modalBody = ((
          <div id="rejectModal">
            <Form onSubmit={submitFormReject}>
              <p>
                Duration: {booking.formatStartDate} to {booking.formatEndDate} <br/>
                Description: {booking.description} <br/>
                Parent : {booking.parent.firstName} {booking.parent.lastName} <br/>
                Number of pets: {booking.numPets} <br/>
                You could earn: ${booking.cost}!
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
        ))
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

export default RequestModal;