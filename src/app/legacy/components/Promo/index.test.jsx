import moment from 'moment';
import {
  render,
  screen,
} from '../../../components/react-testing-library-with-providers';

import Promo from '.';

const Fixture = ({ useLargeImages = false, timestamp = Date.now() }) => (
  <Promo>
    <Promo.Image
      useLargeImages={useLargeImages}
      src="https://ichef.test.bbci.co.uk/ace/ws/{width}/cpsdevpb/3502/test/0c533a40-770b-11ed-bd83-8f15ba358e41.jpg"
      alt="Test image alt text"
      loading="lazy"
    />
    <Promo.Heading>test heading</Promo.Heading>
    <Promo.A>test link tag</Promo.A>
    <Promo.Body>test body</Promo.Body>
    <Promo.Timestamp>{timestamp}</Promo.Timestamp>
  </Promo>
);

const FixtureWithWebp = ({
  useLargeImages = false,
  timestamp = Date.now(),
}) => (
  <Promo>
    <Promo.Image
      useLargeImages={useLargeImages}
      src="https://ichef.test.bbci.co.uk/ace/ws/{width}/cpsdevpb/3502/test/0c533a40-770b-11ed-bd83-8f15ba358e41.jpg.webp"
      alt="Test image alt text"
      loading="lazy"
    />
    <Promo.Heading>test heading</Promo.Heading>
    <Promo.A>test link tag</Promo.A>
    <Promo.Body>test body</Promo.Body>
    <Promo.Timestamp>{timestamp}</Promo.Timestamp>
  </Promo>
);

const FixtureProgrammes = ({ useLargeImages = false }) => (
  <Promo>
    <Promo.Image
      useLargeImages={useLargeImages}
      src="https://ichef.bbci.co.uk/images/ic/{width}xn/p06vzdgj.jpg"
      alt="Test image alt text"
      loading="lazy"
    />
    <Promo.Heading>test heading</Promo.Heading>
    <Promo.A>test link tag</Promo.A>
    <Promo.Body>test body</Promo.Body>
  </Promo>
);

const FixtureProgrammesWithWebp = ({ useLargeImages = false }) => (
  <Promo>
    <Promo.Image
      useLargeImages={useLargeImages}
      src="https://ichef.bbci.co.uk/images/ic/{width}xn/p06vzdgj.jpg.webp"
      alt="Test image alt text"
      loading="lazy"
    />
    <Promo.Heading>test heading</Promo.Heading>
    <Promo.A>test link tag</Promo.A>
    <Promo.Body>test body</Promo.Body>
  </Promo>
);

