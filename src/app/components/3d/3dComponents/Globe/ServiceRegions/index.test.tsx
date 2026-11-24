import userEvent from '@testing-library/user-event';
import {
  render,
  screen,
  within,
} from '#app/components/react-testing-library-with-providers';
import ServiceRegions from '.';

describe('ServiceRegions', () => {
  it('keeps Read more in a labelled keyboard-focusable scroll area', async () => {
    const user = userEvent.setup();
    render(<ServiceRegions selectedRegionId={null} />, { service: 'ws' });

    const content = screen.getByRole('region', {
      name: 'BBC News in 45 languages',
    });
    expect(
      within(content).getByRole('link', { name: 'Read more' }),
    ).toHaveAttribute(
      'href',
      'https://www.bbc.com/aboutthebbc/whatwedo/worldservice',
    );
    await user.tab();
    expect(content).toHaveFocus();
  });

  it('keeps language links beyond the fourth row available and preserves language attributes', () => {
    render(<ServiceRegions selectedRegionId="africa" />, { service: 'ws' });

    const content = screen.getByRole('region', { name: 'Africa' });
    const firstLink = within(content).getByRole('link', {
      name: 'BBC News Afaan Oromoo',
    });
    expect(firstLink.closest('li')).toHaveAttribute('lang', 'om');
    expect(firstLink.closest('li')).toHaveAttribute('translate', 'no');
    expect(
      within(content).getByRole('link', { name: 'BBC News Yorùbá' }),
    ).toHaveAttribute('href', 'https://www.bbc.com/yoruba');
  });

  it('updates the scroll area label and content when switching regions and returning to the default state', () => {
    const { rerender } = render(<ServiceRegions selectedRegionId="africa" />, {
      service: 'ws',
    });

    rerender(<ServiceRegions selectedRegionId="latin-america" />);
    const content = screen.getByRole('region', { name: 'Latin America' });
    expect(
      within(content).getByRole('link', { name: 'BBC News Brasil' }),
    ).toHaveAttribute('href', 'https://www.bbc.com/portuguese');
    expect(
      screen.queryByRole('region', { name: 'Africa' }),
    ).not.toBeInTheDocument();

    rerender(<ServiceRegions selectedRegionId={null} />);
    expect(
      within(
        screen.getByRole('region', { name: 'BBC News in 45 languages' }),
      ).getByRole('link', { name: 'Read more' }),
    ).toBeInTheDocument();
  });
});
