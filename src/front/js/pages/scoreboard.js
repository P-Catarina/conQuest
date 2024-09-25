import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext"
import { Link } from "react-router-dom";


export const Scoreboard = () => {
	const { store, actions } = useContext(Context);

	useEffect(() => {
        actions.getScoreboard()
        actions.getUserDataAndAbilities()
        actions.getBestiary()
        actions.getBackgroundColor("purple")
    },[]);

	return (
		<>
		<div className="col-md-10 mx-auto p-5 gap-4 card">
			<h1>Scoreboard</h1>
            {/* user bar */}
            <div className="card d-flex flex-md-row p-md-3 bg-yellow">
                <h5 className="col">{store.user.name}</h5>
                <h5 className="col">{store.user.role}</h5>
                <h5 className="col">LVL {store.user.level}</h5>
                <h5 className="col">{store.bestiary.length} Beasts</h5>
            </div>
            <h1>Level Top 10</h1>
            <div>
                {/* level labels bar */}
                <div className="card d-flex flex-md-row p-md-3 bg-black">
                    <h5 className="col">Rank</h5>
                    <h5 className="col">Player</h5>
                    <h5 className="col">Role</h5>
                    <h5 className="col">LVL</h5>
                </div>
                {/* by level list */}
                {store.scoreboard?.filter(player => player.email !== "").sort((a, b) => b.level - a.level).slice(0, 10).map((item,index)=>(
                item.id === store.user.id
                ? <div className="card d-flex flex-md-row my-4 p-md-3 bg-yellow" key={index}>
                    <h5 className="col">{index + 1}</h5>
                    <h5 className="col">{item.name}</h5>
                    <h5 className="col">{item.role}</h5>
                    <h5 className="col">{item.level}</h5>
                </div>
                : <div className="card d-flex flex-md-row my-4 p-md-3" key={index}>
                    <h5 className="col">{index + 1}</h5>
                    <h5 className="col">{item.name}</h5>
                    <h5 className="col">{item.role}</h5>
                    <h5 className="col">{item.level}</h5>
                </div>
                ))}
            </div>
            <h1>Beasts Top 10</h1>
            <div>
                {/* beasts labels bar */}
                <div className="card d-flex flex-md-row p-md-3 bg-black">
                    <h5 className="col">Rank</h5>
                    <h5 className="col">Player</h5>
                    <h5 className="col">Role</h5>
                    <h5 className="col">Beasts</h5>
                </div>
                {/* by beasts list */}
                {store.scoreboard?.filter(player => player.email !== "").sort((a, b) => b.bestiary - a.bestiary).slice(0, 10).map((item,index)=>(
                item.id === store.user.id
                ? <div className="card d-flex flex-md-row my-4 p-md-3 bg-yellow" key={index}>
                    <h5 className="col">{index + 1}</h5>
                    <h5 className="col">{item.name}</h5>
                    <h5 className="col">{item.role}</h5>
                    <h5 className="col">{item.bestiary}</h5>
                </div>
                : <div className="card d-flex flex-md-row my-4 p-md-3" key={index}>
                    <h5 className="col">{index + 1}</h5>
                    <h5 className="col">{item.name}</h5>
                    <h5 className="col">{item.role}</h5>
                    <h5 className="col">{item.bestiary}</h5>
                </div>
                ))}
            </div>
            {/* close bestiary */}
            <div className="navbar fixed-bottom py-3 d-flex justify-content-center">
                    <Link to="/quests" className="card col-9 p-3 text-center bg-black">
                        <h5>To Questing</h5>
                    </Link>
            </div>            
		</div>
		</>
	);
};