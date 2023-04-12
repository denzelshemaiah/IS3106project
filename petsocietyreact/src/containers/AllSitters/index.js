import React, { useState, useEffect } from 'react';
import Api from "../../helpers/Api";
import { useNavigate } from 'react-router-dom';

function AllSitters() {
    let navigate = useNavigate();

    const [sitters, setSitters] = useState([]);

    useEffect(() => {
        Api.getAllPetSitters()
            .then((res) => res.json())
            .then((data) => setSitters(data))
            .catch(error => console.error(error));
        console.log(sitters);
    }, []);

    // const getAllSitters = async () => {
    //     const response = await fetch(Api.getAllPetSitters());
    //     const data = await response.json();
    //     return data;
    // };

    return (
        <div>
            <h1>List of Sitters</h1>
            <ul>
                {sitters.map((sitter) => (
                    <li key={sitter.userId}>
                        {sitter.firstName}
                        {sitter.lastName}</li>
                ))}
            </ul>
            <h1> test</h1>
        </div>
    )
}

export default AllSitters;