// Carousel.js
import React, { useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import image1 from '../assets/infuseur-nomade-the.jpg';
import image2 from '../assets/infusion.webp';
import image3 from '../assets/thé-détox-d’infusion.jpg';
import image4 from '../assets/coffret-découverte-39€.jpg';
import image5 from '../assets/coffret-découverte-69€.webp';

const Carrousel = () => {
    return (
        <Carousel
            autoPlay
            interval={1000}
            infiniteLoop
            showIndicators={false}
            showStatus={false}
            showThumbs={false}
            showArrows={false}
        >
            <div className="overlay">
                <h1>INFUSEUR A THE</h1>
                <img src={image1} alt="" />
            </div>
            <div className="overlay">
                <h1>THE SIGNATURE</h1>
                <img src={image2} alt="" />
            </div>
            <div className="overlay">
                <h1>THE DETOX OU D’INFUSION</h1>
                <img src={image3} alt="" />
            </div>
            <div className="overlay">
                <h1>COFFRET DECOUVERTE D’UNE VALEUR DE 39€</h1>
                <img src={image4} alt="" />
            </div>
            <div className="overlay">
                <h1>COFFRET DECOUVERTE D’UNE VALEUR DE 69€</h1>
                <img src={image5} alt="" />
            </div>
        </Carousel>
    )
};

export default Carrousel;
