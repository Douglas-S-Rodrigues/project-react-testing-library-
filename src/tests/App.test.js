import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa o App', () => {
  it('Deveria exibir Home, About e Favorite Pokemon', () => {
    const memoryHistory = renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: /Home/i });
    userEvent.click(home);
    expect(memoryHistory.location.pathname).toBe('/');
    expect(home).toBeInTheDocument();

    const about = screen.getByRole('link', { name: /About/i });
    userEvent.click(about);
    expect(memoryHistory.location.pathname).toBe('/about');
    expect(about).toBeInTheDocument();

    const favorites = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(favorites);
    expect(memoryHistory.location.pathname).toBe('/favorites');
    expect(favorites).toBeInTheDocument();
  });
  it('deve exibir pag notFond', () => {
    const memoryHistory = renderWithRouter(<App />);
    memoryHistory.push('/qualquercoisa');
    const notFound = screen.getByRole('heading', { level: 2,
      name: /Page requested not found/i });
    expect(notFound).toBeInTheDocument();
  });
});
