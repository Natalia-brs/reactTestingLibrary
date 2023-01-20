import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente Pokedex', () => {
  it('Teste se a pagina contem um h2', () => {
    renderWithRouter(<App />);
    const getHeading = screen.getByRole('heading', {
      name: /encountered pokémon/i,
      level: 2,
    });
    expect(getHeading).toBeInTheDocument();
  });

  it('Teste se e exibido o proximo pokemon ao clicar no botão', () => {
    renderWithRouter(<App />);
    const getButton = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    userEvent.click(getButton);
    const pokemon = screen.getByText(/charmander/i);
    expect(pokemon).toBeInTheDocument();
  });

  it('testes nos botões de filtro', () => {
    renderWithRouter(<App />);
    const buttonArray = screen.queryAllByTestId('pokemon-type-button');
    const Allbutton = screen.getByRole('button', {
      name: /all/i,
    });
    expect(buttonArray).toHaveLength(7);
    expect(Allbutton).toBeInTheDocument();
  });

  it('teste do botão all', () => {
    renderWithRouter(<App />);

    const Allbutton = screen.getByRole('button', {
      name: /all/i,
    });
    expect(Allbutton).toBeInTheDocument();

    const bugButton = screen.getByRole('button', {
      name: /bug/i,
    });
    userEvent.click(bugButton);

    const caterpie = screen.getByText(/caterpie/i);
    expect(caterpie).toBeInTheDocument();

    userEvent.click(Allbutton);

    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });
});
