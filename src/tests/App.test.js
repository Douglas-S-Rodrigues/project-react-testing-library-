import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa o App', () => {
  it('Dever testar se exibi Home.', () => {
    const { memoryHistory } = renderWithRouter(<App />);

    const home = screen.getByRole('link', { name: /Home/i });
    userEvent.click(home);
    const { location: { pathname } } = memoryHistory;
    expect(pathname).toBe('/');
  });
  it('deve testar o link About', () => {
    const { memoryHistory } = renderWithRouter(<App />);

    const about = screen.getByRole('link', { name: /About/i });
    userEvent.click(about);
    const { location: { pathname } } = memoryHistory;
    expect(pathname).toBe('/about');
  });
  it('deve testar o link Favorites"', () => {
    const { memoryHistory } = renderWithRouter(<App />);

    const favorites = screen.getByRole('link', { name: /Favorite Pokémons/i });
    userEvent.click(favorites);
    const { location: { pathname } } = memoryHistory;
    expect(pathname).toBe('/favorites');
  });
  it('deve testar se o link estiver errado é levado ao NotFound', () => {
    const { memoryHistory } = renderWithRouter(<App />);

    memoryHistory.push('/paginanãoexistente');
    const notFound = screen.getByRole('heading', { level: 2,
      name: /Page requested not found/i });
    expect(notFound).toBeInTheDocument();
  });
});
