import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";

import { LoadingFallback } from "../component/fallback_loading";

import { CreatureModal } from "../component/modal_creature";
import { ToDashboard } from "../component/button_to_dashboard";


export const Bestiary = () =>{
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getBackgroundColor("green")
    actions.getBestiary()
    },[]);

    return (
    <>
    <div className="col-md-10 mx-auto p-5 card">
    {/* title */}
    <h1>Bestiary</h1>
    {/* loading / empty */
		store.loadingBestiary === true && store.bestiary.length === 0
		? <LoadingFallback />
		: <h5>{store.loadingBestiary}</h5>
		/* list */}
    <div className="row row-cols-1 row-cols-md-5 gy-4">
          {store.bestiary?.map((item,index) => (
            <div className="col" key={index}>
              <div className="card p-3 gap-3" data-bs-toggle="modal" data-bs-target="#info" onClick={()=>actions.getCreature(item.api)}>
                <img src={actions.getCreatureImage(item)} className="col-8 align-self-center"/>
                <div className="card p-1 text-center bg-yellow">
                  <h6>{item.name}</h6>
                </div>
              </div>
            </div>
          ))}
    </div>
    </div>
    <ToDashboard />

    {/* creature info modal */}
    {store.bestiary?.map((item,index)=>(<CreatureModal id="info" key={index}/>))}
    </> 
)
}