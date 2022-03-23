import { render, screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('testes para FavoritePokemons', () => {
  it('deve testar se é exibido na tela a mensagem No favorite pokemon found', () => {
    render(<FavoritePokemons />);

    const favorite = screen.getByText('No favorite pokemon found');
    expect(favorite).toBeInTheDocument();
  });

  it('deve testar se é exibido todos os cards de pokémons favoritados', () => {
    renderWithRouter(<App />);

    const pokeDetails = screen.getByRole('link', { name: /More details/i });
    userEvent.click(pokeDetails);

    const pokeFavoriteCheck = screen
      .getByRole('checkbox', { name: /Pokémon favoritado/i });
    userEvent.click(pokeFavoriteCheck);

    const pokeFavorite = screen.getByRole('link', { name: /Favorite Pokémons/i });
    userEvent.click(pokeFavorite);
  });
});
