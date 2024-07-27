import React, { useEffect } from 'react';
import log from 'loglevel';
import Carrousel from '../components/carrousel';


const Acceuil = () => {

  useEffect(() => {
    log.setLevel('info');
    log.info('Acceuil component mounted');
  }, []);

  const handlePlayButtonClick = () => {
    log.info('Play button clicked');
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    log.info('Newsletter form submitted');
  };


  return (
    <div className="background-image">
      <div className="App">
        <h1>tenter de gagnez un de ces lots
        </h1>
        <Carrousel />
      </div>
      <div className="button-container">
        <button className="play-button" onClick={handlePlayButtonClick}>cliquer ici pour Jouer</button>
      </div>
      <div className="newsletter-form">
        <form onSubmit={handleNewsletterSubmit}>
          <label htmlFor="email">Inscrivez-vous à notre newsletter :</label>
          <input type="email" id="email" name="email" placeholder="Votre email" />
          <button type="submit">S'inscrire</button>
        </form>
      </div>
    </div>
  );
};

export default Acceuil;

