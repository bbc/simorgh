/* eslint-disable import/order */
import React from 'react';
import Player from '.';
import { act } from '@testing-library/react-hooks';
import { Helmet } from 'react-helmet';
import { render } from '@testing-library/react';

const playerConfig = {
  title: 'Butterfly photobombs koala film shoot at Australia zoo',
  holdingImageURL: 'https://ichef.bbci.co.uk/images/ic/$recipe/p049srmr.jpg',
  pid: 'p049sq7f',
};

describe('MediaPlayer', () => {
  it('Loads requireJS and Bump4', async () => {
    await act(async () => {
      render(<Player {...playerConfig} />);
    });

    const requireScript = Helmet.peek().scriptTags[0];
    const bumpScript = Helmet.peek().scriptTags[1];

    expect(requireScript.src).toEqual(
      'https://static.bbci.co.uk/frameworks/requirejs/0.13.0/sharedmodules/require.js',
    );

    expect(bumpScript.innerHTML).toContain(
      'https://emp.bbci.co.uk/emp/bump-4/bump-4',
    );
  });

  it('Calls Bump when the component loads', async () => {
    const mockRequire = jest.fn();

    window.requirejs = mockRequire;

    await act(async () => {
      render(<Player {...playerConfig} />);
    });

    expect(mockRequire.mock.calls[0][0]).toStrictEqual(['bump-4']);
  });
});
