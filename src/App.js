import './assets/css/App.css';
import './assets/css/acceuil.scss';
import './assets/css/SignIn.css';
import './assets/css/SignUp.css';
import { Routes, Route } from 'react-router-dom';
import { } from 'react-router-dom';
import AuthLayout from './layouts/auth';
import AdminLayout from './layouts/admin';
import RTLLayout from './layouts/rtl';
import SignIn from 'views/pages/SignIn/SignIn';
import SignUp from 'views/pages/Signup/SignUp';
import ResetPassword from 'views/pages/ResetPassword/ResetPassword';
import VerifyPassword from 'views/pages/ResetPassword/VerifyPassword';
import {
  ChakraProvider,
  // extendTheme
} from '@chakra-ui/react';
import initialTheme from './theme/theme'; //  { themeGreen }
import { useState } from 'react';
// Chakra imports

export default function Main() {
  // eslint-disable-next-line
  const [currentTheme, setCurrentTheme] = useState(initialTheme);
  return (
    <ChakraProvider theme={currentTheme}>
      <Routes>
        <Route path="auth/*" element={<AuthLayout />} />
        <Route
          path="admin/*"
          element={
            <AdminLayout theme={currentTheme} setTheme={setCurrentTheme} />
          }
        />
        <Route
          path="rtl/*"
          element={
            <RTLLayout theme={currentTheme} setTheme={setCurrentTheme} />
          }
        />

        <Route path="/" element={<SignIn />} />
        <Route path="/inscription" element={<SignUp />} />
        <Route path="/connexion" element={<SignIn />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/reset-password/verify" element={<VerifyPassword />} />

      </Routes>
    </ChakraProvider>
  );
}

// <Route path="/" element={<Navigate to="/admin" replace />} />