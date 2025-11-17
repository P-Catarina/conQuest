import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext"
import { Link, useNavigate } from "react-router-dom";
import { IMAGES } from "../../img/all_images";
import { TEXT } from "../../content_text/all_messages";


export const Login = () => {
	const { store, actions } = useContext(Context)
	const navigate = useNavigate()

	useEffect(() => {
		actions.getBackgroundColor("green")
    },[]);

	const handleSubmit = async (event) => {
		event.preventDefault()
		const user = {
			"email": store.inputs.email,
			"password": store.inputs.password
		}
		try {
			const response = await fetch(process.env.BACKEND_URL + "api/login", {
								method: "POST",
								body: JSON.stringify(user),
								headers: {"Content-Type": "application/json"}
			})		
			if (!response.ok) {const data = await response.json()}
			const data = await response.json()
			const token = data.token
			const user_id = data.user_id
			const userLevel = data.level
			localStorage.setItem('jwt-token', token)
			localStorage.setItem('user', user_id)
			localStorage.setItem('userLevel', userLevel)
			await actions.getUserDataAndAbilities()
			await actions.getQuestList()
			await actions.getRewardList()
			navigate("/quests")
		} catch { (error) =>
			console.log(error)
		}
	}

	const demoLogin = async () => {
		try {
			const response = await fetch(process.env.BACKEND_URL + "api/demo", {
								method: "GET",
								headers: {"Content-Type": "application/json"}
			})		
			if (!response.ok) {const data = await response.json()}
			const data = await response.json()
			const token = data.token
			const user_id = data.user_id
			const userLevel = data.level
			localStorage.setItem('jwt-token', token)
			localStorage.setItem('user', user_id)
			localStorage.setItem('userLevel', userLevel)
			await actions.getUserDataAndAbilities()
			await actions.getQuestList()
			await actions.getRewardList()
			await actions.resetInput()
			navigate("/quests")
		} catch { (error) =>
			console.log(error)
		}
	}

	return (
		<>
		<form className="col-xl-6 mx-auto p-5 gap-4 card" onSubmit={handleSubmit}>
			<h1>Log in</h1>
			{/* demo */}
			<button type="reset" className="card p-3 text-center bg-yellow" onClick={demoLogin}>
                <h5>Free entry</h5>
            </button>
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
			<button type="submit" className="card p-3 text-center bg-yellow">
				<h5>Let's go!</h5>
			</button>
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