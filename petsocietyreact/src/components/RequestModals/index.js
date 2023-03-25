import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, Input} from "reactstrap";
import EditForm from '../EditRequestForm';
import Api from "../../helpers/Api";

function RequestModal(props) {

    const [modal, setModal] = useState(false);
    const label = props.buttonLabel;
    const [booking, setBooking] = useState("");

    useEffect(() => {
        if (props.booking) {
          setBooking(props.booking)
        }
      }, [props.booking]);
    
    const toggle = () => {
      setModal(!modal);
    };

    let editForm = ""

    if (label === "Edit") {
        editForm = (
            <EditForm
                addItemToState={props.addItemToState}
                updateState={props.updateState}
                toggle={toggle}
                booking={props.booking}
            />
        )
    }

    const closeBtn = (
        <button className="close" class="btn btn-lg" onClick={toggle}>
          &times;
        </button>
    );

    let button = "";
    let title = "";

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
    } else {
        button = (
            <Button
              color="warning"
              onClick={toggle}
              style={{ float: "left", marginRight: "10px" }}
            >
              {label}
            </Button>
          );
          title = "Cancel booking";
    }
    
    const submitFormDelete = (e) => {
      e.preventDefault();
      Api.deleteBooking(booking.bookingReqId)
      props.toggle();
    }

    //edit this
    const calculatePenalty = (e) => {
      return 0;
    }

    let cancelConfirm = "";

    if (label === "Cancel") {
        cancelConfirm = ((
          <div id="cancelModal">
            <Form onSubmit={submitFormDelete}>
              <p>
                Do you want to cancel this booking?
                You would have to pay: ${calculatePenalty(booking)}
                <Input type="text" value={booking.bookingId}/>
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
            <ModalHeader toggle={toggle} close={closeBtn}>
                {title}
            </ModalHeader>
            <ModalBody>
                {editForm}
                {cancelConfirm}
            </ModalBody>
        </Modal>
        </>
    )
}

export default RequestModal;