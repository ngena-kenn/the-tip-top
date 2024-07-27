// Carousel.js
import React, { useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import image1 from '../assets/infuseur-a-the.jpg';
import image2 from '../assets/100g-thé-détox.png';
import image3 from '../assets/100g-thé-signature.webp';
import image4 from '../assets/coffret-découverte-39€.jpg';
import image5 from '../assets/coffret-découverte-69€.jpg';

const Carrousel = () => {
    return (
        <Carousel
            autoPlay
            interval={1000}
            infiniteLoop
            showIndicators={false}
            showStatus={false}
            showThumbs={false}
        >
            <div className="overlay">
                <img src={image1} alt="" />
            </div>
            <div className="overlay">
                <img src={image2} alt="" />
            </div>
            <div className="overlay">
                <img src={image3} alt="" />
            </div>
            <div className="overlay">
                <img src={image4} alt="" />
            </div>
            <div className="overlay">
                <img src={image5} alt="" />
            </div>
        </Carousel>
    )
};

export default Carrousel;
