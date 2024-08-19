import React from "react";
import { IMAGES } from "../../img/all_images";

export const ScrollTop = () => {

const scroll = document.getElementById("scrollQ");

    window.onscroll = function() {scrollTop()};

    const scrollTop = () => {
    if (document.body.scrollTop > 600 || document.documentElement.scrollTop > 600) scroll.style.display = "block"
    else scroll.style.display = "none";
    }

	return (
        <>
        <a id="scrollQ" href="#start">
			<img src={IMAGES.logoQ} />
		</a>
        </>
	)
};
