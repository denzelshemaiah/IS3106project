import React, { useState, useEffect, useContext } from "react";
import { Button, CardTitle, ListGroupItem, ListGroup, CardText, Card, CardBody, CardGroup, CardImg, ButtonGroup } from "reactstrap";
import Api from "../../helpers/Api";
import './style.css';
import Rating from 'react-rating-stars-component';
import { Link } from "react-router-dom";
import MgModal from "../../components/MgModals";
import SearchSitter from "../../containers/SearchSitter";

function useSearch(sitters, searchQuery) {
    const [searchParam, setSearchParam] = useState(["serviceType", "petType", "location", "startDate", "endDate", "petSize", "rate", "repeat", "full-time", "numOfTimes"]);

    return sitters.filter((sitter) => {
        return searchParam.some((newItem) => {
            return (
                sitter[newItem]
                    .toString()
                    .toLowerCase()
                    .indexOf(searchQuery[newItem].toLowerCase()) > -1
            );
        });
    });
}

function SearchResults(props) {

    const [sitters, setSitters] = useState([]);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const filteredSitters = useSearch(sitters, props.searchQuery);

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
    
    // useEffect(() => {
    //     Api.getAllPetSitters() 
    //         .then((res) => res.json())
    //         .then(
    //             (result) => {
    //                 setIsLoaded(true);
    //                 setSitters(result);
    //             },
    //             // Note: it's important to handle errors here
    //             // instead of a catch() block so that we don't swallow
    //             // exceptions from actual bugs in components.
    //             (error) => {
    //                 setIsLoaded(true);
    //                 setError(error);
    //             }
    //         );                                                                                                                                                                                                                                                                                  
    // }, []);
            

    return (
        /* here we map over the sitter and display each sitter as a card  */
        <>
            <div className="wrapper">
                <ul className="card-grid">
                    {filteredSitters.map((sitter) => (
                        <li>
                            <article className="card" key={sitter.userId}>
                                <CardGroup>
                                    <Card style={{ width: '22rem' }}>
                                        <CardImg
                                            alt="Sample"
                                            src={sitter.profilePicture} />
                                        <CardBody className="text-center">
                                            <CardTitle tag="h5">
                                                {sitter.firstName} {sitter.lastName}
                                            </CardTitle>
                                            <div>
                                                <Rating
                                                    count={5}
                                                    size={24}
                                                    activeColor="#ffd700"
                                                    value={sitter.rating}
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
