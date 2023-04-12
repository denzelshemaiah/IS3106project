import React, { useState } from 'react';
import Api from "../../helpers/Api";
import { useNavigate } from 'react-router-dom';

function AllSitters() {
    let navigate = useNavigate();

    useEffect(() => {
        getAllSitters();
    }, []);

    const getAllSitters = () => {
        Api.getAllPetSitters()
            .then((data) =>{
                navigate("/LoggedInHomepage");
            })
    }
}