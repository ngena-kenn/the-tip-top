import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Acceuil from './pages/acceuil';

test('renders the main header', () => {
  render(<Acceuil />);
  const headerElement = screen.getByText(/tenter de gagnez un de ces lots/i);
  expect(headerElement).toBeInTheDocument();
});

test('renders the play button', () => {
  render(<Acceuil />);
  const playButton = screen.getByText(/cliquer ici pour Jouer/i);
  expect(playButton).toBeInTheDocument();
});

test('renders the newsletter form', () => {
  render(<Acceuil />);
  const emailInput = screen.getByPlaceholderText(/Votre email/i);
  expect(emailInput).toBeInTheDocument();
});
