import React from 'react';
import { render } from '@testing-library/react';
import { recommendationOne } from '../helpers/fixtureData';
import Promo from '.';

describe('ExperimentalEOJPromo', () => {
  it('should render a link', () => {
    const { queryByRole } = render(<Promo block={recommendationOne} />);
    expect(queryByRole('link')).toBeInTheDocument();
  });

  it('should extract and render the correct title', () => {
    const { getByText } = render(<Promo block={recommendationOne} />);
    expect(
      getByText(
        'La conmovedora historia de cómo una madre y el hombre preso por la muerte de su hija se unieron para atrapar al verdadero asesino',
      ),
    ).toBeTruthy();
  });

  it('should extract and render the correct href', () => {
    const { queryByRole } = render(<Promo block={recommendationOne} />);
    expect(queryByRole('link').href).toEqual(
      'http://localhost/mundo/noticias-53377054',
    );
  });
});
