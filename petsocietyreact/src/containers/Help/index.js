import React, { useEffect, useState } from "react";
import logo from "./dogQuestioning.jpeg"
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import 'bootstrap/dist/css/bootstrap.min.css';

function HelpPage(props) {
    const [activeTab, setActiveTab] = useState('1');

    useEffect(() => {

    });

    function toggle(tab) {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    }

    return (
        <>
            <div style={{ display: "block", textAlign: "center", height: "20vh" }} class="mt-5">
                <h1 style={{ marginTop: "10vh", marginBottom: "-15vh" }}> PetSociety Help Page </h1>
                <img src={logo} style={{ float: "right", height: "30vh" }} />
            </div>

            <Nav tabs className="navTab">
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '1' })}
                        onClick={() => { toggle('1') }}
                        style={{ textTransform: "capitalize", width: "20vw", textAlign: "center" }}
                    >
                        <h4> pet sitter</h4>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '2' })}
                        onClick={() => { toggle('2') }}
                        style={{ textTransform: "capitalize", width: "20vw", textAlign: "center" }}
                    >
                        <h4>Pet Parent</h4>
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1" style={{ padding: "30px" }}>
                    <Row>
                        <Col sm="4">
                            <h5>Starting out</h5>
                            <div class="accordion accordion-flush" id="accordionFlushOne">
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="start-flush-headingOne">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#startOne" aria-expanded="false" aria-controls="flush-collapseStartOne">
                                            What is PetSociety?
                                        </button>
                                    </h2>
                                    <div id="startOne" class="accordion-collapse collapse" aria-labelledby="start-flush-headingOne" data-bs-parent="#accordionFlushOne">
                                        <div class="accordion-body">
                                            PetSociety is a comprehensive website aiming to connect Pet Parents to trustworthy Pet Sitters nearby. <br /> Pet Sitters on this website
                                            offer a wide range of services namely: Pet-sitting, Daycare services, Pet walking and Drop-in services.
                                        </div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="start-flush-headingTwo">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#startTwo" aria-expanded="false" aria-controls="flush-collapseStartTwo">
                                            How do I sign up as a Sitter?
                                        </button>
                                    </h2>
                                    <div id="startTwo" class="accordion-collapse collapse" aria-labelledby="start-flush-headingTwo" data-bs-parent="#accordionFlushOne">
                                        <div class="accordion-body">
                                            In the navigation bar at the top of the screen, there is a Sign Up link. <br />
                                            Upon clicking this link, you will be prompted to fill in personal details and
                                            payment details. <br />
                                            Subsequently, after choosing the Pet Sitter option, you will be required to fill in ...
                                        </div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="start-flush-headingThree">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#startThree" aria-expanded="false" aria-controls="flush-collapseStartThree">
                                            As a Pet Sitter, is PetSociety free?
                                        </button>
                                    </h2>
                                    <div id="startThree" class="accordion-collapse collapse" aria-labelledby="start-flush-headingThree" data-bs-parent="#accordionFlushExample">
                                        <div class="accordion-body">
                                            In order to sign up as a Pet Sitter, a fee will be charged to conduct a background review of you. <br />
                                            This is to ensure the safety of our furry friends on this platform. <br />
                                            For each booking completed, a comission fee of 15% will be deducted from the overall amount earnt. <br />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </Col>

                        <Col sm="4">
                            <h5>Account & Profile</h5>
                            <div class="accordion accordion-flush" id="accordionFlushAccount">
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="account-flush-headingOne">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#accountOne" aria-expanded="false" aria-controls="flush-collapseAccountOne">
                                            Accordion Item #1
                                        </button>
                                    </h2>
                                    <div id="accountOne" class="accordion-collapse collapse" aria-labelledby="account-flush-headingOne" data-bs-parent="#accordionFlushAccount">
                                        <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the first item's accordion body.</div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="account-flush-headingTwo">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#accountTwo" aria-expanded="false" aria-controls="flush-collapseAccountTwo">
                                            Accordion Item #2
                                        </button>
                                    </h2>
                                    <div id="accountTwo" class="accordion-collapse collapse" aria-labelledby="account-flush-headingTwo" data-bs-parent="#accordionFlushAccount">
                                        <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the second item's accordion body. Let's imagine this being filled with some actual content.</div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="account-flush-headingThree">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#accountThree" aria-expanded="false" aria-controls="flush-collapseAccountThree">
                                            Accordion Item #3
                                        </button>
                                    </h2>
                                    <div id="accountThree" class="accordion-collapse collapse" aria-labelledby="account-flush-headingThree" data-bs-parent="#accordionFlushAccount">
                                        <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the third item's accordion body. Nothing more exciting happening here in terms of content, but just filling up the space to make it look, at least at first glance, a bit more representative of how this would look in a real-world application.</div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col sm="4">
                            <h5>Services offered</h5>
                            <div class="accordion accordion-flush" id="accordionFlushSvcs">
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="svcs-flush-headingOne">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#svcsOne" aria-expanded="false" aria-controls="svcs-flush-collapseOne">
                                            Boarding
                                        </button>
                                    </h2>
                                    <div id="svcsOne" class="accordion-collapse collapse" aria-labelledby="svcs-flush-headingOne" data-bs-parent="#accordionFlushSvcs">
                                        <div class="accordion-body">Owners can source for suitable and trusted pet-sitters for an extended period of time. </div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="flush-headingTwo">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#svcsTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                                            DayCare
                                        </button>
                                    </h2>
                                    <div id="svcsTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushSvcs">
                                        <div class="accordion-body">Owners with dogs who are accustomed to unfamiliar environment can drop their dog off during their working hours. Owners can choose to make it a repeated service. </div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="flush-headingThree">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#svcsThree" aria-expanded="false" aria-controls="flush-collapseThree">
                                            Drop-in Visits
                                        </button>
                                    </h2>
                                    <div id="svcsThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushSvcs">
                                        <div class="accordion-body">Pet sitter will visit the owner’s home at the frequency specified by the owner.  Owners can choose to make it a repeated service. </div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="flush-headingFour">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#svcsFour" aria-expanded="false" aria-controls="flush-collapseFour">
                                            Dog Walker
                                        </button>
                                    </h2>
                                    <div id="svcsFour" class="accordion-collapse collapse" aria-labelledby="flush-headingFour" data-bs-parent="#accordionFlushSvcs">
                                        <div class="accordion-body">Pet parents can pick a trusted pet sitter to help them with dog walking. They are able to select the number of times a day and also make this a repeated service. </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: "30px" }}>
                        <Col sm="4">
                            <h5> Payment </h5>
                            <div class="accordion accordion-flush" id="accordionFlushPayment">
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="payment-flush-headingOne">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#paymentOne" aria-expanded="false" aria-controls="payment-flush-collapseOne">
                                            Accordion Item #1
                                        </button>
                                    </h2>
                                    <div id="paymentOne" class="accordion-collapse collapse" aria-labelledby="payment-flush-headingOne" data-bs-parent="#accordionFlushExample">
                                        <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the first item's accordion body.</div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="payment-flush-headingTwo">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#paymentTwo" aria-expanded="false" aria-controls="payment-flush-collapseTwo">
                                            Accordion Item #2
                                        </button>
                                    </h2>
                                    <div id="paymentTwo" class="accordion-collapse collapse" aria-labelledby="payment-flush-headingTwo" data-bs-parent="#accordionFlushExample">
                                        <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the second item's accordion body. Let's imagine this being filled with some actual content.</div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="payment-flush-headingThree">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#paymentThree" aria-expanded="false" aria-controls="payment-flush-collapseThree">
                                            Accordion Item #3
                                        </button>
                                    </h2>
                                    <div id="paymentThree" class="accordion-collapse collapse" aria-labelledby="payment-flush-headingThree" data-bs-parent="#accordionFlushExample">
                                        <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the third item's accordion body. Nothing more exciting happening here in terms of content, but just filling up the space to make it look, at least at first glance, a bit more representative of how this would look in a real-world application.</div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </TabPane>


                <TabPane tabId="2" style={{ padding: "30px" }}>
                    <Row>
                        <Col sm="4">
                            <h5>Starting out</h5>
                            <div class="accordion accordion-flush" id="accordionFlushOne">
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="start-flush-headingOne">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#startOne" aria-expanded="false" aria-controls="flush-collapseStartOne">
                                            What is PetSociety?
                                        </button>
                                    </h2>
                                    <div id="startOne" class="accordion-collapse collapse" aria-labelledby="start-flush-headingOne" data-bs-parent="#accordionFlushOne">
                                        <div class="accordion-body">
                                            PetSociety is a comprehensive website aiming to connect Pet Parents to trustworthy Pet Sitters nearby. <br /> Pet Sitters on this website
                                            offer a wide range of services namely: Pet-sitting, Daycare services, Pet walking and Drop-in services.
                                        </div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="start-flush-headingTwo">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#startTwo" aria-expanded="false" aria-controls="flush-collapseStartTwo">
                                            How do I sign up as a Sitter?
                                        </button>
                                    </h2>
                                    <div id="startTwo" class="accordion-collapse collapse" aria-labelledby="start-flush-headingTwo" data-bs-parent="#accordionFlushOne">
                                        <div class="accordion-body">
                                            In the navigation bar at the top of the screen, there is a Sign Up link. <br />
                                            Upon clicking this link, you will be prompted to fill in personal details and
                                            payment details. <br />
                                            Subsequently, after choosing the Pet Parent option, you will be required to fill in ...
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </Col>

                        <Col sm="4">
                            <h5>Account & Profile</h5>
                            <div class="accordion accordion-flush" id="accordionFlushAccount">
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="account-flush-headingOne">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#accountOne" aria-expanded="false" aria-controls="flush-collapseAccountOne">
                                            How do i update my profile
                                        </button>
                                    </h2>
                                    <div id="accountOne" class="accordion-collapse collapse" aria-labelledby="account-flush-headingOne" data-bs-parent="#accordionFlushAccount">
                                        <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the first item's accordion body.</div>
                                    </div>
                                </div>
                            </div>
                        </Col>

                        <Col sm="4">
                            <h5>Services offered</h5>
                            <div class="accordion accordion-flush" id="accordionFlushSvcs">
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="svcs-flush-headingOne">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#svcsOne" aria-expanded="false" aria-controls="svcs-flush-collapseOne">
                                            Boarding
                                        </button>
                                    </h2>
                                    <div id="svcsOne" class="accordion-collapse collapse" aria-labelledby="svcs-flush-headingOne" data-bs-parent="#accordionFlushSvcs">
                                        <div class="accordion-body">Owners can source for suitable and trusted pet-sitters for an extended period of time. </div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="flush-headingTwo">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#svcsTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                                            DayCare
                                        </button>
                                    </h2>
                                    <div id="svcsTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushSvcs">
                                        <div class="accordion-body">Owners with dogs who are accustomed to unfamiliar environment can drop their dog off during their working hours. Owners can choose to make it a repeated service. </div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="flush-headingThree">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#svcsThree" aria-expanded="false" aria-controls="flush-collapseThree">
                                            Drop-in Visits
                                        </button>
                                    </h2>
                                    <div id="svcsThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushSvcs">
                                        <div class="accordion-body">Pet sitter will visit the owner’s home at the frequency specified by the owner.  Owners can choose to make it a repeated service. </div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="flush-headingFour">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#svcsFour" aria-expanded="false" aria-controls="flush-collapseFour">
                                            Dog Walker
                                        </button>
                                    </h2>
                                    <div id="svcsFour" class="accordion-collapse collapse" aria-labelledby="flush-headingFour" data-bs-parent="#accordionFlushSvcs">
                                        <div class="accordion-body">Pet parents can pick a trusted pet sitter to help them with dog walking. They are able to select the number of times a day and also make this a repeated service. </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    
                    <Row style={{ marginTop: "30px" }}>
                        <Col sm="4">
                            <h5> Payment </h5>
                            <div class="accordion accordion-flush" id="accordionFlushPayment">
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="payment-flush-headingOne">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#paymentOne" aria-expanded="false" aria-controls="payment-flush-collapseOne">
                                            Accordion Item #1
                                        </button>
                                    </h2>
                                    <div id="paymentOne" class="accordion-collapse collapse" aria-labelledby="payment-flush-headingOne" data-bs-parent="#accordionFlushExample">
                                        <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the first item's accordion body.</div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="payment-flush-headingTwo">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#paymentTwo" aria-expanded="false" aria-controls="payment-flush-collapseTwo">
                                            Accordion Item #2
                                        </button>
                                    </h2>
                                    <div id="paymentTwo" class="accordion-collapse collapse" aria-labelledby="payment-flush-headingTwo" data-bs-parent="#accordionFlushExample">
                                        <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the second item's accordion body. Let's imagine this being filled with some actual content.</div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="payment-flush-headingThree">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#paymentThree" aria-expanded="false" aria-controls="payment-flush-collapseThree">
                                            Accordion Item #3
                                        </button>
                                    </h2>
                                    <div id="paymentThree" class="accordion-collapse collapse" aria-labelledby="payment-flush-headingThree" data-bs-parent="#accordionFlushExample">
                                        <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the third item's accordion body. Nothing more exciting happening here in terms of content, but just filling up the space to make it look, at least at first glance, a bit more representative of how this would look in a real-world application.</div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </TabPane>
            </TabContent>
        </>
    )

}
export default HelpPage;