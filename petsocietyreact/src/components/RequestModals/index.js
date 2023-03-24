import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import EditForm from '../EditRequestForm';

function RequestModal(props) {

    const [modal, setModal] = useState(false);
    const label = props.buttonLabel;
    const [item, setItem] = useState("");

    useEffect(() => {
        if (props.item) {
          setItem(props.item)
        }
      }, [props.item]);
    
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
                item={props.item}
            />
        )
    }

    const closeBtn = (
        <button className="close" class="btn" onClick={toggle}>
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
        ); title="Edit Item";
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
          title = "Delete Item";
    }      

    let cancelConfirm = "";

    if (label === "Cancel") {
        cancelConfirm = (
            <p>
                Would you like to cancel the booking {item.item}?
            </p>
        )
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