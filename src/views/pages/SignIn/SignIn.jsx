import React, { useState, useEffect } from "react";
import connexion_pic from "../../../assets/img/accueil.png";
import { BsPersonPlus } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/auth/authActions";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const sendForm = (e) => {
    e.preventDefault();
    dispatch(login(formValues.email, formValues.password));
  };

  const handleNavigation = () => {
    navigate("/inscription");
  };


  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin/rtl-gain");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="sign_in">
      <Helmet>
        <title>Connexion - Gusto Coffee</title>
        <meta
          name="description"
          content="Connectez-vous à votre compte Gusto Coffee pour accéder à nos services. Entrez votre email et votre mot de passe pour vous connecter."
        />
      </Helmet>
      <div className="sign_in_image">
        <div className="sign_in_image_container">
          <img
            src={connexion_pic}
            alt="sign_in_image"
            className="sign_in_image_img"
          />
        </div>
      </div>
      <form className="form_signin">
        <h2 className="sign_in_title">Connexion</h2>
        <div className="sign_in_form_email">
          <label htmlFor="email" className="sign_in_form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            placeholder="example@gmail.com"
            className="sign_in_form-input"
          />
        </div>

        <div className="sign_in_form_password">
          <label htmlFor="password" className="sign_in_form-label">
            Mot de passe
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formValues.password}
            onChange={handleChange}
            placeholder="Mot de passe"
            className="sign_in_form-input"
          />
        </div>

        <button
          type="submit"
          className="sign_in_form-submit"
          onClick={sendForm}
        >
          CONNECTE TOI ET PARTICIPE
        </button>
        <Link
          to="/reset-password"
          className="forgot_password_link"
          style={{ textDecoration: "none", color: "black" }}
        >
          Mot de passe oublié ?
        </Link>
        <div className="sign_up_account">
          Pas de compte ?
          <button onClick={handleNavigation} className="sign_up_account-btn">
            <BsPersonPlus
              style={{ width: "30px", height: "auto", color: "#836349" }}
            />
          </button>
        </div>
      </form>

    </div>
  );
};

export default SignIn;
