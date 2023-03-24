import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";

function RequestModal(props) {
    let thisId = props.id;
    let booking = props.booking;
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
              color="success"
              onClick={toggle}
              style={{ float: "left", marginRight: "10px" }}
            >
              {label}
            </Button>
          );
          title = "Add New Item";
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
                {item}
            </ModalBody>
        </Modal>
        </>
    )
}

export default RequestModal;