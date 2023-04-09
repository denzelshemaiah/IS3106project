import React, { useEffect, useState } from "react";
import logo1 from "./assets/ownerHuggingDog.jpg"
import logo2 from "./assets/twoPeopleWaving.jpg"
import logo3 from "./assets/girlwaving.jpg"

function NoRequestsPage(props) {
    const tab = props.tab;
    const type = props.type;

    function renderImg() {
        if (tab === "pending" || tab === "rejected") {
            return <img src={logo1} className="logo" style={{width:"25vw", height:"35vh"}}/>
        } else if (tab === "upcoming") {
            return <img src={logo3} className="logo"  style={{width:"30vw", height:"43vh"}}/>
        } else {
            return <img src={logo2} className="logo"  style={{width:"30vw", height:"43vh"}}/>
        }
    }

    return (
        <>
            <div style={{display:"block", textAlign:"center"}}>
                <h4> Oops, looks like there are no {tab} {type} yet!</h4>
                <div style={{margin:"auto"}}>
                    {renderImg()}
                </div>
            </div>
        </>
    )
}

export default NoRequestsPage;