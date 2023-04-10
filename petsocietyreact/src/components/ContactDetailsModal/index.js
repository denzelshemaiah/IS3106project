import React, { useEffect, useState } from "react";
import moment from 'moment-timezone';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBone } from "@fortawesome/free-solid-svg-icons";

function ContactModal(props) {
    const [firstName, setFirstName] = useState("first name");
    const [address, setAddress] = useState("address");
    const [contact, setContact] = useState("contact");
    const [modal, setModal] = useState(false);

    useEffect(() => {
        if (props.user) {
            setFirstName(props.user.firstName);
            setAddress(props.user.serviceAddress);
            setContact(props.user.contactNum);
        }
    }, [props.user])

    const toggle = () => {
        setModal(!modal);
    };

    return (
        <> 
            <Button
              color="success"
              onClick={toggle}
              style={{ float: "right", marginLeft: "30px", marginRight: "20px"}}
            >
                Contact
            </Button>

            <Modal isOpen={modal}
            toggle={toggle}
            className={props.className}
            backdrop={"static"}
            keyboard={false}
            centered={true}
            >
                <ModalHeader toggle={toggle}>
                    Contact {firstName} <FontAwesomeIcon icon={faBone} style={{float: "left", marginRight: "15px", height:"30px", width:"30px"}}/>
                </ModalHeader>
                <ModalBody>
                    <p>Please contact {firstName} to finalise details on your booking </p>
                    <p>Address: {address} </p>
                    <p>Contact: {contact} </p>
                </ModalBody>
            </Modal>
        </>
    )

}
export default ContactModal;