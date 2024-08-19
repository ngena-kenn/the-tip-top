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
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function VerifyPassword() {
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API}/reset_password/${code}`, {
        password: password,
      })
      .then((response) => {
        if (response.status === 200) {
          navigate("/connexion");
          toast.success("Votre mot de passe a été réinitialisé avec succès !");
        }
        if (response.status === 400) {
          setError(response.data.error);
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
          Vérification du code
        </Typography>
        <form style={formStyle} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="code"
            label="Code reçu par e-mail"
            name="code"
            autoComplete="off"
            autoFocus
            required
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="password"
            label="Nouveau mot de passe"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className="uiColor"
            style={submitButtonStyle}
          >
            Vérifier le code
          </Button>
        </form>
        {error && (
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        )}
      </div>
    </Container>
  );
}

export default VerifyPassword;
