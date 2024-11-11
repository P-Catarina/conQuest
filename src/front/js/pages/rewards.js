import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext"

import { LoadingFallback } from "../component/fallback_loading";

import { Navbar } from "../component/dashboard_navbar";
import { DashCard } from "../component/dashboard_card";
import { AddEditModal } from "../component/modal_add_edit_dashboard";


export const Rewards = () => {
    const { store, actions } = useContext(Context);
   
	useEffect(() => {
        actions.getRewardList()
		actions.getBackgroundColor("yellow")
    },[]);

    let view = "rewards"
	let idCreateModal = "createReward"
    
    return (
		<>
		{/* navigation */}
        <Navbar
			view={view}
			modal={`#${idCreateModal}`}
		/>
		<div className="dashboard card col p-lg-5 p-3">
			{/* loading / empty */
			store.loadingRewards === true && store.rewards.length === 0
			? <LoadingFallback />
			: <h5>{store.loadingRewards}</h5>
			/* list */}
			<div className="row row-cols-1 row-cols-md-4 g-4">
				{store.rewards?.sort((a,b) => a.id - b.id).map((item,index)=>(
					<DashCard key={index}
						id={item.id}
						view={view}
						label={item.label}
						tier={item.rarity_id}
						modal={`#${item.id}`}
					/>
				))}
			</div>
		</div>
		{/* create reward */}
		<AddEditModal
			id={idCreateModal}
			view={view}
			label="New Reward"
			tier={store.rarities}
		/>
		{/* edit reward */}
		{store.rewards?.map((item,index)=>(
		<AddEditModal key={index}
			id={item.id}
			view={view}
			label="Edit Reward"
			tier={store.rarities}
		/>
		))}
		</>
	);
};
