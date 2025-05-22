import React, { act } from 'react';
import Component from '.';
import { render } from '../react-testing-library-with-providers';
import fixture from './fixture';

describe('PortraitVideoCarousel', () => {
  it('Should contain the expected number of portrait video items', async () => {
    let container;

    await act(async () => {
      ({ container } = render(<Component {...fixture} />));
    });

    const portraitVideoItems = (container as unknown as HTMLElement)
      .querySelector('ul[data-testid="pv-scroll-panel"]')
      ?.querySelectorAll('li');

    expect(portraitVideoItems?.length).toBe(fixture.items.length);
  });
});
