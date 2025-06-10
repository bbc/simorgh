import React, { act } from 'react';
import Component from '.';
import { screen, render } from '../react-testing-library-with-providers';
import fixture from './fixture';

describe('PortraitVideoCarousel', () => {
  it('Should contain the expected number of portrait video items', async () => {
    await act(async () => {
      render(<Component {...fixture} />);
    });

    const portraitVideoItems = screen
      .getByTestId('pv-carousel')
      .getElementsByTagName('li');

    expect(portraitVideoItems.length).toBe(fixture.items.length);
  });

  it('Should render the carousel heading with the correct title', async () => {
    await act(async () => {
      render(<Component {...fixture} />);
    });

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      fixture.title,
    );
  });
});
