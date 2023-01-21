import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste no componente Pokemon', () => {
  it('Teste se é renderizado um card com as informações de determinado Pokémon', () => {
    renderWithRouter(<App />);

    const getName = screen.getByTestId('pokemon-name');
    const getType = screen.getByTestId('pokemon-type');
    const getWeight = screen.getByTestId('pokemon-weight');
    const getImg = screen.getByRole('img', {
      name: /pikachu sprite/i,
    });

    expect(getName).toHaveTextContent('Pikachu');
    expect(getType).toHaveTextContent('Electric');
    expect(getWeight).toHaveTextContent('Average weight: 6.0 kg');
    expect(getImg.src).toBe('https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png');
    expect(getImg.alt).toBe('Pikachu sprite');
  });

  it('Se o card da Pokemon indicado na pokedex ao ser clicado tem um link de navegação ', () => {
    const { history } = renderWithRouter(<App />);

    const pokemonLink = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(pokemonLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemon/25');
  });
  it('Teste se existe um ícone de estrela nos Pokémon favoritados', () => {
    renderWithRouter(<App />);

    const linkAgain = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(linkAgain);

    const checkbox = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });
    userEvent.click(checkbox);

    const star = screen.getByAltText('Pikachu is marked as favorite');
    expect(star).toHaveAttribute('src', '/star-icon.svg');
  });
});
