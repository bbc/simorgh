import { HOME_PAGE } from '#app/routes/utils/pageTypes';
import {
  render,
  screen,
} from '#app/components/react-testing-library-with-providers';
import NewLogoBanner from './NewLogoBanner';

describe('NewLogoBanner', () => {
  it('links to the global languages homepage on language homepages', () => {
    render(<NewLogoBanner />, {
      pageType: HOME_PAGE,
      service: 'tamil',
      pathname: '/tamil',
    });

    expect(screen.getByRole('link', { name: 'BBC' })).toHaveAttribute(
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

    expect(screen.getByRole('link', { name: 'BBC' })).toHaveAttribute(
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

    expect(screen.getByRole('link', { name: 'BBC' })).toHaveAttribute(
      'href',
      '/',
    );
  });
});
