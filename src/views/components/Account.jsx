import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../store/profile/profileActions";
import { Button, TextField } from "@mui/material";
import { styled } from "@mui/system";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { logoutAndClearStore } from "../store/auth/authActions";
import { selectIsAdmin } from "../store/auth/authReducer";

const AccountContainer = styled("div")({

  "@media (min-width: 768px)": {
    width: "50%",
    margin: "0 auto",
  },
});




const AccountForm = styled("form")({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
});

const SubmitButton = styled(Button)({
  alignSelf: "flex-start",
});

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
    }
  }, [userProfile]);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedProfile = {
      nom: lastName,
      prenom: firstName,
      telephone: phone,
      email: email,
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
    <AccountContainer>
      <AccountForm onSubmit={handleSubmit}>
        <TextField
          label="Prénom"
          variant="outlined"
          fullWidth
          id="firstName"
          name="firstName"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
        />
        <TextField
          label="Nom"
          variant="outlined"
          fullWidth
          id="lastName"
          name="lastName"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <TextField
          label="Téléphone"
          variant="outlined"
          fullWidth
          id="phone"
          name="phone"
          type="tel"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
        />
        <SubmitButton variant="contained" color="primary" type="submit">
          Sauvegarder
        </SubmitButton>
        <Button variant="contained" color="error" onClick={handleDeleteAccount}>
          Supprimer mon compte
        </Button>
      </AccountForm>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </AccountContainer>
  );
};

export default Account;
