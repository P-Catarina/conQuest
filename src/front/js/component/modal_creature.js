import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

export const CreatureModal= ({id}) => {
    const { store, actions } = useContext(Context);

    
    
    return (
        <>
             <div className="modal fade" id={id} tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="card modal-content d-flex gap-3 mx-auto p-5">
                        {/* title */}
                        <h1>{store.creatureInfo?.name}</h1>
                        <img className="col-8 mx-auto" src={actions.getCreatureImage(store.creatureInfo)}/>
                        <div className="d-inline-flex gap-4 mx-auto text-start">
                            <div>
                                <h5>Type: </h5>
                                <h5>Size: </h5>
                                <h5>XP: </h5>
                                <h5>Alignment: </h5>
                            </div>
                            <div>
                                <p>{store.creatureInfo?.type}</p>
                                <p>{store.creatureInfo?.size}</p>
                                <p>{store.creatureInfo?.xp}</p>
                                <p>{store.creatureInfo?.alignment}</p>
                            </div>
                            <h5>{store.creatureInfo?.desc}</h5>
                        </div>
                        <div type="button" className="card p-3 text-center bg-yellow" data-bs-dismiss="modal" aria-label="Close">
                            <h5>Go back to the Bestiary</h5>
                            </div>
                    </div>
                </div>
            </div>
        </>
    )



}