import React from "react";
import { Link } from "react-router-dom";


export const ToDashboard = () => {

    return (
        <>
        <div className="navbar fixed-bottom py-3 d-flex justify-content-center">
        <Link to="/quests" className="card col-9 p-3 text-center bg-black">
            <h5>To Questing</h5>
        </Link>
        </div>   
        </>
    )
}