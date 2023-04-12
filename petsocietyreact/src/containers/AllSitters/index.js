import React, { useState, useEffect } from 'react';
import Api from "../../helpers/Api";
import { useNavigate } from 'react-router-dom';

function AllSitters() {
    let navigate = useNavigate();

    const [sitters, setSitters] = useState([]);

    useEffect(() => {
        Api.getAllPetSitters()
            .then(data => setSitters(data))
            .catch(error => console.error(error));
        console.log(sitters);
    }, []);

    return (
        <div>
            <ul>
                {sitters.map(sitter => (
                    <li key={sitter.userId}>
                        <div>{sitter.firstName}</div>
                        <div>{sitter.lastName}</div>
                    </li>
                ))}
            </ul>
            <h1> test</h1>
        </div>


    )

}

export default AllSitters;