import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
//import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import image1 from "../../assets/img/coffret-découverte-39€.jpg";
import image2 from "../../assets/img/coffret-découverte-69€.webp";
import image3 from "../../assets/img/infusion.webp";
import image4 from "../../assets/img/infuseur-nomade-the.jpg";




const FormAndPopin = () => {
    const [inputValue, setInputValue] = useState('');
    const [showPopin, setShowPopin] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    //const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    //const dispatch = useDispatch();
    const [userGain, setUserGain] = useState([]);

    const fetchUserGain = async () => {

        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API}/api/customer/participate/${inputValue}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            if (response.data.participate && response.data.participate.gain) {
                setUserGain(response.data);
                setErrorMessage(''); // Clear any previous error message
                setShowPopin(true);
            } else if (response.data.message) {
                setUserGain(null);
                setErrorMessage(response.data.message);
                setShowPopin(true);
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des gains :", error);
            setUserGain(null);
            setErrorMessage("Une erreur s'est produite lors de la récupération des données.");
        }

    };




    const handleChange = (event) => {
        const value = event.target.value;
        if (value.length <= 10) {
            setInputValue(value);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetchUserGain();

    };



    const handleClosePopin = () => {
        setShowPopin(false);
    };


    const handleRecuperation = () => {
        navigate("/admin/default");
    };
    const getImageForValue = (valeur) => {
        switch (valeur) {
            case '100g':
                return image3;
            case '39€':
                return image1;
            case '69€':
                return image2
            case null:
            default:
                return image4;
        }
    };

    return (
        <div className="gain-container">
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <label>
                        <input type="text" value={inputValue} onChange={handleChange} placeholder="*********" />
                    </label>
                    <button type="submit">SOUMETTRE</button>
                </form>
                <p className="label-condition">Entre le numéro a 10 chiffre qui se trouve sur ton numèro de caisse
                </p>
            </div>

            {userGain && showPopin && (
                <div className="popin">
                    <div className="popin-content">
                        <button className="close-button" onClick={handleClosePopin}>Fermer</button>
                        <div><p className="explosion-text">Félicitation tu a gagner un {userGain.participate.gain.TypeDeGain} </p>
                            <img src={getImageForValue(userGain.participate.gain.valeur)} alt="Sample" />
                            <button className='botton-popup' onClick={handleRecuperation}>Obtenir</button>
                        </div>
                    </div>
                </div>
            )}
            {errorMessage && showPopin && (
                <div className="popin">
                    <div className="popin-content">
                        <button className="close-button" onClick={handleClosePopin}>Fermer</button>
                        <div>
                            <p className="explosion-text">
                                {errorMessage}
                            </p>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default FormAndPopin;
