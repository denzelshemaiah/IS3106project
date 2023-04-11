import React, { useState, useEffect, useContext } from "react";
import { Button, CardTitle, ListGroupItem, ListGroup, CardText, Card, CardBody, CardGroup, CardImg, ButtonGroup, Alert } from "reactstrap";
import Api from "../../helpers/Api";
import './style.css';
import Rating from 'react-rating-stars-component';
import { Link } from "react-router-dom";
import MgModal from "../../components/MgModals";
import SearchSitter from "../../containers/SearchSitter";

function useSearch(sitters, searchQuery) {

    return sitters.filter(sitter => {
        if (searchQuery.serviceType && sitter.serviceType !== searchQuery.serviceType) {
            return false;
        }
        if (searchQuery.petType.length && !searchQuery.petType.includes(sitter.petType)) {
            return false;
        }
        if (searchQuery.region && sitter.region !== searchQuery.region) {
            return false;
        }
        if (searchQuery.dates.startDate && sitter.startDate < searchQuery.dates.startDate) {
            return false;
        }
        if (searchQuery.dates.endDate && sitter.endDate > searchQuery.dates.endDate) {
            return false;
        }
        if (searchQuery.numOfPets && sitter.numOfPets !== searchQuery.numOfPets) {
            return false;
        }
        if (searchQuery.petSize && sitter.petSize > searchQuery.petSize[1]) {
            return false;
        }
        if (searchQuery.repeat && sitter.repeat !== searchQuery.repeat) {
            return false;
        }
        if (searchQuery.dayOfWeek.length && !searchQuery.dayOfWeek.includes(sitter.dayOfWeek)) {
            return false;
        }
        if (searchQuery.fulltime && !sitter.fulltime) {
            return false;
        }
        if (searchQuery.numOfTimes && sitter.numOfTimes !== searchQuery.numOfTimes) {
            return false;
        }
        if (sitter.rate < searchQuery.rate[0] || sitter.rate > searchQuery.rate[1]) {
            return false;
        }
        return true;
    });

}

function SearchResults(props) {

    const [sitters, setSitters] = useState([]);
    //retrieve the user attributes
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        Api.getAllPetSitters()
            .then((res) => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setSitters(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            );
    }, []);
    const filteredSitters = useSearch(sitters, props.searchQuery);

    //will show the alert prompt when there are no match
    const [visible, setVisible] = useState(true);
    const onDismiss = () => setVisible(false);
    if (filteredSitters.length === 0) {
        return (
            <Alert color="info" isOpen={visible} toggle={onDismiss} className="position-fixed top-0 end-0 m-3">
                Results doesn't match! Try changing your searching criteria!
            </Alert>
        );
    }

    //data init for testing the card
    // const [sitters, setSitters] = useState([{
    //     "userId": 1,
    //     "firstName": "Sarah",
    //     "lastName": "Tan",
    //     "profilePicture": "https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*",
    //     "rate": "5.00/hr",
    //     "rating": 5,
    //     "comments": "good",
    //     "region": "west",
    //     "service": "walking"
    // },
    // {
    //     "userId": 2,
    //     "firstName": "David",
    //     "lastName": "Chua",
    //     "profilePicture": "https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*",
    //     "rate": "6.00/hr",
    //     "rating": 4,
    //     "comments": "excellent",
    //     "region": "east"
    // }]);
    

    return (
        /* here we map over the sitter and display each sitter as a card but this is based on the booking that they have posted */
        <>
            <div className="wrapper">
                <ul className="card-grid">
                    {filteredSitters.map((sitter) => (
                        <li>
                            <article className="card" key={sitter.user.userId}>
                                <CardGroup>
                                    <Card style={{ width: '22rem' }}>
                                        <CardImg
                                            alt="Sample"
                                            src={sitter.profilePicture} />
                                        <CardBody className="text-center">
                                            <CardTitle tag="h5">
                                                {sitter.user.firstName} {sitter.user.lastName}
                                            </CardTitle>
                                            <div>
                                                <Rating
                                                    count={5}
                                                    size={24}
                                                    activeColor="#ffd700"
                                                    value={sitter.user.ratingsForUsers}
                                                    edit={false} />
                                            </div>
                                            <CardText>
                                                <ListGroup flush>
                                                    <ListGroupItem>
                                                        "{sitter.comments}"
                                                    </ListGroupItem>
                                                    <ListGroupItem>
                                                        {sitter.rate}
                                                    </ListGroupItem>
                                                    <ListGroupItem>
                                                        {sitter.region}
                                                    </ListGroupItem>
                                                </ListGroup>
                                            </CardText>
                                        </CardBody>
                                        <ButtonGroup>
                                            <div className="button-wrapper" style={{ marginLeft: "50px" }}>
                                                <Link to="/makebooking" state={{sitter : sitter, formData : props}}>
                                                    <Button> Book Sitter</Button>
                                                </Link>
                                            </div>
                                            <div className="button-wrapper">
                                                <MgModal sitter={sitter} buttonLabel="Create"></MgModal>
                                            </div>
                                        </ButtonGroup>
                                    </Card>
                                </CardGroup>
                            </article>
                        </li>
                    ))}
                </ul>
            </div>
            <style>
                {`
          .card-grid {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
          }
          .button-wrapper {
            display: flex;
            justify-content: center;
            margin-top: auto;
            width: 100px;
          }\
        `}
            </style></>
    );

}


export default SearchResults;
