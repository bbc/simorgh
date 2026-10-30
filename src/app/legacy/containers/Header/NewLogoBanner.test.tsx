import { HOME_PAGE } from '#app/routes/utils/pageTypes';
import {
  render,
  screen,
} from '#app/components/react-testing-library-with-providers';
import NewLogoBanner from './NewLogoBanner';

describe('NewLogoBanner', () => {
  it('renders a decorative, recolourable World Service logo at 112 by 32 pixels', () => {
    const { container } = render(<NewLogoBanner />);
    const logo = container.querySelector('.external-svg');

    expect(logo).toHaveAttribute('aria-hidden', 'true');
    expect(logo).toHaveStyle({
      '--icon-source': `url("${process.env.SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN}${process.env.SIMORGH_PUBLIC_STATIC_ASSETS_PATH}images/icons/ws-header-logo.svg")`,
      '--icon-width': '112px',
      '--icon-height': '32px',
    });
  });
  it('links to the global languages homepage on language homepages', () => {
    render(<NewLogoBanner />, {
      pageType: HOME_PAGE,
      service: 'tamil',
      pathname: '/tamil',
    });

    expect(screen.getByRole('link', { name: /bbc/i })).toHaveAttribute(
      'href',
      '/ws/languages',
    );
  });

  it('links to the BBC homepage on the global languages homepage', () => {
    render(<NewLogoBanner />, {
      pageType: HOME_PAGE,
      service: 'ws',
      pathname: '/ws/languages',
    });

    expect(screen.getByRole('link', { name: /bbc/i })).toHaveAttribute(
      'href',
      '/',
    );
  });

  it('treats a trailing slash on the global languages homepage as the same route', () => {
    render(<NewLogoBanner />, {
      pageType: HOME_PAGE,
      service: 'ws',
      pathname: '/ws/languages/',
    });

    expect(screen.getByRole('link', { name: /bbc/i })).toHaveAttribute(
      'href',
      '/',
    );
  });
});
