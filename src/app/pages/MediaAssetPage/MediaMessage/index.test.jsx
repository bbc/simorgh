import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import MediaMessage from '.';

const GenerateMediaMessage = () =>
  render(
    <ServiceContextProvider service="pidgin">
      <MediaMessage />
    </ServiceContextProvider>,
  );

describe('MediaMessage', () => {
  it('should output a translated media message', () => {
    const { getByText } = GenerateMediaMessage();
    const expectedMessage = 'Dis thing no dey again';
    expect(getByText(expectedMessage)).toBeInTheDocument();
  });
});
