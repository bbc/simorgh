import { render } from '../react-testing-library-with-providers';
import { CurrentLiveProgramme } from '../../models/types/radioSchedule';
import ListenLiveCTA from '.';

const inOneHour = () => new Date(Date.now() + 60 * 60 * 1000).toISOString();
const oneHourAgo = () => new Date(Date.now() - 60 * 60 * 1000).toISOString();

const liveProgramme: CurrentLiveProgramme = {
  state: 'live',
  service: 'pashto',
  brandTitle: 'BBC Pashto Radio',
  startTime: oneHourAgo(),
  endTime: inOneHour(),
  duration: 'PT2H',
  link: '/pashto/bbc_pashto_radio/liveradio',
};

const enabledToggle = { listenLiveCta: { enabled: true } };

describe('ListenLiveCTA', () => {
  it('renders the CTA when a live programme is present', () => {
    const { getByTestId, getByRole, container } = render(
      <ListenLiveCTA
        programme={{
          ...liveProgramme,
          startTime: new Date('2026-08-24T14:30:00.000Z').toISOString(),
          endTime: new Date('2026-08-24T15:30:00.000Z').toISOString(),
          duration: 'PT1H',
        }}
      />,
      { service: 'pashto', toggles: enabledToggle },
    );

    expect(getByTestId('listen-live-cta')).toBeInTheDocument();
    expect(getByRole('link')).toHaveAttribute(
      'href',
      '/pashto/bbc_pashto_radio/liveradio',
    );
    expect(getByTestId('listen-live-cta')).toHaveTextContent(
      'BBC Pashto Radio',
    );

    const time = container.querySelector('time');
    expect(time).toBeInTheDocument();
    // Pashto uses the GMT timezone and localised (Eastern Arabic) numerals,
    // so 15:30 UTC renders as ۱۵:۳۰.
    expect(time).toHaveTextContent('۱۵:۳۰');
    expect(time).toHaveAttribute('datetime', '2026-08-24');
  });

  it('renders nothing when programme is null', () => {
    const { container } = render(<ListenLiveCTA programme={null} />, {
      service: 'pashto',
      toggles: enabledToggle,
    });

    expect(container).toBeEmptyDOMElement();
  });

  it('applies dir="rtl" for a right-to-left service', () => {
    const { getByTestId } = render(
      <ListenLiveCTA programme={liveProgramme} />,
      { service: 'pashto', toggles: enabledToggle },
    );

    expect(getByTestId('listen-live-cta')).toHaveAttribute('dir', 'rtl');
  });

  it('renders nothing when endTime has already passed', () => {
    const stale: CurrentLiveProgramme = {
      ...liveProgramme,
      startTime: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      endTime: oneHourAgo(),
    };

    const { container } = render(<ListenLiveCTA programme={stale} />, {
      service: 'pashto',
      toggles: enabledToggle,
    });

    expect(container).toBeEmptyDOMElement();
  });

  it('renders nothing when dates are malformed', () => {
    const malformed: CurrentLiveProgramme = {
      ...liveProgramme,
      startTime: 'not-a-date',
      endTime: 'also-not-a-date',
    };

    const { container } = render(<ListenLiveCTA programme={malformed} />, {
      service: 'pashto',
      toggles: enabledToggle,
    });

    expect(container).toBeEmptyDOMElement();
  });

  it('renders nothing for a non-target service', () => {
    const { container } = render(
      <ListenLiveCTA programme={{ ...liveProgramme, service: 'news' }} />,
      { service: 'news', toggles: enabledToggle },
    );

    expect(container).toBeEmptyDOMElement();
  });

  it('renders nothing when required fields are missing', () => {
    const incomplete = { ...liveProgramme, link: '' };

    const { container } = render(<ListenLiveCTA programme={incomplete} />, {
      service: 'pashto',
      toggles: enabledToggle,
    });

    expect(container).toBeEmptyDOMElement();
  });
});
