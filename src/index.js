
import './assets/css/App.css';


import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { Provider } from 'react-redux';
import authReducer from './views/store/auth/authReducer';
import profileReducer from './views/store/profile/profileReducer';
import { configureStore } from '@reduxjs/toolkit';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const root = ReactDOM.createRoot(document.getElementById('root'));

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
  },
});
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
    <ToastContainer />
  </Provider>
);

serviceWorkerRegistration.register();
