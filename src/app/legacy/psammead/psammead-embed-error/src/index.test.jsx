import React from 'react';
import { render } from '#components/react-testing-library-with-providers';
import EmbedError from './index';

describe('EmbedError', () => {
  it('should render a default embed error', () => {
    const { container } = render(
      <EmbedError message="Sorry, we can't display this part of the story on this lightweight mobile page." />,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render an embed error with a link', () => {
    const { container } = render(
      <EmbedError
        message="Sorry, we can't display this part of the story on this lightweight mobile page."
        link={{
          text: 'View the full version of the page to see all the content.',
          href: '#',
        }}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render an embed error that fills the viewport', () => {
    const { container } = render(
      <EmbedError
        message="Sorry, we can't display this part of the story on this lightweight mobile page."
        fillViewport
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
