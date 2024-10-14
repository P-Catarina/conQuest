import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";

import { LoadingFallback } from "../component/fallback_loading";

import { Navbar } from "../component/dashboard_navbar";
import { DashCard } from "../component/dashboard_card";
import { AddEditModal } from "../component/modal_add_edit_dashboard";


export const Quests = () => {
	const { store, actions } = useContext(Context)

	useEffect(() => {
        actions.getTaskList()
		actions.getBackgroundColor("yellow")
    },[]);

    let view = "tasks"
	let idCreateModal = "createTask"

    return (
		<>
		{/* navigation */}
        <Navbar
			view={view}
			modal={`#${idCreateModal}`}
		/>
		<div className="dashboard card col p-lg-5 p-3">
			{/* loading / empty */
			store.loadingQuests === true && store.tasks.length === 0
			? <LoadingFallback />
			: <h5>{store.loadingQuests}</h5>
			/* list */}
			<div className="row row-cols-1 row-cols-md-4 g-4">
				{store.tasks?.map((item,index)=>(
					<DashCard key={index}
						id={item.id}
						view={view}
						label={item.label}
						tier={item.task_difficulty_id}
						modal={`#${item.id}`}
						done={item.done}
					/>
				))}
			</div>
		</div>
		{/* create quest */}
		<AddEditModal
			id={idCreateModal}
			view={view}
			label="New Quest"
			tier={store.difficulties}
		/>
		{/* edit quest */}
		{store.tasks?.map((item,index)=>(
		<AddEditModal key={index}
			id={item.id}
			view={view}
			label="Edit Quest"
			tier={store.difficulties}
		/>
		))}
		</>
	);
};