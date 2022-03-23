import { render, screen } from '@testing-library/react';
import React from 'react';
import About from '../components/About';

describe('testa o component About', () => {
  it('deve testar se a página contém as informações sobre a Pokédex.', () => {
    render(<About />);
    const title = screen.getByRole('heading', { level: 2, name: /About Pokédex/i });
    expect(title).toBeInTheDocument();
  });

  it('deve testar se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    render(<About />);
    const text = screen.getByText(/This application simulates a Pokédex/i);
    expect(text).toBeInTheDocument();
    const text2 = screen.getByText(/One can filter Pokémons by type/i);
    expect(text2).toBeInTheDocument();
  });

  it('deve testar se a página contém a seguinte imagem de uma Pokédex', () => {
    render(<About />);
    const img = screen.getByRole('img');
    expect(img.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});

// tirei a ideia da img desse link https://stackoverflow.com/questions/60509527/jestreact-native-testing-library-how-to-test-an-image-src //
