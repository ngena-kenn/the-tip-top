import React, { useEffect } from 'react';
import log from 'loglevel';
import Carrousel from '../components/carrousel';
import { useNavigate } from "react-router-dom";


const Acceuil = () => {

  const navigate = useNavigate();

  useEffect(() => {
    log.setLevel('info');
    log.info('Acceuil component mounted');
  }, []);

  const handlePlayButtonClick = () => {
    log.info('Play button clicked');
    navigate("/connexion");
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    log.info('Newsletter form submitted');
  };


  return (
    <div className="background-image">
      <div className="App">
        <Carrousel />
      </div>
      <div className="button-container">
        <button className="play-button" onClick={handlePlayButtonClick}>CLIQUE ICI POUR JOUER</button>
      </div>
    </div>
  );
};

export default Acceuil;

