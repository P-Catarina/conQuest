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
		event.preventDefault()
		const newUser = {
			"name": store.inputs.name,
			"email": store.inputs.email,
			"password": store.inputs.password
		}
		try {
			const response = await fetch(process.env.BACKEND_URL + "api/users", {
								method: "POST",
								body: JSON.stringify(newUser),
								headers: {"Content-Type": "application/json"}
			})		
			if (!response.ok) {const data = await response.json()}
			const data = await response.json()
			const token = data.token
			const user_id = data.user_id
			localStorage.setItem('jwt-token', token)
			localStorage.setItem('user', user_id)
			actions.login()	
			navigate("/role")

		} catch { (error) =>
			console.log(error)
			alert('Something went wrong :(')
		}
	}


  return (
    <>
	<Link to="/"><img id="menuQ" src={IMAGES.logoQ} /></Link>
	<form className="col-xl-6 mx-auto p-5 gap-4 card" onSubmit={handleSubmit}>
		<h1> Sign Up</h1>
		{/* demo message */}
        <h5>{TEXT.demoSignUp}</h5>
		{/* demo agree */}
		<div className="d-inline-flex flex-row gap-4">
			<input className="col-1" type="checkbox" value="" id="demoAgree" required />
			<label className="" for="demoAgree">
				<h5 className="text-start txt-red">{TEXT.demoAgree}</h5>
			</label>
		</div>
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