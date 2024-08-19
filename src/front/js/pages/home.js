import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext"
import { IMAGES } from "../../img/all_images";
import { TEXT } from "../../content_text/all_messages";

import { ScrollTop } from "../component/scroll_top";
import { TutorialSlides } from "../component/tutorial_slides";


export const Home = () => {
    const { store, actions } = useContext(Context);
   
    useEffect(() => {
        actions.getBackgroundColor("none")
    },[]);
    
    return (
		<>
		<ScrollTop />
		{/* game screen */}
		<div id="start" className="home-screen bg-purple">
			<img className="img-fluid" src={IMAGES.logo} />
			<div className="col-10 col-lg-2 d-flex flex-column gap-3 bold">
				<a href="/signup" className="menu">Start</a>
				<a href="/login" className="menu">Continue</a>
				<a href="#about" className="menu">About</a>
				<a href="#howto" className="menu">How to Play</a>
				<a href="#credits" className="menu">Credits</a>
			</div>
			<h5 className="txt-white text-center">© 2024 ONLY MAMBO JAMBO LTD. ALL RIGHTS RESERVED.<br/> LICENSED BY DUNGEONS & DRAGUNS YEAH NOT REALLY INC.</h5>
		</div>
		<div className="home-transition one"></div>
		{/* about */}
		<div id="about" className="home-screen bg-red txt-white">
			<div className="d-lg-flex justify-content-lg-center gap-5">
				<img className="img-fluid" src={IMAGES.pc} />
				<h1 className="home-title">What about<br/>conQuest?</h1>
			</div>
			<h1>{TEXT.about[0]}<br/><br/>{TEXT.about[1]}</h1>
		</div>
		<div className="home-transition two"></div>
		{/* testimonials */}
		<div id="testimonials" className="bg-black p-1">
			<div className="t-scroll">
			{TEXT.testimonials.map((item, index) => index % 2 == 0? <p className="pe-3 bold">{item}</p> : <p className="pe-5">{item}</p>)}
			{TEXT.testimonials.map((item, index) => index % 2 == 0? <p className="pe-3 bold">{item}</p> : <p className="pe-5">{item}</p>)}
			</div>
		</div>
		<div className="home-transition three"></div>
		{/* how to play */}
		<div id="howto" className="home-screen bg-yellow">
			<h1 className="home-title">How to Play</h1>
			<TutorialSlides />
		</div>
		<div className="home-transition one"></div>
		{/* credits */}
		<div id="credits" className="home-screen bg-black">
			<h1 className="home-title">Credits</h1>
			<div className="d-lg-flex gap-5">
				{TEXT.devs.map((item, index) => <>
				<div className="col d-flex flex-column gap-4 text-center card bg-off">
					<img className="card circle bg-green mx-auto" src={IMAGES.devs[index]} />
					<div>
						<h3>{item["name"]}</h3>
						<p>{item["title"]}</p>
					</div>					
					<p>{item["intro"]}</p>
					<div className="d-flex justify-content-center gap-3">
						<a href={item["github"]} target="_blank" className="card circle"><i className="fa-brands fa-github"></i></a>
						<a href={item["linkedin"]} target="_blank" className="card circle"><i className="fa-brands fa-linkedin-in"></i></a>
					</div>
				</div></>)}
			</div>
			<div className="card bg-off">
				<a href="https://4geeksacademy.com" target="_blank" className="txt-white"><h3>4Geeks Academy</h3></a>
				<p>{TEXT.geeks}</p>
			</div>
			<div className="card bg-off">
				<a href="https://www.freepik.com" target="_blank" className="txt-white"><h3>Freepik</h3></a>
				<p>{TEXT.freepik}</p>
			</div>
		</div>
		</>
	);
};