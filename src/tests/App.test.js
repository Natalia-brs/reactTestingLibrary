import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Realizando testes no componente App.js', () => {
  it('Aplicação contem um conjunto de links fixos', () => {
    renderWithRouter(<App />);

    const linkHome = screen.getByRole('link', {
      name: /home/i,
    });
    expect(linkHome).toBeInTheDocument();

    const linkAbout = screen.getByRole('link', {
      name: /about/i,
    });
    expect(linkAbout).toBeInTheDocument();

    const linkFavorite = screen.getByRole('link', {
      name: /favorite Pokémon/i,
    });
    expect(linkFavorite).toBeInTheDocument();
  });

  it('Ao clicar no link home é redicerionado para a pagina Home', () => {
    const { history } = renderWithRouter(<App />);

    const linkHome = screen.getByRole('link', {
      name: /home/i,
    });
    expect(linkHome).toBeInTheDocument();
    userEvent.click(linkHome);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Ao clicar é redirecionado a pagina Favorite Pokemon', () => {
    const { history } = renderWithRouter(<App />);

    const linkFavorite = screen.getByRole('link', {
      name: /favorite Pokémon/i,
    });

    expect(linkFavorite).toBeInTheDocument();
    userEvent.click(linkFavorite);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('Ao clicar é redirecionado a pagina About', () => {
    const { history } = renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', {
      name: /about/i,
    });
    expect(linkAbout).toBeInTheDocument();
    userEvent.click(linkAbout);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('Rota inexistente usuario é direcionado para a pagina Not Found', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/pagina/nao-existe');
    });

    const notFound = screen.getByRole('heading', {
      name: /Page requested not found/i,
      level: 2,
    });
    expect(notFound).toBeInTheDocument();
  });
});
