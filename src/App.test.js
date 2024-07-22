
import App from './App.js';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';


test('renders SumComponent and calculates sum correctly', () => {
  render(<App />);

  const input1 = screen.getByPlaceholderText('Premier entier');
  const input2 = screen.getByPlaceholderText('Deuxième entier');
  const button = screen.getByText('Calculer');

  // Vérifiez que les entrées et le bouton sont rendus
  expect(input1).toBeInTheDocument();
  expect(input2).toBeInTheDocument();
  expect(button).toBeInTheDocument();

  // Simulez la saisie des valeurs dans les champs de texte
  fireEvent.change(input1, { target: { value: '5' } });
  fireEvent.change(input2, { target: { value: '3' } });

  // Cliquez sur le bouton pour calculer la somme
  fireEvent.click(button);

  // Vérifiez que le résultat est affiché correctement
  const result = screen.getByText('La somme est : 8');
  expect(result).toBeInTheDocument();
});