describe('Promo component - Image', () => {
  it.each([undefined, null, ''])(
    'renders a placeholder without requesting an image when src is %s',
    src => {
      const { container } = render(
        <Promo.Image src={src} alt="" isPortraitImage>
          <span>Media overlay</span>
        </Promo.Image>,
      );

      expect(container.querySelector('img')).not.toBeInTheDocument();
      expect(container.querySelector('picture')).not.toBeInTheDocument();
      expect(container.querySelector('[srcset]')).not.toBeInTheDocument();
      expect(screen.getByText('Media overlay')).toBeInTheDocument();
      expect(
        container.querySelector('span[aria-hidden="true"]'),
      ).not.toBeInTheDocument();
      expect(container.firstChild.firstChild).toHaveStyle({
        backgroundRepeat: 'no-repeat',
      });
    },
  );

  it('should render image using correct resolution and no large image on desktop', () => {
    render(<Fixture />);
    const imageEl = screen.getByAltText('Test image alt text');
    expect(imageEl).toHaveAttribute(
      'sizes',
      `(min-width: 63rem) 232px, (min-width: 37.5rem) 50vw, 33vw`,
    );
  });
  it('should use large image resolution and width when large image is true on desktop', () => {
    render(<Fixture useLargeImages />);
    const imageEl = screen.getByAltText('Test image alt text');
    expect(imageEl).toHaveAttribute(
      'sizes',
      `(min-width: 63rem) 800px, (min-width: 37.5rem) 66vw, 100vw`,
    );
  });

  it('should create src set using correct resolutions - programmes iChef recipes ', () => {
    render(<FixtureProgrammes />);

    const image = screen.getByAltText('Test image alt text');
    const srcSet = image.getAttribute('srcSet');

    const expectedResolutions = [96, 128, 176, 240, 352, 464, 672, 800];
    expectedResolutions.forEach(resolution => {
      expect(srcSet).toContain(`${resolution}w`);
    });
  });

  it('should create src set using resolutions - all other iChef Recipes', () => {
    render(<Fixture />);

    const image = screen.getByAltText('Test image alt text');
    const srcSet = image.getAttribute('srcSet');

    const expectedResolutions = [85, 120, 170, 232, 325, 450, 660, 800];
    expectedResolutions.forEach(resolution => {
      expect(srcSet).toContain(`${resolution}w`);
    });
  });

  it('should append a webp file extension - programmes iChef recipes', () => {
    render(<FixtureProgrammes />);

    const image = screen.getByAltText('Test image alt text');
    const srcSet = image.getAttribute('srcSet');

    const expectedResolutions = [96, 128, 176, 240, 352, 464, 672, 800];
    expectedResolutions.forEach(resolution => {
      expect(srcSet).toContain(
        `https://ichef.bbci.co.uk/images/ic/${resolution}xn/p06vzdgj.jpg.webp ${resolution}w`,
      );
    });
  });

  it('should have only one webp file extension when URL has one already - programmes iChef recipes', () => {
    render(<FixtureProgrammesWithWebp />);

    const image = screen.getByAltText('Test image alt text');
    const srcSet = image.getAttribute('srcSet');

    const expectedResolutions = [96, 128, 176, 240, 352, 464, 672, 800];
    expectedResolutions.forEach(resolution => {
      expect(srcSet).toContain(
        `https://ichef.bbci.co.uk/images/ic/${resolution}xn/p06vzdgj.jpg.webp ${resolution}w`,
      );
    });
  });

  it('should append a webp file extension - all other iChef Recipes', () => {
    render(<Fixture />);

    const image = screen.getByAltText('Test image alt text');
    const srcSet = image.getAttribute('srcSet');

    const expectedResolutions = [85, 120, 170, 232, 325, 450, 660, 800];
    expectedResolutions.forEach(resolution => {
      expect(srcSet).toContain(
        `https://ichef.test.bbci.co.uk/ace/ws/${resolution}/cpsdevpb/3502/test/0c533a40-770b-11ed-bd83-8f15ba358e41.jpg.webp ${resolution}w`,
      );
    });
  });

  it('should have only one webp file extension when URL has one already - all other iChef Recipes', () => {
    render(<FixtureWithWebp />);

    const image = screen.getByAltText('Test image alt text');
    const srcSet = image.getAttribute('srcSet');

    const expectedResolutions = [85, 120, 170, 232, 325, 450, 660, 800];
    expectedResolutions.forEach(resolution => {
      expect(srcSet).toContain(
        `https://ichef.test.bbci.co.uk/ace/ws/${resolution}/cpsdevpb/3502/test/0c533a40-770b-11ed-bd83-8f15ba358e41.jpg.webp ${resolution}w`,
      );
    });
  });
});

