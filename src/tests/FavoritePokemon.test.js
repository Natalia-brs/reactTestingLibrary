import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemon } from '../pages';

import App from '../App';

describe('Teste no componente Favorite Pokemon', () => {
  it('Se a é exibida na tela a mensagem No favorite pokemon found', () => {
    renderWithRouter(<FavoritePokemon />);

    const NoFavorite = screen.getByText(/no favorite pokémon found/i);
    expect(NoFavorite).toBeInTheDocument();
  });

  it('Testa se são exibidos Pokemons favoritados', () => {
    renderWithRouter(<App />);

    const details = screen.getByText(/more details/i);
    userEvent.click(details);

    const check = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });
    userEvent.click(check);

    const fav = screen.getByRole('link', {
      name: /favorite pokémon/i,
    });
    userEvent.click(fav);

    const marked = screen.getByRole('img', {
      name: /pikachu is marked as favorite/i,
    });
    expect(marked).toBeInTheDocument();
  });
});
