import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext"

import { TutorialSlides } from "../component/tutorial_slides";
import { ToDashboard } from "../component/button_to_dashboard";


export const Tutorial = () => {
	const { store, actions } = useContext(Context);

	useEffect(() => {
        actions.getBackgroundColor("green")
    },[]);

	return (
		<>
		<div className="col-md-11 mx-auto p-5 gap-4">
			<TutorialSlides />
            <ToDashboard />           
		</div>
		</>
	);
};