import React, { useState, useEffect } from "react";
import { IMAGES } from "../../img/all_images";
import { TEXT } from "../../content_text/all_messages";


export const TutorialSlides = () => {
    const [isDesktop, setDesktop] = useState(window.innerWidth > 992);

    const updateMedia = () => {
        setDesktop(window.innerWidth > 992);
    };

    useEffect(() => {
        window.addEventListener("resize", updateMedia);
        return () => window.removeEventListener("resize", updateMedia);
    },[]);

	return (
        <>
        {isDesktop ? (
        <div className="d-flex justify-content-evenly align-items-center gap-5">
			<button className="card circle h-100" type="button" data-bs-target="#tutorial" data-bs-slide="prev">
				<i className="fa-solid fa-arrow-left" aria-hidden="true"/>
			</button>
			<div id="tutorial" className="col carousel slide card">
                <div className="carousel-inner p-5">
                    <div className="carousel-item active">
                        <div className="d-lg-flex flex-row justify-content-evenly align-items-center">
                            <h4>{TEXT.tutorial}</h4>
                            <img src={IMAGES.tutorial} />
                        </div>
                    </div>
                    {IMAGES.tutorialSlides.map((item, index) =>
                        <div className="carousel-item" key={index}>
                            <div className="d-lg-flex flex-row justify-content-evenly align-items-center">
                                <div className="col col-lg-5">
                                    <h2>{TEXT.tutorialTitles[index]}</h2><br/>
                                    <h4>{TEXT.tutorialSlides[index]}</h4>
                                </div>
                                <img src={item} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
			<button className="card circle h-100" type="button" data-bs-target="#tutorial" data-bs-slide="next">
				<i className="fa-solid fa-arrow-right" aria-hidden="true"/>
			</button>
		</div>
        ) : (
        <div id="tutorial" className="carousel slide card">
            <div className="carousel-inner p-3">
                <div className="carousel-item active">
                    <div className="d-flex flex-column gap-1 p-2">
                        <h4>{TEXT.tutorial}</h4>
                        <img className="img-fluid" src={IMAGES.tutorial} />
                    </div>
                </div>
                {IMAGES.tutorialSlides.map((item, index) =>
                    <div className="carousel-item" key={index}>
                        <div className="d-flex flex-column gap-1 p-2">
                            <h2>{TEXT.tutorialTitles[index]}</h2><br/>
                            <h4>{TEXT.tutorialSlides[index]}</h4>
                            <img className="img-fluid" src={item} />
                        </div>
                    </div>
                )}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#tutorial" data-bs-slide="prev" />
            <button className="carousel-control-next" type="button" data-bs-target="#tutorial" data-bs-slide="next" />
        </div>
        )}
        </>
	)
};
