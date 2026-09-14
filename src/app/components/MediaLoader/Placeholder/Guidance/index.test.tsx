import { render } from '#app/components/react-testing-library-with-providers';
import Guidance from '.';

describe('Media Player: Guidance', () => {
  it('should render Guidance', () => {
    const { container, getByText } = render(
      <Guidance
        guidanceMessage="Guidance: Contains strong language with adult humor"
        noJsMessage="no js"
      />,
    );

    const message = getByText(
      'Guidance: Contains strong language with adult humor',
    );

    expect(
      container.querySelector('[data-e2e="media-player__guidance"]'),
    ).toBeInTheDocument();
    expect(message).toHaveClass('guidance-message');
    expect(message).toHaveAttribute('aria-hidden', 'true');
  });

  it('should render no-js styles when noJsClassName prop is used', () => {
    const { container, getByText } = render(
      <Guidance
        guidanceMessage="Guidance: Contains strong language with adult humor"
        noJsMessage="This media cannot play in your browser. Please enable Javascript or a different browser."
      />,
    );

    expect(
      container.querySelector('[data-e2e="media-player__guidance"]'),
    ).toBeInTheDocument();
    expect(
      getByText('Guidance: Contains strong language with adult humor'),
    ).toHaveClass('guidance-message');
    expect(container.querySelector('noscript')).toBeInTheDocument();
  });
});
