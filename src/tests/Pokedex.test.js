import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('testes para o component pokedex', () => {
  it('deve testar se contem heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const text = screen.getByRole('heading', { level: 2, name: /Encountered pokémons/i });
    expect(text).toBeInTheDocument();
  });

  it(`deve testar se é exibido o próximo Pokémon da lista
   quando o botão Próximo pokémon é clicado`, () => {
    renderWithRouter(<App />);

    const firstPokemon = screen.getByText('Pikachu');

    expect(firstPokemon).toBeInTheDocument();

    const nextPokemon = screen.getByRole('button', {
      name: 'Próximo pokémon',
    });

    userEvent.click(nextPokemon);

    const secondPokemon = screen.getByText('Charmander');
    expect(secondPokemon).toBeInTheDocument();
  });

  it('deve testar se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);

    const details = screen.getAllByRole('link', { name: /More Details/i });

    expect(details.length).toBe(1);
  });

  it('deve testar se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);

    const pokesLength = 7;

    const filter = screen.getAllByTestId('pokemon-type-button');
    expect(filter).toHaveLength(pokesLength);

    const All = screen.getByRole('button', { name: /All/i });
    expect(All).toBeInTheDocument();

    const electric = screen.getAllByRole('button', { name: /Electric/i });
    expect(electric).toHaveLength(1);

    const fire = screen.getAllByRole('button', { name: /Fire/i });
    expect(fire).toHaveLength(1);

    const bug = screen.getAllByRole('button', { name: /Bug/i });
    expect(bug).toHaveLength(1);

    const poison = screen.getAllByRole('button', { name: /Poison/i });
    expect(poison).toHaveLength(1);

    const psychic = screen.getAllByRole('button', { name: /Psychic/i });
    expect(psychic).toHaveLength(1);

    const normal = screen.getAllByRole('button', { name: /Normal/i });
    expect(normal).toHaveLength(1);

    const dragon = screen.getAllByRole('button', { name: /Dragon/i });
    expect(dragon).toHaveLength(1);

    userEvent.click(electric[0]);

    const next = screen.getByRole('button', { name: /Próximo pokémon/i });
    userEvent.click(next);

    userEvent.click(All);
    const PokeElectric = screen.getByText(/Pikachu/i);
    expect(PokeElectric).toBeInTheDocument();
  });
});
