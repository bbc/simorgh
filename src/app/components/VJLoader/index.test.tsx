import React from 'react';
import { render } from '@testing-library/react';
import VJLoader from '.';

const vjBlock = {
  id: '750dcce8',
  type: 'vj',
  oembed: {
    version: '1.0',
    provider_name: 'Flourish',
    provider_url: 'https://flourish.studio',
    html: '<iframe src="https://flo.uri.sh/visualisation/8809119/embed" frameborder="0" scrolling="no" height="575" width="700" style="width:100%;" title="Interactive or visual content"></iframe>',
    width: 700,
    height: 575,
    type: 'rich',
  },
  link: 'https://public.flourish.studio/visualisation/8809119',
};

describe('Canonical - VJ Loader', () => {
  describe("When block type is set to 'vj'", () => {
    it('Should show include', () => {
      const { container } = render(<VJLoader {...vjBlock} />);
      const actual = container.querySelector(
        'iframe[src="https://flo.uri.sh/visualisation/8809119/embed"]',
      );
      expect(actual).toBeInTheDocument();
    });
  });
});
