import React, { useContext, useEffect} from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";


export const Role = () => {
	const { store, actions } = useContext(Context);

	useEffect(() => {
		actions.getRoles()
		actions.getBackgroundColor("red")
	},[])

	return (
    <>
	<div className="col-lg-11 mx-auto d-flex flex-column align-items-center gap-5">
		<h1>Oh I'm definitely a </h1>
		<div className="d-flex flex-row gap-5">
		{store.roles.length > 0 && store.roles.map( role => (
			<div className="col d-flex flex-column gap-3 p-5 card" key={role.id}>
				<img className="col-6 mx-auto"
					src={actions.getRoleImage(role.id)}
					alt={role.name + " item"}
				/>
				<div className="col">
					<h3>{role.name}</h3>
					<p>{role.description}</p>
				</div>
					<Link to="/quests" type="button" className="btn bg-black txt-white"
						onClick={() => actions.userRole(role.id)}>
						<h5>Yes, let's go!</h5>
					</Link>
			</div>
		))}
		</div>
	</div>
    </>
	);
};