import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../pages/NotFound';

describe('Teste no componente NotFound', () => {
  it('Testar se a pagina contem um h2', () => {
    renderWithRouter(<NotFound />);

    const PageNotFound = screen.getByRole('heading', {
      name: /page requested not found/i,
    });
    expect(PageNotFound).toBeInTheDocument();
  });

  it('Testa se a pagina mostra a imagem', () => {
    renderWithRouter(<NotFound />)
    const getImage = screen.getByRole('img', {
      name: /pikachu crying because the page requested was not found/i,
    });
    expect(getImage).toBeInTheDocument();
    expect(getImage.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
