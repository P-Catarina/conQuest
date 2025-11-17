import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext"
import { Link, useNavigate } from "react-router-dom";
import { IMAGES } from "../../img/all_images";
import { TEXT } from "../../content_text/all_messages";

import PasswordChecklist from "react-password-checklist";


export const SignUp = () => {
	const { store, actions } = useContext(Context)
	const navigate = useNavigate()

	useEffect(() => {
		actions.getBackgroundColor("yellow")
    },[]);

  	const [isButtonDisabled, setIsButtonDisabled] = useState(true)
  	const canSubmit = (isValid) => isValid? setIsButtonDisabled(false) : setIsButtonDisabled(true)

	const handleSubmit = async (event) => {
		const signing = await actions.SignUp()
		if (!signing.ok) alert('Something went wrong :(')
		else navigate("/role")
	}


  return (
    <>
	<form className="col-xl-6 mx-auto p-5 gap-4 card" onSubmit={handleSubmit}>
		<h1> Sign Up</h1>
		{/* demo message */}
        <h5>{TEXT.demoSignUp}</h5>
		{/* username input */}
		<div className="d-lg-flex flex-row justify-content-evenly p-2 card">
			<img src={IMAGES.user} alt="user icon" />
			<input type="text" name="name" placeholder="Username" className="col-9"
				value={store.inputs.name || ""} 
				onChange={event => actions.getInput(event)}
				required />
		</div>
		{/* email input */}
		<div className="d-lg-flex flex-row justify-content-evenly p-2 card">
			<img src={IMAGES.email} alt="email icon" />
			<input type="text" name="email" placeholder="email" className="col-9"
				value={store.inputs.email || ""} 
				onChange={event => actions.getInput(event)}
				required />
		</div>
		{/* password input */}
		<div className="d-lg-flex flex-row justify-content-evenly p-2 card">
			<img src={IMAGES.password} alt="email icon" />
			<input type="password" id="password" name="password" placeholder="password" className="col-7"
				value={store.inputs.password || ""} 
				onChange={event => actions.getInput(event)}
				required />
			{/* see password */}
         <img src={IMAGES.see_password} alt="see password" onClick={actions.seePassword} />
		</div>
    {/* confirm password */}
    <div className="d-lg-flex flex-row justify-content-evenly p-2 card">
			<img src={IMAGES.password_confirm} alt="email icon" />
			<input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm Password" className="col-7"
				value={store.inputs.confirmPassword || ""} 
				onChange={event => actions.getInput(event)}
				required /> 
				{/* see password */}
				<img src={IMAGES.see_password} alt="see password" onClick={actions.seePassword} />   
		</div>
		{/* password requirements */}
		<div className="text-start">
			<PasswordChecklist
				rules={["minLength","specialChar","number","capital","match"]}
				minLength={8}
				value={store.inputs.password || ""} 
				valueAgain={store.inputs.confirmPassword || ""} 
				onChange={(isValid) => {canSubmit(isValid)}} />
		</div >
		{/* submit */}
		<button type="submit" className="card p-3 bg-yellow" disabled={isButtonDisabled}>
			<h5>Gotcha!</h5>
		</button>
		{/* cancel */}
        <Link to="/login" type="reset" className="card p-3 text-center bg-black" onClick={actions.resetInput}>
            <h5>Already have an account?</h5>
        </Link>		
	</form>
	</>
	)};