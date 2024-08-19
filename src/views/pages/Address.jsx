
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../store/profile/profileActions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";



const SignUp = () => {
    const dispatch = useDispatch();
    const userProfile = useSelector((state) => state.profile.userProfile);
    const [setIsProfileUpdated] = useState(false);

    useEffect(() => {
        dispatch(fetchUserProfile());
    }, [dispatch]);

    useEffect(() => {
        if (userProfile) {
            setAddress(userProfile.adresse || "");
            setCity(userProfile.ville || "");
            setCodePostal(userProfile.codePostal || "");
        }
    }, [userProfile]);

    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [codePostal, setCodePostal] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        const updatedProfile = {
            adresse: address,
            ville: city,
            codePostal: codePostal,
        };
        const userId = localStorage.getItem("id");

        axios
            .put(
                `${process.env.REACT_APP_API}/api/user/update_user_profil/${userId}`,
                updatedProfile,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            )
            .then((response) => {
                if (response.status === 200) {
                    setIsProfileUpdated(true);
                    toast.success("Profil mis à jour");
                } else {
                    toast.error("Erreur lors de la mise à jour du profil");
                }
            })
            .catch((error) => {
                console.error("Error updating profile:", error);
            });
    };




    return (<div className="profil-fond">
        <div className="profil_up">
            <form className="form_profilup" onSubmit={handleSubmit}>
                <h2>AJOUTER UNE ADDRESS DE LIVRAISON</h2>
                <div className="profil_up_form">
                    <label htmlFor="firstName" className="profil_up_form-label">
                        Adresse
                    </label>
                    <input
                        label="Adresse"
                        variant="outlined"
                        fullWidth
                        id="address"
                        name="address"
                        value={address}
                        onChange={(event) => setAddress(event.target.value)}
                    />
                </div>

                <div className="profil_up_form">
                    <label htmlFor="lastName" className="profil_up_form-label">
                        Ville
                    </label>
                    <input
                        label="Ville"
                        variant="outlined"
                        fullWidth
                        id="city"
                        name="city"
                        value={city}
                        onChange={(event) => setCity(event.target.value)}
                    />
                </div>

                <div className="profil_up_form">
                    <label htmlFor="email" className="profil_up_form-label">
                        Code Postal
                    </label>
                    <input
                        label="Code Postal"
                        variant="outlined"
                        fullWidth
                        id="codePostal"
                        name="codePostal"
                        value={codePostal}
                        onChange={(event) => setCodePostal(event.target.value)}
                    />
                </div>
                <button
                    type="submit"
                >
                    Sauvegarder
                </button>
            </form>
        </div></div>
    );
};

export default SignUp;
