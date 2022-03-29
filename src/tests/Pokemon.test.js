import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('testes para Pokemon', () => {
  it(`deve testar se é renderizado
   um card com informações de determinado pokémon.`, () => {
    renderWithRouter(<App />);

    const name = screen.getByTestId('pokemon-name');
    expect(name).toBeInTheDocument();

    const type = screen.getByTestId('pokemon-type');
    expect(type).toBeInTheDocument();

    const weight = screen.getByTestId('pokemon-weight');
    expect(weight).toBeInTheDocument();

    const weight2 = screen.getByText(/Average Weight: 6.0 kg/i);
    expect(weight2).toBeInTheDocument();

    const img = screen.getByRole('img');
    expect(img.src).toContain('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(img.alt).toContain('Pikachu sprite');
  });

  it(`deve testar se o card do Pokémon indicado na Pokédex
   contém um link de navegação para exibir detalhes deste Pokémon.`, () => {
    renderWithRouter(<App />);

    const details = screen.getByRole('link', { name: /More Details/i });
    expect(details).toBeInTheDocument();
    expect(details).toHaveAttribute('href', '/pokemons/25');
  });

  it(`deve testar se ao clicar no link de navegação do Pokémon,
   é feito o redirecionamento da aplicação para a página de detalhes de Pokémon.`, () => {
    const { memoryHistory } = renderWithRouter(<App />);

    const PokeDetails = screen.getByRole('link', { name: /More Details/i });
    const type = screen.getAllByText(/Electric/i);
    expect(type).toHaveLength(2);
    userEvent.click(PokeDetails);
    const { location: { pathname } } = memoryHistory;
    expect(pathname).toBe('/pokemons/25');
  });

  it(`deve testar e a URL exibida no navegador muda para /pokemon/<id>,
   onde <id> é o id do Pokémon cujos detalhes se deseja ver.`, () => {
    const { memoryHistory } = renderWithRouter(<App />);

    const url = '/pokemons/148';
    memoryHistory.push(url);
    const { location: { pathname } } = memoryHistory;
    expect(pathname).toBe(url);
  });
  it('deve testar se existe um ícone de estrela nos Pokémons favoritados.', () => {
    const { memoryHistory } = renderWithRouter(<App />);

    memoryHistory.push('/pokemons/143');
    const checkbox = screen.getByRole('checkbox');
    userEvent.click(checkbox);
    const star = screen.getByRole('img', { name: /Snorlax is marked as favorite/i });
    expect(star.src).toContain('/star-icon.svg');
    expect(star).toBeInTheDocument();
  });
});
