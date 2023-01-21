import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste no componente PokemonDetails', () => {
  it('Informações do Pokemon selecionado são mostradas na tela', () => {
    renderWithRouter(<App />);

    const details = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(details);

    const heading = screen.getByRole('heading', {
      name: /pikachu details/i,
      level: 2,
    });
    expect(heading).toBeInTheDocument();

    const link = screen.queryByRole('link', {
      name: /pikachu details/i,
    });
    expect(link).not.toBeInTheDocument();

    const summary = screen.getByRole('heading', {
      name: /summary/i,
      level: 2,
    });
    expect(summary).toBeInTheDocument();

    const paragraph = screen.getByText(
      /this intelligent pokémon roasts hard berries with electricity to make them tender enough to eat\./i,
    );
    expect(paragraph).toBeInTheDocument();
  });

  it('Seção para os mapas contendo a localização do Pokemon', () => {
    renderWithRouter(<App />);
    const details = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(details);

    const locations = screen.getByRole('heading', {
      name: /game locations of pikachu/i,
    });
    expect(locations).toBeInTheDocument();

    const places = ['Kanto Viridian Forest', 'Kanto Power Plant'];
    expect(screen.getByText(places[0])).toBeInTheDocument();
    expect(screen.getByText(places[1])).toBeInTheDocument();

    const getAlt = screen.queryAllByAltText('Pikachu location');
    expect(getAlt).toHaveLength(2);

    const imgURL = ['https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png',
      'https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png'];

    expect(getAlt[0].src).toBe(imgURL[0]);
    expect(getAlt[1].src).toBe(imgURL[1]);
  });

  it('Se o usuario pode favoritar atraves da pagina de detalhes', () => {
    renderWithRouter(<App />);

    const details = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(details);

    const favorite = screen.getByLabelText(
      /pokémon favoritado\?/i,
    );
    expect(favorite).toBeInTheDocument();
    expect(favorite.checked).toBe(false);
    userEvent.click(favorite);
    expect(favorite.checked).toBe(true);
    userEvent.click(favorite);
    expect(favorite.checked).toBe(false);
  });
});