describe('Promo component - Timestamp', () => {
  describe('Publication year', () => {
    beforeEach(() => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date('2026-11-12T12:00:00Z'));
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('omits the year for dates published this year', () => {
      const { container } = render(
        <Fixture timestamp="2026-11-03T05:17:09.393Z" />,
        { service: 'mundo' },
      );

      expect(container.querySelector('time')).toHaveTextContent(
        /^3 noviembre$/,
      );
      expect(container.querySelector('time')).toHaveAttribute(
        'datetime',
        '2026-11-03',
      );
    });

    it('includes the year for dates published in a different year', () => {
      render(<Fixture timestamp="2025-11-03T05:17:09.393Z" />, {
        service: 'mundo',
      });

      expect(screen.getByText('3 noviembre 2025')).toBeInTheDocument();
    });

    it('renders the native Japanese date format for dates published this year', () => {
      const { container } = render(
        <Fixture timestamp="2026-11-03T05:17:09.393Z" />,
        { service: 'japanese' },
      );

      expect(container.querySelector('time')).toHaveTextContent(/^11月3日$/);
    });

    it('renders the Japanese date format for dates published in a different year', () => {
      render(<Fixture timestamp="2025-11-03T05:17:09.393Z" />, {
        service: 'japanese',
      });

      expect(screen.getByText('2025年11月3日')).toBeInTheDocument();
    });

    it('renders the native Simplified Chinese date format for dates published this year', () => {
      const { container } = render(
        <Fixture timestamp="2026-11-03T05:17:09.393Z" />,
        { service: 'zhongwen', variant: 'simp' },
      );

      expect(container.querySelector('time')).toHaveTextContent(/^11月3日$/);
    });

    it('renders the Simplified Chinese date format for dates published in a different year', () => {
      render(<Fixture timestamp="2025-11-03T05:17:09.393Z" />, {
        service: 'zhongwen',
        variant: 'simp',
      });

      expect(screen.getByText('2025年11月3日')).toBeInTheDocument();
    });

    it('renders the native Traditional Chinese date format for dates published this year', () => {
      const { container } = render(
        <Fixture timestamp="2026-11-03T05:17:09.393Z" />,
        { service: 'zhongwen', variant: 'trad' },
      );

      expect(container.querySelector('time')).toHaveTextContent(/^11月3日$/);
    });

    it('renders the Traditional Chinese date format for dates published in a different year', () => {
      render(<Fixture timestamp="2025-11-03T05:17:09.393Z" />, {
        service: 'zhongwen',
        variant: 'trad',
      });

      expect(screen.getByText('2025年11月3日')).toBeInTheDocument();
    });

    it('renders the native Korean date format for dates published this year', () => {
      const { container } = render(
        <Fixture timestamp="2026-11-03T05:17:09.393Z" />,
        { service: 'korean' },
      );

      expect(container.querySelector('time')).toHaveTextContent(/^11월 3일$/);
    });

    it('renders the Korean date format for dates published in a different year', () => {
      render(<Fixture timestamp="2025-11-03T05:17:09.393Z" />, {
        service: 'korean',
      });

      expect(screen.getByText('2025년 11월 3일')).toBeInTheDocument();
    });

    // Persian/Pashto also render an alternative Jalaali calendar date
    // alongside the Gregorian one. The year should be omitted from both
    // calendars together for same-year dates, so they stay consistent.
    it('renders the Persian date format for dates published this year', () => {
      const { container } = render(
        <Fixture timestamp="2026-11-03T05:17:09.393Z" />,
        { service: 'persian' },
      );

      expect(container.querySelector('time')).toHaveTextContent(
        /^۱۲ آبان - ۳ نوامبر$/,
      );
    });

    it('renders the Persian date format for dates published in a different year', () => {
      render(<Fixture timestamp="2025-11-03T05:17:09.393Z" />, {
        service: 'persian',
      });

      expect(
        screen.getByText('۱۲ آبان ۱۴۰۴ - ۳ نوامبر ۲۰۲۵'),
      ).toBeInTheDocument();
    });

    it('renders the Pashto date format for dates published this year', () => {
      const { container } = render(
        <Fixture timestamp="2026-11-03T05:17:09.393Z" />,
        { service: 'pashto' },
      );

      expect(container.querySelector('time')).toHaveTextContent(
        /^۱۲ لړم - ۳ نومبر$/,
      );
    });

    it('renders the Pashto date format for dates published in a different year', () => {
      render(<Fixture timestamp="2025-11-03T05:17:09.393Z" />, {
        service: 'pashto',
      });

      expect(
        screen.getByText('۱۲ لړم ۱۴۰۴ - ۳ نومبر ۲۰۲۵'),
      ).toBeInTheDocument();
    });
  });

  describe('Publication year across a timezone boundary', () => {
    // The Japanese service uses the Asia/Tokyo timezone (UTC+9). A timestamp
    // that falls in the previous calendar year in UTC can already be in the
    // "current" year once converted to the service's local timezone. This
    // confirms the year comparison is timezone-aware rather than comparing
    // raw UTC years.
    beforeEach(() => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date('2026-01-01T10:00:00Z')); // 2026-01-01 19:00 in Tokyo
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('omits the year when the UTC year differs but the local year matches', () => {
      const { container } = render(
        <Fixture timestamp="2025-12-31T16:00:00Z" />, // 2026-01-01 01:00 in Tokyo
        { service: 'japanese' },
      );

      expect(container.querySelector('time')).toHaveTextContent(/^1月1日$/);
    });
  });

  describe('Past dates', () => {
    it('should render timestamp in string format', () => {
      const stringTimestamp = '2023-11-03T05:17:09.393Z';
      const { getByText } = render(<Fixture timestamp={stringTimestamp} />, {
        service: 'mundo',
      });
      expect(getByText('3 noviembre 2023')).toBeInTheDocument();
    });
    it('should render timestamp in epoch format', () => {
      const unixTimestamp = 1698995115000;
      const { getByText } = render(<Fixture timestamp={unixTimestamp} />, {
        service: 'mundo',
      });
      expect(getByText('3 noviembre 2023')).toBeInTheDocument();
    });
  });

  describe('Relative times', () => {
    const epochTimeNow = new Date('2026-11-12T12:00:00Z').getTime();

    beforeEach(() => {
      jest.useFakeTimers();
      jest.setSystemTime(epochTimeNow);
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    const calcTimestampMinutesAgo = minutes =>
      new Date(epochTimeNow - 60 * 1000 * minutes);

    const calcTimestampHoursAgo = hours =>
      new Date(epochTimeNow - 60 * 60 * 1000 * hours);
    describe('Relative time 0 minute ago', () => {
      it('should render 1 minute ago timestamp in string format if time since last published is less than 1 minute ago', () => {
        // We do not want the timestamp to say 0 minutes if time since last published is less than 1 minute ago.
        // Relative time stamp will say 1 minute ago for last published between 0 minutes and 1.59 minutes
        const zeroMinuteAgoString = calcTimestampMinutesAgo(0).toISOString();
        const { getByText } = render(
          <Fixture timestamp={zeroMinuteAgoString} />,
          {
            service: 'mundo',
          },
        );
        expect(getByText('1 minuto')).toBeInTheDocument();
      });
      it('should render 1 minute ago timestamp in epoch format if time since last published is less than 1 minute ago', () => {
        const zeroMinuteAgoEpoch = calcTimestampMinutesAgo(0).getTime();
        const { getByText } = render(
          <Fixture timestamp={zeroMinuteAgoEpoch} />,
          {
            service: 'mundo',
          },
        );
        expect(getByText('1 minuto')).toBeInTheDocument();
      });
    });
    describe('Relative time 59 minutes ago', () => {
      it('should render timestamp in string format', () => {
        const fiftyNineMinutesAgoString =
          calcTimestampMinutesAgo(59).toISOString();
        const { getByText } = render(
          <Fixture timestamp={fiftyNineMinutesAgoString} />,
          {
            service: 'mundo',
          },
        );
        expect(getByText('59 minutos')).toBeInTheDocument();
      });
      it('should render in timestamp epoch format', () => {
        const fiftyNineMinutesAgoEpoch = calcTimestampMinutesAgo(59).getTime();
        const { getByText } = render(
          <Fixture timestamp={fiftyNineMinutesAgoEpoch} />,
          {
            service: 'mundo',
          },
        );
        expect(getByText('59 minutos')).toBeInTheDocument();
      });
    });
    describe('Relative time 9 hours ago', () => {
      it('should render timestamp in string format', () => {
        const nineHoursAgoString = calcTimestampHoursAgo(9).toISOString();
        const { getByText } = render(
          <Fixture timestamp={nineHoursAgoString} />,
          {
            service: 'mundo',
          },
        );
        expect(getByText('9 horas')).toBeInTheDocument();
      });
      it('should render timestamp in epoch format', () => {
        const nineHoursAgoEpoch = calcTimestampHoursAgo(9).getTime();
        const { getByText } = render(
          <Fixture timestamp={nineHoursAgoEpoch} />,
          {
            service: 'mundo',
          },
        );
        expect(getByText('9 horas')).toBeInTheDocument();
      });
    });
    describe('Relative time more than 10 hours ago', () => {
      moment.locale('es');
      it('should render timestamp in ISO string format', () => {
        const overTenHoursString = calcTimestampHoursAgo(11).toISOString();
        const dateTenHoursAgo = moment.utc(overTenHoursString).format('D MMMM');
        const { getByText } = render(
          <Fixture timestamp={overTenHoursString} />,
          {
            service: 'mundo',
          },
        );
        expect(getByText(dateTenHoursAgo)).toBeInTheDocument();
      });
      it('should render timestamp in epoch format', () => {
        const overTenHoursEpoch = calcTimestampHoursAgo(11).getTime();
        const dateTenHoursAgo = moment.utc(overTenHoursEpoch).format('D MMMM');
        const { getByText } = render(
          <Fixture timestamp={overTenHoursEpoch} />,
          {
            service: 'mundo',
          },
        );
        expect(getByText(dateTenHoursAgo)).toBeInTheDocument();
      });
    });
  });
});
