import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../store/profile/profileActions";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { logoutAndClearStore } from "../store/auth/authActions";
import { selectIsAdmin } from "../store/auth/authReducer";


const Account = () => {
    const dispatch = useDispatch();
    const userProfile = useSelector((state) => state.profile.userProfile);
    const [isProfileUpdated, setIsProfileUpdated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchUserProfile());
    }, [dispatch]);

    useEffect(() => {
        if (userProfile) {
            setFirstName(userProfile.prenom || "");
            setLastName(userProfile.nom || "");
            setEmail(userProfile.email || "");
            setPhone(userProfile.telephone || "");
            setAddress(userProfile.adresse || "");
            setCity(userProfile.ville || "");
            setCodePostal(userProfile.codePostal || "");
        }
    }, [userProfile]);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [codePostal, setCodePostal] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        const updatedProfile = {
            nom: lastName,
            prenom: firstName,
            telephone: phone,
            email: email,
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

    const handleDeleteAccount = () => {
        const userId = localStorage.getItem("id");

        axios
            .delete(
                `${process.env.REACT_APP_API}/api/user/delete_user_account/${userId}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            )
            .then((response) => {
                if (response.status === 200) {
                    dispatch(logoutAndClearStore());
                    navigate("/");
                } else {
                    toast.error("Erreur lors de la suppression du compte");
                }
            })
            .catch((error) => {
                console.error("Error deleting account:", error);
            });
    };
    const isAdmin = useSelector(selectIsAdmin);

    return (

        <div className="profil-fond">
            <div className="profil_up">
                <div>
                    <h2>COMPTE</h2>
                    {isAdmin && (
                        <button
                            variant="contained"
                            color="primary"
                            onClick={() => navigate("/admin")}
                        >
                            Accéder à l'interface admin
                        </button>
                    )}
                    <div>
                        <div alt={`${firstName}`} src="ras" />
                        <div>
                            <h5>{`${firstName} ${lastName}`}</h5>
                            <p>{email}</p>
                        </div>
                    </div>
                    <form className="form_profilup" onSubmit={handleSubmit}>
                        <div className="profil_up_form">
                            <label htmlFor="firstName" className="profil_up_form-label">
                                Prénom
                            </label>
                            <input
                                label="Prénom"
                                variant="outlined"
                                fullWidth
                                id="firstName"
                                name="firstName"
                                value={firstName}
                                onChange={(event) => setFirstName(event.target.value)}
                            /></div>
                        <div className="profil_up_form">
                            <label htmlFor="lastName" className="profil_up_form-label">
                                Nom
                            </label>
                            <input
                                label="Nom"
                                variant="outlined"
                                fullWidth
                                id="lastName"
                                name="lastName"
                                value={lastName}
                                onChange={(event) => setLastName(event.target.value)}
                            /></div>
                        <div className="profil_up_form">
                            <label htmlFor="email" className="profil_up_form-label">
                                Email
                            </label>
                            <input
                                label="Email"
                                variant="outlined"
                                fullWidth
                                id="email"
                                name="email"
                                type="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            /></div>
                        <div className="profil_up_form">
                            <label htmlFor="phone" className="profil_up_form-label">
                                Téléphone
                            </label>
                            <input
                                label="Téléphone"
                                variant="outlined"
                                fullWidth
                                id="phone"
                                name="phone"
                                type="tel"
                                value={phone}
                                onChange={(event) => setPhone(event.target.value)}
                            /></div>
                        <button variant="contained" color="primary" type="submit">
                            SAUVEGERDER
                        </button>
                        <button variant="contained" color="error" onClick={handleDeleteAccount}>
                            SUPPRIMER MON COMPTE
                        </button>
                    </form>
                    <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
                </div>
            </div></div>

    );
};

export default Account;
