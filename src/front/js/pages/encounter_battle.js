import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext"
import { useNavigate } from "react-router-dom";
import { IMAGES } from "../../img/all_images";
import { TEXT } from "../../content_text/all_messages";

import { BetweenModal } from "../component/modal_inbetween";
import { ResponseModal } from "../component/modal_response";


export const EncounterBattle = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
		actions.battleResult()
        actions.getBackgroundColor("red")
    },[]);

    let creatureImage = actions.getCreatureImage(store.creatureInfo)
    let creatureText = actions.encounterText()
    let creatureDice = store.creatureRoll
    let userDice = store.userRoll
    let battleResult = actions.battleResponse()
    
    return (
    <>
    <div className="col-md-10 mx-auto p-5 gap-4 card">
    {/* title */}
    <h1>Time to Battle</h1>
    {/* creature */}
    <img src={creatureImage} className="col-9 col-md-3 mx-auto" alt="creature" />
    <h1>{store.creatureInfo?.name} - {store.creatureInfo?.type}</h1>
    {/* message */}
    <h5>{creatureText}</h5>
    {/* actions - dance */}
    <div type="button" className="card p-3 text-center bg-green" data-bs-toggle="modal" data-bs-target="#noDancing">
		<h5>Fawn, maybe a little dance</h5>
	</div>
    {/* actions - fight */}
    <div type="button" className="card p-3 text-center bg-yellow" data-bs-toggle="modal" data-bs-target="#creatureRoll">
		<h5>Fight, let's do it</h5>
	</div>
    {/* actions - escape */}
    <div type="button" className="card p-3 text-center bg-black text-light" data-bs-toggle="modal" data-bs-target="#noRunning">
		<h5>Flight, run for your life</h5>
	</div>
    </div>

    {/* run modal */}
    <ResponseModal
        id="noRunning"
        title={TEXT.runTitle}
        image={IMAGES.shame}
        message={TEXT.run}
        confirmLabel="Get back in there"
    />

    {/* dance modal */}
    <ResponseModal
        id="noDancing"
        title={TEXT.danceTitle}
        image={IMAGES.idiot}
        message={TEXT.dance}
        confirmLabel="Get back in there"
    />

    {/* fight modal - creature roll */}
    <BetweenModal 
        id="creatureRoll"
        title={TEXT.fightCreatureTitle}
        image={store.dice[creatureDice]}
        message={TEXT.fightCreature}
        confirmLabel="Attack Roll"
        targetModal="#UserRoll"
    />
    {/* fight modal - user roll */}
    <ResponseModal
        id="UserRoll"
        title={battleResult.title}
        image={store.dice[userDice]}
        message={battleResult.response}
        confirmLabel="Get back"
        action={() => navigate('/quests')}
    />

    </>
    )
}