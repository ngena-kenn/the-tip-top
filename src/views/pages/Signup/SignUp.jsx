import React, { useState, useEffect } from "react";
import { BsPersonLock } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../../store/auth/authActions";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import inscription_pic from "../../../assets/img/connexion_pic.png";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: ["ROLE_CUSTOMER"],
    termsAccepted: false,
    participateInDraw: false,
    receiveEmails: false,
  });



  const firebaseConfig = {
    apiKey: "AIzaSyCr_DjAACMjmghyrJZylaUiP-kNf2MGXHE",
    authDomain: "react-auth-gc23.firebaseapp.com",
    projectId: "react-auth-gc23",
    storageBucket: "react-auth-gc23.appspot.com",
    messagingSenderId: "18201950530",
    appId: "1:18201950530:web:7ac75db4169f3ef291f0db"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);



  const handleGoogleSignup = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("user", user)

      // Créez l'objet utilisateur avec les valeurs correctes
      const userData = {
        firstName: user.displayName.split(' ')[0],
        lastName: user.displayName.split(' ')[1] || "",
        email: user.email,
        password: "Kenn.2002",  // Note: le mot de passe n'est généralement pas fourni par OAuth
        role: ["ROLE_CUSTOMER"],  // Ou tout autre rôle que vous souhaitez attribuer
      };

      dispatch(registerUser(userData));
    } catch (error) {
      console.error("Erreur lors de l'authentification Google :", error);
    }
  };


  const handleFacebookSignup = async () => {
    const auth = getAuth();
    const provider = new FacebookAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      dispatch(
        registerUser(
          user.displayName.split(" ")[0],  // firstName
          user.displayName.split(" ")[1],  // lastName
          user.email,
          "Kenn.2002",
          formValues.role,
        )
      );
      navigate("/connexion");
    } catch (error) {
      toast.error("Erreur lors de l'authentification Facebook : " + error.message);
    }
  };

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);


  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.checked,

    })
    setIsSubmitDisabled(!event.target.checked);
  };



  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/; // Regex pour la validation du mot de passe

    if (
      formValues.password === formValues.confirmPassword &&
      passwordRegex.test(formValues.password)
    ) {
      try {
        dispatch(
          registerUser(
            formValues.firstName,
            formValues.lastName,
            formValues.email,
            formValues.password,
            formValues.role,
            //formValues.participateInDraw
          )
        );
        console.log('bienvenue');
        toast.success("Merci pour votre inscription ! Vous pouvez maintenant vous connecter.");
        navigate("/connexion");

      } catch (error) { }
    } else {
      toast.error(
        "Erreur d'inscription. Veuillez vérifier vos informations. Le mot de passe doit contenir au moins une majuscule, un chiffre et avoir au moins 8 caractères.",
      );
    }
  };

  const handleNavigation = () => {
    navigate("/connexion");
  };

  return (<div className="signup-fond">
    <div className="sign_up">
      <Helmet>
        <title>Inscription - Gusto Coffee</title>
        <meta
          name="description"
          content="Inscrivez-vous chez Gusto Coffee pour accéder à nos services. Remplissez le formulaire avec votre prénom, nom, email et mot de passe. Acceptez les termes et conditions pour créer votre compte."
        />
      </Helmet>

      <form className="form_signup" onSubmit={handleFormSubmit}>
        <h2>Inscription</h2>
        <div className="sign_up_form">
          <label htmlFor="firstName" className="sign_up_form-label">
            Prénom
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formValues.firstName}
            onChange={handleChange}
            className="sign_up_form-input"
          />
        </div>

        <div className="sign_up_form">
          <label htmlFor="lastName" className="sign_up_form-label">
            Nom
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formValues.lastName}
            onChange={handleChange}
            className="sign_up_form-input"
          />
        </div>

        <div className="sign_up_form">
          <label htmlFor="email" className="sign_up_form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            className="sign_up_form-input"
          />
        </div>

        <div className="sign_up_form">
          <label htmlFor="password" className="sign_up_form-label">
            Mot de passe
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formValues.password}
            onChange={handleChange}
            className="sign_up_form-input"
          />
        </div>
        <div className="sign_up_form">
          <label htmlFor="confirmPassword" className="sign_up_form-label">
            Confirmer votre mot de passe
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formValues.confirmPassword}
            onChange={handleChange}
            className="sign_up_form-input"
          />
        </div>
        <div>
          <input
            type="checkbox"

            onChange={handleCheckboxChange}
            name="termsAccepted"
            checked={formValues.termsAccepted}
          />
          <label>En cochant cette case tu accepte termes et conditions</label>
        </div>
        <div>
          <input
            type="checkbox"
            onChange={handleCheckboxChange}
            name="participateInDraw"
            checked={formValues.participateInDraw}
          />
          <label>En cochant cette case tu accepte de participer au tirage au sort</label>
        </div>
        <div>
          <input
            type="checkbox"
            onChange={handleCheckboxChange}
            name="receiveEmails"
            checked={formValues.receiveEmails}

          />
          <label>En cochant cette case tu accepte de recevoir des mails de ThéTipTop</label>
        </div>
        <button
          type="submit"
          className="sign_up_form-submit"
          disabled={isSubmitDisabled}
        >
          S'inscrire
        </button>
        <div className="social-signup">
          <button onClick={handleGoogleSignup} className="google-button">
            S'inscrire avec Google
          </button>
          <button onClick={handleFacebookSignup} className="facebook-button">
            S'inscrire avec Facebook
          </button>
        </div>
      </form>
      <div className="sign_up_account">
        Déjà un compte ?
        <button onClick={handleNavigation} className="sign_up_account-btn">
          <BsPersonLock
            style={{ width: "30px", height: "auto", color: "#836349" }}
          />
        </button>
      </div>
    </div>
    <div className="sign_up_image">
      <div className="sign_up_image_container">
        <img
          src={inscription_pic}
          alt="sign_up_image"
          className="sign_up_image_img"
        />
      </div>
    </div></div>
  );
};

export default SignUp;
