import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { IMAGES } from "../../img/all_images";

export const Navbar = ({view, modal}) => {
	const { store, actions } = useContext(Context);

	useEffect(() => {
        actions.getUserDataAndAbilities()
        actions.getEcounter()
    },[]);

    //alertPin
    let alertPin = actions.alertPin()

    // active view css focus
    let focusQ=""
    let focusR=""

    switch(view){
        case "rewards":
            focusQ = null
            focusR = "bg-active"
            break;
        default:
            focusQ = "bg-active"
            focusR = null
            break;
    }

    // buttons - tooltips
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    
	return (
    <>
    <div className="navbar fixed-top d-inline px-4 py-3">
        <div className="d-flex flex-row justify-content-between">
                <div className="d-flex flex-row gap-3">
                    {/* profile button */}
                    <button className="card circle" data-bs-toggle="offcanvas" data-bs-target="#Profile" aria-controls="Profile">
                        {/* alerts */}
                        <span className="position-absolute top-1 start-100 translate-middle">
                        <i className={alertPin}></i>
                        </span>
                        {/* profile icon */}
                        <i className="fa-solid fa-user"></i>
                    </button>
                    {/* create quest/reward button */}
                    <button className="card circle" data-bs-toggle="modal" data-bs-target={modal}>
                        <i className="fa-solid fa-plus"></i>
                    </button>
                    {/* clean dashboard button */}
                    {view === "quests"
                    ? <button className="card circle" onClick={actions.cleanDashboard}>
                    <i className="fa-solid fa-arrows-rotate" data-bs-toggle="tooltip" data-bs-title="Clean done quests"></i>
                    </button>
                    : null
                    }
                </div>
                <div className="d-flex flex-row gap-3">
                    {/* tutorial */}
                    <Link to="/tutorial" className="card circle bg-black">
                        <i className="fa-solid fa-question"></i>
                    </Link>
                    {/* log out */}
                    <Link to="/" className="card circle bg-black" onClick={actions.Logout}>
                        <i className="fa-solid fa-power-off"></i>
                    </Link>
                </div>
        </div>
        {/* views */}
        <div className="card round col-lg-3 mx-auto mt-4 d-flex flex-row justify-content-evenly">
            <Link className={`nav-link col-6 ${focusQ}`} to="/quests"><p>quests</p></Link>
            <Link className={`nav-link col-6 ${focusR}`} to="/rewards"><p>rewards</p></Link>
        </div>
    </div>

    
    {/* profile */}
    <div className="offcanvas offcanvas-start p-3 bg-red" tabIndex="-1" id="Profile">
        <div className="offcanvas-header d-flex justify-content-end">
            {/* close button */}
            <div className="card circle bg-black" data-bs-dismiss="offcanvas">
                <i className="fa-solid fa-xmark"></i>
            </div>
        </div>
        <div className="offcanvas-body text-center">
            {/* image */}
            <img className="col-5 mb-3" src={actions.getRoleImage(store.user.user_role)} alt="user role icon" />
            {/* name */}
            <div className="card col my-3 p-2">
                <h5>{store.user?.name}</h5>
            </div>
            <div className="d-flex flex-row gap-3 my-3">
                {/* level */}
                <div className="card col p-2">
                    <h5>LVL {store.user?.level}</h5>
                </div>
                {/* role */}
                <div className="card col p-2">
                    <h5>{store.user?.role}</h5>
                </div>
            </div>
            {/* experience + energy */}
            <div className="card col-12 gap-3 p-3 my-3">
                <div className="d-inline-flex flex-row justify-content-between">
                    <i className="fa-solid fa-forward"></i>
                    <div className="card round col-11">
                        <div className="bg-experience" style={{height:"15px",width: store.user?.experience + "%"}}></div>
                    </div>
                </div>
                <div className="d-inline-flex flex-row justify-content-between">
                    {store.user?.energy >= 85                   
                    ? <i className="fa-solid fa-bolt fa-fade"></i>
                    : <i className="fa-solid fa-bolt"></i>}
                    <div className="card round col-11">
                        <div className="bg-energy" style={{height:"15px",width: store.user?.energy + "%"}}></div>
                    </div>
                </div>
            </div>
            <div className="d-flex gap-3 my-3">
                {/* beastiary */}
                <Link to="/bestiary" className="card col-5 p-2" >
                    <div className="d-flex flex-column gap-2" data-bs-dismiss="offcanvas">
                        <img src={IMAGES.bestiary} className="w-100" />
                        <h5>Bestiary</h5>
                    </div>
                </Link>
                <div className="col">
                    {/* experience and energy numbers */}
                    <div className="card p-2">
                        <h5>{store.user?.experience} <i className="fa-solid fa-forward sizeDown"></i> {store.user?.energy} <i className="fa-solid fa-bolt sizeDown"></i></h5>
                    </div>
                    {/* creature count */}
                    <div className="card my-3 p-1">
                    <h5>{store.user.bestiary}/334 <i className="fa-solid fa-book-open sizeDown"></i></h5>
                    </div>
                    {/* scoreboard top10 */}
                    <Link to="/scoreboard">
                        <div className="card p-1 bg-black" data-bs-dismiss="offcanvas">
                        <h5>Scoreboard</h5>
                        </div>
                    </Link>
                </div>
            {/* encounter button */}
            </div>
            {store.user?.encounter > 0
            ? <Link to="/encounter-map">
            <div className="card col p-2 encounter text-light" data-bs-dismiss="offcanvas">
                <h5>Watch Out</h5>
            </div>
            </Link>
            : null }
        </div>
        {/* edit profile */}
        <div className="offcanvas-footer p-3">
            <Link to="/editprofile">
                <div className="card col p-2 bg-yellow" data-bs-dismiss="offcanvas">
                    <h5>Edit Profile</h5>
                </div>
            </Link>
        </div>
  </div>
  </>
	);
};