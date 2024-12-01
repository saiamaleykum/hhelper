import React from "react";
import Lottie from "lottie-react";
import animationPopular from "./animations/popular.json";
import animationSearch from "./animations/search1.json";
import animationSaved from "./animations/saved.json";
import animationProfile from "./animations/profileIndividual.json";


const animations = {
    Popular: animationPopular,
    Search: animationSearch,
    Saved: animationSaved,
    Profile: animationProfile,
};


export const animationIcons = (lottieRef) =>
    Object.entries(animations).reduce((acc, [key, animationData]) => {
        acc[key] = (
            <Lottie
                lottieRef={lottieRef}
                animationData={animationData}
                loop={false}
                autoplay={false}
            />
        );
        return acc;
    }, {});

