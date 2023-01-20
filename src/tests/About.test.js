import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../pages/About';

describe('Teste do componente About', () => {
  it('Se a pagina contem um h2 com texto', () => {
    renderWithRouter(<About />);

    const getH2 = screen.getByRole('heading', {
      name: /about pokédex/i,
      level: 2,
    });
    expect(getH2).toBeInTheDocument();
  });

  it('Testa se a pagina contem 2 paragrafos', () => {
    renderWithRouter(<About />);

    const array = ['This application simulates a Pokédex, a digital encyclopedia containing all Pokémon',
      'One can filter Pokémon by type, and see more details for each one of them',
    ];
    expect(screen.getByText(array[0])).toBeInTheDocument();
    expect(screen.getByText(array[1])).toBeInTheDocument();
  });

  it('Testa de a pagina contem uma imagem', () => {
    renderWithRouter(<About />);

    const getImg = screen.getByRole('img', {
      name: /pokédex/i,
    });
    expect(getImg).toBeInTheDocument();
  });
});
