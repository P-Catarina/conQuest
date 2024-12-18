import React, { useContext } from "react";
import { Context } from "../store/appContext";

import { TakeAction } from "./dashboard_action_button";

export const DashCard = ({id, view, label, tier, modal, done}) => {

    const { actions } = useContext(Context);

    let tierColor = actions.tierColor(view, tier, done)
    let tierIcon = actions.tierIcon(view, tier)

    return (
        <>
        <div className="col" key={id}> 
            <div className="card">
            <div className={`card-header d-flex flex-row justify-content-between p-3 ${tierColor}`}>
                <div className="d-flex flex-row gap-3">
                    <div className="card circle">
                    <i className={tierIcon}></i>
                    </div>
                    <TakeAction id={id} view={view} label={label} tier={tier} done={done} />
                </div>
                <button className="card circle"
                    data-bs-toggle="modal" data-bs-target={modal}>
                    <i className="fas fa-ellipsis-h"></i>
                </button>
            </div>   
                <div className="card-body">
                    <p className="card-text">{label}</p>
                </div>
            </div>
        </div>
        </>
    )
}