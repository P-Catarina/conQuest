import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext"
import { Link } from "react-router-dom";
import { IMAGES } from "../../img/all_images";
import { TEXT } from "../../content_text/all_messages";


export const ProfileEdit = () => {
	const { store, actions } = useContext(Context);
	const [isButtonDisabled, setIsButtonDisabled] = useState(false)	

	useEffect(() => {
    actions.getUserDataAndAbilities()
	actions.getBackgroundColor("purple")
	const user = localStorage.getItem('user')
	user == 1? setIsButtonDisabled(true) : null
    },[]);	

	return (
		<>
		<form className="col-xl-10 mx-auto p-5 gap-4 card">
			<h1>How may I assist you oh powerful one?</h1>
            {/* username */}
			<div className="d-inline-flex flex-row justify-content-evenly p-2 card">
				<img src={IMAGES.user} alt="user icon" />
				<input type="text" name="name" placeholder={store.user.name} className="col-9"
                    value={store.inputs.name || ""} 
                    onChange={event => actions.getInput(event)}
					disabled={isButtonDisabled} />
			</div>
			{/* email */}
			<div className="d-inline-flex flex-row justify-content-evenly p-2 card">
				<img src={IMAGES.email} alt="email icon" />
				<input type="text" name="email" placeholder={store.user.email} className="col-9"
                    value={store.inputs.email || ""} 
                    onChange={event => actions.getInput(event)}
					disabled={isButtonDisabled}/>
			</div>
			{/* submit */}
			<button type="button" className="card p-3 text-center bg-yellow" onClick={actions.updateUser}
			disabled={isButtonDisabled}>
				<h5>Change</h5>
			</button>
			<div className="d-flex flex-row gap-4">
				{/* password */}
				<button type="button" className="card col p-3 text-center bg-green" data-bs-toggle="modal" data-bs-target="#changePassword"
				disabled={isButtonDisabled}>
					<h5>Change Password</h5>
				</button>
				{/* role */}
				<Link to="/role" type="button" className="card col p-3 text-center bg-purple text-light">
					<h5>Change Role</h5>
				</Link>
			</div>
            {/* cancel */}
            <Link to="/quests">
			<div type="reset" className="card p-3 text-center bg-black" onClick={actions.resetInput}>
				<h5>To Questing</h5>
			</div>
            </Link>
			{/* delete account */}
			<button type="button" className="card p-3 text-center bg-red text-light" data-bs-toggle="modal" data-bs-target="#accDelete"
			disabled={isButtonDisabled}>
				<h5>Leave campaign</h5>
			</button>
		</form>

		{/* change password modal */}
		<div className="modal fade" id="changePassword" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="card modal-content p-4">
                    {/* title */}
                    <h1>Change password</h1>                 
                    <div className="modal-body d-flex flex-column gap-4">
						{/* current password */}
						<div className="d-inline-flex flex-row justify-content-evenly p-2 card">
							<img src={IMAGES.password} alt="email icon" />
							<input type="password" id="password" name="currentPassword" placeholder="current password" className="col-7"
								value={store.inputs.currentPassword || ""} 
								onChange={event => actions.getInput(event)} />
							{/* see password */}
							<img src={IMAGES.see_password} alt="see password" onClick={actions.seePassword} />
						</div>
						{/* new password */}
						<div className="d-inline-flex flex-row justify-content-evenly p-2 card">
							<img src={IMAGES.password_confirm} alt="email icon" />
							<input type="password" id="confirmPassword" name="newPassword" placeholder="new password" className="col-7"
								value={store.inputs.newPassword || ""} 
								onChange={event => actions.getInput(event)} />
							{/* see password */}
							<img src={IMAGES.see_password} alt="see password" onClick={actions.seePassword} />
						</div>
                        {/* change password */}
							<div type="submit" className="card p-2 text-center bg-yellow" data-bs-dismiss="modal" onClick={actions.changePassword}>
								<h5>Change</h5>
							</div>
                        {/* cancel */}
                        <div type="reset" className="card p-2 text-center bg-black" data-bs-dismiss="modal">
                            <h5>Nevermind</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>

		{/* confirm delete account modal */}
		<div className="modal fade" id="accDelete" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="card modal-content p-4">
                    {/* title */}
                    <h1>{TEXT.deleteAccTitle}</h1>                 
                    <div className="modal-body d-flex flex-column gap-4">
						{/* image */} 
                        <img className="col-6 align-self-center" src={IMAGES.volcano} alt="mount doom" />
						{/* message */} 
						<div>
							<h5>{TEXT.deleteAccMessage}</h5>
						</div>                    
                        {/* delete */}
						<Link to="/" >
							<div type="submit" className="card p-2 text-center bg-yellow" data-bs-dismiss="modal" onClick={actions.deleteUser}>
								<h5>{TEXT.deleteAccConfirm}</h5>
							</div>
						</Link>
                        {/* cancel */}
                        <div type="reset" className="card p-2 text-center bg-black" data-bs-dismiss="modal">
                            <h5>{TEXT.deleteAccCancel}</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
		</>
	);
};