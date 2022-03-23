import React from 'react';
import { screen, render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('testes para notFound', () => {
  it('testa se a pagina notFound contem um heading Page requested not found 😭', () => {
    render(<NotFound />);

    const text = screen.getByRole('heading', { name: /Page requested not found /i });
    expect(text).toBeInTheDocument();
  });

  it('testa se a pagina notFound mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    render(<NotFound />);

    const img = screen.getAllByRole('img');
    expect(img[1].src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    console.log(img[1]);
  });
});
