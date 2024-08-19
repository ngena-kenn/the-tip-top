import React, { useState } from "react";
import {
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
  Avatar,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${process.env.REACT_APP_API}/forgot-password`, {
        email,
      })
      .then((response) => {
        if (response.status === 200) {
          toast.success("Un e-mail vous a été envoyé !");
          navigate("/reset-password/verify");
        } else {
          setMessage(response.data.error);
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la requête API :", error);
      });
  };

  const avatarStyle = {
    backgroundColor: "white",
    margin: "auto",
    marginTop: "50px",
  };

  const typographyStyle = {
    textAlign: "center",
    marginTop: "10px",
  };

  const formStyle = {
    width: "100%",
    marginTop: "8px",
  };

  const submitButtonStyle = {
    marginTop: "16px",
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div style={avatarStyle}>
        <Avatar>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" style={typographyStyle}>
          Réinitialisation de mot de passe
        </Typography>
        <form style={formStyle} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            label="Adresse e-mail"
            name="email"
            autoComplete="email"
            autoFocus
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            className="uiColor"
            type="submit"
            fullWidth
            variant="contained"
            style={submitButtonStyle}
          >
            Envoyer
          </Button>
        </form>
        <Typography variant="body2" color="error">
          {message}
        </Typography>
      </div>
    </Container>
  );
}

export default ResetPassword;
