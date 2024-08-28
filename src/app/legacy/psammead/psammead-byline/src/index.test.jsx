import React from 'react';
import { render } from '#components/react-testing-library-with-providers';
import latin from '#components/ThemeProvider/fontScripts/latin';
import Byline from './index';

describe('Byline', () => {
  it('should render correctly', () => {
    const { container } = render(
      <Byline
        service="news"
        script={latin}
        avatar={{ src: 'http://www.bbc.co.uk/john-smith.jpg' }}
        name="John Smith"
        title="Art editor"
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render correctly without an avatar', () => {
    const { container } = render(
      <Byline
        service="news"
        script={latin}
        name="By John Smith"
        title="Art editor"
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
