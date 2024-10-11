import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { TEXT } from "../../content_text/all_messages";

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
    {/* zero beasts */}
    {store.bestiary.length === 0
    ? <div className="col m-3 p-3"><h5>{TEXT.zeroCreatures}</h5></div>
    : null}
    {/* creatures */}
    <div className="row row-cols-1 row-cols-md-5 gy-4">
          {store.bestiary?.map((item,index)=>(
            <div className="col" key={index}>
              <div className="card p-3 gap-3" data-bs-toggle="modal" data-bs-target="#info" onClick={()=>actions.getCreatureByIndex(item.monster_name)}>
                <img src={actions.getCreatureImage(item)} className="col-8 align-self-center"/>
                <div className="card p-1 text-center bg-yellow">
                  <h6>{item.monster_name}</h6>
                </div>
              </div>
            </div>
          ))}
    </div>
    </div>
    <ToDashboard /> 

    {store.bestiary?.map((item,index)=>(<CreatureModal id="info" key={index}/>))}
    </> 
)
}