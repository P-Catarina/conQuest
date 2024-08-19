import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext"
import { Link } from "react-router-dom";

import { TutorialSlides } from "../component/tutorial_slides";

export const Tutorial = () => {
	const { store, actions } = useContext(Context);

	useEffect(() => {
        actions.getBackgroundColor("green")
    },[]);

	return (
		<>
		<div className="col-md-11 mx-auto p-5 gap-4">
			<TutorialSlides />
            {/* close tutorial */}
            <div className="navbar fixed-bottom py-3 d-flex justify-content-center">
                    <Link to="/quests" className="card col-9 p-3 text-center bg-black">
                        <h5>To Questing</h5>
                    </Link>
            </div>            
		</div>
		</>
	);
};