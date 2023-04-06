import React, { useEffect, useState } from "react";
import logo1 from "./assets/flat-human-playing-with-dog-animal-friend-vector-illustration.jpg"
import logo2 from "./assets/woman-walking-with-dog-in-autumn-outdoor-activity-concept-illustration-free-vector.jpg"

function NoRequestsPage(props) {
    const tab = props.tab;
    const type = props.type;

    function renderImg() {
        if (tab === "pending" || tab === "rejected") {
            return <img src={logo1} className="logo" style={{width:"25vw", height:"35vh"}}/>
        } else {
            return <img src={logo2} className="logo"  style={{width:"30vw", height:"43vh"}}/>
        }
    }

    return (
        <>
            <div style={{display:"block", margin:"10px", width:"100vw"}}>
                <h4> Oops, looks like there are no {tab} {type} yet!</h4>
                <div style={{margin:"auto"}}>
                    {renderImg()}
                </div>
            </div>
        </>
    )
}

export default NoRequestsPage;