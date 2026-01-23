import {
  render,
  screen,
  act,
} from '#app/components/react-testing-library-with-providers';
import { Helmet } from 'react-helmet';
import OfflinePage from './OfflinePage';

describe('OfflinePage', () => {
  it('should render the offline page title', async () => {
    await act(async () => {
      render(<OfflinePage />);
    });

    expect(screen.getByText('You are offline')).toBeInTheDocument();
  });

  it('should render the offline message', async () => {
    await act(async () => {
      render(<OfflinePage />);
    });

    expect(
      screen.getByText(
        'Looks like you’re not online right now. Please check your network and reconnect. Once you’re back, just refresh the page to continue.',
      ),
    ).toBeInTheDocument();
  });

  it('should render the solutions list', async () => {
    await act(async () => {
      render(<OfflinePage />);
    });

    expect(
      screen.getByText('Check your internet connection'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Refresh the page when your connection is restored'),
    ).toBeInTheDocument();
  });

  it('should render correctly for mundo service', async () => {
    await act(async () => {
      render(<OfflinePage />, { service: 'mundo' });
    });

    expect(screen.getByText('You are offline')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Looks like you’re not online right now. Please check your network and reconnect. Once you’re back, just refresh the page to continue.',
      ),
    ).toBeInTheDocument();
  });

  it('should set the correct html attributes', async () => {
    await act(async () => {
      render(<OfflinePage />, { service: 'mundo' });
    });

    const { htmlAttributes } = Helmet.peek();
    expect(htmlAttributes?.lang).toBe('mundo');
    expect(htmlAttributes?.dir).toBe('ltr');
  });
});
