import axios from 'axios';
import { loginSuccess, logoutSuccess } from './authReducer';
import { toast } from 'react-toastify';

export const login = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API}/api/login`, { email, password });
    const token = response.data.token;
    const user_id = response.data.user_id;
    localStorage.setItem('token', token);
    localStorage.setItem('user_id', user_id);
    dispatch(loginSuccess(token));
    toast.success("Merci pour votre connexion ! Vous pouvez maintenant réserver.");
    dispatch(checkIsAuthenticated());
  } catch (error) {
    toast.error("Erreur lors de la connexion, veuillez vérifier vos identifiants.", {
      //position: toast.POSITION.TOP_CENTER
    });

    console.error('Erreur lors de la connexion :', error);
  }
};


export const registerUser = (prenom, nom, email, password, roles) => async (dispatch) => {
  try {
    await axios.post(`${process.env.REACT_APP_API}/api/register`, {
      email,
      roles,
      nom,
      prenom,
      password,
    });
    toast.success("Merci pour votre inscription ! Vous pouvez maintenant vous connecter.");
  } catch (error) {

  }
};

export const logoutAndClearStore = () => async (dispatch) => {
  try {

    dispatch(logoutSuccess());

    dispatch(setIsAuthenticated(false));
    toast.success("Vous avez été déconnecté avec succès.");
  } catch (error) {
    console.error('Erreur lors de la déconnexion :', error);
  }
};


export const logout = () => (dispatch) => {
  try {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    dispatch(logoutSuccess());

    dispatch(checkIsAuthenticated());
  } catch (error) {
    console.error('Erreur lors de la déconnexion :', error);
  }
};

export const checkIsAuthenticated = () => (dispatch) => {
  const isAuthenticated = !!localStorage.getItem('token');
  dispatch(setIsAuthenticated(isAuthenticated));
};

export const setIsAuthenticated = (isAuthenticated) => ({
  type: 'SET_IS_AUTHENTICATED',
  payload: isAuthenticated,
});
