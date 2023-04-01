import React, { useState, useEffect  } from "react";
import { Button, CardTitle, CardSubtitle, ListGroupItem, ListGroup, CardText, Card, CardBody, CardGroup, CardImg} from "reactstrap";
//import Api from "../../helpers/Api";
import './styles.css';
import Rating from 'react-rating-stars-component';

// Note: the empty deps array [] means
    // this useEffect will run once
    function SearchResults() {
        const [error, setError] = useState(null);
        const [isLoaded, setIsLoaded] = useState(true);
        //data init for testing the card
        const [sitters, setSitters] = useState([{"userId": 1, 
        "firstName": "Sarah", 
        "lastName": "Tan", 
        "profilePicture": "https://www.rover.com/members/anne-w-well-treat-your-pet-like-family/?service_type=overnight-boarding&frequency=onetime&pet_type=dog", 
        "rate": "5.00/hr",
        "rating": 5,
        "comments": "good",
        "region":"west"}, 
        {"userId": 2, 
        "firstName": "David", 
        "lastName": "Chua", 
        "profilePicture": "https://www.rover.com/members/anne-w-well-treat-your-pet-like-family/?service_type=overnight-boarding&frequency=onetime&pet_type=dog", 
        "rate": "6.00/hr",
        "rating": 4,
        "comments": "excellent",
        "region":"east"}]);


/*
        useEffect(() => {
            Api.getAllPetSitters(userId) 
                .then((res) => res.json())
                .then(
                    (result) => {
                        setIsLoaded(true);
                        setSitters(result);
                    },
                    // Note: it's important to handle errors here
                    // instead of a catch() block so that we don't swallow
                    // exceptions from actual bugs in components.
                    (error) => {
                        setIsLoaded(true);
                        setError(error);
                    }
                );
        }, []);

        if (error) { 
            return <>{error.message}</>;
        } else if (!isLoaded) {
            return <>loading...</>;
        } else { */
    return (
        /* here we map over the sitter and display each sitter as a card  */
        <div className="wrapper">
            <ul className="card-grid">
                {sitters.map((sitter) => (
                    <li>
                        <article className="card" key={sitter.userId}>
                            <CardGroup>
                                <Card style={{ width: '22rem' }}>
                                    <CardImg
                                        alt="Sample"
                                        src="https://picsum.photos/300/200"
                                    />
                                    <CardBody>
                                        <CardTitle tag="h5">
                                            {sitter.firstName} {sitter.lastName}
                                        </CardTitle>
                                        <div>
                                        <Rating
                                            count={5}
                                            size={24}
                                            activeColor="#ffd700"
                                            value={sitter.rating}
                                            edit={false}
                                        />
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
                                    <div className="button-wrapper">
                                        <Button>Book Sitter</Button>
                                    </div>
                                </Card>
                            </CardGroup>
                        </article>
                    </li>
                ))}
            </ul>
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
            width: 100%;
          }
        `}
            </style>
        </div>
    );
}
// }

export default SearchResults;