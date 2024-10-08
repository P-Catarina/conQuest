import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext"
import { Link } from "react-router-dom";
import { IMAGES } from "../../img/all_images";


export const Login = () => {
	const { store, actions } = useContext(Context);

	useEffect(() => {
		actions.getBackgroundColor("green")
    },[]);

	return (
		<>
		<Link to="/"><img id="menuQ" src={IMAGES.logoQ} /></Link>
		<form className="col-xl-4 mx-auto p-5 gap-4 card">
			<h1>Log in</h1>
			{/* email input */}
			<div className="d-lg-flex flex-row justify-content-evenly p-2 card">
				<img src={IMAGES.email} alt="email icon" />
				<input type="text" name="email" placeholder="email" className="col-9"
					value={store.inputs.email || ""} 
					onChange={event => actions.getInput(event)}
					required/>
			</div>
			{/* password input */}
			<div className="d-lg-flex flex-row justify-content-evenly p-2 card">
				<img src={IMAGES.password} alt="email icon" />
				<input type="password" id="password" name="password" placeholder="password" className="col-7"
					value={store.inputs.password || ""} 
					onChange={event => actions.getInput(event)}
					required/>
				{/* see password */}
                <img src={IMAGES.see_password} alt="see password" onClick={actions.seePassword} />
			</div>
			{/* submit */}
			<Link to="/quests">
				<div type="submit" className="card p-3 text-center bg-yellow" onClick={actions.Login}>
					<h5>Let's go!</h5>
				</div>
			</Link>
			{/* sign up */}
			<Link to="/signup" type="reset" className="card p-3 text-center bg-black" onClick={actions.resetInput}>
                <h5>Not part of the crew yet?</h5>
            </Link>
			{/* forgot password */}
			<Link to="/forgot" type="reset" className="card p-3 text-center bg-purple txt-white" onClick={actions.resetInput}>
                <h5>Forgot password?</h5>
            </Link>
		</form>
		</>
	);
};