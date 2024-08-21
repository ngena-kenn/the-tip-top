import React from 'react';

import { Icon } from '@chakra-ui/react';
import {
  MdPerson,
  MdLocationOn,
  MdHistory,
  MdCardGiftcard,
  MdHome,
  MdOutlineShoppingCart,
} from 'react-icons/md';

import Gain from 'views/pages/Gain';
import MyAccount from 'views/pages/list_gain';
import Account from 'views/pages/profile';
import Address from 'views/pages/Address';
import AccueilAdmin from 'views/pagesAdmin/acceuil';
import ListUser from 'views/pagesAdmin/listUser';
import ListGain from 'views/pagesAdmin/listGain';
import NewGame from 'views/pagesAdmin/newGame';
import GenerateurCode from 'views/pagesAdmin/generateurCode';
import { selectIsAdmin } from "./views/store/auth/authReducer";
import { useSelector } from "react-redux";




const routeUser = [
  {
    name: 'gain',
    layout: '/admin',
    path: '/rtl-gain',
    icon: <Icon as={MdCardGiftcard} width="20px" height="20px" color="inherit" />,
    component: <Gain />,
  },
  {
    name: 'profile',
    layout: '/admin',
    path: '/rtl-default',
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
    component: <Account />,
  },
  {
    name: 'Historique de gains',
    layout: '/admin',
    path: '/default',
    icon: <Icon as={MdHistory} width="20px" height="20px" color="inherit" />,
    component: <MyAccount />,
  },
  {
    name: 'Adresse de livraison',
    layout: '/admin',
    path: '/profile',
    icon: <Icon as={MdLocationOn} width="20px" height="20px" color="inherit" />,
    component: <Address />,
  },
];

const routeAdmin = [
  {
    name: 'Paramètre',
    layout: '/admin',
    path: '/rtl-gain',
    icon: <Icon as={MdCardGiftcard} width="20px" height="20px" color="inherit" />,
    component: <AccueilAdmin />,
  },
  {
    name: 'profile',
    layout: '/admin',
    path: '/rtl-default',
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
    component: <ListGain />,
  },
  {
    name: 'Listes Users',
    layout: '/admin',
    path: '/default',
    icon: <Icon as={MdHistory} width="20px" height="20px" color="inherit" />,
    component: <ListUser />,
  },
  {
    name: 'New Game',
    layout: '/admin',
    path: '/new-game',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: <NewGame />,
  },
  {
    name: 'Guichet Code',
    layout: '/admin',
    path: '/new-code',
    icon: <Icon as={MdOutlineShoppingCart} width="20px" height="20px" color="inherit" />,
    component: <GenerateurCode />,
  },
];

const Routes = () => {
  const isAdmin = useSelector(selectIsAdmin);

  return isAdmin ? routeAdmin : routeUser;
};

export default Routes;
